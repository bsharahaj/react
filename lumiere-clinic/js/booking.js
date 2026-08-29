/* ==========================================================
   Lumière Aesthetic Clinic — booking.js
   Appointment booking flow — 5-step stepper, calendar, time slots, review and confirmation (Feature 2)
   ========================================================== */

/* ================= BOOKING FLOW ================= */
const booking = {step:1, treatment:null, specialist:null, date:null, time:null};
let calYear = 2026, calMonth = 7; // August 2026
const TODAY = {y:2026, m:7, d:9};
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function startBookingWith(id){
  resetBooking();
  booking.treatment = TREATMENTS.find(t=>t.id===id);
  go('book');
  renderBookingLists();
  setStep(2);
}
function resetBooking(){
  booking.step=1; booking.treatment=null; booking.specialist=null; booking.date=null; booking.time=null;
  calYear=2026; calMonth=7;
  renderBookingLists();
  setStep(1);
}
function renderBookingLists(){
  document.getElementById('book-treatment-list').innerHTML = TREATMENTS.map(t=>`
    <button class="pick-card ${booking.treatment&&booking.treatment.id===t.id?'selected':''}" onclick="pickTreatment(${t.id})">
      <span class="p-img art ${t.art}"></span>
      <span><span class="p-name">${t.name}</span><span class="p-sub">${t.cat} · ${t.dur}</span></span>
      <span class="p-price"><b>${nis(t.price)}</b><span>${t.from?'from':'&nbsp;'}</span></span>
    </button>`).join('');
  document.getElementById('book-specialist-list').innerHTML = SPECIALISTS.map(s=>`
    <button class="spec-card ${booking.specialist&&booking.specialist.id===s.id?'selected':''}" onclick="pickSpecialist(${s.id})">
      <span class="avatar ${s.av}">${s.initials}</span>
      <span><span class="sp-name">${s.name}</span><br><span class="sp-role">${s.role}</span><br><span class="sp-exp">${s.exp}</span></span>
    </button>`).join('');
}
function pickTreatment(id){
  booking.treatment = TREATMENTS.find(t=>t.id===id);
  renderBookingLists();
  updateNext();
}
function pickSpecialist(id){
  booking.specialist = SPECIALISTS.find(s=>s.id===id);
  renderBookingLists();
  updateNext();
}

/* calendar */
function isAvailable(y,m,d){
  const dow = new Date(y,m,d).getDay();
  if(dow===6) return false;                         // Saturday closed
  if(y<TODAY.y || (y===TODAY.y&&m<TODAY.m) || (y===TODAY.y&&m===TODAY.m&&d<=TODAY.d)) return false;
  if((d*7+m)%9===3) return false;                   // deterministic "fully booked" days
  return true;
}
function renderCal(){
  document.getElementById('cal-month').textContent = MONTHS[calMonth]+" "+calYear;
  const first = new Date(calYear,calMonth,1).getDay();
  const days = new Date(calYear,calMonth+1,0).getDate();
  let html = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<div class="cal-dow">${d}</div>`).join('');
  for(let i=0;i<first;i++) html += `<div class="cal-day other"></div>`;
  for(let d=1;d<=days;d++){
    const avail = isAvailable(calYear,calMonth,d);
    const sel = booking.date && booking.date.d===d && booking.date.m===calMonth && booking.date.y===calYear;
    const today = calYear===TODAY.y && calMonth===TODAY.m && d===TODAY.d;
    html += `<button class="cal-day ${avail?'available':'disabled'} ${sel?'selected':''} ${today?'today':''}"
      ${avail?`onclick="pickDate(${d})"`:''} ${avail?'':'aria-disabled="true"'}>${d}</button>`;
  }
  document.getElementById('cal-grid').innerHTML = html;
}
function calShift(dir){
  calMonth += dir;
  if(calMonth>11){calMonth=0;calYear++} if(calMonth<0){calMonth=11;calYear--}
  renderCal();
}
function pickDate(d){
  booking.date = {y:calYear, m:calMonth, d, label:`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(calYear,calMonth,d).getDay()]}, ${d} ${MONTHS[calMonth]} ${calYear}`};
  booking.time = null;
  renderCal();
  updateNext();
}

/* time slots */
function renderSlots(){
  document.getElementById('slot-date-label').innerHTML = `Available times for <b>${booking.date.label}</b> with <b>${booking.specialist.name}</b>`;
  const seed = booking.date.d + booking.specialist.id;
  document.getElementById('slot-grid').innerHTML = TIME_SLOTS.map((t,i)=>{
    const taken = (seed+i)%4===1;
    const sel = booking.time===t;
    return `<button class="slot ${taken?'taken':''} ${sel?'selected':''}" ${taken?'':`onclick="pickTime('${t}')"`}>
      ${t}<small>${taken?'Booked':'Available'}</small></button>`;
  }).join('');
}
function pickTime(t){ booking.time=t; renderSlots(); updateNext(); }

/* review + success */
function reviewRows(){
  return `
    <div class="review-row"><span class="rk">Specialist</span><span class="rv">${booking.specialist.name}</span></div>
    <div class="review-row"><span class="rk">Date</span><span class="rv">${booking.date.label}</span></div>
    <div class="review-row"><span class="rk">Time</span><span class="rv">${booking.time}</span></div>
    <div class="review-row"><span class="rk">Duration</span><span class="rv">${booking.treatment.dur}</span></div>`;
}
function renderReview(){
  document.getElementById('review-card').innerHTML = `
    <div class="review-hero">
      <span class="p-img art ${booking.treatment.art}"></span>
      <div><div class="rv-cat">${booking.treatment.cat}</div><h3>${booking.treatment.name}</h3></div>
    </div>
    <div class="review-rows">${reviewRows()}</div>
    <div class="review-total"><span class="rk">${booking.treatment.from?'Starting from':'Total'}</span><span class="rv">${nis(booking.treatment.price)}</span></div>`;
}

/* stepper engine */
function setStep(n){
  booking.step = n;
  document.querySelectorAll('.book-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('bstep-'+n).classList.add('active');
  document.querySelectorAll('#stepper .step').forEach(s=>{
    const i = +s.dataset.step;
    s.classList.toggle('current', i===n);
    s.classList.toggle('done', i<n);
    if(i<n) s.querySelector('.s-dot').textContent = '✓';
    else s.querySelector('.s-dot').textContent = i;
  });
  document.querySelectorAll('#stepper .step-line').forEach((l,i)=>l.classList.toggle('filled', i < n-1));
  document.getElementById('book-back').style.visibility = n===1 ? 'hidden' : 'visible';
  document.getElementById('book-next').innerHTML = n===5 ? 'Confirm appointment' : 'Continue <span class="arr">→</span>';
  if(n===3) renderCal();
  if(n===4) renderSlots();
  if(n===5) renderReview();
  updateNext();
}
function updateNext(){
  const ok = {1:!!booking.treatment, 2:!!booking.specialist, 3:!!booking.date, 4:!!booking.time, 5:true}[booking.step];
  document.getElementById('book-next').disabled = !ok;
}
function bookNext(){
  if(booking.step<5){ setStep(booking.step+1); const bw=document.querySelector('.book-wrap'); if(bw.scrollIntoView) bw.scrollIntoView({behavior:'smooth'}); }
  else confirmBooking();
}
function bookBack(){ if(booking.step>1) setStep(booking.step-1); }
function confirmBooking(){
  document.getElementById('success-rows').innerHTML = `
    <div class="review-row"><span class="rk">Treatment</span><span class="rv">${booking.treatment.name}</span></div>
    ${reviewRows()}
    <div class="review-row"><span class="rk">Price</span><span class="rv">${nis(booking.treatment.price)}${booking.treatment.from?' (from)':''}</span></div>`;
  document.getElementById('success-ref').textContent = 'LM-' + (2400 + Math.floor(Math.random()*500));
  go('success');
}

/* init booking UI */
renderBookingLists();
setStep(1);
