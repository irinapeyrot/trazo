// MENÚ MOBILE
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mm-link').forEach(l =>
  l.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// REVEAL EN SCROLL
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
}, { threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// HIGHLIGHT EN NAV
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-35% 0px -35% 0px' });
document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));

// FAQ ACORDEÓN
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const body = item.querySelector('.faq-body');

    // Wrap content in sizing div on first open (needed for grid animation)
    if (!body.querySelector('.faq-inner')) {
      const inner = document.createElement('div');
      inner.className = 'faq-inner';
      while (body.firstChild) inner.appendChild(body.firstChild);
      body.appendChild(inner);
    }

    item.classList.toggle('open');
  });
});

// FORM
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-enviar');
  btn.textContent = '✓ Enviado';
  btn.style.background = '#00B5B0';
  setTimeout(() => { btn.textContent = 'Enviar'; btn.style.background = ''; this.reset(); }, 3000);
});
document.addEventListener('DOMContentLoaded', () => {

  /* CINTA */
  const tapeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('tape-slapped');
        tapeObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.tape, .tape-svc, .tape-svc-w, .tape-dark, .tape-main')
    .forEach(el => tapeObserver.observe(el));


  /* TRAZO */
  const sigObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        /* wrap each sibling SVG in the sig container */
        entry.target.querySelectorAll('path, polyline, line').forEach((path, i) => {
          const len = path.getTotalLength ? path.getTotalLength() : 600;
          path.style.strokeDasharray = len;
          path.style.strokeDashoffset = len;
          path.style.animation = `draw-sig 2s ease-out ${i * 0.15}s forwards`;
        });
        sigObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.sig-draw, .svc-scribbles > svg, .oval-outline')
    .forEach(el => sigObserver.observe(el));


  /* MARQUEE */
  /* This targets any element with class "marquee-inner" — see HTML note below */
  document.querySelectorAll('.marquee-inner').forEach(inner => {
    const track = document.createElement('div');
    track.className = 'marquee-track';
    /* clone content twice for seamless loop */
    const clone = inner.cloneNode(true);
    inner.parentNode.insertBefore(track, inner);
    track.appendChild(inner);
    track.appendChild(clone);
  });


  /* REVEAL */
  const staggerParents = document.querySelectorAll('.servicios-grid, .faqs-inner, .nosotras-content');
  staggerParents.forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });


  /* CURSOR */
  const trail = [];
  const TRAIL_COUNT = 6;

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed; pointer-events: none; z-index: 10000;
      width: ${6 + i * 1.5}px; height: ${6 + i * 1.5}px;
      border-radius: 50%;
      background: ${i % 2 === 0 ? '#00B5B0' : '#1d1d1b'};
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease;
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function animateTrail() {
    trail.forEach((dot, i) => {
      const lag = (i + 1) * 0.12;
      dot.x += (mouseX - dot.x) * (1 - lag);
      dot.y += (mouseY - dot.y) * (1 - lag);
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top  = dot.y + 'px';
      dot.el.style.opacity = 0.35 - i * 0.05;
    });
    requestAnimationFrame(animateTrail);
  })();


  /* FAQ */
  document.querySelectorAll('.faq-body').forEach(body => {
    if (!body.children[0]?.classList.contains('faq-inner')) {
      const inner = document.createElement('div');
      inner.className = 'faq-inner';
      while (body.firstChild) inner.appendChild(body.firstChild);
      body.appendChild(inner);
    }
  });

  /* CIUDAD PARALLAX */
  const skyline = document.querySelector('.skyline-wrap');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (skyline) skyline.style.transform = `translateY(${window.scrollY * 0.04}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
  /* BURGER */
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
    });
  }
});
