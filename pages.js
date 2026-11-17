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

/* ===== ROUTER ===== */
const PAGES = { dashboard: 'Dashboard', resume: "Candidate's Resume", jobs: 'Job Openings', interviews: 'Interviews & Schedule', assessments: 'Assessments & Tests' };
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
  else if (current === 'jobs') renderJobs();
  else if (current === 'assessments') (asView === 'a' ? renderAssessments : renderQuestions)();
}

buildPages(); buildAssess(); buildCreate();
document.querySelectorAll('.nav-item[data-page]').forEach(n => n.addEventListener('click', () => showPage(n.dataset.page)));
window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));
if (PAGES[location.hash.slice(1)]) showPage(location.hash.slice(1), false);