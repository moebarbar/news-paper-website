/* =========================================================
   THE BROADSIDE TRIBUNE — interactions
   ========================================================= */

// ----- Smooth scroll nav + active highlight --------------
(function () {
  const nav = document.getElementById('nav');
  const links = Array.from(nav.querySelectorAll('a'));
  links.forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
    });
  });

  const sections = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  function highlight() {
    const y = window.scrollY + 120;
    let active = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) active = s; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active.id));
  }
  window.addEventListener('scroll', highlight, { passive: true });
  highlight();
})();

// ----- Reveal on scroll -------------------------------------
(function () {
  const els = document.querySelectorAll('section, .fold');
  els.forEach(e => e.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.08 });
  els.forEach(e => io.observe(e));
})();

// ----- Crossword grid --------------------------------------
(function () {
  // Build a stylized 10x10 grid with a few black squares — puzzle-style decoration
  const grid = document.getElementById('cwgrid');
  if (!grid) return;
  const black = new Set([
    '0,3','0,7','1,3','1,7','2,0','2,5','3,5','3,9',
    '4,2','4,6','5,3','5,7','6,0','6,4','7,4','7,9',
    '8,2','8,6','9,2','9,6'
  ]);
  const nums = {
    '0,0':1,'0,1':2,'0,2':3,'0,4':4,'0,5':5,'0,6':6,'0,8':7,'0,9':8,
    '2,1':9,'2,6':10,'4,0':11,'4,3':12,'5,0':13,'6,1':14,'6,5':15,'8,0':16
  };
  let html = '';
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const k = r + ',' + c;
      if (black.has(k)) {
        html += `<div class="cw-cell black"></div>`;
      } else {
        const n = nums[k] ? `<span class="n">${nums[k]}</span>` : '';
        html += `<div class="cw-cell">${n}<input maxlength="1" aria-label="cell ${r}-${c}"></div>`;
      }
    }
  }
  grid.innerHTML = html;
  // auto-advance focus
  const inputs = grid.querySelectorAll('input');
  inputs.forEach((inp, i) => {
    inp.addEventListener('input', () => {
      inp.value = inp.value.toUpperCase().replace(/[^A-Z]/g, '');
      if (inp.value && inputs[i + 1]) inputs[i + 1].focus();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && inputs[i - 1]) inputs[i - 1].focus();
    });
  });
})();

// ----- Tweaks panel ----------------------------------------
(function () {
  const panel = document.getElementById('tweaks');
  const root = document.documentElement;
  const paper = document.getElementById('paper');

  // DEFAULT state — persisted via EDITMODE markers
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "paper": "cream",
    "spot": "red",
    "headline": "playfair",
    "masthead": "fraktur",
    "cols": "2",
    "texture": 22
  }/*EDITMODE-END*/;

  const state = { ...DEFAULTS };

  const PAPERS = {
    cream: { paper: '#f1e6c9', deep: '#e8dcb8', ink: '#24180c', muted: '#6b5538' },
    white: { paper: '#f7f3ea', deep: '#ebe4d1', ink: '#1c1810', muted: '#6b5f45' },
    tan:   { paper: '#e7d2a3', deep: '#d9c088', ink: '#2a1d0a', muted: '#7a5c2a' },
    grey:  { paper: '#d9d2c4', deep: '#c7c0b1', ink: '#1e1a14', muted: '#575146' }
  };
  const SPOTS = {
    red:   { spot: '#a2361a', soft: '#c15a3a' },
    blue:  { spot: '#1f406a', soft: '#3b6693' },
    black: { spot: '#24180c', soft: '#3a2a18' },
    green: { spot: '#3d5a30', soft: '#5e8049' }
  };
  const HEADLINES = {
    playfair: `"Playfair Display", serif`,
    oldstd:   `"Old Standard TT", serif`,
    dmserif:  `"DM Serif Display", serif`,
    abril:    `"Abril Fatface", serif`
  };
  const MASTHEADS = {
    fraktur: `"UnifrakturCook", "Playfair Display", serif`,
    classic: `"Old Standard TT", serif`,
    modern:  `"Abril Fatface", "DM Serif Display", serif`
  };

  function apply() {
    const p = PAPERS[state.paper] || PAPERS.cream;
    const s = SPOTS[state.spot] || SPOTS.red;
    root.style.setProperty('--paper', p.paper);
    root.style.setProperty('--paper-deep', p.deep);
    root.style.setProperty('--ink', p.ink);
    root.style.setProperty('--ink-soft', p.ink);
    root.style.setProperty('--ink-muted', p.muted);
    root.style.setProperty('--rule', p.ink);
    root.style.setProperty('--spot', s.spot);
    root.style.setProperty('--spot-soft', s.soft);
    root.style.setProperty('--f-headline', HEADLINES[state.headline]);
    root.style.setProperty('--f-masthead', MASTHEADS[state.masthead]);
    root.style.setProperty('--col-count', state.cols);
    root.style.setProperty('--grain', (state.texture / 100).toString());

    // update active buttons
    panel.querySelectorAll('.opts').forEach(opts => {
      const key = opts.dataset.tweak === 'cols' ? 'cols' :
                  opts.dataset.tweak === 'masthead' ? 'masthead' :
                  opts.dataset.tweak === 'headline' ? 'headline' :
                  opts.dataset.tweak === 'paper' ? 'paper' :
                  opts.dataset.tweak === 'spot' ? 'spot' : null;
      opts.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', String(b.dataset.val) === String(state[key]));
      });
    });
    const tx = document.getElementById('tx');
    const txv = document.getElementById('tx-val');
    if (tx) tx.value = state.texture;
    if (txv) txv.textContent = state.texture + '%';
  }

  // wire buttons
  panel.querySelectorAll('.opts').forEach(opts => {
    opts.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const key = opts.dataset.tweak;
      state[key] = btn.dataset.val;
      apply();
      persist();
    });
  });
  const tx = document.getElementById('tx');
  if (tx) {
    tx.addEventListener('input', () => {
      state.texture = parseInt(tx.value, 10);
      apply();
    });
    tx.addEventListener('change', () => persist());
  }

  function persist() {
    try {
      window.parent.postMessage({
        type: '__edit_mode_set_keys',
        edits: { ...state }
      }, '*');
    } catch (e) {}
  }

  // Edit-mode protocol
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') panel.classList.add('open');
    if (d.type === '__deactivate_edit_mode') panel.classList.remove('open');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}

  apply();
})();

// ----- Tiny hover animation on classified ads ---------------
document.querySelectorAll('.ad').forEach(ad => {
  ad.addEventListener('mouseenter', () => ad.style.transform = 'translate(-1px,-1px)');
  ad.addEventListener('mouseleave', () => ad.style.transform = '');
});
