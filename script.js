/* ============================================================
   script.js — Avocado Shop MVP  v2.0
   ============================================================ */

/* ──────────────────────────────────────────────
   ⚙️ LIFF CONFIG — แก้ไข LIFF ID ของคุณตรงนี้
   1. ไปที่ https://developers.line.biz/console/
   2. สร้าง Channel → LINE Login → เปิดแท็บ LIFF
   3. Copy LIFF ID มาวางแทน "YOUR_LIFF_ID_HERE"
   ────────────────────────────────────────────── */
const LIFF_CONFIG = {
  liffId: "YOUR_LIFF_ID_HERE", // ← แก้ตรงนี้ !!
};

/* ══════════════════════════════════════════════
   PRODUCT DATA — ข้อมูลต้นอโวคาโดทั้งหมด 13 สายพันธุ์
   ══════════════════════════════════════════════ */
const PRODUCTS = [
  /* ─── Group: royal (โครงการหลวง) ─── */
  {
    id: 'hass',
    nameTh: 'ต้นอโวคาโดแฮส',
    nameEn: 'Hass Avocado',
    variety: 'Hass',
    group: 'royal',
    price: 350,
    priceOriginal: 420,
    badge: 'ยอดนิยม',
    badgeType: '',
    rating: 4.9,
    reviewCount: 128,
    sold: 1240,
    href: 'products/hass.html',
    emoji: '🌿',
    shortDesc: 'สายพันธุ์ยอดนิยม เนื้อครีมมี่ เมล็ดเล็ก โครงการหลวงส่งเสริม',
    tags: ['โครงการหลวง', 'เมล็ดเล็ก', 'เนื้อมัน', 'ออกผลดก'],
  },
  {
    id: 'pinkerton',
    nameTh: 'ต้นอโวคาโดพิงค์เคอร์ตัน',
    nameEn: 'Pinkerton Avocado',
    variety: 'Pinkerton',
    group: 'royal',
    price: 300,
    priceOriginal: null,
    badge: 'ใหม่',
    badgeType: 'new',
    rating: 4.7,
    reviewCount: 86,
    sold: 432,
    href: 'products/pinkerton.html',
    emoji: '🌱',
    shortDesc: 'ผลยาว เนื้อเยอะมาก เปลือกบาง โครงการหลวงส่งเสริม',
    tags: ['โครงการหลวง', 'ผลยาว', 'เนื้อเยอะ'],
  },
  {
    id: 'buccanier',
    nameTh: 'ต้นอโวคาโดบัคคาเนีย',
    nameEn: 'Buccanier Avocado',
    variety: 'Buccanier',
    group: 'royal',
    price: 320,
    priceOriginal: 380,
    badge: 'Sale',
    badgeType: 'sale',
    rating: 4.8,
    reviewCount: 54,
    sold: 318,
    href: 'products/buccanear.html',
    emoji: '🌿',
    shortDesc: 'สายพันธุ์ออสเตรเลีย รสหวาน เนื้อละเอียด ไม่มีเส้น',
    tags: ['โครงการหลวง', 'รสหวาน', 'เหมาะทำอาหาร'],
  },
  {
    id: 'booth7',
    nameTh: 'ต้นอโวคาโดบูท-7',
    nameEn: 'Booth 7 Avocado',
    variety: 'Booth 7',
    group: 'royal',
    price: 330,
    priceOriginal: null,
    badge: null,
    badgeType: '',
    rating: 4.6,
    reviewCount: 41,
    sold: 189,
    href: 'products/booth-7.html',
    emoji: '🌳',
    shortDesc: 'ทนอากาศหนาว ปลูกง่าย ออกผลฤดูหนาว เปลือกสีเขียว',
    tags: ['โครงการหลวง', 'ปลูกง่าย', 'ทนอากาศ', 'ฤดูหนาว'],
  },
  {
    id: 'peterson',
    nameTh: 'ต้นอโวคาโดปีเตอร์สัน',
    nameEn: 'Peterson Avocado',
    variety: 'Peterson',
    group: 'royal',
    price: 380,
    priceOriginal: null,
    badge: null,
    badgeType: '',
    rating: 4.9,
    reviewCount: 33,
    sold: 97,
    href: 'products/peterson.html',
    emoji: '🌴',
    shortDesc: 'ผลขนาดใหญ่ที่สุด รสหวานเข้มข้น เปลือกบางมาก พรีเมียม',
    tags: ['โครงการหลวง', 'ผลใหญ่', 'พรีเมียม'],
  },
  {
    id: 'phob-phra-08',
    nameTh: 'ต้นอโวคาโดพบพระ 08',
    nameEn: 'Phob Phra 08 Avocado',
    variety: 'Phob Phra 08',
    group: 'royal',
    price: 280,
    priceOriginal: null,
    badge: 'ท้องถิ่น',
    badgeType: 'new',
    rating: 4.5,
    reviewCount: 22,
    sold: 145,
    href: 'products/phob-phra-08.html',
    emoji: '🌿',
    shortDesc: 'สายพันธุ์คัดเลือกจากสถานีวิจัยพบพระ จ.ตาก คุณภาพดี',
    tags: ['โครงการหลวง', 'พันธุ์ท้องถิ่น', 'สายพันธุ์ตาก'],
  },

  /* ─── Group: vietnam (พันธุ์เวียดนาม — รวม A034, TA21) ─── */
  {
    id: 'a034',
    nameTh: 'ต้นอโวคาโด A034',
    nameEn: 'A034 Avocado',
    variety: 'A034',
    group: 'vietnam',
    price: 260,
    priceOriginal: null,
    badge: 'นิยมสูง',
    badgeType: 'new',
    rating: 4.7,
    reviewCount: 94,
    sold: 867,
    href: 'products/a034.html',
    emoji: '🌱',
    shortDesc: 'ผลรูปทรงยาว เนื้อเหลืองครีม รสมันเนย ฮอตที่สุดในตลาด',
    tags: ['พันธุ์เวียดนาม', 'ปลูกง่าย', 'ผลยาว', 'รสมันเนย'],
  },
  {
    id: 'ta21',
    nameTh: 'ต้นอโวคาโด TA21',
    nameEn: 'TA21 Avocado',
    variety: 'TA21',
    group: 'vietnam',
    price: 290,
    priceOriginal: 340,
    badge: 'แนะนำ',
    badgeType: '',
    rating: 4.6,
    reviewCount: 68,
    sold: 523,
    href: 'products/ta21.html',
    emoji: '🌿',
    shortDesc: 'รสชาติใกล้เคียงแฮส ผลกลม เปลือกขรุขระ ออกผลดก ไขมัน 16%',
    tags: ['พันธุ์เวียดนาม', 'ปลูกง่าย', 'ออกผลดก'],
  },
  {
    id: 'cuba',
    nameTh: 'ต้นอโวคาโดคิวบา',
    nameEn: 'Cuba Avocado',
    variety: 'Cuba',
    group: 'vietnam',
    price: 250,
    priceOriginal: null,
    badge: null,
    badgeType: '',
    rating: 4.3,
    reviewCount: 45,
    sold: 512,
    href: 'products/cuba.html',
    emoji: '🌳',
    shortDesc: 'นิยมสูงในเวียดนาม ปลูกง่าย ทนอากาศร้อน เหมาะพื้นที่ราบ',
    tags: ['พันธุ์เวียดนาม', 'ปลูกง่าย', 'ทนร้อน', 'ผลกลม'],
  },
  {
    id: 'big',
    nameTh: 'ต้นอโวคาโดบิ๊ก',
    nameEn: 'Big Avocado',
    variety: 'Big',
    group: 'vietnam',
    price: 270,
    priceOriginal: null,
    badge: null,
    badgeType: '',
    rating: 4.4,
    reviewCount: 38,
    sold: 289,
    href: 'products/big.html',
    emoji: '🌿',
    shortDesc: 'ผลขนาดใหญ่พิเศษจากเวียดนาม เนื้อแน่น รสหวาน',
    tags: ['พันธุ์เวียดนาม', 'ผลใหญ่', 'ทนร้อน'],
  },
  {
    id: 'red-vietnam',
    nameTh: 'ต้นอโวคาโดเรด เวียดนาม',
    nameEn: 'Red Vietnam Avocado',
    variety: 'Red Vietnam',
    group: 'vietnam',
    price: 260,
    priceOriginal: null,
    badge: null,
    badgeType: '',
    rating: 4.5,
    reviewCount: 52,
    sold: 334,
    href: 'products/red-vietnam.html',
    emoji: '🍂',
    shortDesc: 'เปลือกสีแดงม่วงสวยงาม หายาก เนื้อสีเหลืองทอง รสมันหวาน',
    tags: ['พันธุ์เวียดนาม', 'เปลือกแดง', 'หายาก'],
  },
  {
    id: 'seedless',
    nameTh: 'ต้นอโวคาโดไร้เมล็ด',
    nameEn: 'Cocktail Seedless Avocado',
    variety: 'Seedless',
    group: 'vietnam',
    price: 350,
    priceOriginal: null,
    badge: 'หายาก',
    badgeType: 'sale',
    rating: 4.7,
    reviewCount: 16,
    sold: 78,
    href: 'products/seedless.html',
    emoji: '✨',
    shortDesc: 'อโวคาโดไร้เมล็ด กินได้ทั้งผล ไม่มีเมล็ด หายากมาก',
    tags: ['พันธุ์เวียดนาม', 'ไร้เมล็ด', 'หายาก', 'พรีเมียม'],
  },

  /* ─── Group: special (พันธุ์พิเศษ) ─── */
  {
    id: 'ruhiel',
    nameTh: 'ต้นอโวคาโดรูเฮิล',
    nameEn: 'Ruhiel Avocado',
    variety: 'Ruhiel',
    group: 'special',
    price: 400,
    priceOriginal: null,
    badge: 'พิเศษ',
    badgeType: 'new',
    rating: 4.8,
    reviewCount: 11,
    sold: 43,
    href: 'products/ruhiel.html',
    emoji: '💎',
    shortDesc: 'สายพันธุ์หายาก ทนแล้ง ผลรูปยาว รสชาติเป็นเอกลักษณ์',
    tags: ['พันธุ์พิเศษ', 'ทนแล้ง', 'พรีเมียม', 'หายาก'],
  },
];

/* "ปลูกง่าย" group IDs */
const EASY_GROW_IDS = ['booth7', 'cuba', 'big', 'a034', 'ta21'];

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

/* ══════════════════════════════════════════════
   sendInterest(product) — ส่งข้อความ + เพิ่มตะกร้า
   ══════════════════════════════════════════════ */
async function sendInterest(productOrName) {
  // รองรับทั้ง object และ string
  const isObj = typeof productOrName === 'object';
  const productName = isObj ? productOrName.nameTh : productOrName;
  const product = isObj ? productOrName : null;

  const btn = document.getElementById('btn-order');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ กำลังส่ง...'; }

  try {
    const ok = await initLiff();
    if (!ok) throw new Error('LIFF init failed');

    if (!liff.isLoggedIn()) {
      sessionStorage.setItem('pendingProduct', JSON.stringify(productOrName));
      liff.login();
      return;
    }

    const msg = `🌿 สนใจสั่งซื้อต้นไม้: ${productName}${product ? `\n💰 ราคา: ฿${product.price.toLocaleString()}/ต้น` : ''}\n\nกรุณาติดต่อแอดมินเพื่อสั่งซื้อ 😊`;
    await liff.sendMessages([{ type: 'text', text: msg }]);

    // เพิ่มลงตะกร้า
    if (product) Cart.add(product);
    else Cart.addById(productName);

    showToast('✅ ส่งข้อความสำเร็จ! เพิ่มในตะกร้าแล้ว');
    if (liff.isInClient()) setTimeout(() => liff.closeWindow(), 1800);

  } catch (err) {
    console.error('[sendInterest]', err);
    // Fallback: เพิ่มในตะกร้าอยู่ดีแม้ LIFF ไม่ทำงาน
    if (product) Cart.add(product);
    showToast('🛒 เพิ่มในตะกร้าแล้ว (กรุณาติดต่อแอดมินโดยตรง)');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> สนใจสั่งซื้อ`;
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
   CART — จัดการตะกร้าสินค้า (localStorage)
   ══════════════════════════════════════════════ */
const Cart = {
  _key: 'avocado_cart',

  getAll() {
    return JSON.parse(localStorage.getItem(this._key) || '[]');
  },

  add(product) {
    const items = this.getAll();
    const exists = items.find(i => i.id === product.id);
    if (!exists) {
      items.push({
        id: product.id,
        nameTh: product.nameTh,
        variety: product.variety,
        price: product.price,
        emoji: product.emoji,
        addedAt: Date.now(),
      });
      localStorage.setItem(this._key, JSON.stringify(items));
    }
    this._updateBadge();
  },

  addById(name) {
    // fallback เมื่อไม่มี product object
    const p = PRODUCTS.find(p => p.nameTh === name || p.nameEn === name);
    if (p) this.add(p);
  },

  remove(id) {
    const items = this.getAll().filter(i => i.id !== id);
    localStorage.setItem(this._key, JSON.stringify(items));
    this._updateBadge();
  },

  clear() {
    localStorage.removeItem(this._key);
    this._updateBadge();
  },

  count() { return this.getAll().length; },

  total() { return this.getAll().reduce((s, i) => s + (i.price || 0), 0); },

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
   PRODUCT GRID — render & filter
   ══════════════════════════════════════════════ */
let currentGroup = 'all';
let searchQuery = '';

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchGroup =
      currentGroup === 'all' ? true :
        currentGroup === 'easy' ? EASY_GROW_IDS.includes(p.id) :
          p.group === currentGroup;
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

function buildStars(r) {
  const full = Math.floor(r), half = r % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

function renderProductCard(p) {
  const liked = Wishlist.has(p.id);
  const badgeCls = p.badgeType === 'sale' ? 'product-card__badge--sale' : p.badgeType === 'new' ? 'product-card__badge--new' : '';
  return `
    <article class="product-card animate-in" role="listitem" aria-label="${p.nameTh}" id="card-${p.id}">
      ${p.badge ? `<span class="product-card__badge ${badgeCls}">${p.badge}</span>` : ''}
      <div class="product-card__img-wrap">
        <div class="product-card__img--placeholder">${p.emoji}</div>
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
  if (counter) counter.textContent = `${list.length} สายพันธุ์`;
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

/* ── Category Filter ── */
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
   SLIDE-UP PANELS (Cart & Profile)
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

/* ── Cart Panel ── */
function renderCartPanel() {
  const body = document.getElementById('cart-panel-body');
  const footer = document.getElementById('cart-panel-footer');
  if (!body) return;
  const items = Cart.getAll();
  if (!items.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty__icon">🛒</div>
      <div class="cart-empty__title">ตะกร้าว่างเปล่า</div>
      <div class="cart-empty__desc">กดปุ่ม "สนใจสั่งซื้อ" เพื่อเพิ่มต้นไม้ลงตะกร้า</div>
    </div>`;
    if (footer) footer.innerHTML = '';
    return;
  }
  body.innerHTML = items.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item__emoji">${item.emoji || '🌿'}</div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.nameTh}</div>
        <div class="cart-item__variety">${item.variety}</div>
      </div>
      <div class="cart-item__price">฿${(item.price || 0).toLocaleString()}</div>
      <button class="cart-item__remove" onclick="removeCartItem('${item.id}')" aria-label="ลบออก">✕</button>
    </div>`).join('');
  if (footer) {
    footer.innerHTML = `
      <div class="cart-panel__total">
        <span class="cart-panel__total-label">รวมทั้งหมด (${items.length} ต้น)</span>
        <span class="cart-panel__total-price">฿${Cart.total().toLocaleString()}</span>
      </div>
      <button class="cart-panel__clear" onclick="clearCart()">ล้างตะกร้าทั้งหมด</button>`;
  }
}

function removeCartItem(id) {
  Cart.remove(id);
  renderCartPanel();
  showToast('🗑️ ลบออกจากตะกร้าแล้ว', 2000);
}

function clearCart() {
  Cart.clear();
  renderCartPanel();
  showToast('🗑️ ล้างตะกร้าทั้งหมดแล้ว', 2000);
}

/* ── Profile Panel ── */
function renderProfilePanel() {
  const body = document.getElementById('profile-panel-body');
  if (!body) return;
  // Mock profile data — แทนที่ด้วยข้อมูลจาก LIFF ในอนาคต
  const profile = {
    name: 'คุณยุทธนา สวนอโวคาโด',
    tag: 'สมาชิก Premium · เชียงราย',
    avatar: '🌿',
    ordersCount: Cart.count(),
    wishlistCount: Wishlist.getAll().length,
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
      <div class="profile-menu-item" onclick="openPanel('cart-panel');renderCartPanel();">
        <div class="profile-menu-item__icon">🛒</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">ตะกร้าของฉัน</div>
          <div class="profile-menu-item__desc">${profile.ordersCount} รายการที่สนใจ</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
      <div class="profile-menu-item">
        <div class="profile-menu-item__icon">❤️</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">รายการโปรด</div>
          <div class="profile-menu-item__desc">${profile.wishlistCount} สายพันธุ์ที่ถูกใจ</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
      <div class="profile-menu-item">
        <div class="profile-menu-item__icon">📍</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">ที่อยู่จัดส่ง</div>
          <div class="profile-menu-item__desc">เพิ่มที่อยู่สำหรับจัดส่งต้นไม้</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
      <div class="profile-menu-item">
        <div class="profile-menu-item__icon">📞</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">ติดต่อแอดมิน</div>
          <div class="profile-menu-item__desc">LINE: @yutthanafarm</div>
        </div>
        <span class="profile-menu-item__arrow">›</span>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════
   PRODUCT PAGE SLIDER INIT (ใช้ในหน้า product detail)
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

  // Scroll event → update dots
  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    updateDots(idx);
  }, { passive: true });

  // Dot click → scroll to slide
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    });
  });

  updateDots(0);
}

/* ══════════════════════════════════════════════
   DOM READY
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
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

  // ── Slider (product detail page) ──
  initSlider();

  // ── Wishlist init on product detail page ──
  const detailWishBtn = document.getElementById('btn-wishlist-detail');
  if (detailWishBtn) {
    const pid = detailWishBtn.dataset.product;
    if (Wishlist.has(pid)) {
      const svg = detailWishBtn.querySelector('svg');
      if (svg) { svg.setAttribute('fill', '#e74c3c'); svg.setAttribute('stroke', '#e74c3c'); }
    }
    detailWishBtn.addEventListener('click', () => {
      const svg = detailWishBtn.querySelector('svg');
      const added = Wishlist.toggle(pid);
      if (svg) { svg.setAttribute('fill', added ? '#e74c3c' : 'none'); svg.setAttribute('stroke', added ? '#e74c3c' : 'currentColor'); }
      showToast(added ? '❤️ เพิ่มในรายการโปรดแล้ว' : '🤍 นำออกจากรายการโปรด', 2000);
    });
  }

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