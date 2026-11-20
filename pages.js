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
  ['William Pluim','IT Support','4/5','p',[3,7]],['Christine Lim','IT Support','3/5','p',[3,7]],['Miguel Olivera','Sr. Backend Engineer','4/5','p',[1,8]],
];
// nama file foto = nama kecil-pisah-strip; nama kembar dalam 1 daftar diberi -2, -3 (cth. jonah-brooks.jpg, jonah-brooks-2.jpg)
const slugs = list => { const seen = {}; return list.map(r => { const s = r[0].toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, ''); seen[s] = (seen[s] || 0) + 1; return seen[s] > 1 ? `${s}-${seen[s]}` : s; }); };
const RES_SLUG = slugs(RESUMES), INT_SLUG = slugs(INTERVIEWS);
const img = (src, cls = 'avatar') => `<img class="${cls}" src="${src}" alt="">`;
const ico = n => `<img class="ico" src="${ICON(n)}" alt="">`;
let catFilter = null;
SHARED.add('whatsapp'); SHARED.add('gmail');             // logo berwarna: assets/icons/whatsapp.svg & assets/icons/gmail.svg
const DEC = {};                                          // keputusan per kandidat. Kunci 'i3' (Interviews) / 'r5' (Resume) -> { d: 'c'|'h'|'x', via: null|'WhatsApp'|'Gmail' }
const DEC_LABEL = { c: 'Continued', h: 'On Hold', x: 'Rejected' };
const decCls = k => DEC[k] ? ' d-' + DEC[k].d : '';
const stCell = (i, s) => { const d = DEC['i' + i]; return d ? `<span class="st-${d.d}">${DEC_LABEL[d.d]}</span>` : `<span class="st-${s}">${s === 'p' ? 'On Progress' : 'Reschedule'}</span>`; };

function renderResumes() {
  const rows = RESUMES.map((r, i) => ({ r, s: RES_SLUG[i], n: i })).filter(x => !catFilter || x.r[1] === catFilter);
  $('#resRows').innerHTML = (rows.length ? rows.map((x, i) => `<div class="lc-row g-res" style="--i:${i}">
    <div class="who">${img(PEOPLE(x.s))}<span class="nm">${x.r[0]}</span></div><span>${x.r[1]}</span>
    <span><button class="view-btn">View</button></span><span>${x.r[2]} - ${x.r[3]}</span><span><button class="kebab${decCls('r' + x.n)}" data-dec="r${x.n}" aria-label="Decision"></button></span></div>`).join('')
    + '<button class="more">More Resume</button>' : '<div class="empty">Tidak ada resume untuk kategori ini</div>');
  afterRender();
}
function renderInterviews() {
  $('#intRows').innerHTML = INTERVIEWS.map((r, i) => `<div class="lc-row g-int" style="--i:${i}" data-i="${i}">
    <div class="who">${img(PEOPLE(INT_SLUG[i]))}<span class="nm">${r[0]}</span></div><span>${r[1]}</span><span class="stp">${r[2]}</span>
    ${stCell(i, r[3])}
    <div class="ivs">${r[4].map(n => img(PEOPLE('interviewer-' + n))).join('')}</div>
    <span><button class="view-btn" data-view="${i}">View</button></span><span><button class="kebab${decCls('i' + i)}" data-dec="i${i}" aria-label="Decision"></button></span></div>`).join('')
    + '<button class="more">More Resume</button>';
  afterRender();
}
function afterRender() { if (document.body.classList.contains('dark')) applyIcons(); markOk(); }

/* ===== JOB OPENINGS ===== */
const JOB_DEPTS = ['Legal & Compliance', 'Engineering & IT', 'Product Design', 'Management', 'Human Resources'];
const JOB_LOCS = ['Jakarta', 'Bandung', 'Denpasar', 'Surabaya'], JOB_EMPS = ['WFO', 'Intern', 'Remote'];
const mk = (open, title, city, emp, date, dept, desc) => ({ open, title, city, emp, date, dept, desc });
const JOBS_DATA = [   // open=1 -> Close Position, open=0 -> Closed
  mk(1,'Sr. UI/UX Designer','Jakarta','WFO','2027.01.28','Product Design','We are looking for a visionary and user-centric Sr. UI/UX Designer to lead the end-to-end design lifecycle of our core digital products. You will bridge business goals and user needs by transforming complex workflows into intuitive....'),
  mk(1,'Front-End Developer','Jakarta','WFO','2027.01.20','Engineering & IT','We are looking for a skilled and detail-oriented Front-End Developer to build responsive, high-performance, and engaging web applications. You will work closely with UI/UX designers and backend engineers to translate design....'),
  mk(1,'IT Support','Jakarta','WFO','2026.12.20','Engineering & IT',"We are looking for a reliable and problem-solving IT Support specialist to ensure the smooth operation of our company's computer systems, hardware, network infrastructure, and software applications. You will serve as the primary tech..."),
  mk(1,'Associate Product Manager','Jakarta','WFO','2026.12.18','Management','We are looking for an ambitious, data-driven, and user-focused Associate Product Manager (APM) to support the end-to-end lifecycle of our digital products. You will work closely with cross-functional teams including designers..'),
  mk(1,'Talent Acquisition Specialist','Jakarta','WFO','2026.12.15','Human Resources','We are looking for a proactive and people-oriented Talent Acquisition Specialist to attract, screen, and hire top talent across the company. You will partner closely with hiring managers and HR teams to deliver an excellent candidate experience....'),
  mk(1,'Risk Management Analyst','Jakarta','WFO','2026.12.10','Management','We are looking for a sharp, analytical, and proactive Risk Management Analyst to identify, assess, and mitigate potential operational, financial, and strategic risks. You will work closely with management and cross-functional...'),
  mk(1,'IT Security Architect','Jakarta','WFO','2026.11.30','Engineering & IT',"We are looking for a strategic, highly skilled, and security-focused IT Security Architect to design, implement, and oversee robust enterprise security solutions. You will safeguard our company's cloud infrastructure, networks,"),
  mk(0,'Tax - People Advisory Services','Jakarta','Intern','2026.09.16','Human Resources','We are looking for a motivated, analytical, and detail-oriented Tax - People Advisory Services Intern to support our team in delivering comprehensive tax, mobility, and human capital advisory solutions. You will gain hands-on exper....'),
  mk(0,'Regulatory Affairs Executive','Jakarta','Intern','2026.09.10','Legal & Compliance',"We are looking for a detail-oriented, analytical, and proactive Regulatory Affairs Executive Intern to support our Legal & Compliance team in ensuring our company's products, operations, and documentation adhere to loc..."),
  mk(0,'UI/UX Product Design Intern','Jakarta','Intern','2026.09.17','Product Design','We are looking for a creative, user-centric, and detail-oriented UI/UX Product Design Intern to support our Product Design team in crafting intuitive and visually compelling digital experiences. You will gain hands-on experience...'),
  mk(0,'Project Engineering','Jakarta','WFO','2026.09.06','Engineering & IT','We are looking for a highly organized, technical, and results-driven Project Engineer to oversee, plan, and execute engineering projects from inception to completion. You will work closely with cross-functional technical teams...'),
  mk(0,'Human Capital Intern','Bandung','WFO','2026.12.15','Human Resources','We are looking for an enthusiastic, organized, and people-oriented Human Capital Intern to support our Human Resources team in daily talent acquisition, employee engagement, and HR operations. You will gain hands...'),
  mk(0,'Quality Engineer','Surabaya','WFO','2026.12.10','Engineering & IT','We are looking for a meticulous, analytical, and detail-oriented Quality Engineer to ensure our software applications, systems, and product features meet the highest standards of reliability, performance, and user experie...'),
  mk(0,'Scent Design Associate','Jakarta','Intern','2026.11.30','Product Design','We are looking for a creative, sensory-driven, and detail-oriented Scent Design Associate Intern to join our Product Design team. You will support the research, formulation, evaluation, and development of unique fragrance conc...'),
  mk(0,'Jr. Web Designer','Jakarta','WFO','2026.12.15','Product Design','We are looking for a creative, detail-oriented, and passionate Jr. Web Designer to join our Product Design team. You will assist in designing engaging, responsive, and visually appealing web interfaces, landing pages, and digital as...'),
  mk(0,'Senior Legal Officer','Denpasar','Intern','2026.12.10','Legal & Compliance','We are looking for an experienced, strategic, and meticulous Senior Legal Officer to manage our legal operations, ensure corporate compliance, and mitigate legal risks. You will work closely with management and cross-functional teams to...'),
];
const jf = { q: '', dept: '', loc: '', emp: '' };
const ddHtml = (id, w, icon, label, all, items) => `<div class="dd" id="${id}" style="width:${w}px" data-label="${label}"><div class="dd-box"><button class="dd-btn">${ico(icon)}<span class="dd-label">${label}</span><img class="ico chev" src="${ICON('chevron-down')}" alt=""></button><button data-v="">${all}</button>${items.map(c => `<button data-v="${c}">${c}</button>`).join('')}</div></div>`;
function bindDD(id, onPick) {
  const box = $('#' + id);
  box.querySelector('.dd-btn').addEventListener('click', e => { e.stopPropagation(); document.querySelectorAll('.dd.open').forEach(d => d !== box && d.classList.remove('open')); box.classList.toggle('open'); });
  box.querySelectorAll('[data-v]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.v;
    box.querySelectorAll('[data-v]').forEach(x => x.classList.toggle('sel', !!v && x === b));
    box.querySelector('.dd-label').textContent = v || box.dataset.label; box.classList.remove('open'); onPick(v);
  }));
}
const jmi = (i, t) => `<span class="jm-i">${ico(i)}${t}</span>`;
const jobCard = (j, i) => `<article class="job-card" style="--i:${i}"><span class="jb">${j.pref || 'Full Time'}</span><h3>${j.title}</h3>
  <div class="jm">${jmi('pin', j.city + ', Indonesia')}${jmi('briefcase', j.emp)}${jmi('clock', j.date)}</div><div class="jm">${jmi('people', j.dept)}</div>
  <p class="jd">${j.desc}</p><div class="jc-foot">${j.open ? `<button class="jbtn red" data-close="${JOBS_DATA.indexOf(j)}">Close Position${ico('x-red')}</button>` : '<span class="closed-label">Closed</span>'}
  <button class="jbtn">Edit Details${ico('chevron-right')}</button></div></article>`;
function renderJobs(anim = true) {
  const q = jf.q.trim().toLowerCase();
  const list = JOBS_DATA.filter(j => (!q || j.title.toLowerCase().includes(q)) && (!jf.dept || j.dept === jf.dept) && (!jf.loc || j.city === jf.loc) && (!jf.emp || j.emp === jf.emp));
  const open = list.filter(j => j.open), closed = list.filter(j => !j.open); let n = 0;
  const grid = a => `<div class="job-grid">${a.map(j => jobCard(j, n++)).join('')}</div>`, el = $('#jobScroll');
  el.className = 'jobs-scroll' + (anim ? '' : ' noanim');
  el.innerHTML = list.length ? (open.length ? grid(open) : '') + (open.length && closed.length ? '<div class="job-sep"></div>' : '') + (closed.length ? grid(closed) : '') : '<div class="empty">Tidak ada posisi yang cocok</div>';
  el.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => { JOBS_DATA[b.dataset.close].open = false; renderJobs(); }));
  afterRender();
}
function buildJobs() {
  $('#page-jobs').innerHTML = `<div class="card list-card jobs-card"><div class="lc-head"><h2 class="lc-title">All Job <span>Openings</span></h2>
    <div class="lc-tools"><button class="lc-btn" id="btnCreate">${ico('plus-circle')}Create New Position</button>
    ${ddHtml('ddDept', 344, 'department', 'Filtered by Department', 'All Departments', JOB_DEPTS)}${ddHtml('ddLoc', 203, 'location', 'Location', 'All Locations', JOB_LOCS)}${ddHtml('ddEmp', 294, 'employment', 'Employment Type', 'All Types', JOB_EMPS)}</div></div>
    <div class="jobs-scroll" id="jobScroll"></div></div>`;
  renderJobs();
  bindDD('ddDept', v => { jf.dept = v; renderJobs(); }); bindDD('ddLoc', v => { jf.loc = v; renderJobs(); }); bindDD('ddEmp', v => { jf.emp = v; renderJobs(); });
  $('#btnCreate').addEventListener('click', openCP);
  $('#jobSearch').addEventListener('input', e => { jf.q = e.target.value; renderJobs(false); });
  document.addEventListener('click', () => document.querySelectorAll('.dd.open').forEach(d => d.classList.remove('open')));
}

/* ===== PANEL "CREATE NEW POSITION" (slide dari kanan) ===== */
const CP = { pref: ['Full Time', 'Hybrid'], loc: JOB_LOCS.map(c => c + ', Indonesia'), emp: ['WFO', 'Hybrid', 'Remote'], dept: JOB_DEPTS };
const CP_DEF = { fdPref: 'Full Time', fdLoc: 'Jakarta, Indonesia', fdEmp: 'WFO', fdDept: 'Product Design' };
const fdHtml = (id, items) => `<div class="fd" id="${id}" data-v="${CP_DEF[id]}"><button type="button" class="fi fd-btn"><span>${CP_DEF[id]}</span><img class="ico chev" src="${ICON('chevron-down')}" alt=""></button>
  <div class="fd-list">${items.map(x => `<button type="button" data-o="${x}" class="${x === CP_DEF[id] ? 'sel' : ''}">${x}</button>`).join('')}</div></div>`;
const DATE_PH = 'Wednesday, November 2026';
function setFd(id, v) { const b = $('#' + id); b.dataset.v = v; b.querySelector('.fd-btn span').textContent = v; b.querySelectorAll('[data-o]').forEach(x => x.classList.toggle('sel', x.dataset.o === v)); }
function resetForm() {
  $('#cpName').value = ''; $('#cpDesc').value = ''; $('#cpDate').value = '';
  $('#cpDateTxt').textContent = DATE_PH; $('#cpDateTxt').classList.add('ph');
  Object.keys(CP_DEF).forEach(id => setFd(id, CP_DEF[id]));
  document.querySelectorAll('#cp .err').forEach(e => e.classList.remove('err'));
}
function openCP() { window.scrollTo(0, 0); resetForm(); if (document.body.classList.contains('dark')) applyIcons(); $('#scrim').classList.add('open'); $('#cp').classList.add('open'); setTimeout(() => $('#cpName').focus({ preventScroll: true }), 550); }
function closeCP() { $('#scrim').classList.remove('open'); $('#cp').classList.remove('open'); document.querySelectorAll('.fd.open').forEach(d => d.classList.remove('open')); }
function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('show'), 2400); }
function buildCreate() {
  const w = document.createElement('div');
  w.innerHTML = `<div class="scrim" id="scrim"></div><div class="toast" id="toast"></div>
  <aside class="cp" id="cp" aria-label="Create New Position">
    <div class="cp-head"><h2>Create New <span>Position</span></h2><button class="cp-x" id="cpX" aria-label="Close">${ico('close')}</button></div>
    <div class="cg first" style="--k:0"><label>Name Position</label><input class="fi" id="cpName" placeholder="Create name position" autocomplete="off"></div>
    <div class="fr r1"><div class="cg" style="--k:1"><label>Preferences</label>${fdHtml('fdPref', CP.pref)}</div><div class="cg" style="--k:1"><label>Location</label>${fdHtml('fdLoc', CP.loc)}</div></div>
    <div class="fr r2"><div class="cg" style="--k:2"><label>Employment Types</label>${fdHtml('fdEmp', CP.emp)}</div><div class="cg" style="--k:2"><label>Departments</label>${fdHtml('fdDept', CP.dept)}</div></div>
    <div class="cg" style="--k:3"><label>Job Posting Date</label><div class="fi fd-date"><span id="cpDateTxt" class="ph">${DATE_PH}</span>${ico('calendar')}<input type="date" id="cpDate"></div></div>
    <div class="cg" style="--k:4"><label>Description</label><textarea class="fi" id="cpDesc" placeholder="Job Description"></textarea></div>
    <button class="cp-post" id="cpPost">Post New Position</button></aside>`;
  appEl.append(...w.children);
  $('#scrim').addEventListener('click', closeCP); $('#cpX').addEventListener('click', closeCP);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCP(); });
  document.querySelectorAll('.fd').forEach(box => {
    box.querySelector('.fd-btn').addEventListener('click', e => { e.stopPropagation(); document.querySelectorAll('.fd.open').forEach(d => d !== box && d.classList.remove('open')); box.classList.toggle('open'); });
    box.querySelectorAll('[data-o]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); setFd(box.id, b.dataset.o); box.classList.remove('open'); }));
  });
  document.addEventListener('click', () => document.querySelectorAll('.fd.open').forEach(d => d.classList.remove('open')));
  const dIn = $('#cpDate');
  dIn.addEventListener('click', () => { try { dIn.showPicker && dIn.showPicker(); } catch (e) {} });
  dIn.addEventListener('change', () => {
    const t = $('#cpDateTxt'); t.classList.toggle('ph', !dIn.value);
    t.textContent = dIn.value ? new Date(dIn.value + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : DATE_PH;
  });
  ['#cpName', '#cpDesc'].forEach(s => $(s).addEventListener('input', e => e.target.classList.remove('err')));
  $('#cpPost').addEventListener('click', () => {
    let bad = false;
    ['#cpName', '#cpDesc'].forEach(s => { const e = $(s); e.classList.remove('err'); if (!e.value.trim()) { void e.offsetWidth; e.classList.add('err'); bad = true; } });
    if (bad) return;
    const now = new Date(), pad = n => String(n).padStart(2, '0');
    const date = dIn.value ? dIn.value.replace(/-/g, '.') : `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
    const job = mk(1, $('#cpName').value.trim(), $('#fdLoc').dataset.v.split(',')[0], $('#fdEmp').dataset.v, date, $('#fdDept').dataset.v, $('#cpDesc').value.trim());
    job.pref = $('#fdPref').dataset.v; JOBS_DATA.unshift(job);
    Object.assign(jf, { q: '', dept: '', loc: '', emp: '' }); $('#jobSearch').value = '';          // reset filter supaya posisi baru langsung terlihat
    ['ddDept', 'ddLoc', 'ddEmp'].forEach(id => { const b = $('#' + id); b.querySelector('.dd-label').textContent = b.dataset.label; b.querySelectorAll('.sel').forEach(x => x.classList.remove('sel')); });
    closeCP(); renderJobs(); $('#jobScroll').scrollTop = 0; toast('Position posted');
  });
}

/* ===== ASSESSMENTS & TESTS ===== */
const FT = { psych: ['file-green', 'Psychological Test File', 'g'], take: ['file-blue', 'Take - Home Test File', 'b'], apt: ['file-blue', 'Aptitude Test', 'b'], hr: ['file-blue', 'HR Knowledge Test', 'b'], sit: ['file-yellow', 'Situational Judgement Test', 'y'] };
const A = (pos, ago, name, f) => ({ pos, ago, name, f });
const P2 = ['psych', 'take'], P3 = ['psych', 'apt'], P4 = ['psych', 'hr', 'sit'];
const ASSESS = [   // kolom 1-4 (Legal & Compliance berada di bawah Management); show = jumlah kartu sebelum "See More"
  [{ t: 'Product Design', show: 3, c: [A('Sr. UI/UX Designer', '1 h ago', 'Christopher Javier', P2), A('Sr. UI/UX Designer', '2 h ago', 'Cathrine Vinicha', P2), A('Sr. UI/UX Designer', '3 h ago', 'Lucas Wright', P2), A('Sr. UI/UX Designer', '4 h ago', 'Ruby Callahan', P2)] }],
  [{ t: 'Engineering & IT', show: 3, c: [A('Front-End Developer', '30 m ago', 'David Costa De La Cruzz', P2), A('Front-End Developer', '45 m ago', 'Michalle Mqawni', P2), A('IT Support', '1 h ago', 'Manuel De La Vueza', P2), A('Front-End Developer', '1 h ago', 'Julian Cross', P2), A('IT Support', '1 h ago', 'Jonah Brooks', P2), A('IT Support', '1 h ago', 'Arthur Vance', P2), A('UI/UX Engineer', '2 h ago', 'Aria Davenport', P2), A('IT Support', '2 h ago', 'William Pluim', P2), A('IT Support', '2 h ago', 'Christine Lim', P2), A('Sr. Backend Engineer', '2 h ago', 'Miguel Olivera', P2)] }],
  [{ t: 'Management', show: 2, c: [A('Associate Product Management', '25 m ago', 'Sophie Laurent', P3), A('Account Manager', '35 m ago', 'Stella Vance', P3), A('Account Manager', '35 m ago', 'Delilah Ross', P3), A('Sr. Product Manager', '39 m ago', 'Gemma Sinclair', P3)] },
   { t: 'Legal & Compliance', show: 2, c: [A('Corporate Legal Senior Officer', '2 m ago', 'Isabel Morgan', P3), A('Sr. Legal Counsel', '1 h ago', 'Kaitlyn Murray', P3), A('Sr. Legal Counsel', '1 h ago', 'Fiona Mitchell', P3), A('Sr. Manager, Legal Counsel', '2 h ago', 'Jessica Howard', P3)] }],
  [{ t: 'Human Resources', show: 2, c: [A('Talent Acquisition Specialist', '28 m ago', 'Valentine Liu', P4), A('Human Capital', '48 m ago', 'Christine MQalister', P4), A('Sr. HRBP Support Specialist', '1 h ago', 'Grant Gallagher', P4), A('Human Capital', '48 m ago', 'Hugo Montgomery', P4)] }],
];
const slug1 = n => n.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
const asCard = (a, j) => `<article class="as-card" style="--j:${j}"><div class="as-top"><h4>${a.pos}</h4><span class="ago">${a.ago}</span></div>
  <div class="as-who">${img(PEOPLE(slug1(a.name)))}<b>${a.name}</b></div>${a.f.map(k => `<a class="fl ${FT[k][2]}" role="button" tabindex="0"><span class="fico">${ico(FT[k][0])}</span><span>${FT[k][1]}</span></a>`).join('')}</article>`;
function bindSee() {   // tombol See More / See Less (dipakai tab Assessments & Questions)
  document.querySelectorAll('.as-sec .see').forEach(b => b.addEventListener('click', () => {
    const sec = b.closest('.as-sec'), ex = sec.querySelector('.as-extra'), open = sec.classList.toggle('as-open');
    ex.style.maxHeight = open ? ex.scrollHeight + 'px' : '0px'; b.querySelector('span').textContent = open ? 'See Less' : 'See More';
  }));
}
function renderAssessments() {
  $('#asCols').dataset.v = 'a';
  let n = 0;
  $('#asCols').innerHTML = ASSESS.map(col => `<div class="as-col">${col.map(s => {
    const vis = s.c.slice(0, s.show), ex = s.c.slice(s.show);
    return `<section class="as-sec" style="--i:${n++}"><div class="as-h"><i class="dot"></i><h3>${s.t}</h3></div><p class="as-sub">Waiting to be examined</p>
    <div class="as-list">${vis.map(asCard).join('')}</div>${ex.length ? `<div class="as-extra"><div class="as-inner">${ex.map((a, j) => asCard(a, j)).join('')}</div></div>
    <button class="see"><span>See More</span>${ico('chevron-down')}</button>` : ''}</section>`;
  }).join('')}</div>`).join('');
  bindSee();
  afterRender();
}
/* ----- tab QUESTIONS ----- */
const Q2 = ['psych', 'take'], Q3 = ['psych', 'apt'], Q4 = ['psych', 'hr', 'sit'];
const q = (f, ...t) => t.map(x => [x, f]);
const QUEST = [   // kolom 1-4; tiap section menampilkan 2 kartu sebelum "See More"
  [{ t: 'Product Design', c: q(Q2, 'Sr. UI/UX Designer', 'Jr. UI/UX Designer', 'Product Designer', 'UI/UX Designer Intern', 'Product Designer Intern', 'Mobile UI Designer', 'Web Designer') },
   { t: 'Customer Service & Support', c: q(Q3, 'Customer Service Executive', 'Customer Experience', 'Telemarketing - GSI', 'Patient Experience - HRT', 'Customer Success Associate', 'Customer Relation Officer (Jakarta)') }],
  [{ t: 'Engineering & IT', c: q(Q2, 'Front-End Developer', 'Full Stack Developer', 'Sr. Backend Engineer', 'Jr. Software Engineer', 'Frontend Dev (React JS)', 'Application Developer', 'Mid. Full Stack Developer') },
   { t: 'Creative & Media', c: q(Q2, 'Graphic Designer', 'Videographer & Editor', 'AI Editor', 'Indo Creative Strategist', 'Social Media Specialist', 'Ads Creative Strategist', 'Brand Communications') }],
  [{ t: 'Management', c: q(Q3, 'Associate Product Management', 'Account Manager', 'Corporate Strategist', 'Business Strategy Associate', 'Senior Talent Strategy Consulting Analyst', 'Head of New Technology & Digitalization') },
   { t: 'Legal & Compliance', c: q(Q3, 'Corporate Legal Senior Officer', 'Legal Counsel', 'Jr. Associate - Corporate', 'Compliance - Corporate Risk', 'Lawyer, Marine Biodiversity Conservation', 'Principal ITGRC Program Manager') }],
  [{ t: 'Human Resources', c: q(Q4, 'Talent Acquisition Specialist', 'Human Capital', 'Human Resources Generalist', 'Human Resources Officer', 'Employee Relation Specialist Intern') },
   { t: 'Operations & Supply Chain', c: q(Q3, 'Michelin Supply Chain APAC', 'Logistic Operation', 'Logistics Technician', 'Jr. Consultant - Supply Chain & Operations', 'Supply Chain Planning Analyst (Planner)', 'Supply Chain & Engineering Consultant') }],
];
const flink = k => `<a class="fl ${FT[k][2]}" role="button" tabindex="0"><span class="fico">${ico(FT[k][0])}</span><span>${FT[k][1]}</span></a>`;
const qCard = (x, j) => `<article class="as-card q-card" style="--j:${j}"><div class="as-top"><h4>${x[0]}</h4><a class="ed" role="button" tabindex="0">Edit</a></div>
  <p class="q-lab">File Test</p>${x[1].map(flink).join('')}<p class="q-lab up">Upload File Test</p><div class="q-send"><button class="send">Send To</button></div></article>`;
function renderQuestions() {
  $('#asCols').dataset.v = 'q'; let n = 0;
  $('#asCols').innerHTML = QUEST.map(col => `<div class="as-col">${col.map(s => `<section class="as-sec q" style="--i:${n++}"><div class="as-h"><i class="dot"></i><h3>${s.t}</h3></div>
    <div class="as-list">${s.c.slice(0, 2).map(x => qCard(x, 0)).join('')}</div><div class="as-extra"><div class="as-inner">${s.c.slice(2).map((x, j) => qCard(x, j)).join('')}</div></div>
    <button class="see"><span>See More</span>${ico('chevron-down')}</button></section>`).join('')}</div>`).join('');
  bindSee(); afterRender();
}
let asView = 'a';
function setView(v) {
  if (v === asView) return; asView = v;
  $('#tabAs').classList.toggle('is-on', v === 'a'); $('#tabQ').classList.toggle('is-on', v === 'q');
  const c = $('#asCols'); c.classList.add('swap');
  setTimeout(() => { (v === 'a' ? renderAssessments : renderQuestions)(); c.classList.remove('swap'); }, 180);
}
function buildAssess() {
  $('#page-assessments').innerHTML = `<div class="card list-card jobs-card"><div class="lc-head"><h2 class="lc-title">All Assessments &amp; <span>Tests</span></h2>
    <div class="lc-tools"><button class="lc-btn is-on" id="tabAs">${ico('clipboard')}Assessments &amp; Tests</button><button class="lc-btn" id="tabQ">${ico('question')}Questions</button><button class="lc-btn">${ico('plus-circle')}Create Section</button></div></div>
    <div class="as-scroll"><div class="as-cols" id="asCols"></div></div></div>`;
  renderAssessments();
  $('#tabAs').addEventListener('click', () => setView('a')); $('#tabQ').addEventListener('click', () => setView('q'));
}

/* ===== INTERVIEWS: tooltip saat hover + popup file kandidat ===== */
const PHONES = ['+1-989-555-777','+1-989-555-318','+1-212-555-204','+1-415-555-926','+1-646-555-143','+1-310-555-672','+1-989-555-481','+1-212-555-835','+1-415-555-259','+1-646-555-760','+1-310-555-398','+1-989-555-614','+1-212-555-087','+1-415-555-523','+1-646-555-941','+1-310-555-206','+1-989-555-359','+1-212-555-748'];
const STEP_NAME = { '3/5': 'Interview User', '4/5': 'Presentation Take home test' };
const cInfo = i => { const n = INTERVIEWS[i][0], w = n.split(' '), f = w[0], l = w[w.length - 1];
  return { n, f, l, mail: `${f}.${l}`.toLowerCase() + '@gmail.com', phone: PHONES[i], plat: INT_PLATS[i] || PLATFORMS[0], slug: INT_SLUG[i] }; };
const zoomNow = () => parseFloat(appEl.style.zoom) || 1;
const tip = document.createElement('div'); tip.className = 'tip'; document.body.append(tip);
function tipPos(e) {
  const z = zoomNow(); tip.style.zoom = z; const r = tip.getBoundingClientRect();
  let x = e.clientX + 16, y = e.clientY + 20;
  if (x + r.width > innerWidth - 10) x = e.clientX - 16 - r.width;
  if (y + r.height > innerHeight - 10) y = e.clientY - 20 - r.height;
  tip.style.left = x / z + 'px'; tip.style.top = y / z + 'px';
}
const vwScrim = document.createElement('div'); vwScrim.className = 'vw-scrim'; vwScrim.innerHTML = '<div class="vw"></div>'; document.body.append(vwScrim);
let vwBtn = null;
function openFiles(i, btn) {
  const c = cInfo(i), vw = vwScrim.firstChild; vw.style.zoom = zoomNow();
  const files = [['file-pdf', `${c.f}${c.l}.pdf`, ''], ['file-behance', 'behance.net/gallery/Portfolio2026', 'behance.net/gallery/Portfolio2026'], ['link', `${c.f}${c.l}.framer.website`.toLowerCase(), `${c.f}${c.l}.framer.website`.toLowerCase()]];
  vw.innerHTML = `<button class="vw-x" aria-label="Close">${ico('close')}</button><div class="vw-head">${img(PEOPLE(c.slug))}<div><b>${c.n}</b><small>${c.mail}</small></div></div><div class="vw-rows">${files.map((f, k) => `<div class="vw-row" style="--k:${k}"><span class="vw-ic">${ico(f[0])}</span><div class="vw-box">${f[1]}</div><button class="vw-btn" data-u="${f[2]}">View</button></div>`).join('')}</div>`;
  if (document.body.classList.contains('dark')) applyIcons(); markOk();
  tip.classList.remove('show'); if (vwBtn) vwBtn.classList.remove('act'); vwBtn = btn; btn.classList.add('act');
  vwScrim.classList.add('show');
}
function closeFiles() { vwScrim.classList.remove('show'); if (vwBtn) vwBtn.classList.remove('act'); vwBtn = null; }
function bindInterviews() {
  const box = $('#intRows');
  box.addEventListener('mouseover', e => {
    const row = e.target.closest('.lc-row'), w = e.target.closest('.who'), s = e.target.closest('.stp'); if (!row || (!w && !s)) return;
    const i = +row.dataset.i, key = (w ? 'c' : 's') + i, c = cInfo(i);
    if (tip.dataset.k !== key) {
      tip.innerHTML = w ? `<div class="tip-r">${ico('phone')}<span>${c.phone}</span></div><div class="tip-r">${ico('mail')}<span>${c.mail}</span></div>`
        : `<ul><li>${STEP_NAME[INTERVIEWS[i][2]] || 'Interview User'}</li><li>Platform: ${c.plat}</li></ul>`;
      tip.dataset.k = key; if (document.body.classList.contains('dark')) applyIcons(); markOk();
    }
    tip.classList.add('show'); tipPos(e);
  });
  box.addEventListener('mousemove', e => { if (tip.classList.contains('show')) tipPos(e); });
  box.addEventListener('mouseout', e => { const t = e.target.closest('.who,.stp'); if (t && !t.contains(e.relatedTarget)) { tip.classList.remove('show'); tip.dataset.k = ''; } });
  box.addEventListener('scroll', () => { tip.classList.remove('show'); tip.dataset.k = ''; });
  box.addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (b) openFiles(+b.dataset.view, b); });
  vwScrim.addEventListener('click', e => {
    if (e.target === vwScrim || e.target.closest('.vw-x')) closeFiles();
    const u = e.target.closest('.vw-btn'); if (u && u.dataset.u) window.open('https://' + u.dataset.u, '_blank', 'noopener');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFiles(); });
}

/* ===== DECISION: klik titik 3 -> putuskan Continued / On Hold / Rejected -> kabari kandidat via WhatsApp / Gmail ===== */
const DC_OPT = [['c', 'Continued'], ['h', 'On Hold'], ['x', 'Rejected']];
const DC_CH = [['WhatsApp', 'whatsapp'], ['Gmail', 'gmail']];
const DC_ASK = 'Send an update on the status of the application:';
const dcScrim = document.createElement('div'); dcScrim.className = 'dc-scrim'; dcScrim.innerHTML = '<div class="dc" role="dialog" aria-modal="true" aria-labelledby="dcName"></div>'; document.body.append(dcScrim);
let dcKey = null, dcBtn = null, dcBusy = false;
function dcPerson(key) {      // data kandidat dari daftar Interviews ('i..') atau Resume ('r..')
  const t = key[0], i = +key.slice(1), n = (t === 'i' ? INTERVIEWS : RESUMES)[i][0], w = n.split(' '), f = w[0], l = w[w.length - 1];
  return { n, mail: `${f}.${l}`.toLowerCase() + '@gmail.com', pdf: `${f}${l}.pdf`, slug: (t === 'i' ? INT_SLUG : RES_SLUG)[i] };
}
function paintDecision(key) {      // update baris di belakang popup tanpa render ulang (animasi baris tidak mengulang)
  const d = DEC[key], k = document.querySelector(`.kebab[data-dec="${key}"]`); if (!d || !k) return;
  k.classList.remove('d-c', 'd-h', 'd-x'); k.classList.add('d-' + d.d); k.setAttribute('aria-label', 'Decision: ' + DEC_LABEL[d.d]);
  if (key[0] === 'i') { const s = k.closest('.lc-row').querySelector('[class^="st-"]'); if (s) { s.className = 'st-' + d.d; s.textContent = DEC_LABEL[d.d]; } }
}
function openDecision(key, btn) {
  const p = dcPerson(key), cur = DEC[key], dc = dcScrim.firstChild;
  dcKey = key; dcBusy = false; dc.style.zoom = zoomNow(); dc.className = 'dc' + (cur ? ' decided' : '');
  dc.innerHTML = `<button class="dc-x" aria-label="Close">${ico('close')}</button>
    <div class="dc-head">${img(PEOPLE(p.slug))}<div><b id="dcName">${p.n}</b><small>${p.mail}</small></div></div>
    <div class="dc-file">${ico('file-pdf')}<span>${p.pdf}</span></div>
    <div class="dc-opts">${DC_OPT.map(([k, t]) => `<button class="dc-opt o-${k}${cur && cur.d === k ? ' sel' : ''}" data-d="${k}">${t}</button>`).join('')}</div>
    <div class="dc-notify"><div class="dc-ni"><p>${cur && cur.via ? `Last update sent via ${cur.via}. Send another:` : DC_ASK}</p>
      <div class="dc-chs">${DC_CH.map(([t, ic], n) => `<button class="dc-ch${n ? '' : ' pri'}" data-ch="${t}"><span class="dc-chi">${ico(ic)}</span><span class="dc-cht">${t}</span></button>`).join('')}</div></div></div>`;
  if (document.body.classList.contains('dark')) applyIcons(); markOk();
  tip.classList.remove('show'); tip.dataset.k = '';
  if (dcBtn) dcBtn.classList.remove('act'); dcBtn = btn; btn.classList.add('act');
  dcScrim.classList.add('show');
  setTimeout(() => { const f = dc.querySelector('.dc-opt.sel') || dc.querySelector('.dc-opt'); if (f) f.focus({ preventScroll: true }); }, 350);
}
function closeDecision() {
  if (dcBusy || !dcScrim.classList.contains('show')) return;
  const d = DEC[dcKey], b = dcBtn; dcScrim.classList.remove('show'); dcBtn = null;
  if (b) { b.classList.remove('act'); b.focus({ preventScroll: true }); }
  if (d && !d.via) toast('Decision saved. Candidate not notified yet');      // jangan biarkan kandidat menggantung
}
function pickDecision(d) {
  const dc = dcScrim.firstChild, prev = DEC[dcKey];
  if (!prev || prev.d !== d) { DEC[dcKey] = { d, via: null }; dc.querySelector('.dc-ni p').textContent = DC_ASK; }
  dc.classList.add('decided');
  dc.querySelectorAll('.dc-opt').forEach(b => b.classList.toggle('sel', b.dataset.d === d));
  paintDecision(dcKey);
}
function sendUpdate(ch) {
  const dc = dcScrim.firstChild, b = dc.querySelector(`[data-ch="${ch}"]`), key = dcKey, p = dcPerson(key);
  dcBusy = true; dc.classList.add('sending'); b.classList.add('go'); b.querySelector('.dc-cht').textContent = 'Sending…';
  // TODO: sambungkan ke WhatsApp API / Gmail API di sini (kirim template sesuai DEC[key].d ke p.mail / nomor kandidat)
  setTimeout(() => { DEC[key].via = ch; dcBusy = false; closeDecision(); toast(`Update sent via ${ch} to ${p.n}`); }, 900);
}
function bindDecision() {
  ['#intRows', '#resRows'].forEach(s => $(s).addEventListener('click', e => { const k = e.target.closest('.kebab'); if (k && k.dataset.dec) openDecision(k.dataset.dec, k); }));
  dcScrim.addEventListener('click', e => {
    if (e.target === dcScrim || e.target.closest('.dc-x')) return closeDecision();
    if (dcBusy) return;
    const o = e.target.closest('.dc-opt'), c = e.target.closest('.dc-ch');
    if (o) pickDecision(o.dataset.d); else if (c) sendUpdate(c.dataset.ch);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDecision(); });
}

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
  buildJobs();
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

/* ===== ANALYTICS / HIRING METRICS — On Boarding Metrics (new hires bulan ke bulan, 2026) ===== */
const OB = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  hires:  [5, 7, 6, 5, 6, 5, 1, 6, 2, 7, 4, 2],      // jumlah new hires per bulan. Desember = nilai sementara (hanya untuk garis pudar), ganti dengan data asli / API
  W: 638, H: 558, x0: 52, dx: 267, top: 114, base: 317, U: 19,   // geometri kartu (px): x0 = titik kiri, dx = jarak antar bulan, top/base = garis putus-putus, U = tinggi per 1 hire
};
const obRnd = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
OB.series = (() => {      // 4 titik per bulan (mingguan) supaya garisnya berlekuk halus seperti di desain; nilai bulan tetap persis sama dengan data
  const s = [];
  for (let m = 0; m < 11; m++) { const A = OB.hires[m], B = OB.hires[m + 1];
    for (let k = 0; k < 4; k++) { const t = k / 4, e = t * t * (3 - 2 * t); s.push(A + (B - A) * e + (k ? (obRnd(m * 4 + k) - .5) * .5 * Math.min(1, Math.abs(B - A) / 2 + .3) : 0)); } }
  s.push(OB.hires[11]); return s;
})();
const obLast = OB.hires.length - 3;                          // index window terakhir (Oct - Nov - Dec)
const obVals = w => OB.series.slice(w * 4, w * 4 + 9);       // 9 titik per window: kiri .. tengah (spotlight) .. kanan (pudar)
const obClamp = t => Math.min(1, Math.max(0, t));
const obOut = t => 1 - Math.pow(1 - t, 4), obIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const obBack = t => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
const obReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const ob = { w: 0, vals: [], pct: 0, raf: 0, entering: false, el: {} };

function obInfo(w) {
  const a = OB.hires[w], b = OB.hires[w + 1], d = b - a, n = Math.abs(d), up = d >= 0, pct = Math.round(n / a * 100), M = OB.months;
  return { up, pct, m: [M[w], M[w + 1], M[w + 2]], text: d === 0
    ? `Progress toward no change from ${M[w]} to ${M[w + 1]}: the number of new hires stayed the same`
    : `Progress toward a ${pct}% ${up ? 'increase' : 'decrease'} from ${M[w]} to ${M[w + 1]}: the number of new hires ${up ? 'increased' : 'decreased'} by ${n} ${n === 1 ? 'person' : 'people'}` };
}
function obPaths(pts) {      // kurva halus (monotone cubic) lewat semua titik; garis gelap = titik 0-4, garis pudar = titik 4-8, tangen sama di titik tengah
  const n = pts.length, dx = [], m = [], t = [], f = v => v.toFixed(1);
  for (let i = 0; i < n - 1; i++) { dx[i] = pts[i + 1][0] - pts[i][0]; m[i] = (pts[i + 1][1] - pts[i][1]) / dx[i]; }
  t[0] = m[0]; t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i++) { if (m[i] === 0) { t[i] = t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b; if (s > 9) { const k = 3 / Math.sqrt(s); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; } }
  const seg = (a, b) => { let d = `M${f(pts[a][0])} ${f(pts[a][1])}`;
    for (let i = a; i < b; i++) { const h = dx[i] / 3; d += `C${f(pts[i][0] + h)} ${f(pts[i][1] + t[i] * h)} ${f(pts[i + 1][0] - h)} ${f(pts[i + 1][1] - t[i + 1] * h)} ${f(pts[i + 1][0])} ${f(pts[i + 1][1])}`; } return d; };
  return { dark: seg(0, 4), light: seg(4, 8) };
}
function obGeom(vals) {      // gambar garis, bayangan hijau (hanya kiri -> tengah), dan posisi titik dari 9 nilai
  const e = ob.el, pts = vals.map((v, i) => [OB.x0 + i * OB.dx / 4, OB.base - v * OB.U]), p = obPaths(pts);
  e.dark.setAttribute('d', p.dark); e.light.setAttribute('d', p.light);
  e.area.setAttribute('d', `${p.dark}L${pts[4][0]} ${OB.base}L${pts[0][0]} ${OB.base}Z`);
  [0, 4, 8].forEach((i, k) => e.dots[k].setAttribute('cy', pts[i][1].toFixed(1))); e.halo.setAttribute('cy', pts[4][1].toFixed(1));
}
function obStatic(w) {       // isi teks & status tombol tanpa animasi
  const e = ob.el, i = obInfo(w);
  i.m.forEach((m, k) => { e.m[k].textContent = m; }); e.desc.textContent = i.text;
  e.big.classList.toggle('up', i.up); e.big.classList.toggle('down', !i.up);
  e.svg.setAttribute('aria-label', 'New hires per month: ' + i.m.map((m, k) => w + k < 11 ? `${m} ${OB.hires[w + k]}` : '').filter(Boolean).join(', '));
  e.prev.disabled = w === 0; e.next.disabled = w === obLast;
}
function obFinishFx() {      // selesaikan efek animasi masuk (garis, bayangan, titik, garis putus-putus)
  const e = ob.el; ob.entering = false;
  e.dark.style.strokeDashoffset = 0; e.light.style.strokeDashoffset = 0; e.clipR.setAttribute('width', OB.W);
  e.dots.forEach(d => d.setAttribute('r', 6)); e.halo.style.visibility = 'visible'; e.vl.forEach(l => l.setAttribute('y2', OB.base));
}
function playAnalytics() {   // animasi masuk: garis tergambar, bayangan hijau menyapu, titik membal, angka menghitung naik
  const e = ob.el; if (!e.dark) return;
  cancelAnimationFrame(ob.raf); clearTimeout(ob.swapT); e.m.concat(e.desc).forEach(el => el.getAnimations().forEach(a => a.cancel()));
  ob.vals = obVals(ob.w); obGeom(ob.vals); obStatic(ob.w);
  const info = obInfo(ob.w), R = obReduced(), t0 = performance.now() + 280, D = 1750, x4 = OB.x0 + OB.dx;
  e.card.classList.remove('am-play'); void e.card.offsetWidth; if (!R) e.card.classList.add('am-play');
  ob.entering = true;
  const frame = now => {
    const t = R ? 1 : obClamp((now - t0) / D), dk = obOut(obClamp(t / .55)), lt = obOut(obClamp((t - .42) / .5));
    e.dark.style.strokeDashoffset = 1 - dk; e.light.style.strokeDashoffset = 1 - lt;
    e.clipR.setAttribute('width', dk < 1 ? OB.x0 + (x4 - OB.x0) * dk : OB.W);
    [t / .1, (t - .5) / .1, (t - .88) / .1].forEach((v, k) => e.dots[k].setAttribute('r', (6 * obBack(obClamp(v))).toFixed(2)));
    e.halo.style.visibility = t > .55 ? 'visible' : 'hidden';
    e.vl.forEach((l, k) => l.setAttribute('y2', OB.top + (OB.base - OB.top) * obOut(obClamp((t - k * .07) / .35))));
    ob.pct = info.pct * obOut(obClamp((t - .12) / .72)); e.num.textContent = Math.round(ob.pct);
    if (t < 1) ob.raf = requestAnimationFrame(frame); else obFinishFx();
  };
  ob.raf = requestAnimationFrame(frame);
}
function obGo(dir) {         // panah kiri/kanan: garis berubah bentuk (morph), angka menghitung ke nilai baru, teks bergeser
  const nw = ob.w + dir; if (nw < 0 || nw > obLast) return;
  if (ob.entering) obFinishFx();
  cancelAnimationFrame(ob.raf); clearTimeout(ob.swapT);
  const e = ob.el, from = ob.vals.slice(), to = obVals(nw), info = obInfo(nw), p0 = ob.pct, R = obReduced(), t0 = performance.now(), D = R ? 1 : 780;
  ob.w = nw; e.prev.disabled = nw === 0; e.next.disabled = nw === obLast;
  e.big.classList.toggle('up', info.up); e.big.classList.toggle('down', !info.up);
  const els = e.m.concat(e.desc), apply = () => obStatic(nw);
  if (R) apply();
  else {
    els.forEach(el => { el.getAnimations().forEach(a => a.cancel()); el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-dir * 16}px)` }], { duration: 130, easing: 'ease-in', fill: 'forwards' }); });
    ob.swapT = setTimeout(() => { apply(); els.forEach(el => { el.getAnimations().forEach(a => a.cancel());
      el.animate([{ opacity: 0, transform: `translateX(${dir * 16}px)` }, { opacity: 1, transform: 'none' }], { duration: 340, easing: 'cubic-bezier(.2,.8,.2,1)' }); }); }, 130);
  }
  const frame = now => {
    const t = obClamp((now - t0) / D), k = obIO(t);
    ob.vals = from.map((v, i) => v + (to[i] - v) * k); obGeom(ob.vals);
    ob.pct = p0 + (info.pct - p0) * k; e.num.textContent = Math.round(ob.pct);
    if (t < 1) ob.raf = requestAnimationFrame(frame);
  };
  ob.raf = requestAnimationFrame(frame);
}
/* ===== ANALYTICS: Overall in 30 days · Top Performance · Top Applicant Countries ===== */
SHARED.add('double-up'); SHARED.add('double-down');      // icon chevron ganda berwarna: assets/icons/double-up.svg (hijau), assets/icons/double-down.svg (merah)
const OV_TICKS = 58;                                      // jumlah garis per bar
const OV = [      // n = angka besar (counting), d = persen, dir = up|down|flat, fill = jumlah garis yang berwarna (dari 58)
  { n: 74665, label: 'Resumes Received', d: 15, dir: 'up', fill: 52 },
  { n: 72865, label: 'Rejected Resumes', d: 23, dir: 'up', fill: 38 },
  { n: 1793, label: 'Resume on Hold', d: 7, dir: 'flat', fill: 4 },
  { n: 7, label: 'Candidate Onboarding', d: 20, dir: 'down', fill: 1 },
];
const TP = [      // nilai tiap metrik: [nama, nilai, naik? 1 : turun 0]
  { name: 'Team', total: 8.7, color: '#22d46a', rows: [['Goals', 8.9, 1], ['Collaborations', 8.5, 1], ['Productivity', 8.3, 1], ['Innovation', 8.7, 1], ['Efficiency', 8.8, 1], ['Alignment', 8.5, 1], ['Accountability', 8.3, 0], ['Responsiveness', 8.7, 1], ['Communication', 8.8, 1]] },
  { name: 'Personal', total: 8.2, color: '#386be4', rows: [['Goals', 8.6, 1], ['Collaborations', 8.5, 1], ['Productivity', 8.1, 0], ['Innovation', 8.7, 1], ['Efficiency', 8.2, 0], ['Alignment', 8.3, 1], ['Accountability', 8.3, 0], ['Responsiveness', 8.5, 0], ['Communication', 8.7, 1]] },
];
const FLAG = c => `assets/flags/${c}.svg`;                 // bendera: assets/flags/<kode negara>.svg
const CT = {      // [kode bendera, nama negara, persen bar]
  World: [['us', 'United States', 91], ['ca', 'Canada', 83], ['cn', 'China', 79], ['jp', 'Japan', 73], ['gb', 'United Kingdom', 65], ['id', 'Indonesia', 53]],
  America: [['us', 'United States', 91], ['ca', 'Canada', 83], ['mx', 'Mexico', 68], ['cr', 'Costa Rica', 54], ['ar', 'Argentina', 45], ['br', 'Brazil', 36]],
  Europe: [['gb', 'United Kingdom', 75], ['de', 'Germany', 69], ['nl', 'Netherlands', 58], ['fr', 'France', 40], ['no', 'Norway', 29], ['dk', 'Denmark', 18]],
  Asia: [['cn', 'China', 65], ['jp', 'Japan', 58], ['id', 'Indonesia', 51], ['sg', 'Singapore', 40], ['kr', 'South Korea', 29], ['hk', 'Hong Kong', 18]],
  Africa: [['eg', 'Egypt', 29], ['ma', 'Morocco', 25], ['ng', 'Nigeria', 16], ['za', 'South Africa', 11], ['gh', 'Ghana', 6], ['tn', 'Tunisia', 2]],
  Australia: [['au', 'Australia', 44], ['nz', 'New Zealand', 25], ['fj', 'Fiji', 16], ['ws', 'Samoa', 2]],
};
const ovCell = (d, k) => `<div class="ov-cell k${k}" style="--d:${(.35 + k * .12).toFixed(2)}s">
  <div class="ov-bar">${Array.from({ length: OV_TICKS }, (_, i) => `<i${i < d.fill ? ' class="f"' : ''} style="--i:${i}"></i>`).join('')}</div>
  <div class="ov-num"><span data-count="${d.n}">0</span></div>
  <div class="ov-foot"><span>${d.label}</span><em class="ov-d ${d.dir}">${d.dir === 'flat' ? '<i class="ov-dash"></i>' : '<i class="ov-tri"></i>'}<span><span data-count="${d.d}">0</span>%</span></em></div></div>`;
const tpRow = ([n, v, up], i) => `<div class="tp-row" style="--i:${i}"><span class="tp-l">${n}</span><b class="tp-v" data-v="${v}">0.0</b>${ico(up ? 'double-up' : 'double-down').replace('class="ico"', 'class="ico tp-i"')}</div>`;
const tpGauge = (g, k) => `<div class="tp-g g${k}"><div class="tp-ring"><svg viewBox="0 0 266 266"><circle class="tp-track" cx="133" cy="133" r="116"/>
  <circle class="tp-arc" cx="133" cy="133" r="116" pathLength="1" transform="rotate(-90 133 133)" style="stroke:${g.color}"/></svg>
  <div class="tp-c"><b class="tp-n" data-v="${g.total}">0.0</b><span>${g.name}</span></div></div>
  <div class="tp-list">${g.rows.map(tpRow).join('')}</div></div>`;

const ct = { region: 'World', rows: [], t: 0 }, tp = { raf: 0 };
function obRestart(el, settleMs) {      // putar ulang animasi CSS (class go) tanpa transisi mundur
  clearTimeout(el._t); el.classList.add('reset'); el.classList.remove('go', 'settled'); void el.offsetWidth; el.classList.remove('reset');
  requestAnimationFrame(() => { el.classList.add('go'); el._t = setTimeout(() => el.classList.add('settled'), settleMs); });
}
function playOverall() {      // garis bar muncul berurutan lalu terisi warna, angka & persen menghitung naik, garis pembatas tergambar
  const card = $('#ovCard'); if (!card) return;
  const nums = [...card.querySelectorAll('[data-count]')];
  if (obReduced()) { nums.forEach(el => { el.textContent = fmt(+el.dataset.count); }); obRestart(card, 0); return; }
  nums.forEach(el => { el.textContent = '0'; }); obRestart(card, 3500);
  card.querySelectorAll('.ov-cell').forEach((c, k) => c.querySelectorAll('[data-count]').forEach((el, j) => countUp(el, j ? 1300 : 1800, 450 + k * 120 + (j ? 250 : 0))));
}
function playTop() {          // cincin terisi searah jarum jam, angka menghitung dari 0.0, baris metrik masuk berurutan
  const card = $('#tpCard'); if (!card) return;
  cancelAnimationFrame(tp.raf); obRestart(card, 3400);
  const R = obReduced(), arcs = [...card.querySelectorAll('.tp-arc')], ns = [...card.querySelectorAll('.tp-n')], vs = [...card.querySelectorAll('.tp-v')];
  const t0 = performance.now() + 450, END = t0 + 1600 + 250 + 9 * 70 + 1000;
  const frame = now => {
    const g = R ? 1 : obOut(obClamp((now - t0) / 1600));
    arcs.forEach((a, k) => { a.style.strokeDashoffset = 1 - TP[k].total / 10 * g; });
    ns.forEach((n, k) => { n.textContent = (TP[k].total * g).toFixed(1); });
    vs.forEach((v, i) => { const q = R ? 1 : obOut(obClamp((now - t0 - 250 - (i % 9) * 70) / 1000)); v.textContent = (+v.dataset.v * q).toFixed(1); });
    if (!R && now < END) tp.raf = requestAnimationFrame(frame);
  };
  tp.raf = requestAnimationFrame(frame);
}
function ctSet(region, mode) {      // mode: 0 langsung, 1 ganti benua (bar menyusut -> isi baru tumbuh), 2 animasi masuk halaman
  const rows = ct.rows, list = CT[region], R = obReduced(); if (R) mode = 0;
  ct.region = region; clearTimeout(ct.t);
  const fill = () => {
    rows.forEach((r, i) => { const d = list[i]; r.el.style.display = d ? '' : 'none'; if (!d) return;
      r.img.classList.remove('ok'); r.img.src = FLAG(d[0]); r.el.title = `${d[1]}: ${d[2]}%`; r.fill.dataset.p = d[2] + '%';
      r.fill.style.transition = 'none'; r.fill.style.width = '0%'; r.el.classList.remove('out'); });
    void ct.list.offsetWidth;
    rows.forEach((r, i) => { const d = list[i]; if (!d) return; r.fill.style.transition = ''; r.fill.style.transitionDelay = (mode === 2 ? .6 + i * .09 : mode ? .1 + i * .07 : 0) + 's'; r.fill.style.width = d[2] + '%'; });
  };
  if (mode === 1) { rows.forEach(r => { r.fill.style.transitionDelay = '0s'; r.fill.style.width = '0%'; r.el.classList.add('out'); }); ct.t = setTimeout(fill, 300); }
  else fill();
}
function playCountries() { const card = $('#ctCard'); if (!card) return; obRestart(card, 2600); ctSet(ct.region, 2); }
function playAnalyticsAll() {      // dipanggil saat halaman Analytics dibuka / tombol refresh
  const g = $('#page-analytics .am-grid'); if (!g) return;
  g.classList.remove('am-run'); void g.offsetWidth; if (!obReduced()) g.classList.add('am-run');
  playAnalytics(); playOverall(); playTop(); playCountries();
}
function buildAnalyticsMore(sec) {
  ct.list = sec.querySelector('#ctList');
  ct.rows = [...ct.list.children].map(el => ({ el, img: el.querySelector('.flag'), fill: el.querySelector('.ct-fill') }));
  bindDD('ctDd', v => ctSet(v || 'World', 1));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#ctDd').classList.remove('open'); });
}
function buildAnalytics() {
  const sec = document.createElement('section'); sec.className = 'page'; sec.id = 'page-analytics'; $('#page-assessments').after(sec);
  const xs = [0, 4, 8].map(i => OB.x0 + i * OB.dx / 4);
  sec.innerHTML = `<div class="card list-card"><div class="lc-head"><h2 class="lc-title">Analytics &amp; Hiring <span>Metrics</span></h2>
    <div class="lc-tools"><button class="lc-btn">${ico('calendar')}Month${ico('chevron-down')}</button></div></div>
    <div class="am-grid"><div class="am-row r1">
      <section class="am-card" id="obCard" style="--cd:0s" aria-label="On Boarding Metrics">
        <h3 class="am-title">On Boarding Metrics</h3>
        <div class="am-nav"><button id="obPrev" aria-label="Previous months">${ico('arrow-left')}</button><button id="obNext" aria-label="Next months">${ico('arrow-right')}</button></div>
        <svg class="am-svg" id="obSvg" viewBox="0 0 ${OB.W} ${OB.H}" role="img">
          <defs><linearGradient id="obFill" x1="0" y1="0" x2="0" y2="1"><stop class="am-stop" offset="0" stop-opacity=".42"/><stop class="am-stop" offset="1" stop-opacity="0"/></linearGradient>
            <clipPath id="obClip"><rect id="obClipR" x="0" y="0" width="0" height="${OB.H}"/></clipPath></defs>
          ${xs.map((x, k) => `<line class="am-vl" x1="${x}" x2="${x}" y1="${OB.top}" y2="${OB.top}"/>`).join('')}
          <path id="obArea" fill="url(#obFill)" clip-path="url(#obClip)"/>
          <path id="obLight" class="am-line l" pathLength="1"/><path id="obDark" class="am-line d" pathLength="1"/>
          <circle id="obHalo" class="am-halo" cx="${xs[1]}" r="6"/>
          ${xs.map((x, k) => `<circle class="am-dot ${k < 2 ? 'd' : 'l'}" cx="${x}" r="0"/>`).join('')}
        </svg>
        <div class="am-months"><span></span><span></span><span></span></div>
        <div class="am-big up" id="obBig"><i class="am-tri"></i><span id="obNum">0</span>%</div>
        <p class="am-desc" id="obDesc"></p>
      </section>
      <section class="am-card ov" id="ovCard" style="--cd:.08s" aria-label="Overall in 30 days">
        <h3 class="am-title">Overall in 30 days</h3>
        <div class="ov-body">${OV.map(ovCell).join('')}<i class="ov-vl"></i><i class="ov-hl"></i></div>
      </section>
    </div><div class="am-row r2">
      <section class="am-card tp" id="tpCard" style="--cd:.16s" aria-label="Top Performance">
        <h3 class="am-title">Top Performance</h3>
        <div class="tp-right"><small>+8</small><span class="stack"><img class="avatar" src="assets/img/team-1.jpg" alt=""><img class="avatar" src="assets/img/team-2.jpg" alt=""><img class="avatar" src="assets/img/team-3.jpg" alt=""><img class="avatar" src="assets/img/team-4.jpg" alt=""></span><b class="tp-team">Human Resources Team</b></div>
        ${TP.map(tpGauge).join('')}
      </section>
      <section class="am-card ct" id="ctCard" style="--cd:.24s" aria-label="Top Applicant Countries">
        <h3 class="am-title">Top Applicant Countries</h3>
        <div class="dd cn-dd" id="ctDd" data-label="World"><div class="dd-box"><button class="dd-btn" aria-haspopup="listbox"><span class="dd-label">World</span>${ico('arrow-up-right')}</button>${Object.keys(CT).map(r => `<button data-v="${r}">${r}</button>`).join('')}</div></div>
        <div class="ct-list" id="ctList">${[0, 1, 2, 3, 4, 5].map(i => `<div class="ct-row" style="--i:${i}"><img class="flag" alt=""><div class="ct-track"><i class="ct-fill"></i></div></div>`).join('')}</div>
      </section>
    </div></div></div>`;
  const q = s => sec.querySelector(s);
  Object.assign(ob.el, { card: q('#obCard'), svg: q('#obSvg'), area: q('#obArea'), dark: q('#obDark'), light: q('#obLight'), clipR: q('#obClipR'), halo: q('#obHalo'),
    dots: [...sec.querySelectorAll('.am-dot')], vl: [...sec.querySelectorAll('.am-vl')], m: [...sec.querySelectorAll('.am-months span')],
    big: q('#obBig'), num: q('#obNum'), desc: q('#obDesc'), prev: q('#obPrev'), next: q('#obNext') });
  ob.vals = obVals(0); obGeom(ob.vals); obStatic(0);
  ob.el.prev.addEventListener('click', () => obGo(-1)); ob.el.next.addEventListener('click', () => obGo(1));
  document.addEventListener('keydown', e => {      // panah keyboard kiri/kanan ganti bulan
    if (current !== 'analytics' || !/^Arrow(Left|Right)$/.test(e.key) || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    obGo(e.key === 'ArrowRight' ? 1 : -1);
  });
  buildAnalyticsMore(sec);
}

/* ===== ROUTER ===== */
const PAGES = { dashboard: 'Dashboard', resume: "Candidate's Resume", jobs: 'Job Openings', interviews: 'Interviews & Schedule', assessments: 'Assessments & Tests', analytics: 'Analytics & Hiring Metrics' };
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
    if (id === 'analytics') playAnalyticsAll();
    busy = false; history.replaceState(null, '', '#' + id);
  };
  if (animate) { busy = true; prev.style.setProperty('--dy', 22 * dir + 'px'); prev.classList.add('leaving'); setTimeout(enter, 220); } else enter();
}
function refreshPage() {
  if (current === 'dashboard') replayDashboard();
  else if (current === 'resume') renderResumes();
  else if (current === 'interviews') renderInterviews();
  else if (current === 'jobs') renderJobs();
  else if (current === 'assessments') (asView === 'a' ? renderAssessments : renderQuestions)();
  else if (current === 'analytics') playAnalyticsAll();
}

buildPages(); buildAssess(); buildAnalytics(); buildCreate(); bindInterviews(); bindDecision();
document.querySelectorAll('.nav-item[data-page]').forEach(n => n.addEventListener('click', () => showPage(n.dataset.page)));
window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));
if (PAGES[location.hash.slice(1)]) showPage(location.hash.slice(1), false);

/* ===== JAM REAL-TIME (WIB / Asia/Jakarta) — header "Wednesday, November 26 - 09.25 AM" ===== */
const CLOCK = { tz: 'Asia/Jakarta', seconds: false };          // seconds:true -> "09.25.41 AM"; ganti tz kalau mau zona waktu lain
const wibFmt = new Intl.DateTimeFormat('en-US', { timeZone: CLOCK.tz, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
const wib = () => Object.fromEntries(wibFmt.formatToParts(new Date()).filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
function tickClock() {
  const t = wib(), el = $('.hello p'), html = `${t.weekday}, <b>${t.month} ${t.day} - ${t.hour}.${t.minute}${CLOCK.seconds ? '.' + t.second : ''} ${t.dayPeriod}</b>`;
  if (el.dataset.t !== html) { el.innerHTML = html; el.dataset.t = html; }      // hanya sentuh DOM kalau teksnya berubah
}
tickClock(); setInterval(tickClock, 1000);

/* ===== NOTES (sidebar): Add Notes -> kartu hijau, bisa diketik, "/" untuk command, × untuk hapus, tersimpan di browser ===== */
const NOTE_KEY = 'cvscreening.notes', NOTE_DEF = 'New Notes';
const NOTE_MAX = 3, NOTE_H = { min: 172, max: 228 };      // maksimal jumlah catatan & rentang tinggi kartu (px); lewat batas tinggi -> teks scroll di dalam kartu
const wibDate = t => `${t.day} ${t.month.slice(0, 3)} ${t.year}, ${t.hour}.${t.minute} ${t.dayPeriod} WIB`;
const NOTE_CMD = [      // [label, teks yang disisipkan]
  ['Schedule', () => { const t = wib(); return `Schedule: ${t.weekday.slice(0, 3)}, ${wibDate(t)}`; }],
  ['To-do', () => '[ ] '],
  ['Date & time', () => wibDate(wib())],
];
let notes = []; try { notes = JSON.parse(localStorage.getItem(NOTE_KEY)) || []; } catch (e) {}
const saveNotes = () => { try { localStorage.setItem(NOTE_KEY, JSON.stringify(notes)); } catch (e) {} };
const notesBox = document.createElement('div'); notesBox.className = 'notes'; notesBox.id = 'notes'; $('.add-notes').after(notesBox);
const syncNotes = () => notesBox.classList.toggle('has', notes.length > 0);

function noteEl(n) {
  const w = document.createElement('div'); w.className = 'note-w';
  w.innerHTML = `<div class="note-i"><div class="note-pad"><article class="note"><button class="note-x" aria-label="Delete note"></button>
    <input class="note-t" maxlength="40" placeholder="${NOTE_DEF}" autocomplete="off" aria-label="Note title"><textarea class="note-b" placeholder="Press ‘/’ for commands" aria-label="Note"></textarea>
    <div class="note-menu" role="listbox"></div></article></div></div>`;
  const ti = w.querySelector('.note-t'), ta = w.querySelector('.note-b'), menu = w.querySelector('.note-menu');
  ti.value = n.t; ta.value = n.b;
  const card = w.querySelector('.note');
  w.fit = instant => {      // tinggi kartu ngikutin isi: 172px -> maks 260px
    if (instant) card.style.transition = 'none';
    ta.style.height = '0px'; const need = ta.scrollHeight; ta.style.height = '';
    card.style.height = Math.min(NOTE_H.max, Math.max(NOTE_H.min, 68 + need + 16)) + 'px';
    if (instant) { void card.offsetHeight; card.style.transition = ''; }
  };
  let items = [], sel = 0;
  const closeMenu = () => { menu.classList.remove('open'); items = []; };
  const drawMenu = () => { menu.innerHTML = items.map((c, i) => `<button type="button" role="option" class="${i === sel ? 'sel' : ''}" data-c="${NOTE_CMD.indexOf(c)}">${c[0]}</button>`).join(''); };
  const letters = s => s.toLowerCase().replace(/[^a-z]/g, '');
  const trigger = () => {      // "/" di awal baris atau setelah spasi membuka menu; huruf sesudahnya menyaring
    const m = ta.value.slice(0, ta.selectionStart).match(/(^|\s)\/([\w-]*)$/); if (!m) return closeMenu();
    items = NOTE_CMD.filter(c => letters(c[0]).startsWith(letters(m[2]))); if (!items.length) return closeMenu();
    sel = 0; drawMenu(); menu.classList.add('open');
  };
  const run = c => {
    const pos = ta.selectionStart, start = ta.value.slice(0, pos).lastIndexOf('/'), txt = c[1]();
    ta.value = ta.value.slice(0, start) + txt + ta.value.slice(pos);
    ta.setSelectionRange(start + txt.length, start + txt.length); ta.focus(); closeMenu(); n.b = ta.value; saveNotes(); w.fit();
  };
  ta.addEventListener('input', () => { n.b = ta.value; saveNotes(); w.fit(); trigger(); });
  ta.addEventListener('keydown', e => {
    if (e.key === '/') e.stopPropagation();                   // jangan ikut shortcut "/" = fokus Search
    if (!menu.classList.contains('open')) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; drawMenu(); }
    else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); run(items[sel]); }
    else if (e.key === 'Escape') { e.stopPropagation(); closeMenu(); }
  });
  ta.addEventListener('blur', () => setTimeout(closeMenu, 120));
  menu.addEventListener('mousedown', e => e.preventDefault());   // klik menu tidak membuat textarea kehilangan fokus
  menu.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (b) run(NOTE_CMD[+b.dataset.c]); });
  ti.addEventListener('input', () => { n.t = ti.value; saveNotes(); });
  ti.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); ta.focus(); } });
  w.querySelector('.note-x').addEventListener('click', () => {
    notes = notes.filter(x => x !== n); saveNotes(); w.classList.remove('in');
    setTimeout(() => { w.remove(); syncNotes(); }, 420); toast('Note deleted');
  });
  return w;
}
notes = notes.slice(0, NOTE_MAX); notes.forEach(n => { if (n.t === NOTE_DEF) n.t = ''; });      // catatan lama yang judulnya masih bawaan -> jadi placeholder
notes.forEach(n => { const w = noteEl(n); w.classList.add('in'); notesBox.append(w); w.fit(true); }); syncNotes();
if (document.fonts) document.fonts.ready.then(() => notesBox.querySelectorAll('.note-w').forEach(w => w.fit(true)));   // ukur ulang setelah font Onest termuat
$('.add-notes').addEventListener('click', () => {
  if (notes.length >= NOTE_MAX) return toast(`Maximum ${NOTE_MAX} notes`);
  const n = { t: '', b: '' }; notes.unshift(n); saveNotes();
  const w = noteEl(n); notesBox.prepend(w); syncNotes(); void w.offsetWidth; w.classList.add('in'); notesBox.scrollTop = 0;
  setTimeout(() => w.querySelector('.note-b').focus({ preventScroll: true }), 420);
});


/* ===== NAME TAG (popup kartu identitas, muncul dari profile di header) + USER CARD & LOGOUT di bawah sidebar ===== */
const ME = { name: 'Daniel O’Connor', title: 'Head of Human Resources', company: 'Company Name', work: 'Broadway, New York, USA', phone: '+1-112-998-220', join: '12/06/2015', email: 'daniel.oconnor@gmail.com',
  photo: 'assets/img/daniel-hd.jpg', qr: 'assets/img/qr.png' };         // ganti data & path gambar di sini (QR: assets/img/qr.png)
(function buildMe() {
  const profile = $('.profile'), scrim = document.createElement('div'); scrim.className = 'id-scrim'; $('.app').append(scrim);
  const rows = [['Name', ME.name], ['Place of Work', ME.work], ['Phone', ME.phone], ['Join Date', ME.join], ['Email', ME.email]];
  const pop = document.createElement('div'); pop.className = 'id-pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Name tag'); pop.setAttribute('aria-hidden', 'true');
  pop.innerHTML = `<button class="id-x" aria-label="Close"></button>
    <img class="id-photo" style="--k:0" src="${ME.photo}" alt=""><b class="id-role" style="--k:1">${ME.title}</b><span class="id-co" style="--k:2">${ME.company}</span>
    <dl class="id-info">${rows.map(([k, v], i) => `<div style="--k:${i + 1}"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <img class="id-qr" style="--k:6" src="${ME.qr}" alt="">`;
  profile.append(pop);
  const who = profile.querySelector('.who'); who.setAttribute('role', 'button'); who.setAttribute('tabindex', '0'); who.setAttribute('aria-haspopup', 'dialog'); who.setAttribute('aria-expanded', 'false');
  const chev = profile.querySelector(':scope > img.ico');      // chevron di profile: saat popup terbuka ganti ke icon chevron-up
  chev.addEventListener('error', () => { if ((chev.getAttribute('src') || '').includes('chevron-up')) { chev.src = ICON('chevron-down'); chev.classList.add('flip'); } });   // file chevron-up belum ada -> putar chevron-down
  const setChev = v => {
    chev.classList.remove('flip', 'pop'); void chev.offsetWidth; chev.classList.add('pop');
    chev.src = ICON(v ? 'chevron-up' : 'chevron-down'); if (document.body.classList.contains('dark')) applyIcons();
  };
  const open = v => {
    setChev(v); profile.classList.toggle('open', v); scrim.classList.toggle('show', v); document.body.classList.toggle('id-open', v);
    who.setAttribute('aria-expanded', v); pop.setAttribute('aria-hidden', !v);
  };
  profile.addEventListener('click', e => {
    if (e.target.closest('.btn-outline, .bell')) return;
    if (e.target.closest('.id-x')) return open(false);
    if (e.target.closest('.id-pop')) return;
    open(!profile.classList.contains('open'));
  });
  who.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(!profile.classList.contains('open')); } });
  scrim.addEventListener('click', () => open(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && profile.classList.contains('open')) open(false); });

  const me = document.createElement('div'); me.className = 'me';      // user card di dasar sidebar (tombol logout hanya tampilan, belum aktif)
  me.innerHTML = `<i class="me-line"></i><div class="me-card"><img class="avatar" src="${ME.photo}" alt=""><div><b>${ME.name}</b><small>${ME.email}</small></div>
    <button class="me-out" type="button" aria-label="Log out" aria-disabled="true" tabindex="-1">${ico('logout')}</button></div>`;
  $('#sidebar').append(me);
})();