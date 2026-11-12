/* ============================================================
   Outlet Fortaleza — configuração e catálogo
   Edite os dados abaixo para personalizar a loja.
   ============================================================ */
const CONFIG = {
  whatsapp: '5585900000000', // DDI + DDD + número, só dígitos (substitua pelo número real)
  pixDiscount: 0.05,         // 5% OFF no Pix
  maxInstallments: 6,
};

const CATEGORIES = [
  { id: 'feminino', name: 'Feminino', icon: '👗', color: '#ffe3ec' },
  { id: 'masculino', name: 'Masculino', icon: '👔', color: '#e2f1fb' },
  { id: 'calcados', name: 'Calçados', icon: '👟', color: '#fff1d6' },
  { id: 'praia', name: 'Moda Praia', icon: '🩱', color: '#d9f6f2' },
  { id: 'infantil', name: 'Infantil', icon: '🧸', color: '#f0e7ff' },
  { id: 'acessorios', name: 'Acessórios', icon: '🕶️', color: '#f1f1f1' },
];

const PRODUCTS = [
  { id: 1, name: 'Vestido Midi Linho', brand: 'Marca A', category: 'feminino', icon: '👗', price: 129.9, oldPrice: 299.9 },
  { id: 2, name: 'Camisa Social Slim', brand: 'Marca B', category: 'masculino', icon: '👔', price: 89.9, oldPrice: 219.9 },
  { id: 3, name: 'Tênis Running Pro', brand: 'Marca C', category: 'calcados', icon: '👟', price: 249.9, oldPrice: 599.9 },
  { id: 4, name: 'Biquíni Estampado Iracema', brand: 'Marca D', category: 'praia', icon: '👙', price: 69.9, oldPrice: 159.9 },
  { id: 5, name: 'Óculos de Sol Aviador', brand: 'Marca E', category: 'acessorios', icon: '🕶️', price: 119.9, oldPrice: 349.9 },
  { id: 6, name: 'Conjunto Infantil Verão', brand: 'Marca F', category: 'infantil', icon: '🧸', price: 49.9, oldPrice: 119.9 },
  { id: 7, name: 'Bermuda Sarja Masculina', brand: 'Marca B', category: 'masculino', icon: '🩳', price: 69.9, oldPrice: 159.9 },
  { id: 8, name: 'Sandália Rasteira Couro', brand: 'Marca G', category: 'calcados', icon: '🩴', price: 59.9, oldPrice: 139.9 },
  { id: 9, name: 'Bolsa Tiracolo Palha', brand: 'Marca H', category: 'acessorios', icon: '👜', price: 99.9, oldPrice: 259.9 },
  { id: 10, name: 'Saída de Praia Crochê', brand: 'Marca D', category: 'praia', icon: '🩱', price: 89.9, oldPrice: 199.9 },
  { id: 11, name: 'Blusa Cropped Ribana', brand: 'Marca A', category: 'feminino', icon: '👚', price: 39.9, oldPrice: 99.9 },
  { id: 12, name: 'Boné Aba Curva', brand: 'Marca C', category: 'acessorios', icon: '🧢', price: 49.9, oldPrice: 129.9 },
];

/* ============================================================ */

const $ = (sel) => document.querySelector(sel);
const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const off = (p) => Math.round((1 - p.price / p.oldPrice) * 100);
const catOf = (id) => CATEGORIES.find((c) => c.id === id);

const state = { category: 'todos', query: '', sort: 'destaque', cart: loadCart() };

function loadCart() {
  try { return JSON.parse(localStorage.getItem('of-cart')) || {}; } catch { return {}; }
}
function saveCart() {
  try { localStorage.setItem('of-cart', JSON.stringify(state.cart)); } catch { /* sem storage */ }
}

/* ---------- Categorias e filtros ---------- */
function renderCategories() {
  $('#categories').innerHTML = CATEGORIES.map((c) => `
    <button class="category" data-cat="${c.id}" style="background:${c.color}">
      <span class="category__icon">${c.icon}</span><strong>${c.name}</strong>
    </button>`).join('');

  $('#filters').innerHTML = [{ id: 'todos', name: 'Todos' }, ...CATEGORIES].map((c) => `
    <button class="chip ${state.category === c.id ? 'is-active' : ''}" data-cat="${c.id}">${c.name}</button>`).join('');
}

function setCategory(id, scroll) {
  state.category = id;
  renderCategories();
  renderProducts();
  if (scroll) $('#ofertas').scrollIntoView({ behavior: 'smooth' });
}

/* ---------- Produtos ---------- */
function filteredProducts() {
  const q = state.query.trim().toLowerCase();
  let list = PRODUCTS.filter((p) =>
    (state.category === 'todos' || p.category === state.category) &&
    (!q || `${p.name} ${p.brand}`.toLowerCase().includes(q)));

  const sorters = {
    menor: (a, b) => a.price - b.price,
    maior: (a, b) => b.price - a.price,
    desconto: (a, b) => off(b) - off(a),
  };
  if (sorters[state.sort]) list = [...list].sort(sorters[state.sort]);
  return list;
}

function renderProducts() {
  const list = filteredProducts();
  $('#empty').hidden = list.length > 0;
  $('#products').innerHTML = list.map((p) => `
    <article class="product">
      <div class="product__media" style="background:${catOf(p.category).color}">
        <span class="product__off">-${off(p)}%</span>${p.icon}
      </div>
      <div class="product__body">
        <span class="product__brand">${p.brand}</span>
        <h3 class="product__name">${p.name}</h3>
        <div class="product__prices">
          <span class="product__price">${brl(p.price)}</span>
          <span class="product__old">${brl(p.oldPrice)}</span>
        </div>
        <span class="product__inst">ou ${CONFIG.maxInstallments}x de ${brl(p.price / CONFIG.maxInstallments)} sem juros</span>
        <button class="btn btn--primary" data-add="${p.id}">Adicionar à sacola</button>
      </div>
    </article>`).join('');
}

/* ---------- Sacola ---------- */
function cartEntries() {
  return Object.entries(state.cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((e) => e.product && e.qty > 0);
}

function cartTotal() {
  return cartEntries().reduce((sum, e) => sum + e.product.price * e.qty, 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((n, e) => n + e.qty, 0);
  const total = cartTotal();

  $('#cartCount').textContent = count;
  $('#cartTotal').textContent = brl(total);
  $('#cartPix').textContent = total ? `ou ${brl(total * (1 - CONFIG.pixDiscount))} no Pix (${CONFIG.pixDiscount * 100}% OFF)` : '';
  $('#checkout').disabled = !count;

  $('#cartItems').innerHTML = entries.length
    ? entries.map(({ product: p, qty }) => `
      <div class="cart-item">
        <div class="cart-item__icon" style="background:${catOf(p.category).color}">${p.icon}</div>
        <div>
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__price">${brl(p.price)}</div>
        </div>
        <div class="qty">
          <button data-dec="${p.id}" aria-label="Diminuir">−</button>
          <span>${qty}</span>
          <button data-inc="${p.id}" aria-label="Aumentar">+</button>
        </div>
      </div>`).join('')
    : '<p class="cart__empty">Sua sacola está vazia 🛍️</p>';
}

function changeQty(id, delta) {
  const qty = (state.cart[id] || 0) + delta;
  if (qty <= 0) delete state.cart[id]; else state.cart[id] = qty;
  saveCart();
  renderCart();
}

function toggleCart(open) {
  $('#cart').classList.toggle('is-open', open);
  $('#cart').setAttribute('aria-hidden', String(!open));
  $('#overlay').hidden = !open;
}

function checkout() {
  const lines = cartEntries().map((e) => `• ${e.qty}x ${e.product.name} (${e.product.brand}) — ${brl(e.product.price * e.qty)}`);
  const msg = `Olá, Outlet Fortaleza! Quero fazer este pedido:\n\n${lines.join('\n')}\n\nTotal: ${brl(cartTotal())}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

/* ---------- Utilidades ---------- */
let toastTimer;
function toast(text) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2200);
}

/* ---------- Eventos ---------- */
document.addEventListener('click', (e) => {
  const t = e.target.closest('button, a');
  if (!t) return;
  if (t.dataset.cat) setCategory(t.dataset.cat, t.classList.contains('category'));
  if (t.dataset.add) { changeQty(Number(t.dataset.add), 1); toast('Adicionado à sacola ✔'); }
  if (t.dataset.inc) changeQty(Number(t.dataset.inc), 1);
  if (t.dataset.dec) changeQty(Number(t.dataset.dec), -1);
  if (t.closest('#nav') && t.tagName === 'A') $('#nav').classList.remove('is-open');
});

$('#search').addEventListener('input', (e) => { state.query = e.target.value; renderProducts(); });
$('#sort').addEventListener('change', (e) => { state.sort = e.target.value; renderProducts(); });
$('#cartOpen').addEventListener('click', () => toggleCart(true));
$('#cartClose').addEventListener('click', () => toggleCart(false));
$('#overlay').addEventListener('click', () => toggleCart(false));
$('#checkout').addEventListener('click', checkout);
$('#menuBtn').addEventListener('click', () => $('#nav').classList.toggle('is-open'));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleCart(false); });
$('#newsletter').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
  toast('Cupom enviado! Confira seu e-mail 🎉');
});

$('#whatsFloat').href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Olá, Outlet Fortaleza! Gostaria de mais informações.')}`;
$('#year').textContent = new Date().getFullYear();

renderCategories();
renderProducts();
renderCart();
