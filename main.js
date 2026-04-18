// Mobile menu
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mm-link').forEach(l =>
  l.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
}, { threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Active nav highlight
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

// FAQ accordion
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
    btn.setAttribute('aria-expanded', !isOpen);
  });
});

// Form submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-enviar');
  btn.textContent = '✓ Enviado';
  btn.style.background = '#00B5B0';
  setTimeout(() => { btn.textContent = 'Enviar'; btn.style.background = ''; this.reset(); }, 3000);
});
