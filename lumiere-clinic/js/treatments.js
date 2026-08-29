/* ==========================================================
   Lumière Aesthetic Clinic — treatments.js
   Treatments & services — card rendering and category filtering (Feature 1)
   ========================================================== */

/* ================= RENDER: TREATMENT CARDS ================= */
function tCard(t){
  return `
  <article class="t-card">
    <div class="t-img art ${t.art}"><span class="ring"></span></div>
    <div class="t-body">
      <span class="chip chip--sage t-cat">${t.cat}</span>
      <h3>${t.name}</h3>
      <p class="t-desc">${t.desc}</p>
      <div class="t-meta">
        <span>◷ ${t.dur}</span><span class="sep"></span><span>Licensed specialist</span>
      </div>
      <div class="t-foot">
        <div class="t-price"><span>${t.from?'Starting from':'Price'}</span><b>${nis(t.price)}</b></div>
        <button class="btn btn--primary btn--sm" onclick="startBookingWith(${t.id})">Book treatment</button>
      </div>
    </div>
  </article>`;
}
document.getElementById('featured-grid').innerHTML = TREATMENTS.filter(t=>t.featured).map(tCard).join('');

function renderTreatments(cat){
  const list = cat==='All' ? TREATMENTS : TREATMENTS.filter(t=>t.cat===cat);
  document.getElementById('treatments-grid').innerHTML = list.map(tCard).join('');
}
document.getElementById('filter-row').innerHTML = CATEGORIES.map((c,i)=>
  `<button class="filter-pill ${i===0?'active':''}" role="tab" onclick="filterCat(this,'${c}')">${c}</button>`).join('');
function filterCat(el,c){
  document.querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  renderTreatments(c);
}
renderTreatments('All');
