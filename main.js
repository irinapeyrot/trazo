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
