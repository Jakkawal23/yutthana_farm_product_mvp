/* ============================================================
   product-script.js — Avocado Shop MVP Product Detail Page Script
   ============================================================ */

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


let PRODUCTS = [];
const EASY_GROW_IDS = ['cuba', 'booth7', 'ta21', 'phob-phra-08', 'ordinary_avocado', 'arabica_tree', 'abiu_tree'];

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

  _updateBadge() {
    const n = this.count();
    document.querySelectorAll('.nav-item__badge[data-for="cart"]').forEach(el => {
      el.textContent = n;
      el.classList.toggle('visible', n > 0);
    });
  },

  init() { this._updateBadge(); },
};

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

function showToast(message, ms = 3000) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('toast--show')));
  setTimeout(() => { el.classList.remove('toast--show'); setTimeout(() => el.remove(), 400); }, ms);
}

function getRelativePath(path) {
  if (!path) return null;
  const isProductPage = window.location.pathname.includes('/products/');
  return isProductPage ? `../${path}` : path;
}

function buildStars(r) {
  const full = Math.floor(r), half = r % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

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

function hydrateProductDetailPage(product) {
  document.title = `${product.nameTh} (${product.variety}) | ยุทธนา ฟาร์ม`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${product.nameTh} (${product.variety}) ต้นอโวคาโดเสียบยอดพรีเมียมจากยุทธนา ฟาร์ม แข็งแรง ทนทาน เจริญเติบโตเร็ว`);
  }

  const main = document.querySelector('main.product-detail');
  if (!main) return;

  const imagesPath = `../assets/images/products/${product.id}`;

  const highlights = [
    { icon: '🌱', text: `ต้นพันธุ์เสียบยอดแท้ 100% สายพันธุ์ ${product.variety} คัดสรรกิ่งพันธุ์คุณภาพดีจากต้นแม่ที่สมบูรณ์` },
    { icon: '📐', text: `ความสูงของต้นส่งมอบประมาณ 60-80 ซม. ระบบรากเดินเต็มถุง แข็งแรง พร้อมปลูกลงดินทันที` },
    { icon: '⏱️', text: `เติบโตเร็ว ให้ผลผลิตสม่ำเสมอ เริ่มติดผลผลิตหลังปลูกเพียง 3-4 ปี (เร็วกว่าปลูกด้วยเมล็ด)` },
    { icon: '🏔️', text: `เพาะเลี้ยงบนพื้นที่สูงดอยผาแดง อ.พบพระ จ.ตาก ทำให้ได้ต้นที่แข็งแรง ทนร้อนและหนาวได้ดีเยี่ยม` },
    { icon: '🛡️', text: `รับประกันความเสียหายจากการขนส่ง: หากต้นไม้หักหรือแห้งตายระหว่างส่ง ทางสวนส่งต้นใหม่ให้ทันที` }
  ];

  if (EASY_GROW_IDS.includes(product.id)) {
    highlights.push({ icon: '✨', text: `เป็นสายพันธุ์ที่ปลูกและดูแลง่าย โตไวเป็นพิเศษ เหมาะสำหรับมือใหม่` });
  }

  main.innerHTML = `
    <!-- Image Slider -->
    <div class="product-slider" style="position: relative;">
      <button class="product-slider__arrow product-slider__arrow--left" onclick="scrollSlider(-1)" aria-label="รูปภาพก่อนหน้า">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="product-slider__arrow product-slider__arrow--right" onclick="scrollSlider(1)" aria-label="รูปภาพถัดไป">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div class="product-slider__track" id="slider-track">
        <div class="product-slider__slide"><img src="${imagesPath}/00.png" alt="${product.nameTh} - รูปที่ 1" onerror="this.src='../assets/images/logo.png'; this.style.objectFit='contain';"></div>
        <div class="product-slider__slide"><img src="${imagesPath}/01.png" alt="${product.nameTh} - รูปที่ 2" onerror="this.parentNode.style.display='none';"></div>
        <div class="product-slider__slide"><img src="${imagesPath}/02.png" alt="${product.nameTh} - รูปที่ 3" onerror="this.parentNode.style.display='none';"></div>
        <div class="product-slider__slide"><img src="${imagesPath}/03.png" alt="${product.nameTh} - รูปที่ 4" onerror="this.parentNode.style.display='none';"></div>
      </div>
      <div class="product-slider__dots" id="slider-dots">
        <button class="product-slider__dot product-slider__dot--active" aria-label="Slide 1"></button>
        <button class="product-slider__dot" aria-label="Slide 2"></button>
        <button class="product-slider__dot" aria-label="Slide 3"></button>
        <button class="product-slider__dot" aria-label="Slide 4"></button>
      </div>
      ${product.badge ? `<span class="product-slider__ribbon ${product.badgeType === 'sale' ? 'product-slider__ribbon--sale' : ''}">${product.badge}</span>` : ''}
    </div>

    <!-- Product Name & Rating -->
    <div class="product-info-section">
      <div class="product-info-section__variety">
        <span class="product-info-section__variety-dot" aria-hidden="true"></span>
        ${product.nameEn}
      </div>
      <h1 class="product-info-section__name">
        ${product.nameTh}
        <div class="product-info-section__name-th">ต้นพันธุ์อโวคาโดสายพันธุ์ ${product.variety}</div>
      </h1>
      <div class="product-info-section__rating-row">
        <span class="product-info-section__stars" aria-label="คะแนน ${product.rating} จาก 5">${buildStars(product.rating)}</span>
        <span class="product-info-section__reviews">${product.rating} (${product.reviewCount} รีวิว)</span>
        <span class="product-info-section__sold">ขายแล้ว ${product.sold} ต้น</span>
      </div>
    </div>

    <!-- Price Box -->
    <div class="price-box" role="group" aria-label="ราคาสินค้า">
      <div>
        <div class="price-box__price">฿${product.price.toLocaleString()}</div>
        <div class="price-box__unit">ต่อต้น (ต้นพันธุ์เสียบยอดแข็งแรง)</div>
      </div>
      ${product.priceOriginal ? `
      <div style="text-align:right;">
        <div class="price-box__original">฿${product.priceOriginal.toLocaleString()}</div>
        <span class="price-box__discount-badge">ลด ฿${(product.priceOriginal - product.price).toLocaleString()}</span>
      </div>` : ''}
    </div>

    <!-- Feature Tags -->
    <div class="feature-tags" role="list" aria-label="คุณสมบัติ">
      <span class="feature-tag" role="listitem">🌿 เสียบยอดแท้</span>
      <span class="feature-tag" role="listitem">📐 สูง 60-80 ซม.</span>
      <span class="feature-tag" role="listitem">💚 รากเดินเต็ม</span>
      <span class="feature-tag" role="listitem">🚚 ส่งด่วนแพ็กหนา</span>
      <span class="feature-tag" role="listitem">🛡️ รับประกันสินค้า</span>
    </div>

    <!-- Desktop Inline Order Button -->
    <div class="order-inline-section">
      <button class="order-inline-section__chat" aria-label="ติดต่อแอดมิน" onclick="contactAdmin('${product.nameTh} (${product.variety})')">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      <button class="order-inline-section__btn" onclick="handleAddToCartClick('${product.id}')" style="font-family: 'Kanit', sans-serif;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        เพิ่มลงในตะกร้า
      </button>
    </div>

    <hr class="info-divider" />

    <!-- Description -->
    <section class="description-section" aria-labelledby="heading-about">
      <h2 class="description-section__title" id="heading-about">รายละเอียดต้นพันธุ์</h2>
      <p style="font-size: 0.9rem; color: var(--color-text); margin-bottom: 16px; line-height: 1.6;">
        ${product.shortDesc}. ทางสวนยุทธนา ฟาร์ม ดอยผาแดง คัดสรรยอดพันธุ์ที่สมบูรณ์ตรงสายพันธุ์มาเสียบยอดบนต้นตอพันธุ์พื้นเมืองที่เพาะจากเมล็ด ทำให้มีระบบรากแก้วที่แข็งแรง หาอาหารเก่ง ทนแล้ง และต้านทานโรครากเน่าโคนเน่าได้ดีเยี่ยม
      </p>
      <ul class="highlight-list">
        ${highlights.map(hl => `
        <li class="highlight-list__item">
          <span class="highlight-list__icon" aria-hidden="true">${hl.icon}</span>
          <span>${hl.text}</span>
        </li>`).join('')}
      </ul>
    </section>

    <!-- Description Image Strip -->
    <section class="description-section">
      <h2 class="description-section__title">ภาพอัปเดตจากสวนและผลผลิต</h2>
      <div class="desc-images-wrap">
        <button class="desc-slider-arrow desc-slider-arrow--left" onclick="scrollDescImages(-1)" aria-label="รูปก่อนหน้า">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="desc-slider-arrow desc-slider-arrow--right" onclick="scrollDescImages(1)" aria-label="รูปถัดไป">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <div class="desc-images" id="desc-images-track">
          <div class="desc-image">
            <img src="${imagesPath}/04.png" alt="รายละเอียดสินค้า 1" onerror="this.parentNode.style.display='none';">
            <span class="desc-image__caption">กิ่งพันธุ์เสียบยอดแข็งแรง</span>
          </div>
          <div class="desc-image">
            <img src="${imagesPath}/05.png" alt="รายละเอียดสินค้า 2" onerror="this.parentNode.style.display='none';">
            <span class="desc-image__caption">การเลี้ยงต้นพันธุ์ในโรงเรือน</span>
          </div>
          <div class="desc-image">
            <img src="${imagesPath}/06.png" alt="รายละเอียดสินค้า 3" onerror="this.parentNode.style.display='none';">
            <span class="desc-image__caption">ความสมบูรณ์ของใบและยอด</span>
          </div>
          <div class="desc-image">
            <img src="${imagesPath}/07.png" alt="รายละเอียดสินค้า 4" onerror="this.parentNode.style.display='none';">
            <span class="desc-image__caption">ผลผลิตขนาดใหญ่สมบูรณ์</span>
          </div>
          <div class="desc-image">
            <img src="${imagesPath}/08.png" alt="รายละเอียดสินค้า 5" onerror="this.parentNode.style.display='none';">
            <span class="desc-image__caption">เนื้อด้านในของผลผลิตจริง</span>
          </div>
        </div>
      </div>
    </section>

    <hr class="info-divider" style="margin-top:16px;" />

    <!-- Specs -->
    <section class="description-section" aria-labelledby="heading-specs">
      <h2 class="description-section__title" id="heading-specs">ข้อมูลจำเพาะของสายพันธุ์</h2>
      <table class="specs-table">
        <tbody>
          <tr>
            <td>สายพันธุ์</td>
            <td>${product.variety} (${product.nameTh.replace('ต้นอโวคาโด', '')})</td>
          </tr>
          <tr>
            <td>ประเภทต้นพันธุ์</td>
            <td>กิ่งเสียบยอดบนต้นตอพื้นเมือง (Grafted Tree)</td>
          </tr>
          <tr>
            <td>ความสูงต้นส่งมอบ</td>
            <td>60 – 80 เซนติเมตร</td>
          </tr>
          <tr>
            <td>ระยะเวลาเริ่มติดผล</td>
            <td>3 – 4 ปี (เมื่อดูแลตามคำแนะนำ)</td>
          </tr>
          <tr>
            <td>สภาพอากาศที่เหมาะสม</td>
            <td>เจริญเติบโตได้ทั่วทุกภูมิภาคของไทย ทนร้อนทนแล้งได้ดี</td>
          </tr>
          <tr>
            <td>การบรรจุจัดส่ง</td>
            <td>ห่อหุ้มตุ้มรากหนาแน่น บรรจุกล่องหนาพิเศษ ป้องกันต้นหัก</td>
          </tr>
        </tbody>
      </table>
    </section>

    <div style="height: 100px;" aria-hidden="true"></div>
  `;

  const orderBar = document.querySelector('.order-bar');
  if (orderBar) {
    orderBar.innerHTML = `
      <button class="order-bar__chat-btn" aria-label="ติดต่อแอดมิน" onclick="contactAdmin('${product.nameTh} (${product.variety})')" id="btn-chat">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      <button
        class="order-bar__main-btn order-bar__main-btn--pulse"
        onclick="handleAddToCartClick('${product.id}')"
        id="btn-order"
        aria-label="เพิ่มลงในตะกร้า"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        เพิ่มลงในตะกร้า
      </button>
    `;
  }

  const wishlistDetailBtn = document.getElementById('btn-wishlist-detail');
  if (wishlistDetailBtn) {
    wishlistDetailBtn.dataset.product = product.id;
    const isLiked = Wishlist.has(product.id);
    const svg = wishlistDetailBtn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isLiked ? '#e74c3c' : 'none');
      svg.setAttribute('stroke', isLiked ? '#e74c3c' : 'currentColor');
    }

    const newBtn = wishlistDetailBtn.cloneNode(true);
    wishlistDetailBtn.parentNode.replaceChild(newBtn, wishlistDetailBtn);
    newBtn.addEventListener('click', () => {
      const added = Wishlist.toggle(product.id);
      const newSvg = newBtn.querySelector('svg');
      if (newSvg) {
        newSvg.setAttribute('fill', added ? '#e74c3c' : 'none');
        newSvg.setAttribute('stroke', added ? '#e74c3c' : 'currentColor');
      }
      showToast(added ? '❤️ เพิ่มในรายการโปรดแล้ว' : '🤍 นำออกจากรายการโปรด', 2000);
    });
  }

  initSlider('slider-track', 'slider-dots');
}

window.handleAddToCartClick = function (productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (p) {
    Cart.add(p, 1);
    showToast('🛒 เพิ่มลงในตะกร้าเรียบร้อยแล้ว!');
  }
};

window.contactAdmin = async function (subject) {
  const btn = document.getElementById('btn-chat');
  if (btn) { btn.disabled = true; }

  const msgText = subject
    ? `🌿 สนใจสั่งซื้อ: ${subject}\n\nกรุณาติดต่อแอดมินเพื่อสั่งซื้อ 😊`
    : `🌿 สวัสดีครับ ติดต่อแอดมินสวนยุทธนา ฟาร์ม ดอยผาแดง\n\nสนใจสอบถามข้อมูลต้นอโวคาโดครับ 😊`;

  try {
    const result = await sendMessageToLine(msgText);
    if (result === 'sent') {
      showToast('✅ ส่งข้อความสนใจสินค้าสำเร็จ!');
      if (liff.isInClient()) setTimeout(() => liff.closeWindow(), 1800);
    } else if (result === 'shared') {
      showToast('✅ แชร์ข้อความสนใจสินค้าสำเร็จ!');
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
      showToast(`📞 กรุณาติดต่อ LINE: ${lineName}`);
    }
  } catch (err) {
    console.error('[contactAdmin]', err);
    const lineName = typeof window.CONFIG !== 'undefined' ? window.CONFIG.LINE_NAME : 'Yutthana Farm';
    showToast(`📞 กรุณาติดต่อ LINE: ${lineName}`);
  } finally {
    if (btn) { btn.disabled = false; }
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadEnv();
  await loadData();
  Cart.init();

  const isProductDetailPage = window.location.pathname.includes('/products/');
  if (isProductDetailPage) {
    const parts = window.location.pathname.split('/');
    const filename = parts[parts.length - 1]; // e.g. "hass.html"

    const id = filename.replace('.html', '');
    const product = PRODUCTS.find(p => p.id === id); // FIX ID MATCHING BUG
    if (product) {
      hydrateProductDetailPage(product);
    }
  }

  checkPendingProduct();
});
