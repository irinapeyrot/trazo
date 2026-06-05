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

    // Wrap content in sizing div on first open
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
// ═══════════════════════════════════════════════════════════════
// DATOS DE SERVICIOS — pop-up content
// ═══════════════════════════════════════════════════════════════
const SERVICE_DATA = {
  branding: {
    tag: 'Identidad Visual',
    title: 'Branding',
    desc: '<Le damos vida, voz y personalidad a tu marca para que no sea una más del montón. No es solo un logo lindo; es armar toda la identidad visual y la estrategia para que tu negocio conecte de verdad con la gente, transmita tus valores y se plante con personalidad en el mercado.>',
    items: [
      '<Estrategia de marca y ADN conceptual>',
      '<Diseño de logotipo, isotipo y sistema visual>',
      '<Paleta de color y universo tipográfico>',
      '<Manual de identidad (la guía para no meter la pata)>',
      '<Aplicaciones de marca (papelería, firmas, plantillas)>'
    ]
  },
  motion: {
    tag: 'Animación',
    title: 'Motion Graphics',
    desc: '<Hoy todo el mundo scrollea a mil por hora. Con la animación logramos que tus mensajes cobren vida, retengan la atención y expliquen conceptos complejos de forma dinámica, divertida y súper visual.>',
    items: [
      '<Animación de logotipos>',
      '<Cortinas, transiciones y títulos animados>',
      '<Contenido dinámico para redes>',
      '<Gifs y stickers animados personalizados>'
    ]
  },
  packaging: {
    tag: 'Diseño de Producto',
    title: 'Packaging',
    desc: '<El diseño de empaque es el primer contacto real que el cliente tiene con tu producto. Hacemos que tu producto entre por los ojos antes de que lo saquen del empaque.>',
    items: [
      '<Diseño de envases, cajas y bolsas a medida>',
      '<Etiquetas para productos y botellas>',
      '<Troqueles y estructura del empaque>',
      '<Selección de materiales y acabados especiales>',
      '<Diseño de fajas, stickers y detalles de unboxing>'
    ]
  },
  web: {
    tag: 'Digital',
    title: 'Diseño Web & UX/UI',
    desc: '<Diseñamos experiencias digitales pensadas para el usuario. Páginas web e interfaces que son intuitivas, cargan rápido, se ven increíbles en el celular y, lo más importante, guían al cliente para que termine comprando o contactándote.>',
    items: [
      '<Diseño de sitios web institucionales y porfolios>',
      '<E-commerce y tiendas online a medida>',
      '<Diseño de interfaces para aplicaciones (UI)>',
      '<Investigación de usuario y arquitectura de información (UX)>'
      '<Prototipado interactivo y diseño completamente responsive>'
    ]
  }
};
 
// ═══════════════════════════════════════════════════════════════
// CART STATE
// ═══════════════════════════════════════════════════════════════
let cart = [];
let orders = JSON.parse(localStorage.getItem('trazo_orders') || '[]');
 
function saveOrders() {
  localStorage.setItem('trazo_orders', JSON.stringify(orders));
}
 
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
 
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartCount');
  badge.textContent = total;
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 400);
}
 
// ═══════════════════════════════════════════════════════════════
// MODAL HELPERS
// ═══════════════════════════════════════════════════════════════
function openModal(id) {
  const m = document.getElementById(id);
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const m = document.getElementById(id);
  m.classList.remove('open');
  if (!document.querySelector('.modal-overlay.open')) {
    document.body.style.overflow = '';
  }
}
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}
 
// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAllModals();
  });
});
// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});
 
// ═══════════════════════════════════════════════════════════════
// SERVICE MODAL
// ═══════════════════════════════════════════════════════════════
document.querySelectorAll('.servicio-item').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.dataset.service;
    const data = SERVICE_DATA[key];
    if (!data) return;
    document.getElementById('serviceModalTag').textContent   = data.tag;
    document.getElementById('serviceModalTitle').textContent = data.title;
    document.getElementById('serviceModalDesc').textContent  = data.desc;
    const list = document.getElementById('serviceModalList');
    list.innerHTML = data.items.map(i => `<li>${i}</li>`).join('');
    openModal('serviceModal');
  });
});
document.getElementById('closeServiceModal').addEventListener('click', () => closeModal('serviceModal'));
 
// ═══════════════════════════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════════════════════════
let currentProduct = null;
let currentQty = 1;
 
document.querySelectorAll('.merch-card').forEach(card => {
  card.addEventListener('click', () => {
    currentProduct = {
      id:    card.dataset.id,
      name:  card.dataset.name,
      price: parseFloat(card.dataset.price) || 0,
      desc:  card.dataset.desc,
      img:   card.dataset.img
    };
    currentQty = 1;
 
    document.getElementById('modalProductName').textContent  = currentProduct.name;
    document.getElementById('modalProductDesc').textContent  = currentProduct.desc;
    document.getElementById('modalProductPrice').textContent = `$${currentProduct.price}`;
    document.getElementById('qtyDisplay').textContent = '1';
 
    const imgEl = document.getElementById('modalProductImg');
    if (currentProduct.img) {
      imgEl.innerHTML = `<img src="${currentProduct.img}" alt="${currentProduct.name}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
      imgEl.innerHTML = currentProduct.name;
    }
 
    openModal('productModal');
  });
});
 
document.getElementById('qtyMinus').addEventListener('click', () => {
  if (currentQty > 1) { currentQty--; document.getElementById('qtyDisplay').textContent = currentQty; }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  currentQty++; document.getElementById('qtyDisplay').textContent = currentQty;
});
 
document.getElementById('btnAddToCart').addEventListener('click', () => {
  if (!currentProduct) return;
  const existing = cart.find(i => i.id === currentProduct.id);
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({ ...currentProduct, qty: currentQty });
  }
  updateCartCount();
  closeModal('productModal');
  renderCart();
 
  // Brief feedback
  const btn = document.getElementById('btnAddToCart');
  const orig = btn.textContent;
  btn.textContent = '✓ Agregado';
  setTimeout(() => { btn.textContent = orig; }, 1500);
});
 
document.getElementById('closeProductModal').addEventListener('click', () => closeModal('productModal'));
 
// ═══════════════════════════════════════════════════════════════
// CART MODAL
// ═══════════════════════════════════════════════════════════════
function renderCart() {
  const list   = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartFooter');
 
  if (cart.length === 0) {
    list.innerHTML = '<p class="cart-empty-msg">Tu carrito está vacío.</p>';
    footer.style.display = 'none';
    return;
  }
 
  footer.style.display = '';
  list.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-thumb"></div>
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-qty">Cantidad: ${item.qty}</span>
      </div>
      <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar">✕</button>
    </div>
  `).join('');
 
  document.getElementById('cartTotal').textContent = `$${getCartTotal().toFixed(2)}`;
 
  list.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart = cart.filter(i => i.id !== btn.dataset.id);
      updateCartCount();
      renderCart();
    });
  });
}
 
document.getElementById('cartNavBtn').addEventListener('click', () => {
  renderCart();
  openModal('cartModal');
});
document.getElementById('closeCartModal').addEventListener('click', () => closeModal('cartModal'));
document.getElementById('btnCheckout').addEventListener('click', () => {
  closeModal('cartModal');
  openCheckout();
});
document.getElementById('btnViewOrders').addEventListener('click', () => {
  closeModal('cartModal');
  openModal('ordersModal');
  renderOrders();
});
 
// ═══════════════════════════════════════════════════════════════
// CHECKOUT FLOW
// ═══════════════════════════════════════════════════════════════
function openCheckout() {
  // Reset to step 1
  setCheckoutStep(1);
  // Populate order summary
  const summary = document.getElementById('checkoutOrderSummary');
  summary.innerHTML = '<strong style="letter-spacing:.1em">Tu pedido:</strong><br>' +
    cart.map(i => `${i.name} × ${i.qty} — $${(i.price*i.qty).toFixed(2)}`).join('<br>') +
    `<br><strong style="color:var(--teal)">Total: $${getCartTotal().toFixed(2)}</strong>`;
  openModal('checkoutModal');
}
 
function setCheckoutStep(step) {
  [1,2,3].forEach(n => {
    document.getElementById(`checkoutPane${n}`).style.display = n === step ? '' : 'none';
    const el = document.querySelector(`.checkout-step[data-step="${n}"]`);
    el.classList.remove('active','done');
    if (n === step) el.classList.add('active');
    if (n < step)  el.classList.add('done');
  });
}
 
document.getElementById('checkoutForm1').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('chkNombre').value.trim();
  const total  = `$${getCartTotal().toFixed(2)}`;
  document.getElementById('checkoutTotalPreview').textContent = `Total a pagar: ${total}`;
  setCheckoutStep(2);
});
 
document.getElementById('checkoutBack1').addEventListener('click', () => setCheckoutStep(1));
 
// Format card input
document.getElementById('chkCard').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().substring(0,19);
});
document.getElementById('chkExp').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g,'').replace(/^(\d{2})(\d)/,'$1/$2').substring(0,5);
});
 
document.getElementById('checkoutForm2').addEventListener('submit', (e) => {
  e.preventDefault();
  // Generate order
  const orderId = 'TRZ-' + Date.now().toString(36).toUpperCase();
  const nombre  = document.getElementById('chkNombre').value.trim();
  const newOrder = {
    id:     orderId,
    date:   new Date().toLocaleDateString('es-UY', { day:'2-digit', month:'2-digit', year:'numeric' }),
    items:  cart.map(i => `${i.name} × ${i.qty}`),
    total:  getCartTotal().toFixed(2),
    status: 'procesando',
    name:   nombre
  };
  orders.unshift(newOrder);
  saveOrders();
 
  // Confirmation message
  document.getElementById('orderConfirmMsg').textContent =
    `¡Gracias, ${nombre}! Tu pedido ${orderId} por $${newOrder.total} está siendo procesado.`;
 
  cart = [];
  updateCartCount();
  setCheckoutStep(3);
});
 
document.getElementById('btnGoToOrders').addEventListener('click', () => {
  closeModal('checkoutModal');
  openModal('ordersModal');
  renderOrders();
});
document.getElementById('btnContinueShopping').addEventListener('click', () => {
  closeModal('checkoutModal');
});
document.getElementById('closeCheckoutModal').addEventListener('click', () => closeModal('checkoutModal'));
 
// ═══════════════════════════════════════════════════════════════
// ORDERS MODAL
// ═══════════════════════════════════════════════════════════════
const STATUS_LABELS = {
  procesando: 'Procesando',
  enviado:    'Enviado',
  entregado:  'Entregado'
};
 
function renderOrders() {
  const container = document.getElementById('ordersList');
  if (orders.length === 0) {
    container.innerHTML = '<p class="orders-empty">Todavía no realizaste ningún pedido.</p>';
    return;
  }
  container.innerHTML = orders.map(o => `
    <div class="order-card">
      <div class="order-card-header">
        <span class="order-card-id">${o.id}</span>
        <span class="order-card-date">${o.date}</span>
      </div>
      <div class="order-card-items">${o.items.join(' · ')}</div>
      <div class="order-card-footer">
        <span class="order-card-total">$${o.total}</span>
        <span class="order-status-badge status-${o.status}">${STATUS_LABELS[o.status] || o.status}</span>
      </div>
    </div>
  `).join('');
}
 
document.getElementById('closeOrdersModal').addEventListener('click', () => closeModal('ordersModal'));
