/* ===== HALAMAN LAIN + ROUTER (dashboard tetap di script.js) ===== */
const PEOPLE = n => `assets/img/people/${n}.jpg`;          // foto orang: assets/img/people/<nama-slug>.jpg
const CATEGORIES = ['Sr. UI/UX Designer', 'Front-End Developer', 'IT Support', 'Associate Product Manager', 'Talent Acquisition Specialist', 'Risk Management Analyst', 'IT Security Architect'];
const D1 = 'Wednesday, 24 November 2026', D2 = 'Tuesday, 23 November 2026';
const RESUMES = [   // [nama, kategori, hari, jam]
  ['Christine Victoria','Associate Product Manager',D1,'09.20 AM'],['Caleb Holloway','IT Support',D1,'08.30 AM'],['Ethan Sinclair','Front-End Developer',D1,'08.05 AM'],
  ['Aria Davenport','IT Support',D1,'08.00 AM'],['Stella Vance','IT Support',D1,'07.45 AM'],['Gavin Bennett','Sr. UI/UX Designer',D1,'07.33 AM'],
  ['Chase Kensington','IT Support',D2,'15.30 PM'],['Isla Montgomery','Front-End Developer',D2,'14.05 PM'],['Flora Hayes','IT Support',D2,'14.01 PM'],
  ['Bella Vance','IT Support',D2,'13.45 PM'],['Hazel Bennett','Sr. UI/UX Designer',D2,'10.33 AM'],['Hugo Montgomery','Front-End Developer',D2,'08.05 AM'],
  ['Alice Mercer','IT Support',D2,'08.00 AM'],['Blake Hawthorne','IT Support',D2,'07.45 AM'],['Lily Davenport','Sr. UI/UX Designer',D2,'07.33 AM'],
  ['Logan Ross','IT Support',D2,'07.32 AM'],['Ian Callahan','Front-End Developer',D2,'07.32 AM'],['Dexter Vance','IT Support',D2,'07.30 AM'],
];
const INTERVIEWS = [   // [nama, kategori, step, status(p/r), [interviewer 1-8]]
  ['Christopher Javier','Sr. UI/UX Designer','3/5','p',[1,2]],['Cathrine Vinicha','Sr. UI/UX Designer','3/5','p',[3,4]],['David Costa De La Cruzz','Front-End Developer','3/5','r',[5,2]],
  ['Michalle Mqawni','Front-End Developer','3/5','p',[5,6]],['Manuel De La Vueza','Front-End Developer','3/5','p',[1,6]],['Julian Cross','Front-End Developer','3/5','r',[1,6]],
  ['Sophie Laurent','Associate Product Manager','3/5','p',[3,4]],['Lucas Wright','Sr. UI/UX Designer','3/5','r',[5,2]],['Jonah Brooks','IT Support','4/5','p',[3,7]],
  ['Arthur Vance','IT Support','3/5','p',[3,7]],['Felix Mercer','Sr. Backend Engineer','4/5','p',[1,8]],['Daisy Montgomery','Jr. UI Engineer II','4/5','p',[1,6]],
  ['Aria Davenport','UI/UX Engineer','4/5','p',[1,6]],['Stella Vance','Account Manager','4/5','p',[3,7]],['Ruby Callahan','Sr. UI/UX Designer','3/5','p',[5,2]],
  ['Jonah Brooks','IT Support','4/5','p',[3,7]],['Arthur Vance','IT Support','3/5','p',[3,7]],['Felix Mercer','Sr. Backend Engineer','4/5','p',[1,8]],
];
// nama file foto = nama kecil-pisah-strip; nama kembar dalam 1 daftar diberi -2, -3 (cth. jonah-brooks.jpg, jonah-brooks-2.jpg)
const slugs = list => { const seen = {}; return list.map(r => { const s = r[0].toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, ''); seen[s] = (seen[s] || 0) + 1; return seen[s] > 1 ? `${s}-${seen[s]}` : s; }); };
const RES_SLUG = slugs(RESUMES), INT_SLUG = slugs(INTERVIEWS);
const img = (src, cls = 'avatar') => `<img class="${cls}" src="${src}" alt="">`;
const ico = n => `<img class="ico" src="${ICON(n)}" alt="">`;
let catFilter = null;

function renderResumes() {
  const rows = RESUMES.map((r, i) => ({ r, s: RES_SLUG[i] })).filter(x => !catFilter || x.r[1] === catFilter);
  $('#resRows').innerHTML = (rows.length ? rows.map((x, i) => `<div class="lc-row g-res" style="--i:${i}">
    <div class="who">${img(PEOPLE(x.s))}<span class="nm">${x.r[0]}</span></div><span>${x.r[1]}</span>
    <span><button class="view-btn">View</button></span><span>${x.r[2]} - ${x.r[3]}</span><span><button class="kebab" aria-label="Decision"></button></span></div>`).join('')
    + '<button class="more">More Resume</button>' : '<div class="empty">Tidak ada resume untuk kategori ini</div>');
  afterRender();
}
function renderInterviews() {
  $('#intRows').innerHTML = INTERVIEWS.map((r, i) => `<div class="lc-row g-int" style="--i:${i}">
    <div class="who">${img(PEOPLE(INT_SLUG[i]))}<span class="nm">${r[0]}</span></div><span>${r[1]}</span><span>${r[2]}</span>
    <span class="st-${r[3]}">${r[3] === 'p' ? 'On Progress' : 'Reschedule'}</span>
    <div class="ivs">${r[4].map(n => img(PEOPLE('interviewer-' + n))).join('')}</div>
    <span><button class="view-btn">View</button></span><span><button class="kebab" aria-label="Decision"></button></span></div>`).join('')
    + '<button class="more">More Resume</button>';
  afterRender();
}
function afterRender() { if (document.body.classList.contains('dark')) applyIcons(); markOk(); }

function buildPages() {
  const dd = `<button class="lc-btn" style="gap:14px">${ico('folder')}Category Job${ico('chevron-down')}</button>`;
  $('#page-resume').innerHTML = `<div class="card list-card"><div class="lc-head"><h2 class="lc-title">All Candidate's <span>Resume</span></h2>
    <div class="dd" id="dd"><div class="dd-box"><button class="dd-btn" id="ddBtn">${ico('classification')}<span id="ddLabel">Resume Classification</span><img class="ico chev" src="${ICON('chevron-down')}" alt=""></button>
    <button data-v="">All Jobs</button>${CATEGORIES.map(c => `<button data-v="${c}">${c}</button>`).join('')}</div></div></div>
    <div class="lc-th g-res"><span>Candidate</span><span>Category Job</span><span>File</span><span>Date Apply</span><span>Decision</span></div><div class="lc-scroll" id="resRows"></div></div>`;
  $('#page-interviews').innerHTML = `<div class="card list-card"><div class="lc-head"><h2 class="lc-title">All Interviews <span>Schedule</span></h2>
    <div class="lc-tools"><button class="lc-btn">${ico('plus-circle')}Create a Schedule</button>${dd}
    <button class="lc-btn">${ico('calendar')}Month${ico('chevron-down')}</button><button class="lc-btn">${ico('calendar')}Year${ico('chevron-down')}</button></div></div>
    <div class="lc-th g-int"><span>Candidate</span><span>Category Job</span><span>Step</span><span>Status</span><span>Interviewers</span><span>File</span><span>Decision</span></div><div class="lc-scroll" id="intRows"></div></div>`;
  $('#page-jobs').innerHTML = `<div class="card list-card"><div class="lc-head"><h2 class="lc-title">All Job <span>Openings</span></h2></div>
    <div class="jobs-empty">Kerangka halaman Job Openings sudah siap.<br>Desainnya belum dikirim, jadi isinya masih kosong.</div></div>`;
  renderResumes(); renderInterviews();
  const box = $('#dd');
  $('#ddBtn').addEventListener('click', e => { e.stopPropagation(); box.classList.toggle('open'); });
  box.querySelectorAll('[data-v]').forEach(b => b.addEventListener('click', () => {
    catFilter = (b.dataset.v && catFilter !== b.dataset.v) ? b.dataset.v : null;   // 'All Jobs' atau klik kategori yang sama = hapus filter
    box.querySelectorAll('[data-v]').forEach(x => x.classList.toggle('sel', !!x.dataset.v && x.dataset.v === catFilter));
    $('#ddLabel').textContent = catFilter || 'Resume Classification';
    box.classList.remove('open'); renderResumes();
  }));
  document.addEventListener('click', () => box.classList.remove('open'));
}

/* ===== ROUTER ===== */
const PAGES = { dashboard: 'Dashboard', resume: "Candidate's Resume", jobs: 'Job Openings', interviews: 'Interviews & Schedule' };
const ORDER = Object.keys(PAGES);
let current = 'dashboard', busy = false;

function replayDashboard() {      // animasi dashboard diputar ulang tanpa menyentuh sidebar/header
  const pg = $('#page-dashboard'), b = document.body;
  b.classList.remove('ready'); pg.classList.add('reset');
  document.querySelectorAll('#donut circle').forEach(c => c.setAttribute('stroke-dasharray', `0 ${c.dataset.c}`));
  $('#timeFill').style.width = '0';
  void pg.offsetWidth; pg.classList.remove('reset');
  requestAnimationFrame(() => {
    pg.querySelectorAll('[data-count]').forEach(el => countUp(el));
    setTimeout(() => document.querySelectorAll('#donut circle').forEach(c => c.setAttribute('stroke-dasharray', `${c.dataset.len} ${c.dataset.c}`)), 700);
    $('#timeFill').style.width = $('#timeFill').dataset.w + '%';
  });
  clearTimeout(play.t); play.t = setTimeout(() => b.classList.add('ready'), 3200);
}
function showPage(id, animate = true) {
  if (!PAGES[id] || id === current || busy) return;
  const prev = $(`#page-${current}`), next = $(`#page-${id}`), dir = ORDER.indexOf(id) > ORDER.indexOf(current) ? 1 : -1;
  const enter = () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active', 'leaving'));
    next.style.setProperty('--dy', 22 * dir + 'px'); next.classList.add('active');
    current = id; document.body.dataset.page = id; $('#crumbTitle').textContent = PAGES[id];
    document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.toggle('active', n.dataset.page === id));
    if (id === 'dashboard') replayDashboard();
    busy = false; history.replaceState(null, '', '#' + id);
  };
  if (animate) { busy = true; prev.style.setProperty('--dy', 22 * dir + 'px'); prev.classList.add('leaving'); setTimeout(enter, 220); } else enter();
}
function refreshPage() {
  if (current === 'dashboard') replayDashboard();
  else if (current === 'resume') renderResumes();
  else if (current === 'interviews') renderInterviews();
  else { const c = $('#page-jobs .list-card'); c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; }
}

buildPages();
document.querySelectorAll('.nav-item[data-page]').forEach(n => n.addEventListener('click', () => showPage(n.dataset.page)));
window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));
if (PAGES[location.hash.slice(1)]) showPage(location.hash.slice(1), false);
