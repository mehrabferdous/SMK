  
  
  const KEY = 'friendcharity_user';
  let currentStep = 1;
  function load() { return JSON.parse(localStorage.getItem(KEY) || 'null') }
  function save(d) { localStorage.setItem(KEY, JSON.stringify(d)) }
  function initials(f, l) { return ((f || '?')[0] + (l || '?')[0]).toUpperCase() }
  function showOnly(id) {
    ['view-signup', 'view-success', 'view-profile', 'view-edit'].forEach(v => {
      document.getElementById(v).style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).classList.remove('anim-in', 'slide-in');
    void document.getElementById(id).offsetWidth;
    document.getElementById(id).classList.add('slide-in');
  }
  function showStep(n) {
    [1, 2, 3].forEach(i => {
      document.getElementById('step' + i).style.display = i === n ? 'block' : 'none';
      const dot = document.getElementById('dot' + (i - 1));
      dot.className = 'step-dot' + (i < n ? ' done' : i === n ? ' active' : '');
    });
    const labels = ['Step 1 of 3 — Personal info', 'Step 2 of 3 — Location & demographics', 'Step 3 of 3 — Your interests'];
    document.getElementById('stepLabel').textContent = labels[n - 1];
    currentStep = n;
  }
  function validate(fields) {
    let ok = true;
    fields.forEach(({ id, fid, type }) => {
      const el = document.getElementById(id);
      const fw = document.getElementById(fid);
      let valid = el.value.trim() !== '';
      if (type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      fw.classList.toggle('has-error', !valid);
      if (!valid) ok = false;
    });
    return ok;
  }
  function goStep2() {
    if (!validate([{ id: 'fname', fid: 'f-fname' }, { id: 'lname', fid: 'f-lname' }, { id: 'email', fid: 'f-email', type: 'email' }, { id: 'phone', fid: 'f-phone' }])) return;
    showStep(2);
  }
  function goStep3() {
    if (!validate([{ id: 'dob', fid: 'f-dob' }, { id: 'gender', fid: 'f-gender' }, { id: 'country', fid: 'f-country' }])) return;
    showStep(3);
  }
  function goStepBack(n) { showStep(n) }
  function doSignup() {
    if (!validate([{ id: 'interest', fid: 'f-interest' }, { id: 'role', fid: 'f-role' }])) return;
    const data = {
      fname: document.getElementById('fname').value.trim(),
      lname: document.getElementById('lname').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      country: document.getElementById('country').value,
      city: document.getElementById('city').value.trim(),
      motivation: document.getElementById('motivation').value.trim(),
      interest: document.getElementById('interest').value,
      role: document.getElementById('role').value,
      joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    save(data);
    showOnly('view-success');
  }
  function showProfile() {
    const d = load(); if (!d) return;
    document.getElementById('avatarInitials').textContent = initials(d.fname, d.lname);
    document.getElementById('profileName').textContent = d.fname + ' ' + d.lname;
    document.getElementById('profileRole').textContent = d.role || 'Member';
    document.getElementById('profileBadge').textContent = d.interest ? d.interest + ' Supporter' : 'Member';
    const grid = document.getElementById('infoGrid');
    const items = [
      ['Email', d.email], ['Phone', d.phone],
      ['Country', d.country], ['City', d.city || '—'],
      ['Gender', d.gender], ['Joined', d.joined],
      ['Interested in', '<span class="tag">' + d.interest + '</span>'],
      ['Motivation', d.motivation || '—']
    ];
    grid.innerHTML = items.map(([l, v]) => `<div class="info-cell"><div class="lbl">${l}</div><div class="val">${v}</div></div>`).join('');
    showOnly('view-profile');
  }
  function showEdit() {
    const d = load(); if (!d) return;
    ['fname', 'lname', 'phone', 'city', 'motivation'].forEach(k => {
      const el = document.getElementById('e-' + k); if (el) el.value = d[k] || '';
    });
    ['interest', 'role'].forEach(k => {
      const el = document.getElementById('e-' + k);
      if (el) [...el.options].forEach(o => o.selected = o.value === d[k]);
    });
    showOnly('view-edit');
  }
  function saveEdit() {
    const d = load() || {};
    d.fname = document.getElementById('e-fname').value.trim() || d.fname;
    d.lname = document.getElementById('e-lname').value.trim() || d.lname;
    d.phone = document.getElementById('e-phone').value.trim() || d.phone;
    d.city = document.getElementById('e-city').value.trim();
    d.interest = document.getElementById('e-interest').value;
    d.role = document.getElementById('e-role').value;
    d.motivation = document.getElementById('e-motivation').value.trim();
    save(d);
    showProfile();
  }
  function resetAll() {
    if (!confirm('Are you sure? This will clear your saved profile.')) return;
    localStorage.removeItem(KEY);
    location.reload();
  }
  (function init() {
    const d = load();
    if (d) { showProfile(); }
    else { showOnly('view-signup'); showStep(1); }
  })();
