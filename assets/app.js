/* AMS Safe City — interactions */
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Random radar blips
  document.querySelectorAll('.radar').forEach(function (r) {
    for (var i = 0; i < 5; i++) {
      var b = document.createElement('div');
      b.className = 'blip';
      var angle = Math.random() * Math.PI * 2;
      var rad = 12 + Math.random() * 34;
      b.style.left = (50 + Math.cos(angle) * rad) + '%';
      b.style.top = (50 + Math.sin(angle) * rad) + '%';
      b.style.animation = 'pulse ' + (1.4 + Math.random() * 1.6).toFixed(2) + 's infinite';
      r.appendChild(b);
    }
  });
})();

/* ============================================================
   ENHANCED INTERACTIONS
   ============================================================ */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia('(hover: none)').matches;

  /* ---- Scroll progress bar ---- */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    var header = document.querySelector('.site-header');
    if (header) header.classList.toggle('scrolled', h.scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Cursor glow (desktop only) ---- */
  if (!touch && !reduced) {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    var gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
    window.addEventListener('mousemove', function (e) {
      gx = e.clientX; gy = e.clientY; glow.style.opacity = '1';
    });
    (function loop() {
      cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
      glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---- Animated stat counters ---- */
  function animateCount(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^(\d[\d,]*)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1].replace(/,/g, ''), 10);
    var suffix = m[2];
    if (reduced || target === 0) { el.textContent = raw; return; }
    var dur = 1400, start = performance.now();
    function tick(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else { el.textContent = raw; el.closest('.stat').classList.add('counted'); }
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat .num').forEach(function (n) { cObs.observe(n); });
  }

  /* ---- 3D tilt on product cards ---- */
  if (!touch && !reduced) {
    document.querySelectorAll('.pcard').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (px * 8).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-py * 8).toFixed(2) + 'deg');
      });
      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ---- Magnetic buttons ---- */
  if (!touch && !reduced) {
    document.querySelectorAll('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        b.style.transform = 'translate(' + (mx * 0.18).toFixed(1) + 'px,' + (my * 0.25).toFixed(1) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  /* ---- Button ripple ---- */
  document.querySelectorAll('.btn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      var r = b.getBoundingClientRect();
      var span = document.createElement('span');
      span.className = 'ripple';
      var size = Math.max(r.width, r.height);
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - r.left - size / 2) + 'px';
      span.style.top = (e.clientY - r.top - size / 2) + 'px';
      b.appendChild(span);
      setTimeout(function () { span.remove(); }, 600);
    });
  });

  /* ---- Subtle hero parallax on scanline + grid ---- */
  if (!reduced) {
    var hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        if (y < 900) hero.style.backgroundPosition = '0 ' + (y * 0.15) + 'px';
      }, { passive: true });
    }
  }

  /* ---- Boot sequence (home page only, once per session) ---- */
  var isHome = !!document.querySelector('.hero');
  var seen = false;
  try { seen = sessionStorage.getItem('ams_booted') === '1'; } catch (e) {}
  if (isHome && !seen && !reduced) {
    var boot = document.createElement('div');
    boot.id = 'boot';
    boot.innerHTML =
      '<div class="boot-inner">' +
        '<div class="boot-mark"><span></span></div>' +
        '<div class="boot-title">AMS&nbsp;Safe&nbsp;City</div>' +
        '<div class="boot-log"></div>' +
        '<div class="boot-bar"><i></i></div>' +
      '</div>';
    document.body.appendChild(boot);
    var logEl = boot.querySelector('.boot-log');
    var lines = [
      ['Initializing intelligence layer', 'OK'],
      ['Linking camera nodes', 'OK'],
      ['Loading AI modules · 11', 'OK'],
      ['Securing on-premise channel', 'ONLINE']
    ];
    lines.forEach(function (ln, i) {
      var d = document.createElement('div');
      d.style.animationDelay = (i * 0.28) + 's';
      d.innerHTML = '<span>&gt; ' + ln[0] + '</span><b>' + ln[1] + '</b>';
      logEl.appendChild(d);
    });
    setTimeout(function () {
      boot.classList.add('done');
      try { sessionStorage.setItem('ams_booted', '1'); } catch (e) {}
      setTimeout(function () { boot.remove(); }, 700);
    }, 1650);
  }
})();
