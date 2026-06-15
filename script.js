/* ============================================================
   script.js — Avocado Shop MVP  v3.0
   Complete rewrite with cart qty, promo codes, addresses, etc.
   ============================================================ */

/* ──────────────────────────────────────────────
   ⚙️ LIFF CONFIG — แก้ไข LIFF ID ของคุณตรงนี้
   1. ไปที่ https://developers.line.biz/console/
   2. สร้าง Channel → LINE Login → เปิดแท็บ LIFF
   3. Copy LIFF ID มาวางแทน "YOUR_LIFF_ID_HERE"
   ────────────────────────────────────────────── */
const LIFF_CONFIG = {
  liffId: typeof CONFIG !== 'undefined' ? CONFIG.LIFF_ID : "YOUR_LIFF_ID_HERE",
};

async function loadEnv() {
  if (typeof CONFIG !== 'undefined') {
    LIFF_CONFIG.liffId = CONFIG.LIFF_ID;
    return;
  }
  try {
    const isSubdir = window.location.pathname.includes('/products/');
    const configPath = isSubdir ? '../config.js' : 'config.js';
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = configPath;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    if (typeof CONFIG !== 'undefined') {
      LIFF_CONFIG.liffId = CONFIG.LIFF_ID;
    }
  } catch (e) {
    console.warn('Could not load config.js dynamically:', e);
  }
}


/* ══════════════════════════════════════════════
   PRODUCT DATA — ข้อมูลต้นอโวคาโดทั้งหมด 13 สายพันธุ์
   ══════════════════════════════════════════════ */
let PRODUCTS = [];
const EASY_GROW_IDS = ['cuba', 'booth7', 'ta21', 'phob-phra-08', 'ordinary_avocado', 'arabica_tree', 'abiu_tree'];


/* ══════════════════════════════════════════════
   PROMO & SHIPPING CODE DATA (loaded from JSON)
   ══════════════════════════════════════════════ */
let promoCodes = [];
let shippingCodes = [];
let shippingRates = [];

async function loadData() {
  try {
    const isSubdir = window.location.pathname.includes('/products/');
    const basePath = isSubdir ? '../data/' : 'data/';
    const [promoRes, shipRes, ratesRes, productsRes] = await Promise.all([
      fetch(basePath + 'promo_codes.json').then(r => r.ok ? r.json() : []),
      fetch(basePath + 'shipping_codes.json').then(r => r.ok ? r.json() : []),
      fetch(basePath + 'shipping_rates.json').then(r => r.ok ? r.json() : []),
      fetch(basePath + 'products.json').then(r => r.ok ? r.json() : [])
    ]);
    promoCodes = promoRes;
    shippingCodes = shipRes;
    shippingRates = ratesRes;
    PRODUCTS = productsRes;
  } catch (e) {
    console.warn('[loadData] Could not load data:', e);
  }
}

/* ══════════════════════════════════════════════
   LIFF INIT
   ══════════════════════════════════════════════ */
let liffInitialized = false;

async function initLiff() {
  if (liffInitialized) return true;
  try {
    await liff.init({ liffId: LIFF_CONFIG.liffId });
    liffInitialized = true;
    return true;
  } catch (err) {
    console.error('[LIFF] Init failed:', err);
    return false;
  }
}

async function sendMessageToLine(msgText) {
  try {
    const ok = await initLiff();
    if (!ok) throw new Error('LIFF init failed');

    // Only login if outside the LINE app. Inside, it's automatic.
    if (!liff.isLoggedIn()) {
      if (!liff.isInClient()) {
        liff.login();
        return 'logging_in';
      }
    }

    const context = liff.getContext();
    // 1. If in a chat context (utou, group, room), try to sendMessages directly
    if (context && context.type !== 'none') {
      await liff.sendMessages([{ type: 'text', text: msgText }]);
      return 'sent';
    }

    // 2. Fallback to shareTargetPicker if available
    if (liff.isApiAvailable('shareTargetPicker')) {
      const res = await liff.shareTargetPicker([{ type: 'text', text: msgText }]);
      if (res) {
        return 'shared';
      }
    }

    throw new Error('Not in chat context and shareTargetPicker not completed');
  } catch (err) {
    console.warn('[LINE Send Failed, using fallback]', err);
    // 3. Fallback to Clipboard copy + redirect to LINE OA
    try {
      await navigator.clipboard.writeText(msgText);
      return 'copied';
    } catch (clipErr) {
      console.error('Clipboard copy failed:', clipErr);
      return 'failed';
    }
  }
}

/* ══════════════════════════════════════════════
   sendInterest(product) — ส่งข้อความ + เพิ่มตะกร้า
   ══════════════════════════════════════════════ */
async function sendInterest(productOrName) {
  const isObj = typeof productOrName === 'object';
  const productName = isObj ? productOrName.nameTh : productOrName;
  const product = isObj ? productOrName : null;

  const btn = document.getElementById('btn-order');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ กำลังส่ง...'; }

  try {
    const msg = `🌿 สนใจสั่งซื้อต้นไม้: ${productName}${product ? `\n💰 ราคา: ฿${product.price.toLocaleString()}/ต้น` : ''}\n\nกรุณาติดต่อแอดมินเพื่อสั่งซื้อ 😊`;

    if (product) Cart.add(product);
    else Cart.addById(productName);

    const result = await sendMessageToLine(msg);
    if (result === 'sent') {
      showToast('✅ ส่งข้อความสำเร็จ! เพิ่มในตะกร้าแล้ว');
      if (liff.isInClient()) setTimeout(() => liff.closeWindow(), 1800);
    } else if (result === 'shared') {
      showToast('✅ แชร์ข้อความสำเร็จ! เพิ่มในตะกร้าแล้ว');
    } else if (result === 'copied') {
      showToast('📋 คัดลอกแล้ว กำลังเปิดแชท LINE แอดมิน...');
      const oaLink = typeof window.CONFIG !== 'undefined' ? window.CONFIG.LINE_OA_LINK : 'https://line.me/R/ti/p/@yutthanafarm';
      setTimeout(() => {
        liff.openWindow({ url: oaLink, external: false });
      }, 1500);
    } else if (result === 'logging_in') {
      // Waiting for login redirect
    } else {
      const lineName = typeof window.CONFIG !== 'undefined' ? window.CONFIG.LINE_NAME : 'Yutthana Farm';
      showToast(`🛒 เพิ่มในตะกร้าแล้ว (กรุณาติดต่อ LINE: ${lineName})`);
    }

  } catch (err) {
    console.error('[sendInterest]', err);
    showToast('🛒 เพิ่มในตะกร้าแล้ว (กรุณาติดต่อแอดมินโดยตรง)');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> เพิ่มลงในตะกร้า`;
    }
  }
}

async function checkPendingProduct() {
  const pending = sessionStorage.getItem('pendingProduct');
  if (pending) {
    sessionStorage.removeItem('pendingProduct');
    try { await sendInterest(JSON.parse(pending)); } catch { await sendInterest(pending); }
  }
}

/* ══════════════════════════════════════════════
   CART — จัดการตะกร้าสินค้า (localStorage) + quantity
   ══════════════════════════════════════════════ */
const Cart = {
  _key: 'avocado_cart',
  _promoKey: 'avocado_applied_promo',
  _shipKey: 'avocado_applied_ship',

  getAll() {
    return JSON.parse(localStorage.getItem(this._key) || '[]');
  },

  add(product, qty = 1) {
    const items = this.getAll();
    const cartItemId = product.cartItemId || (product.id + (product.selectedOptions ? '_' + JSON.stringify(product.selectedOptions) : ''));
    const exists = items.find(i => (i.cartItemId || i.id) === cartItemId);
    if (exists) {
      exists.quantity = (exists.quantity || 1) + qty;
    } else {
      items.push({
        id: product.id,
        cartItemId: cartItemId,
        nameTh: product.nameTh,
        variety: product.variety,
        price: product.price,
        emoji: product.emoji,
        imageCover: product.imageCover,
        groups: product.groups,
        weight: product.weight,
        selectedOptions: product.selectedOptions,
        quantity: qty,
        addedAt: Date.now(),
      });
    }
    localStorage.setItem(this._key, JSON.stringify(items));
    this._updateBadge();
  },

  addById(name) {
    const p = PRODUCTS.find(p => name.includes(p.nameTh) || name.includes(p.nameEn));
    if (p) this.add(p);
  },

  updateQty(cartItemId, qty) {
    const items = this.getAll();
    const item = items.find(i => (i.cartItemId || i.id) === cartItemId);
    if (item) {
      item.quantity = Math.max(1, qty);
      localStorage.setItem(this._key, JSON.stringify(items));
    }
    this._updateBadge();
  },

  remove(cartItemId) {
    const items = this.getAll().filter(i => (i.cartItemId || i.id) !== cartItemId);
    localStorage.setItem(this._key, JSON.stringify(items));
    this._updateBadge();
  },

  clear() {
    localStorage.removeItem(this._key);
    this.clearPromo();
    this.clearShipping();
    this._updateBadge();
  },

  count() {
    return this.getAll().reduce((sum, i) => sum + (i.quantity || 1), 0);
  },

  subtotal() {
    return this.getAll().reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
  },

  getAppliedPromo() {
    try { return JSON.parse(localStorage.getItem(this._promoKey)); } catch { return null; }
  },
  setAppliedPromo(code) { localStorage.setItem(this._promoKey, JSON.stringify(code)); },
  clearPromo() { localStorage.removeItem(this._promoKey); },

  getAppliedShipping() {
    try { return JSON.parse(localStorage.getItem(this._shipKey)); } catch { return null; }
  },
  setAppliedShipping(code) { localStorage.setItem(this._shipKey, JSON.stringify(code)); },
  clearShipping() { localStorage.removeItem(this._shipKey); },

  calculateTotals() {
    const items = this.getAll();
    const subtotal = this.subtotal();
    let discount = 0;

    // Validate Promo Code
    let promo = this.getAppliedPromo();
    if (promo) {
      if (promo._notFound) {
        promo._error = 'ไม่พบโค้ดส่วนลดนี้';
      } else {
        const now = new Date();
        const start = new Date(promo.startDate);
        const end = new Date(promo.endDate);
        if (now < start || now > end) {
          promo._error = 'โค้ดส่วนลดนี้ไม่สามารถใช้งานได้ในวันที่นี้';
        } else if (promo.minPurchase && subtotal < promo.minPurchase) {
          promo._error = `ยอดขั้นต่ำ ฿${promo.minPurchase.toLocaleString()} เพื่อใช้โค้ดนี้`;
        }
      }
    }

    // Calculate Promo Discount based on applicable groups
    if (promo && !promo._error) {
      const isApplicable = (item) => promo.applicableGroups.includes('all') || promo.applicableGroups.some(g => (item.groups || []).includes(g));

      const applicableSubtotal = items.reduce((sum, item) => {
        if (isApplicable(item)) return sum + (item.price * item.quantity);
        return sum;
      }, 0);

      if (applicableSubtotal > 0) {
        if (promo.discountType === 'percentage') {
          discount = Math.round(applicableSubtotal * promo.value / 100);
        } else if (promo.discountType === 'fixed') {
          discount = Math.min(applicableSubtotal, promo.value);
        }
      }
    }

    // Calculate Shipping By Weight
    const totalWeight = items.reduce((sum, item) => sum + ((item.weight || 0) * item.quantity), 0);
    const rateTier = shippingRates.find(r => totalWeight >= r.minWeight && totalWeight <= r.maxWeight);
    let baseShipping = rateTier ? rateTier.rate : 150; // default to 150 if not found
    if (items.length === 0) baseShipping = 0;

    let shipping = baseShipping;

    // Validate Shipping Code
    let shipCode = this.getAppliedShipping();
    if (shipCode) {
      if (shipCode._notFound) {
        shipCode._error = 'ไม่พบโค้ดค่าส่งนี้';
      } else {
        const now = new Date();
        const start = new Date(shipCode.startDate);
        const end = new Date(shipCode.endDate);
        if (now < start || now > end) {
          shipCode._error = 'โค้ดส่วนลดนี้ไม่สามารถใช้งานได้ในวันที่นี้';
        }
      }
    }

    if (shipCode && !shipCode._error) {
      if (shipCode.discountType === 'free') {
        shipping = 0;
      } else if (shipCode.discountType === 'discount') {
        shipping = Math.max(0, baseShipping - shipCode.value);
      }
    }

    const total = Math.max(0, subtotal - discount) + shipping;
    return { subtotal, discount, shipping, total, promo, shipCode, totalWeight };
  },

  _updateBadge() {
    const n = this.count();
    document.querySelectorAll('.nav-item__badge[data-for="cart"]').forEach(el => {
      el.textContent = n;
      el.classList.toggle('visible', n > 0);
    });
  },

  init() { this._updateBadge(); },
};

/* ══════════════════════════════════════════════
   WISHLIST — บันทึกรายการโปรด (localStorage)
   ══════════════════════════════════════════════ */
const Wishlist = {
  _key: 'avocado_wishlist',

  getAll() { return JSON.parse(localStorage.getItem(this._key) || '[]'); },

  has(id) { return this.getAll().includes(id); },

  toggle(id) {
    const list = this.getAll();
    const idx = list.indexOf(id);
    if (idx === -1) list.push(id);
    else list.splice(idx, 1);
    localStorage.setItem(this._key, JSON.stringify(list));
    return idx === -1;
  },
};

/* ══════════════════════════════════════════════
   ADDRESS MANAGER (localStorage)
   ══════════════════════════════════════════════ */
const AddressManager = {
  _key: 'avocado_addresses',
  _defaultKey: 'avocado_default_address',

  getAll() {
    return JSON.parse(localStorage.getItem(this._key) || '[]');
  },

  add(addr) {
    const list = this.getAll();
    addr.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    list.push(addr);
    localStorage.setItem(this._key, JSON.stringify(list));
    if (list.length === 1) this.setDefault(addr.id);
    return addr;
  },

  remove(id) {
    const list = this.getAll().filter(a => a.id !== id);
    localStorage.setItem(this._key, JSON.stringify(list));
    if (this.getDefaultId() === id) {
      this.setDefault(list.length ? list[0].id : null);
    }
  },

  getDefaultId() {
    return localStorage.getItem(this._defaultKey);
  },

  setDefault(id) {
    if (id) localStorage.setItem(this._defaultKey, id);
    else localStorage.removeItem(this._defaultKey);
  },

  getDefault() {
    const id = this.getDefaultId();
    return this.getAll().find(a => a.id === id) || this.getAll()[0] || null;
  },
};

/* ══════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════ */
function showToast(message, ms = 3000) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('toast--show')));
  setTimeout(() => { el.classList.remove('toast--show'); setTimeout(() => el.remove(), 400); }, ms);
}

/* ══════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════ */
function getRelativePath(path) {
  if (!path) return null;
  const isProductPage = window.location.pathname.includes('/products/');
  return isProductPage ? `../${path}` : path;
}

function buildStars(r) {
  const full = Math.floor(r), half = r % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

/* ══════════════════════════════════════════════
   PRODUCT GRID — render & filter
   ══════════════════════════════════════════════ */
let currentGroup = 'all';
let searchQuery = '';

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchGroup =
      currentGroup === 'all' ? true : (p.groups || []).includes(currentGroup);
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      p.nameTh.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.variety.toLowerCase().includes(q) ||
      (p.shortDesc || '').toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));
    return matchGroup && matchSearch;
  });
}

function renderProductCard(p) {
  const liked = Wishlist.has(p.id);
  const badgeCls = p.badgeType === 'sale' ? 'product-card__badge--sale' : p.badgeType === 'new' ? 'product-card__badge--new' : '';
  const imgUrl = getRelativePath(p.imageCover);
  return `
    <article class="product-card animate-in" role="listitem" aria-label="${p.nameTh}" id="card-${p.id}">
      ${p.badge ? `<span class="product-card__badge ${badgeCls}">${p.badge}</span>` : ''}
      <div class="product-card__img-wrap">
        ${imgUrl ? `
          <img src="${imgUrl}" class="product-card__img" alt="${p.nameTh}" style="width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1/1;" onerror="this.outerHTML='<div class=&quot;product-card__img--placeholder&quot;>${p.emoji}</div>';">
        ` : `
          <div class="product-card__img--placeholder">${p.emoji}</div>
        `}
        <button class="product-card__wishlist ${liked ? 'is-liked' : ''}"
          aria-label="เพิ่มในรายการโปรด" data-product="${p.id}" id="wish-${p.id}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${liked ? '#e74c3c' : 'none'}" stroke="${liked ? '#e74c3c' : 'currentColor'}" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-card__body">
        <span class="product-card__variety">${p.variety}</span>
        <h3 class="product-card__name">${p.nameTh}</h3>
        <div class="product-card__rating">
          <span class="product-card__stars">${buildStars(p.rating)}</span>
          <span>(${p.rating}) · ${p.reviewCount} รีวิว</span>
        </div>
        <div class="product-card__price-row">
          <span class="product-card__price">฿${p.price.toLocaleString()}</span>
          ${p.priceOriginal ? `<span class="product-card__price-original">฿${p.priceOriginal.toLocaleString()}</span>` : ''}
        </div>
        <span class="product-card__unit">ต่อต้น</span>
        <a href="${p.href}" id="link-${p.id}">
          <button class="product-card__btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            ดูรายละเอียด
          </button>
        </a>
      </div>
    </article>`;
}

function renderProductGrid() {
  const grid = document.getElementById('product-grid');
  const counter = document.getElementById('product-count');
  if (!grid) return;
  const list = getFilteredProducts();
  if (counter) counter.textContent = `${list.length} รายการ`;
  grid.innerHTML = list.length
    ? list.map(renderProductCard).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
         <div class="empty-state__icon">🔍</div>
         <div class="empty-state__title">ไม่พบสินค้า</div>
         <div class="empty-state__desc">ลองเปลี่ยนคำค้นหาหรือเลือกกลุ่มอื่น</div>
       </div>`;
  bindWishlistButtons();
}

function bindWishlistButtons() {
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const id = btn.dataset.product;
      const svg = btn.querySelector('svg');
      const added = Wishlist.toggle(id);
      svg.setAttribute('fill', added ? '#e74c3c' : 'none');
      svg.setAttribute('stroke', added ? '#e74c3c' : 'currentColor');
      btn.classList.toggle('is-liked', added);
      showToast(added ? '❤️ เพิ่มในรายการโปรดแล้ว' : '🤍 นำออกจากรายการโปรด', 2000);
    });
  });
}

function initCategoryFilter() {
  document.querySelectorAll('.category-filter__chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.category-filter__chip').forEach(c => c.classList.remove('category-filter__chip--active'));
      chip.classList.add('category-filter__chip--active');
      currentGroup = chip.dataset.group;
      renderProductGrid();
    });
  });
}

/* ══════════════════════════════════════════════
   SEARCH OVERLAY
   ══════════════════════════════════════════════ */
function openSearch() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  if (!overlay) return;
  overlay.classList.add('search-overlay--active');
  setTimeout(() => input?.focus(), 100);
}

function closeSearch() {
  document.getElementById('search-overlay')?.classList.remove('search-overlay--active');
  const input = document.getElementById('search-input');
  if (input) { input.value = ''; renderSearchResults(''); }
}

function renderSearchResults(q) {
  const container = document.getElementById('search-results');
  if (!container) return;
  if (!q.trim()) { container.innerHTML = ''; return; }
  const hits = PRODUCTS.filter(p =>
    p.nameTh.toLowerCase().includes(q.toLowerCase()) ||
    p.nameEn.toLowerCase().includes(q.toLowerCase()) ||
    p.variety.toLowerCase().includes(q.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
  );
  container.innerHTML = hits.length
    ? `<div class="search-overlay__results-title">พบ ${hits.length} รายการ</div>
       <div class="search-result-list">
         ${hits.map(p => `
           <a class="search-result-item" href="${p.href}" id="search-${p.id}">
             <div class="search-result-item__emoji">${p.emoji}</div>
             <div class="search-result-item__info">
               <div class="search-result-item__name">${p.nameTh}</div>
               <div class="search-result-item__meta">${p.variety} · ${p.shortDesc}</div>
             </div>
             <div class="search-result-item__price">฿${p.price.toLocaleString()}</div>
           </a>`).join('')}
       </div>`
    : `<div class="search-no-result">
         <div class="search-no-result__icon">🌿</div>
         <div>ไม่พบ "${q}"</div>
       </div>`;
}

/* ══════════════════════════════════════════════
   SLIDE-UP PANELS
   ══════════════════════════════════════════════ */
function openPanel(panelId) {
  const overlay = document.getElementById('panel-overlay');
  const panels = document.querySelectorAll('.panel');
  panels.forEach(p => p.classList.remove('panel--active'));
  document.getElementById(panelId)?.classList.add('panel--active');
  overlay?.classList.add('panel-overlay--active');
}

function closePanel() {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('panel--active'));
  document.getElementById('panel-overlay')?.classList.remove('panel-overlay--active');
}

/* ══════════════════════════════════════════════
   CART PANEL — full featured with qty, promo, shipping, address
   ══════════════════════════════════════════════ */
function renderCartPanel() {
  const body = document.getElementById('cart-panel-body');
  const footer = document.getElementById('cart-panel-footer');
  if (!body) return;
  const items = Cart.getAll();

  if (!items.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty__icon">🛒</div>
      <div class="cart-empty__title">ตะกร้าว่างเปล่า</div>
      <div class="cart-empty__desc">กดปุ่ม "เพิ่มลงในตะกร้า" เพื่อเพิ่มต้นไม้ลงตะกร้า</div>
    </div>`;
    if (footer) footer.innerHTML = '';
    return;
  }

  // Cart items
  const { subtotal, discount, shipping, total, promo, shipCode, totalWeight } = Cart.calculateTotals();
  const appliedPromo = promo;
  const appliedShip = shipCode;

  body.innerHTML = items.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id) || item;
    const imgUrl = getRelativePath(product.imageCover || item.imageCover);
    const qty = item.quantity || 1;

    // Check if promo applies
    const isApplicable = promo && !promo._error && (promo.applicableGroups.includes('all') || promo.applicableGroups.some(g => (item.groups || []).includes(g)));

    let priceHtml = `฿${(item.price || 0).toLocaleString()}`;
    if (isApplicable) {
      if (promo.discountType === 'percentage') {
        const discountedPrice = item.price - Math.round(item.price * promo.value / 100);
        priceHtml = `<s style="color:var(--color-text-light);font-size:0.85em;">฿${item.price.toLocaleString()}</s> <span style="color:var(--color-primary);margin-left:4px;">฿${discountedPrice.toLocaleString()}</span>`;
      } else {
        priceHtml += ` <span style="color:var(--color-primary);font-size:0.85em;margin-left:4px;">(ร่วมรายการลด)</span>`;
      }
    }

    return `
    <div class="cart-item" id="cart-item-${item.cartItemId || item.id}">
      <div class="cart-item__img">
        ${imgUrl
        ? `<img src="${imgUrl}" alt="${item.nameTh}" onerror="this.outerHTML='<div class=&quot;cart-item__emoji-fallback&quot;>${item.emoji || '🌿'}</div>'">`
        : `<div class="cart-item__emoji-fallback">${item.emoji || '🌿'}</div>`
      }
      </div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.nameTh}</div>
        <div class="cart-item__variety">${item.variety}</div>
        <div class="cart-item__price">${priceHtml}</div>
      </div>
      <div class="cart-item__qty-controls">
        <button class="cart-item__qty-btn" onclick="changeQty('${item.cartItemId || item.id}', -1)" aria-label="ลดจำนวน">−</button>
        <span class="cart-item__qty-num">${qty}</span>
        <button class="cart-item__qty-btn" onclick="changeQty('${item.cartItemId || item.id}', 1)" aria-label="เพิ่มจำนวน">+</button>
      </div>
      <button class="cart-item__remove" onclick="removeCartItem('${item.cartItemId || item.id}')" aria-label="ลบออก">✕</button>
    </div>`;
  }).join('');

  // Promo & Shipping code section
  const currentAppliedPromo = Cart.getAppliedPromo();
  const currentAppliedShip = Cart.getAppliedShipping();

  body.innerHTML += `
    <div class="cart-codes-section">
      <div class="cart-code-row">
        <label class="cart-code-label">🏷️ โค้ดส่วนลดสินค้า</label>
        ${currentAppliedPromo
      ? `<div class="cart-code-applied ${currentAppliedPromo._error ? 'cart-code-applied--error' : ''}" style="${currentAppliedPromo._error ? 'border-color: #e74c3c; background-color: #fdf2f2;' : ''}">
               <span class="cart-code-applied__tag">${currentAppliedPromo._error ? '❌' : '✅'} ${currentAppliedPromo.code}</span>
               <span class="cart-code-applied__desc" style="${currentAppliedPromo._error ? 'color: #e74c3c;' : ''}">${currentAppliedPromo._error || currentAppliedPromo.description}</span>
               <button class="cart-code-applied__remove" onclick="removePromoCode()">✕</button>
             </div>`
      : `<div class="cart-code-input-row">
               <input type="text" id="promo-code-input" class="cart-code-input" placeholder="ใส่โค้ดส่วนลด..." />
               <button class="cart-code-apply-btn" onclick="applyPromoCode()">ใช้โค้ด</button>
             </div>`
    }
      </div>
      <div class="cart-code-row">
        <label class="cart-code-label">🚚 โค้ดส่วนลดค่าส่ง</label>
        ${currentAppliedShip
      ? `<div class="cart-code-applied ${currentAppliedShip._error ? 'cart-code-applied--error' : ''}" style="${currentAppliedShip._error ? 'border-color: #e74c3c; background-color: #fdf2f2;' : ''}">
               <span class="cart-code-applied__tag">${currentAppliedShip._error ? '❌' : '✅'} ${currentAppliedShip.code}</span>
               <span class="cart-code-applied__desc" style="${currentAppliedShip._error ? 'color: #e74c3c;' : ''}">${currentAppliedShip._error || currentAppliedShip.description}</span>
               <button class="cart-code-applied__remove" onclick="removeShippingCode()">✕</button>
             </div>`
      : `<div class="cart-code-input-row">
               <input type="text" id="ship-code-input" class="cart-code-input" placeholder="ใส่โค้ดค่าส่ง..." />
               <button class="cart-code-apply-btn" onclick="applyShippingCode()">ใช้โค้ด</button>
             </div>`
    }
      </div>
    </div>
  `;

  // Address section
  const defaultAddr = AddressManager.getDefault();
  body.innerHTML += `
    <div class="cart-address-section">
      <div class="cart-address-header">
        <span class="cart-address-label">📍 ที่อยู่จัดส่ง</span>
        <button class="cart-address-manage-btn" onclick="renderAddressPanel();openPanel('address-panel');">จัดการที่อยู่</button>
      </div>
      ${defaultAddr
      ? `<div class="cart-address-card">
             <div class="cart-address-card__name">${defaultAddr.name} · ${defaultAddr.phone}</div>
             <div class="cart-address-card__detail">${defaultAddr.address}</div>
             <span class="cart-address-card__default-tag">ค่าเริ่มต้น</span>
           </div>`
      : `<div class="cart-address-empty" onclick="renderAddressPanel();openPanel('address-panel');">
             <span>+ เพิ่มที่อยู่จัดส่ง</span>
           </div>`
    }
    </div>
  `;

  // Footer totals
  if (footer) {
    footer.innerHTML = `
      <div class="cart-summary">
        <div class="cart-summary__row">
          <span>ยอดรวมสินค้า (${Cart.count()} ชิ้น)</span>
          <span>฿${subtotal.toLocaleString()}</span>
        </div>
        ${discount > 0 ? `
        <div class="cart-summary__row cart-summary__row--discount">
          <span>ส่วนลด (${promo?.code})</span>
          <span>-฿${discount.toLocaleString()}</span>
        </div>` : ''}
        <div class="cart-summary__row">
          <span>ค่าจัดส่ง${shipCode ? ` (${shipCode.code})` : ''}</span>
          <span>${shipping === 0 ? 'ฟรี!' : `฿${shipping.toLocaleString()}`}</span>
        </div>
        <div class="cart-summary__row cart-summary__row--total">
          <span>ยอดรวมทั้งสิ้น</span>
          <span>฿${total.toLocaleString()}</span>
        </div>
      </div>
      <button class="cart-panel__checkout-btn" onclick="sendCheckoutMessage()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        ส่งรายการสั่งซื้อ LINE
      </button>
      <button class="cart-panel__clear" onclick="clearCart()">ล้างตะกร้าทั้งหมด</button>`;
  }
}

/* ── Cart actions (global) ── */
window.changeQty = function (cartItemId, delta) {
  const items = Cart.getAll();
  const item = items.find(i => (i.cartItemId || i.id) === cartItemId);
  if (!item) return;
  const newQty = (item.quantity || 1) + delta;
  if (newQty < 1) {
    removeCartItem(cartItemId);
    return;
  }
  Cart.updateQty(cartItemId, newQty);
  renderCartPanel();
};

window.removeCartItem = function (cartItemId) {
  Cart.remove(cartItemId);
  renderCartPanel();
  showToast('🗑️ ลบออกจากตะกร้าแล้ว', 2000);
};

window.clearCart = function () {
  Cart.clear();
  renderCartPanel();
  showToast('🗑️ ล้างตะกร้าทั้งหมดแล้ว', 2000);
};

window.applyPromoCode = function () {
  const input = document.getElementById('promo-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (!code) return;

  let found = promoCodes.find(c => c.code === code);
  if (!found) {
    found = { code, description: 'ไม่พบโค้ดส่วนลดนี้', _notFound: true };
  }

  Cart.setAppliedPromo(found);
  renderCartPanel();
};

window.removePromoCode = function () {
  Cart.clearPromo();
  renderCartPanel();
  showToast('🏷️ ยกเลิกโค้ดส่วนลดแล้ว');
};

window.applyShippingCode = function () {
  const input = document.getElementById('ship-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (!code) return;

  let found = shippingCodes.find(c => c.code === code);
  if (!found) {
    found = { code, description: 'ไม่พบโค้ดค่าส่งนี้', _notFound: true };
  }

  Cart.setAppliedShipping(found);
  renderCartPanel();
};

window.removeShippingCode = function () {
  Cart.clearShipping();
  renderCartPanel();
  showToast('🚚 ยกเลิกโค้ดค่าส่งแล้ว');
};

/* ══════════════════════════════════════════════
   CHECKOUT — compile & send via LINE
   ══════════════════════════════════════════════ */
window.sendCheckoutMessage = async function () {
  const items = Cart.getAll();
  if (!items.length) { showToast('⚠️ ตะกร้าว่าง'); return; }

  const { subtotal, discount, shipping, total, promo, shipCode } = Cart.calculateTotals();
  const defaultAddr = AddressManager.getDefault();

  // Build message
  let msg = `ยุทธนา ฟาร์ม — ใบสั่งซื้อ\n`;
  msg += `━━━━━━━━━━━\n`;
  items.forEach((item, i) => {
    const qty = item.quantity || 1;
    msg += `${i + 1}. ${item.nameTh} (${item.variety})\n   ฿${item.price.toLocaleString()} × ${qty} = ฿${(item.price * qty).toLocaleString()}\n`;
  });
  msg += `━━━━━━━━━━━\n`;
  msg += `💰 ยอดรวมสินค้า: ฿${subtotal.toLocaleString()}\n`;
  if (discount > 0) msg += `🏷️ ส่วนลด (${promo?.code}): -฿${discount.toLocaleString()}\n`;
  msg += `🚚 ค่าจัดส่ง${shipCode ? ` (${shipCode.code})` : ''}: ${shipping === 0 ? 'ฟรี!' : `฿${shipping.toLocaleString()}`}\n`;
  msg += `━━━━━━━━━━━\n`;
  msg += `✅ ยอดรวมทั้งสิ้น: ฿${total.toLocaleString()}\n`;
  if (defaultAddr) {
    msg += `\n📍 ที่อยู่จัดส่ง:\n${defaultAddr.name} ${defaultAddr.phone}\n${defaultAddr.address}\n`;
  }
  msg += `\nรอแอดมินตอบกลับเพื่อยืนยันการสั่งซื้อ`;

  try {
    const result = await sendMessageToLine(msg);
    if (result === 'sent') {
      showToast('✅ ส่งรายการสั่งซื้อสำเร็จ!');
      Cart.clear();
      renderCartPanel();
      if (liff.isInClient()) setTimeout(() => liff.closeWindow(), 2000);
    } else if (result === 'shared') {
      showToast('✅ แชร์รายการสั่งซื้อสำเร็จ!');
      Cart.clear();
      renderCartPanel();
    } else if (result === 'copied') {
      showToast('📋 คัดลอกแล้ว กำลังเปิดแชท LINE แอดมิน...');
      Cart.clear();
      renderCartPanel();
      const oaLink = typeof window.CONFIG !== 'undefined' ? window.CONFIG.LINE_OA_LINK : 'https://line.me/R/ti/p/@yutthanafarm';
      setTimeout(() => {
        liff.openWindow({ url: oaLink, external: false });
      }, 1500);
    } else if (result === 'logging_in') {
      // Waiting for login redirect
    } else {
      const lineName = typeof window.CONFIG !== 'undefined' ? window.CONFIG.LINE_NAME : 'Yutthana Farm';
      showToast(`📞 กรุณาติดต่อ LINE: ${lineName}`);
    }
  } catch (err) {
    console.error('[checkout]', err);
    const lineName = typeof window.CONFIG !== 'undefined' ? window.CONFIG.LINE_NAME : 'Yutthana Farm';
    showToast(`📞 กรุณาติดต่อ LINE: ${lineName}`);
  }
};

/* ══════════════════════════════════════════════
   WISHLIST PANEL
   ══════════════════════════════════════════════ */
function renderWishlistPanel() {
  const body = document.getElementById('wishlist-panel-body');
  if (!body) return;
  const ids = Wishlist.getAll();
  const items = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (!items.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty__icon">💚</div>
      <div class="cart-empty__title">ยังไม่มีรายการโปรด</div>
      <div class="cart-empty__desc">กดปุ่ม ❤️ บนสินค้าที่สนใจเพื่อเพิ่มในรายการโปรด</div>
    </div>`;
    return;
  }

  body.innerHTML = items.map(p => {
    const imgUrl = getRelativePath(p.imageCover);
    return `
    <div class="cart-item" id="wish-item-${p.id}">
      <div class="cart-item__img">
        ${imgUrl
        ? `<img src="${imgUrl}" alt="${p.nameTh}" onerror="this.outerHTML='<div class=&quot;cart-item__emoji-fallback&quot;>${p.emoji}</div>'">`
        : `<div class="cart-item__emoji-fallback">${p.emoji}</div>`
      }
      </div>
      <div class="cart-item__info">
        <div class="cart-item__name">${p.nameTh}</div>
        <div class="cart-item__variety">${p.variety}</div>
        <div class="cart-item__price">฿${p.price.toLocaleString()}</div>
      </div>
      <button class="cart-item__add-btn" onclick="addWishlistToCart('${p.id}')" aria-label="เพิ่มลงตะกร้า"
        style="background:var(--color-primary);color:#fff;border:none;border-radius:var(--radius-sm);padding:6px 12px;font-size:.78rem;font-weight:600;cursor:pointer;white-space:nowrap;">
        + ตะกร้า
      </button>
      <button class="cart-item__remove" onclick="removeWishlistItem('${p.id}')" aria-label="ลบ">✕</button>
    </div>`;
  }).join('');
}

window.addWishlistToCart = function (id) {
  const p = PRODUCTS.find(prod => prod.id === id);
  if (p) {
    Cart.add(p, 1);
    showToast('🛒 เพิ่มลงในตะกร้าเรียบร้อยแล้ว!');
  }
};

window.removeWishlistItem = function (id) {
  Wishlist.toggle(id);
  renderWishlistPanel();
  renderProductGrid(); // refresh hearts
  showToast('🤍 นำออกจากรายการโปรด');
};

/* ══════════════════════════════════════════════
   ADDRESS PANEL
   ══════════════════════════════════════════════ */
function renderAddressPanel() {
  const body = document.getElementById('address-panel-body');
  if (!body) return;
  const addresses = AddressManager.getAll();
  const defaultId = AddressManager.getDefaultId();

  let html = `
    <div class="address-form" id="address-form">
      <h3 class="address-form__title">เพิ่มที่อยู่ใหม่</h3>
      <input type="text" id="addr-name" class="address-form__input" placeholder="ชื่อ-นามสกุล" />
      <input type="tel" id="addr-phone" class="address-form__input" placeholder="เบอร์โทร" />
      <textarea id="addr-address" class="address-form__textarea" placeholder="ที่อยู่จัดส่งโดยละเอียด (เลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์)" rows="3"></textarea>
      <button class="address-form__submit" onclick="addNewAddress()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        เพิ่มที่อยู่
      </button>
    </div>
  `;

  if (addresses.length) {
    html += `<div class="address-list">
      <h3 class="address-list__title">ที่อยู่ทั้งหมด (${addresses.length})</h3>
      ${addresses.map(a => `
        <div class="address-card ${a.id === defaultId ? 'address-card--default' : ''}">
          <div class="address-card__body">
            <div class="address-card__name">${a.name} · ${a.phone}</div>
            <div class="address-card__detail">${a.address}</div>
            ${a.id === defaultId ? '<span class="address-card__tag">✅ ค่าเริ่มต้น</span>' : ''}
          </div>
          <div class="address-card__actions">
            ${a.id !== defaultId ? `<button class="address-card__action-btn" onclick="setDefaultAddress('${a.id}')">ตั้งเป็นค่าเริ่มต้น</button>` : ''}
            <button class="address-card__action-btn address-card__action-btn--delete" onclick="deleteAddress('${a.id}')">ลบ</button>
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  body.innerHTML = html;
}

window.addNewAddress = function () {
  const name = document.getElementById('addr-name')?.value.trim();
  const phone = document.getElementById('addr-phone')?.value.trim();
  const address = document.getElementById('addr-address')?.value.trim();

  if (!name || !phone || !address) {
    showToast('⚠️ กรุณากรอกข้อมูลให้ครบ');
    return;
  }

  AddressManager.add({ name, phone, address });
  renderAddressPanel();
  showToast('✅ เพิ่มที่อยู่เรียบร้อยแล้ว');
};

window.deleteAddress = function (id) {
  AddressManager.remove(id);
  renderAddressPanel();
  showToast('🗑️ ลบที่อยู่แล้ว');
};

window.setDefaultAddress = function (id) {
  AddressManager.setDefault(id);
  renderAddressPanel();
  showToast('✅ ตั้งเป็นที่อยู่เริ่มต้นแล้ว');
};

/* ══════════════════════════════════════════════
   PROFILE PANEL
   ══════════════════════════════════════════════ */
function renderProfilePanel() {
  const body = document.getElementById('profile-panel-body');
  if (!body) return;
  const profile = {
    name: 'คุณยุทธนา สวนอโวคาโด',
    tag: 'สมาชิก Premium · เชียงราย',
    avatar: '🌿',
    ordersCount: Cart.count(),
    wishlistCount: Wishlist.getAll().length,
    addressCount: AddressManager.getAll().length,
    points: 1280,
  };
  body.innerHTML = `
    <div class="profile-hero">
      <div class="profile-avatar">${profile.avatar}</div>
      <div>
        <div class="profile-name">${profile.name}</div>
        <div class="profile-tag">${profile.tag}</div>
      </div>
    </div>
    <div class="profile-stats">
      <div class="profile-stat">
        <div class="profile-stat__num">${profile.ordersCount}</div>
        <div class="profile-stat__label">ในตะกร้า</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat__num">${profile.wishlistCount}</div>
        <div class="profile-stat__label">รายการโปรด</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat__num">${profile.points}</div>
        <div class="profile-stat__label">คะแนน</div>
      </div>
    </div>
    <div class="profile-menu">
      <div class="profile-menu-item" onclick="renderCartPanel();closePanel();setTimeout(()=>{openPanel('cart-panel');},100);">
        <div class="profile-menu-item__icon">🛒</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">ตะกร้าของฉัน</div>
          <div class="profile-menu-item__desc">${profile.ordersCount} รายการที่สนใจ</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
      <div class="profile-menu-item" onclick="renderWishlistPanel();closePanel();setTimeout(()=>{openPanel('wishlist-panel');},100);">
        <div class="profile-menu-item__icon">❤️</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">รายการโปรด</div>
          <div class="profile-menu-item__desc">${profile.wishlistCount} สายพันธุ์ที่ถูกใจ</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
      <div class="profile-menu-item" onclick="renderAddressPanel();closePanel();setTimeout(()=>{openPanel('address-panel');},100);">
        <div class="profile-menu-item__icon">📍</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">ที่อยู่จัดส่ง</div>
          <div class="profile-menu-item__desc">${profile.addressCount} ที่อยู่ที่บันทึกไว้</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
      <div class="profile-menu-item" onclick="contactAdmin()">
        <div class="profile-menu-item__icon">📞</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">ติดต่อแอดมิน</div>
          <div class="profile-menu-item__desc">LINE: Yutthana Farm</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════
   SLIDER CONTROLS
   ══════════════════════════════════════════════ */
function initSlider(trackId, dotsId) {
  const track = document.getElementById(trackId || 'slider-track');
  const dotsEl = document.getElementById(dotsId || 'slider-dots');
  if (!track || !dotsEl) return;

  const slides = track.querySelectorAll('.product-slider__slide');
  const dots = dotsEl.querySelectorAll('.product-slider__dot');

  function updateDots(idx) {
    dots.forEach((d, i) => d.classList.toggle('product-slider__dot--active', i === idx));
  }

  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    updateDots(idx);
  }, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    });
  });

  updateDots(0);
}

window.scrollSlider = function (dir) {
  const track = document.getElementById('slider-track');
  if (track) track.scrollBy({ left: dir * track.offsetWidth, behavior: 'smooth' });
};

window.scrollDescImages = function (dir) {
  const track = document.getElementById('desc-images-track');
  if (track) track.scrollBy({ left: dir * 210, behavior: 'smooth' });
};

/* ══════════════════════════════════════════════
   DOM READY
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  // ── Load environment configuration ──
  await loadEnv();

  // ── Load promo/shipping codes & products JSON data ──
  await loadData();


  // ── Init cart badge ──
  Cart.init();

  // ── Render product grid (index.html only) ──
  renderProductGrid();
  initCategoryFilter();

  // ── Search button ──
  document.getElementById('btn-search')?.addEventListener('click', openSearch);
  document.getElementById('search-close-btn')?.addEventListener('click', closeSearch);
  document.getElementById('search-overlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('search-overlay')) closeSearch();
  });
  document.getElementById('search-input')?.addEventListener('input', e => {
    renderSearchResults(e.target.value);
  });
  document.getElementById('search-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      searchQuery = e.target.value;
      closeSearch();
      renderProductGrid();
    }
    if (e.key === 'Escape') closeSearch();
  });

  // ── Panel overlay close ──
  document.getElementById('panel-overlay')?.addEventListener('click', closePanel);
  document.querySelectorAll('.panel__close').forEach(btn => btn.addEventListener('click', closePanel));

  // ── Bottom nav ──
  document.getElementById('nav-cart')?.addEventListener('click', e => {
    e.preventDefault();
    renderCartPanel();
    openPanel('cart-panel');
  });
  document.getElementById('nav-profile')?.addEventListener('click', e => {
    e.preventDefault();
    renderProfilePanel();
    openPanel('profile-panel');
  });

  // ── Slider for index.html ──
  initSlider();

  // ── Check pending product (after LIFF redirect) ──
  checkPendingProduct();

  // ── Intersection observer for fade-in ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; observer.unobserve(e.target); }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});