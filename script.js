/* ===== DATA (ganti / sambungkan ke API nanti) ===== */
// icon berwarna / sama di kedua tema -> assets/icons/ ; icon hitam-putih -> assets/icons/light/ atau /dark/
const SHARED = new Set(['logo', 'bell-white', 'doc', 'block', 'hold', 'x-red', 'file-pdf', 'file-behance']);
const ICON = n => SHARED.has(n) ? `assets/icons/${n}.svg` : `assets/icons/light/${n}.svg`;
const AV = n => `assets/img/${n}.jpg`;
const NAV = [
  { label: 'OVERVIEW' },
  { t: 'Dashboard', i: 'dashboard', active: true, page: 'dashboard' },
  { t: "Candidate's Resume", i: 'resume', badge: '99+', page: 'resume' },
  { t: 'Job Openings', i: 'folder', page: 'jobs' },
  { t: 'Interviews & Schedule', i: 'interview', page: 'interviews' },
  { t: 'Assessments & Tests', i: 'assessment', page: 'assessments' },
  { t: 'Analytics & Hiring Metrics', i: 'analytics', page: 'analytics' },
  { label: 'MANAGE' },
  { t: 'Notification', i: 'bell', badge: '99+' },
  { t: 'Dark Mode', i: 'moon', toggle: true },
  { t: 'API Keys', i: 'key' },
  { t: 'Settings', i: 'settings' },
];
const STATS = [
  { v: 425900, d: 5.8, up: true, l: 'Total resumes received', i: 'doc' },
  { v: 365725, d: 1.07, up: true, l: 'Total number of rejected resumes', i: 'block' },
  { v: 10559, d: 1.07, up: false, l: 'Total number of resumes held', i: 'hold' },
];
const JOBS = [
  { n: 'Sr. UI/UX Designer', cv: '31.040', p: 40, pt: '40%', c: '#2f86ff' },
  { n: 'Front-End Developer', cv: '18.934', p: 24.4, pt: '24,4%', c: '#00cc2c' },
  { n: 'IT Support', cv: '13.912', p: 17, pt: '17%', c: '#a8c800' },
  { n: 'Associate Product Manager', cv: '13.037', p: 16.8, pt: '16,8%', c: '#e2d800' },
];
// urutan gambar donut searah jarum jam: biru, hijau, kuning, lime
const DONUT_ORDER = [0, 1, 3, 2];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const INTERVIEW = [1,.944,.904,1,.969,.994,.994,.907,.994,.972,1,0];   // tinggi bar abu (0-1 dari 356px)
const ONBOARD   = [26,29,26,20,23,20,6,23,11,26,14,4];                // tinggi bar hijau (px)
const SCHEDULE = [   // nama & posisi ditulis lengkap; CSS yang memotong (…) hanya kalau kolomnya sempit
  ['christopher','Christopher Javier','Sr. UI/UX Designer','Microsoft Teams','On Progress'],
  ['cathrine','Cathrine Vinicha','Sr. UI/UX Designer','Microsoft Teams','On Progress'],
  ['david','David Costa','Front-End Developer','Google Meeting','Reschedule'],
  ['michalle','Michalle Mqawni','Front-End Developer','Microsoft Teams','On Progress'],
  ['manuel','Manuel De La Vueza','Front-End Developer','Google Meeting','On Progress'],
];
// 3 platform wawancara, dibagi acak tapi tetap (tidak berubah tiap refresh). Urutan = urutan kandidat di halaman Interviews & Schedule.
const PLATFORMS = ['Microsoft Teams', 'Google Meeting', 'Zoom Meeting'];
const INT_PLATS = ['Microsoft Teams','Zoom Meeting','Google Meeting','Zoom Meeting','Microsoft Teams','Google Meeting','Zoom Meeting','Microsoft Teams','Google Meeting','Zoom Meeting','Microsoft Teams','Google Meeting','Microsoft Teams','Zoom Meeting','Google Meeting','Zoom Meeting','Microsoft Teams','Google Meeting'];
SCHEDULE.forEach((r, i) => { r[3] = INT_PLATS[i]; });

/* Placeholder abu-abu hanya untuk gambar yang belum ada; begitu file berhasil dimuat, latar dihapus */
const markOk = () => document.querySelectorAll('img:not(.ok)').forEach(i => { if (i.complete && i.naturalWidth) i.classList.add('ok'); });
document.addEventListener('load', e => { if (e.target.tagName === 'IMG') e.target.classList.add('ok'); }, true);
window.addEventListener('load', markOk);

/* ===== TEMA ICON: light <-> dark ===== */
function applyIcons() {
  const dark = document.body.classList.contains('dark');
  const from = dark ? '/icons/light/' : '/icons/dark/', to = dark ? '/icons/dark/' : '/icons/light/';
  document.querySelectorAll('img').forEach(i => { const a = i.getAttribute('src'); if (a && a.includes(from)) i.setAttribute('src', a.replace(from, to)); });
  document.querySelectorAll('.ico-wrap.no-on').forEach(w => w.classList.remove('no-on'));
}
// file dark belum ada -> pakai versi light; file "-active" belum ada -> tetap pakai icon outline
document.addEventListener('error', e => {
  const i = e.target; if (i.tagName !== 'IMG') return;
  const a = i.getAttribute('src') || '';
  if (a.includes('/icons/dark/')) i.setAttribute('src', a.replace('/icons/dark/', '/icons/light/'));
  else if (i.classList.contains('on')) i.parentNode.classList.add('no-on');
}, true);
// preload versi dark supaya pergantian tema tidak berkedip
const preloadDark = () => document.querySelectorAll('img').forEach(i => {
  const a = i.getAttribute('src') || ''; if (a.includes('/icons/light/')) new Image().src = a.replace('/icons/light/', '/icons/dark/');
});
window.addEventListener('load', preloadDark);

/* ===== RENDER ===== */
const $ = s => document.querySelector(s);
const fmt = n => n.toLocaleString('en-US');

function renderNav() {
  $('#nav').innerHTML = NAV.map(x => x.label
    ? `<div class="nav-label">${x.label}</div>`
    : `<button class="nav-item${x.active ? ' active' : ''}" ${x.toggle ? 'id="darkToggle"' : ''} ${x.page ? `data-page="${x.page}"` : ''}>
         <span class="ico-wrap"><img class="ico off" src="${ICON(x.i)}" alt="">
           <img class="ico on" src="${ICON(x.i + '-active')}" alt=""></span><span>${x.t}</span>
         ${x.badge ? `<em class="badge">${x.badge}</em>` : ''}${x.toggle ? '<i class="switch"></i>' : ''}
       </button>`).join('');
}
function renderStats() {
  $('#stats').innerHTML = STATS.map(s => `
    <div class="stat">
      <div class="stat-top">
        <div class="n"><span class="v" data-count="${s.v}">0</span>
          <span class="delta ${s.up ? '' : 'down'}">${s.up ? '▲' : '▼'} ${s.d.toFixed(2).replace(/0$/, '')}%</span></div>
        <small>Since January 2026</small>
      </div>
      <div class="stat-foot"><span>${s.l}</span><img class="ico" src="${ICON(s.i)}" alt=""></div>
    </div>`).join('');
}
function renderJobs() {
  $('#jobs').innerHTML = `<div class="row th"><span>No</span><span>Job Title</span><span>Total CV</span><span>%</span></div>` +
    JOBS.map((j, i) => `<div class="row" style="transition-delay:${0.9 + i * 0.12}s">
      <i class="bar-c" style="background:${j.c}"></i><span>${j.n}</span><span>${j.cv}</span><span>${j.pt}</span></div>`).join('');
}
function renderDonut() {
  // Ring tipis (40px), sudut segmen membulat, celah antar segmen rata. Semua angka bisa diubah di sini.
  const CX = 126.5, Ro = 125, THICK = 40, CR = 7, GAP = 7;      // CR = radius sudut, GAP = lebar celah (px)
  const Ri = Ro - THICK, rm = (Ro + Ri) / 2, total = JOBS.reduce((t, j) => t + j.p, 0);
  const pt = (r, a) => `${(CX + r * Math.cos(a)).toFixed(2)} ${(CX + r * Math.sin(a)).toFixed(2)}`;
  const pad = (GAP / 2 + CR) / rm;                                 // inset sudut supaya setelah di-stroke celahnya tetap GAP
  let a0 = 0;
  const paths = DONUT_ORDER.map(i => {
    const span = JOBS[i].p / total * 2 * Math.PI, s = a0 + pad, e = a0 + span - pad;
    a0 += span;
    const ro = Ro - CR, ri = Ri + CR, large = e - s > Math.PI ? 1 : 0;
    return `<path fill="${JOBS[i].c}" stroke="${JOBS[i].c}" stroke-width="${CR * 2}" stroke-linejoin="round"
      d="M${pt(ro, s)} A${ro} ${ro} 0 ${large} 1 ${pt(ro, e)} L${pt(ri, e)} A${ri} ${ri} 0 ${large} 0 ${pt(ri, s)} Z"/>`;
  }).join('');
  const C = 2 * Math.PI * rm + 4;                                  // mask: lingkaran yang "menyapu" ring saat animasi
  $('#donut').innerHTML = `<mask id="donutReveal"><circle cx="${CX}" cy="${CX}" r="${rm}" stroke="#fff"
    data-len="${C}" data-c="${C}" stroke-dasharray="0 ${C}"/></mask><g mask="url(#donutReveal)">${paths}</g>`;
}
function renderChart() {
  const tops = [8, 74, 141, 207, 273, 339];                 // posisi garis 500,400,300,200,100,5 (px dari atas bar)
  $('#yaxis').innerHTML = [500,400,300,200,100,5].map((v, i) => `<span style="top:${tops[i]}px">${v}</span>`).join('');
  $('#plot').innerHTML = tops.map(t => `<div class="grid-line" style="top:${t}px"></div>`).join('') + MONTHS.map((m, i) => `
    <div class="m${i === 11 ? ' dim' : ''}" style="--i:${i}">
      <div class="b-grey" style="--h:${Math.round(INTERVIEW[i] * 356)}px"></div>
      <div class="b-green" style="--g:${ONBOARD[i]}px"></div>
      <label>${m}</label></div>`).join('');
}
function renderSchedule() {
  $('#schedule').innerHTML = SCHEDULE.map((r, i) => `
    <div class="tr" style="transition-delay:${1 + i * 0.1}s">
      <span class="cand"><img class="avatar" src="${AV(r[0])}" alt=""><b>${r[1]}</b></span>
      <span>${r[2]}</span><span>${r[3]}</span>
      <span class="iv"><img class="avatar" src="${AV(r[0] + '-iv1')}" alt=""><img class="avatar" src="${AV(r[0] + '-iv2')}" alt=""></span>
      <span class="st ${r[4] === 'Reschedule' ? 're' : ''}">${r[4]}</span>
    </div>`).join('');
}

/* ===== ANIMASI ===== */
function countUp(el, dur = 1800, delay = 400) {
  const end = +el.dataset.count, t0 = performance.now() + delay;
  const tick = now => {
    const p = Math.min(Math.max((now - t0) / dur, 0), 1), e = 1 - Math.pow(1 - p, 4);
    el.textContent = fmt(Math.round(end * e));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
function play() {
  document.body.classList.remove('loaded', 'ready');
  clearTimeout(play.t); play.t = setTimeout(() => document.body.classList.add('ready'), 3200);   // delay entrance dihapus setelah selesai
  document.querySelectorAll('#donut circle').forEach(c => c.setAttribute('stroke-dasharray', `0 ${c.dataset.c}`));
  $('#timeFill').style.width = '0';
  void document.body.offsetWidth;                       // reflow supaya animasi bisa diputar ulang
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
    document.querySelectorAll('[data-count]').forEach(el => countUp(el));
    setTimeout(() => document.querySelectorAll('#donut circle').forEach(c =>
      c.setAttribute('stroke-dasharray', `${c.dataset.len} ${c.dataset.c}`)), 700);
    $('#timeFill').style.width = $('#timeFill').dataset.w + '%';
  });
}

/* ===== INIT & INTERAKSI ===== */
/* skala canvas desain (2382px) ke lebar layar */
const DESIGN_W = 2382, appEl = document.querySelector('.app');
const fit = () => { appEl.style.zoom = window.innerWidth / DESIGN_W; };
fit(); window.addEventListener('resize', fit);
renderNav(); renderStats(); renderJobs(); renderDonut(); renderChart(); renderSchedule(); markOk();
window.addEventListener('load', play);

$('#refreshBtn').addEventListener('click', e => {
  const b = e.currentTarget; b.classList.remove('spin'); void b.offsetWidth; b.classList.add('spin'); refreshPage();
});
$('#collapseBtn').addEventListener('click', () => document.querySelector('.app').classList.toggle('collapsed'));
/* Dark mode: semua elemen berganti serentak (transisi per-elemen dimatikan sementara, lalu di-crossfade 1 kali) */
$('#darkToggle').addEventListener('click', () => {
  const b = document.body;
  const swap = () => { b.classList.add('no-trans'); b.classList.toggle('dark'); applyIcons(); };
  const done = () => setTimeout(() => b.classList.remove('no-trans'), 60);
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches)
    document.startViewTransition(swap).finished.finally(done);
  else { swap(); done(); }
});
document.querySelector('.bell').addEventListener('mouseenter', e => {
  const b = e.currentTarget; b.classList.remove('ring'); void b.offsetWidth; b.classList.add('ring');
});
document.addEventListener('keydown', e => { if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); document.querySelector('.search input').focus(); } });