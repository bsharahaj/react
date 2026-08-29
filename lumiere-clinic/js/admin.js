/* ==========================================================
   Lumière Aesthetic Clinic — admin.js
   Admin clinic dashboard — summary stats, weekly chart, appointment/client tables (Feature 4)
   ========================================================== */

/* ================= ADMIN RENDER ================= */
const STATS = [
  {label:"Today's appointments", icon:'<rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M8 3.5v4M16 3.5v4M4 10.5h16"/>', num:"14", sub:'<span class="pos">6 remaining</span> · next at 12:00', hero:true},
  {label:"Total clients", icon:'<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.7-3.3 3-4.9 5.5-4.9s4.8 1.6 5.5 4.9M15.5 5.7a3.2 3.2 0 0 1 0 5.6M17.5 14.9c1.7.7 2.7 2.2 3 4.6"/>', num:"248", sub:'<span class="pos">+12</span> new this month'},
  {label:"Appointments this week", icon:'<path d="M4 17.5 9 12l3.5 3.5L20 7"/><path d="M15 7h5v5"/>', num:"66", sub:'<span class="pos">+9%</span> vs. last week'},
  {label:"Revenue this week", icon:'<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.2c0-1.2 1.1-2 2.5-2s2.5.8 2.5 2-1 1.7-2.5 2-2.5.9-2.5 2 1.1 2 2.5 2 2.5-.8 2.5-2M12 5.5v1.7M12 16.9v1.6"/>', num:"₪24,180", sub:'<span class="pos">+₪2,050</span> vs. last week'},
  {label:"Most popular", icon:'<path d="M12 3.5l2.47 5 5.53.8-4 3.9.94 5.5L12 16.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8z"/>', num:"Laser", sub:'Full Legs Laser · 21 bookings'}
];
document.getElementById('stat-grid').innerHTML = STATS.map(s=>`
  <div class="stat-card ${s.hero?'stat-hero':''}">
    <div class="st-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>${s.label}</div>
    <div class="st-num">${s.num}</div>
    <div class="st-sub">${s.sub}</div>
  </div>`).join('');

const maxVal = Math.max(...WEEK_CHART.map(w=>w.val));
document.getElementById('week-chart').innerHTML = WEEK_CHART.map(w=>`
  <div class="bar-col">
    <div class="bar ${w.hot?'hot':''}" style="height:${w.val===0?4:Math.round(w.val/maxVal*100)}%">
      <span class="bar-val">${w.val===0?'—':w.val}</span>
    </div>
    <span class="bar-day">${w.day}</span>
  </div>`).join('');

function statusChip(s){ const [label,cls]=STATUS_LABEL[s]; return `<span class="chip ${cls}"><span class="dot"></span>${label}</span>`; }
function personCell(name,ci,av,sub){ return `<div class="cell-person"><span class="avatar ${av}">${ci}</span><span><b>${name}</b>${sub?`<span>${sub}</span>`:''}</span></div>`; }

document.querySelector('#today-table tbody').innerHTML = TODAY_APPTS.map(a=>`
  <tr><td>${personCell(a.client,a.ci,a.av)}</td><td>${a.treat}</td><td class="hide-m td-muted">${a.spec}</td><td>${a.time}</td><td>${statusChip(a.status)}</td></tr>`).join('');
document.getElementById('today-count').textContent = TODAY_APPTS.length + ' of 14 shown';

document.querySelector('#all-appts-table tbody').innerHTML =
  WEEK_APPTS.concat(TODAY_APPTS.slice(4).map(a=>({...a,date:"Sun 9 Aug"}))).map(a=>`
  <tr><td>${personCell(a.client,a.ci,a.av)}</td><td>${a.treat}</td><td class="hide-m td-muted">${a.spec}</td><td class="hide-m td-muted">${a.date||"Sun 9 Aug"}</td><td>${a.time}</td><td>${statusChip(a.status)}</td></tr>`).join('');

document.querySelector('#clients-table tbody').innerHTML = CLIENTS.map(c=>`
  <tr><td>${personCell(c.name,c.ci,c.av)}</td><td class="hide-m td-muted">${c.phone}</td><td>${c.visits}</td><td class="hide-m">${c.pts.toLocaleString()} pts</td><td class="td-muted">${c.last}</td>
  <td><span class="chip ${c.tier==='Platinum'?'chip--progress':c.tier==='Gold'?'chip--gold':'chip--neutral'}">${c.tier}</span></td></tr>`).join('');

const POPULAR = [
  {name:"Full Legs Laser", count:21},{name:"Signature Glow Facial", count:17},
  {name:"Clarifying Acne Protocol", count:13},{name:"Microneedling Renewal", count:10},{name:"Hydra Infusion Facial", count:8}
];
document.getElementById('popular-list').innerHTML = POPULAR.map((p,i)=>`
  <div class="pop-row"><span class="pop-rank">${String(i+1).padStart(2,'0')}</span>
  <span><span class="pop-name">${p.name}</span><br><span class="pop-count">${p.count} bookings</span></span>
  <span class="pop-bar"><i style="width:${Math.round(p.count/POPULAR[0].count*100)}%"></i></span></div>`).join('');

const OCCUPANCY = [
  {name:"Room 1 · Facials", pct:85},{name:"Room 2 · Laser suite", pct:92},
  {name:"Room 3 · Dermatology", pct:64},{name:"Room 4 · Rejuvenation", pct:71}
];
document.getElementById('occupancy-list').innerHTML = OCCUPANCY.map(o=>`
  <div class="pop-row"><span><span class="pop-name">${o.name}</span><br><span class="pop-count">${o.pct}% booked</span></span>
  <span class="pop-bar"><i style="width:${o.pct}%"></i></span></div>`).join('');

document.getElementById('admin-treatments-grid').innerHTML = TREATMENTS.map(t=>`
  <div class="ta-card"><span class="p-img art ${t.art}"></span>
  <span><b>${t.name}</b><span class="ta-sub">${t.cat} · ${t.dur}</span></span>
  <span class="ta-price">${nis(t.price)}</span></div>`).join('');
