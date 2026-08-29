/* ==========================================================
   Lumière Aesthetic Clinic — profile.js
   Client profile & loyalty — upcoming appointment and treatment history rendering (Feature 3)
   ========================================================== */

/* ================= PROFILE ================= */
document.getElementById('upcoming-appt').innerHTML = `
  <div class="upcoming">
    <div class="up-date"><span class="ud-mon">Aug</span><span class="ud-day">17</span><span class="ud-dow">Mon</span></div>
    <div class="up-body">
      <h4>Collagen Sculpt Facial</h4>
      <div class="up-meta"><span>◷ 14:30 · 75 min</span><span>With Dr. Noa Berman</span><span>Rothschild branch · Room 2</span></div>
    </div>
  </div>`;
document.getElementById('history-list').innerHTML = HISTORY.map(h=>`
  <div class="h-row">
    <span class="h-img art ${h.art}"></span>
    <div><div class="h-name">${h.name}</div><div class="h-sub">${h.spec} · ${h.date}</div></div>
    <div class="h-right"><div class="h-pts">+${h.pts} pts</div><div class="h-price">${nis(h.price)}</div></div>
  </div>`).join('');
