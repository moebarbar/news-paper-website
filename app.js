/* =========================================================
   THE BROADSIDE TRIBUNE — interactions
   ========================================================= */

// ----- Live dateline -----------------------------------------
(function () {
  const el = document.querySelector('.dateline .left span:nth-child(2)');
  if (!el) return;
  const now    = new Date();
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  el.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
})();

// ----- Funnies anchor (comics live inside #obit) --------------
(function () {
  const obits = document.querySelector('.obit-row');
  if (obits && !document.getElementById('funnies')) {
    const anchor    = document.createElement('span');
    anchor.id       = 'funnies';
    anchor.setAttribute('aria-hidden', 'true');
    obits.insertAdjacentElement('beforebegin', anchor);
  }
})();

// ----- Smooth scroll nav + active highlight ------------------
(function () {
  const nav   = document.getElementById('nav');
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

// ----- Reveal on scroll --------------------------------------
(function () {
  const els = document.querySelectorAll('section, .fold');
  els.forEach(e => e.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(e => io.observe(e));
})();

// ----- Seamless ticker (RAF, timestamp-normalised) -----------
(function () {
  const ticker = document.querySelector('.ticker');
  const track  = document.querySelector('.ticker-track');
  if (!track || !ticker) return;

  const setup = () => {
    // Disable CSS animation and remove padding offset
    track.style.animation    = 'none';
    track.style.paddingLeft  = '0';
    track.style.willChange   = 'transform';

    // Clone existing spans to create a seamless second copy
    Array.from(track.children).forEach(child => {
      track.appendChild(child.cloneNode(true));
    });

    const halfW      = track.scrollWidth / 2;   // width of one copy
    const containerW = ticker.clientWidth;
    let pos          = containerW;               // start off-screen right
    let lastTime     = 0;
    const speed      = 80;                       // px / second

    function tick(t) {
      const dt = lastTime ? Math.min((t - lastTime) / 1000, 0.1) : 0;
      lastTime = t;
      pos -= speed * dt;
      if (pos < -halfW) pos += halfW;            // seamless reset — copy 2 = copy 1
      track.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  // Wait for fonts so scrollWidth measurements are accurate
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(setup);
})();

// ----- Crossword grid ----------------------------------------
(function () {
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

  const inputs = [];

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const k    = r + ',' + c;
      const cell = document.createElement('div');
      cell.className = 'cw-cell' + (black.has(k) ? ' black' : '');

      if (!black.has(k)) {
        if (nums[k]) {
          const num = document.createElement('span');
          num.className   = 'n';
          num.textContent = nums[k];
          cell.appendChild(num);
        }
        const inp = document.createElement('input');
        inp.maxLength = 1;
        inp.setAttribute('aria-label', `cell ${r}-${c}`);
        cell.appendChild(inp);
        inputs.push(inp);
      }

      grid.appendChild(cell);
    }
  }

  inputs.forEach((inp, i) => {
    inp.addEventListener('input', () => {
      inp.value = inp.value.toUpperCase().replace(/[^A-Z]/g, '');
      if (inp.value && inputs[i + 1]) inputs[i + 1].focus();
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !inp.value && inputs[i - 1]) inputs[i - 1].focus();
    });
  });
})();

// ----- Tweaks panel + toggle button --------------------------
(function () {
  const panel = document.getElementById('tweaks');
  const root  = document.documentElement;

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
    const s = SPOTS[state.spot]   || SPOTS.red;
    root.style.setProperty('--paper',      p.paper);
    root.style.setProperty('--paper-deep', p.deep);
    root.style.setProperty('--ink',        p.ink);
    root.style.setProperty('--ink-soft',   p.ink);
    root.style.setProperty('--ink-muted',  p.muted);
    root.style.setProperty('--rule',       p.ink);
    root.style.setProperty('--spot',       s.spot);
    root.style.setProperty('--spot-soft',  s.soft);
    root.style.setProperty('--f-headline', HEADLINES[state.headline]);
    root.style.setProperty('--f-masthead', MASTHEADS[state.masthead]);
    root.style.setProperty('--col-count',  state.cols);
    root.style.setProperty('--grain',      (state.texture / 100).toString());

    panel.querySelectorAll('.opts').forEach(opts => {
      const key = opts.dataset.tweak;
      opts.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', String(b.dataset.val) === String(state[key]));
      });
    });
    const tx  = document.getElementById('tx');
    const txv = document.getElementById('tx-val');
    if (tx)  tx.value        = state.texture;
    if (txv) txv.textContent = state.texture + '%';
  }

  // Wire tweak buttons
  panel.querySelectorAll('.opts').forEach(opts => {
    opts.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      state[opts.dataset.tweak] = btn.dataset.val;
      apply();
      persist();
    });
  });

  const tx = document.getElementById('tx');
  if (tx) {
    tx.addEventListener('input',  () => { state.texture = parseInt(tx.value, 10); apply(); });
    tx.addEventListener('change', () => persist());
  }

  // Toggle button — the missing "Press Room" trigger
  const toggleBtn       = document.createElement('button');
  toggleBtn.className   = 'tweaks-toggle';
  toggleBtn.textContent = '⚙ Press Room';
  toggleBtn.setAttribute('aria-label', 'Open print tweaks panel');
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!panel.contains(e.target) && e.target !== toggleBtn) {
      panel.classList.remove('open');
    }
  });

  function persist() {
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { ...state } }, '*'); } catch (_) {}
  }

  window.addEventListener('message', e => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode')   panel.classList.add('open');
    if (d.type === '__deactivate_edit_mode') panel.classList.remove('open');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}

  apply();
})();

// ----- Reading progress bar ----------------------------------
(function () {
  const bar     = document.createElement('div');
  bar.id        = 'progress-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  function update() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ----- Back to top -------------------------------------------
(function () {
  const btn     = document.createElement('button');
  btn.className = 'back-to-top';
  btn.textContent = '▲';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ----- Classified ads hover ----------------------------------
document.querySelectorAll('.ad').forEach(ad => {
  ad.addEventListener('mouseenter', () => { ad.style.transform = 'translate(-1px,-1px)'; });
  ad.addEventListener('mouseleave', () => { ad.style.transform = ''; });
});
