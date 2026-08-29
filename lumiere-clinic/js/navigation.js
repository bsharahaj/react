/* ==========================================================
   Lumière Aesthetic Clinic — navigation.js
   Simulated authentication, role selection, and screen navigation (client + admin)
   ========================================================== */

/* ================= AUTH / NAVIGATION ================= */
let role = null;
function selectRole(r){
  role = r;
  document.getElementById('role-client').classList.toggle('selected', r==='client');
  document.getElementById('role-admin').classList.toggle('selected', r==='admin');
  document.getElementById('entry-continue').disabled = false;
}
function login(){
  document.getElementById('screen-entry').classList.remove('active');
  if(role==='admin'){
    document.getElementById('admin-shell').classList.add('active');
    goAdmin('dashboard');
  } else {
    document.getElementById('client-shell').classList.add('active');
    go('home');
  }
  window.scrollTo(0,0);
}
function logout(){
  document.getElementById('admin-shell').classList.remove('active');
  document.getElementById('client-shell').classList.remove('active');
  document.getElementById('screen-entry').classList.add('active');
  role = null;
  document.getElementById('role-client').classList.remove('selected');
  document.getElementById('role-admin').classList.remove('selected');
  document.getElementById('entry-continue').disabled = true;
  resetBooking();
  window.scrollTo(0,0);
}
function go(screen){
  document.querySelectorAll('.client-screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('cs-'+screen).classList.add('active');
  const navKey = screen==='success' ? 'book' : screen;
  document.querySelectorAll('[data-nav]').forEach(n=>n.classList.toggle('active', n.dataset.nav===navKey));
  if(screen==='profile'){
    const fill = document.getElementById('loyalty-fill');
    fill.style.width='0';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ fill.style.width='72%'; }));
  }
  window.scrollTo(0,0);
}
function goAdmin(screen){
  document.querySelectorAll('.admin-screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('as-'+screen).classList.add('active');
  document.querySelectorAll('[data-anav]').forEach(n=>n.classList.toggle('active', n.dataset.anav===screen));
  window.scrollTo(0,0);
}
