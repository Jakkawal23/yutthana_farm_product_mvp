/* ============================================================
   script.js ΓÇö Avocado Shop MVP  v2.0
   ============================================================ */

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   ΓÜÖ∩╕Å LIFF CONFIG ΓÇö α╣üα╕üα╣ëα╣äα╕é LIFF ID α╕éα╕¡α╕çα╕äα╕╕α╕ôα╕òα╕úα╕çα╕Öα╕╡α╣ë
   1. α╣äα╕¢α╕ùα╕╡α╣ê https://developers.line.biz/console/
   2. α╕¬α╕úα╣ëα╕▓α╕ç Channel ΓåÆ LINE Login ΓåÆ α╣Çα╕¢α╕┤α╕öα╣üα╕ùα╣çα╕Ü LIFF
   3. Copy LIFF ID α╕íα╕▓α╕ºα╕▓α╕çα╣üα╕ùα╕Ö "YOUR_LIFF_ID_HERE"
   ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const LIFF_CONFIG = {
  liffId: "YOUR_LIFF_ID_HERE", // ΓåÉ α╣üα╕üα╣ëα╕òα╕úα╕çα╕Öα╕╡α╣ë !!
};

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   PRODUCT DATA ΓÇö α╕éα╣ëα╕¡α╕íα╕╣α╕Ñα╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕ùα╕▒α╣ëα╕çα╕½α╕íα╕ö 13 α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣î
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
const PRODUCTS = [
  /* ΓöÇΓöÇΓöÇ Group: royal (α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕ç) ΓöÇΓöÇΓöÇ */
  {
    id: 'hass',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╣üα╕«α╕¬',
    nameEn: 'Hass Avocado',
    variety: 'Hass',
    group: 'royal',
    price: 350,
    priceOriginal: 420,
    badge: 'α╕óα╕¡α╕öα╕Öα╕┤α╕óα╕í',
    badgeType: '',
    rating: 4.9,
    reviewCount: 128,
    sold: 1240,
    href: 'products/hass.html',
    emoji: '≡ƒî┐',
    shortDesc: 'α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕óα╕¡α╕öα╕Öα╕┤α╕óα╕í α╣Çα╕Öα╕╖α╣ëα╕¡α╕äα╕úα╕╡α╕íα╕íα╕╡α╣ê α╣Çα╕íα╕Ñα╣çα╕öα╣Çα╕Ñα╣çα╕ü α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕çα╕¬α╣êα╕çα╣Çα╕¬α╕úα╕┤α╕í',
    tags: ['α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕ç', 'α╣Çα╕íα╕Ñα╣çα╕öα╣Çα╕Ñα╣çα╕ü', 'α╣Çα╕Öα╕╖α╣ëα╕¡α╕íα╕▒α╕Ö', 'α╕¡α╕¡α╕üα╕£α╕Ñα╕öα╕ü'],
  },
  {
    id: 'pinkerton',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕₧α╕┤α╕çα╕äα╣îα╣Çα╕äα╕¡α╕úα╣îα╕òα╕▒α╕Ö',
    nameEn: 'Pinkerton Avocado',
    variety: 'Pinkerton',
    group: 'royal',
    price: 300,
    priceOriginal: null,
    badge: 'α╣âα╕½α╕íα╣ê',
    badgeType: 'new',
    rating: 4.7,
    reviewCount: 86,
    sold: 432,
    href: 'products/pinkerton.html',
    emoji: '≡ƒî▒',
    shortDesc: 'α╕£α╕Ñα╕óα╕▓α╕º α╣Çα╕Öα╕╖α╣ëα╕¡α╣Çα╕óα╕¡α╕░α╕íα╕▓α╕ü α╣Çα╕¢α╕Ñα╕╖α╕¡α╕üα╕Üα╕▓α╕ç α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕çα╕¬α╣êα╕çα╣Çα╕¬α╕úα╕┤α╕í',
    tags: ['α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕ç', 'α╕£α╕Ñα╕óα╕▓α╕º', 'α╣Çα╕Öα╕╖α╣ëα╕¡α╣Çα╕óα╕¡α╕░'],
  },
  {
    id: 'buccanier',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕Üα╕▒α╕äα╕äα╕▓α╣Çα╕Öα╕╡α╕ó',
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
    emoji: '≡ƒî┐',
    shortDesc: 'α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕¡α╕¡α╕¬α╣Çα╕òα╕úα╣Çα╕Ñα╕╡α╕ó α╕úα╕¬α╕½α╕ºα╕▓α╕Ö α╣Çα╕Öα╕╖α╣ëα╕¡α╕Ñα╕░α╣Çα╕¡α╕╡α╕óα╕ö α╣äα╕íα╣êα╕íα╕╡α╣Çα╕¬α╣ëα╕Ö',
    tags: ['α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕ç', 'α╕úα╕¬α╕½α╕ºα╕▓α╕Ö', 'α╣Çα╕½α╕íα╕▓α╕░α╕ùα╕│α╕¡α╕▓α╕½α╕▓α╕ú'],
  },
  {
    id: 'booth7',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕Üα╕╣α╕ù-7',
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
    emoji: '≡ƒî│',
    shortDesc: 'α╕ùα╕Öα╕¡α╕▓α╕üα╕▓α╕¿α╕½α╕Öα╕▓α╕º α╕¢α╕Ñα╕╣α╕üα╕çα╣êα╕▓α╕ó α╕¡α╕¡α╕üα╕£α╕Ñα╕ñα╕öα╕╣α╕½α╕Öα╕▓α╕º α╣Çα╕¢α╕Ñα╕╖α╕¡α╕üα╕¬α╕╡α╣Çα╕éα╕╡α╕óα╕º',
    tags: ['α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕ç', 'α╕¢α╕Ñα╕╣α╕üα╕çα╣êα╕▓α╕ó', 'α╕ùα╕Öα╕¡α╕▓α╕üα╕▓α╕¿', 'α╕ñα╕öα╕╣α╕½α╕Öα╕▓α╕º'],
  },
  {
    id: 'peterson',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕¢α╕╡α╣Çα╕òα╕¡α╕úα╣îα╕¬α╕▒α╕Ö',
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
    emoji: '≡ƒî┤',
    shortDesc: 'α╕£α╕Ñα╕éα╕Öα╕▓α╕öα╣âα╕½α╕ìα╣êα╕ùα╕╡α╣êα╕¬α╕╕α╕ö α╕úα╕¬α╕½α╕ºα╕▓α╕Öα╣Çα╕éα╣ëα╕íα╕éα╣ëα╕Ö α╣Çα╕¢α╕Ñα╕╖α╕¡α╕üα╕Üα╕▓α╕çα╕íα╕▓α╕ü α╕₧α╕úα╕╡α╣Çα╕íα╕╡α╕óα╕í',
    tags: ['α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕ç', 'α╕£α╕Ñα╣âα╕½α╕ìα╣ê', 'α╕₧α╕úα╕╡α╣Çα╕íα╕╡α╕óα╕í'],
  },
  {
    id: 'phob-phra-08',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕₧α╕Üα╕₧α╕úα╕░ 08',
    nameEn: 'Phob Phra 08 Avocado',
    variety: 'Phob Phra 08',
    group: 'royal',
    price: 280,
    priceOriginal: null,
    badge: 'α╕ùα╣ëα╕¡α╕çα╕ûα╕┤α╣êα╕Ö',
    badgeType: 'new',
    rating: 4.5,
    reviewCount: 22,
    sold: 145,
    href: 'products/phob-phra-08.html',
    emoji: '≡ƒî┐',
    shortDesc: 'α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕äα╕▒α╕öα╣Çα╕Ñα╕╖α╕¡α╕üα╕êα╕▓α╕üα╕¬α╕ûα╕▓α╕Öα╕╡α╕ºα╕┤α╕êα╕▒α╕óα╕₧α╕Üα╕₧α╕úα╕░ α╕ê.α╕òα╕▓α╕ü α╕äα╕╕α╕ôα╕áα╕▓α╕₧α╕öα╕╡',
    tags: ['α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕½α╕Ñα╕ºα╕ç', 'α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕ùα╣ëα╕¡α╕çα╕ûα╕┤α╣êα╕Ö', 'α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕òα╕▓α╕ü'],
  },

  /* ΓöÇΓöÇΓöÇ Group: vietnam (α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í ΓÇö α╕úα╕ºα╕í A034, TA21) ΓöÇΓöÇΓöÇ */
  {
    id: 'a034',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕ö A034',
    nameEn: 'A034 Avocado',
    variety: 'A034',
    group: 'vietnam',
    price: 260,
    priceOriginal: null,
    badge: 'α╕Öα╕┤α╕óα╕íα╕¬α╕╣α╕ç',
    badgeType: 'new',
    rating: 4.7,
    reviewCount: 94,
    sold: 867,
    href: 'products/a034.html',
    emoji: '≡ƒî▒',
    shortDesc: 'α╕£α╕Ñα╕úα╕╣α╕¢α╕ùα╕úα╕çα╕óα╕▓α╕º α╣Çα╕Öα╕╖α╣ëα╕¡α╣Çα╕½α╕Ñα╕╖α╕¡α╕çα╕äα╕úα╕╡α╕í α╕úα╕¬α╕íα╕▒α╕Öα╣Çα╕Öα╕ó α╕«α╕¡α╕òα╕ùα╕╡α╣êα╕¬α╕╕α╕öα╣âα╕Öα╕òα╕Ñα╕▓α╕ö',
    tags: ['α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í', 'α╕¢α╕Ñα╕╣α╕üα╕çα╣êα╕▓α╕ó', 'α╕£α╕Ñα╕óα╕▓α╕º', 'α╕úα╕¬α╕íα╕▒α╕Öα╣Çα╕Öα╕ó'],
  },
  {
    id: 'ta21',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕ö TA21',
    nameEn: 'TA21 Avocado',
    variety: 'TA21',
    group: 'vietnam',
    price: 290,
    priceOriginal: 340,
    badge: 'α╣üα╕Öα╕░α╕Öα╕│',
    badgeType: '',
    rating: 4.6,
    reviewCount: 68,
    sold: 523,
    href: 'products/ta21.html',
    emoji: '≡ƒî┐',
    shortDesc: 'α╕úα╕¬α╕èα╕▓α╕òα╕┤α╣âα╕üα╕Ñα╣ëα╣Çα╕äα╕╡α╕óα╕çα╣üα╕«α╕¬ α╕£α╕Ñα╕üα╕Ñα╕í α╣Çα╕¢α╕Ñα╕╖α╕¡α╕üα╕éα╕úα╕╕α╕éα╕úα╕░ α╕¡α╕¡α╕üα╕£α╕Ñα╕öα╕ü α╣äα╕éα╕íα╕▒α╕Ö 16%',
    tags: ['α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í', 'α╕¢α╕Ñα╕╣α╕üα╕çα╣êα╕▓α╕ó', 'α╕¡α╕¡α╕üα╕£α╕Ñα╕öα╕ü'],
  },
  {
    id: 'cuba',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕äα╕┤α╕ºα╕Üα╕▓',
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
    emoji: '≡ƒî│',
    shortDesc: 'α╕Öα╕┤α╕óα╕íα╕¬α╕╣α╕çα╣âα╕Öα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í α╕¢α╕Ñα╕╣α╕üα╕çα╣êα╕▓α╕ó α╕ùα╕Öα╕¡α╕▓α╕üα╕▓α╕¿α╕úα╣ëα╕¡α╕Ö α╣Çα╕½α╕íα╕▓α╕░α╕₧α╕╖α╣ëα╕Öα╕ùα╕╡α╣êα╕úα╕▓α╕Ü',
    tags: ['α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í', 'α╕¢α╕Ñα╕╣α╕üα╕çα╣êα╕▓α╕ó', 'α╕ùα╕Öα╕úα╣ëα╕¡α╕Ö', 'α╕£α╕Ñα╕üα╕Ñα╕í'],
  },
  {
    id: 'big',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕Üα╕┤α╣èα╕ü',
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
    emoji: '≡ƒî┐',
    shortDesc: 'α╕£α╕Ñα╕éα╕Öα╕▓α╕öα╣âα╕½α╕ìα╣êα╕₧α╕┤α╣Çα╕¿α╕⌐α╕êα╕▓α╕üα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í α╣Çα╕Öα╕╖α╣ëα╕¡α╣üα╕Öα╣êα╕Ö α╕úα╕¬α╕½α╕ºα╕▓α╕Ö',
    tags: ['α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í', 'α╕£α╕Ñα╣âα╕½α╕ìα╣ê', 'α╕ùα╕Öα╕úα╣ëα╕¡α╕Ö'],
  },
  {
    id: 'red-vietnam',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╣Çα╕úα╕ö α╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í',
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
    emoji: '≡ƒìé',
    shortDesc: 'α╣Çα╕¢α╕Ñα╕╖α╕¡α╕üα╕¬α╕╡α╣üα╕öα╕çα╕íα╣êα╕ºα╕çα╕¬α╕ºα╕óα╕çα╕▓α╕í α╕½α╕▓α╕óα╕▓α╕ü α╣Çα╕Öα╕╖α╣ëα╕¡α╕¬α╕╡α╣Çα╕½α╕Ñα╕╖α╕¡α╕çα╕ùα╕¡α╕ç α╕úα╕¬α╕íα╕▒α╕Öα╕½α╕ºα╕▓α╕Ö',
    tags: ['α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í', 'α╣Çα╕¢α╕Ñα╕╖α╕¡α╕üα╣üα╕öα╕ç', 'α╕½α╕▓α╕óα╕▓α╕ü'],
  },
  {
    id: 'seedless',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╣äα╕úα╣ëα╣Çα╕íα╕Ñα╣çα╕ö',
    nameEn: 'Cocktail Seedless Avocado',
    variety: 'Seedless',
    group: 'vietnam',
    price: 350,
    priceOriginal: null,
    badge: 'α╕½α╕▓α╕óα╕▓α╕ü',
    badgeType: 'sale',
    rating: 4.7,
    reviewCount: 16,
    sold: 78,
    href: 'products/seedless.html',
    emoji: 'Γ£¿',
    shortDesc: 'α╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╣äα╕úα╣ëα╣Çα╕íα╕Ñα╣çα╕ö α╕üα╕┤α╕Öα╣äα╕öα╣ëα╕ùα╕▒α╣ëα╕çα╕£α╕Ñ α╣äα╕íα╣êα╕íα╕╡α╣Çα╕íα╕Ñα╣çα╕ö α╕½α╕▓α╕óα╕▓α╕üα╕íα╕▓α╕ü',
    tags: ['α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╣Çα╕ºα╕╡α╕óα╕öα╕Öα╕▓α╕í', 'α╣äα╕úα╣ëα╣Çα╕íα╕Ñα╣çα╕ö', 'α╕½α╕▓α╕óα╕▓α╕ü', 'α╕₧α╕úα╕╡α╣Çα╕íα╕╡α╕óα╕í'],
  },

  /* ΓöÇΓöÇΓöÇ Group: special (α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕₧α╕┤α╣Çα╕¿α╕⌐) ΓöÇΓöÇΓöÇ */
  {
    id: 'ruhiel',
    nameTh: 'α╕òα╣ëα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕öα╕úα╕╣α╣Çα╕«α╕┤α╕Ñ',
    nameEn: 'Ruhiel Avocado',
    variety: 'Ruhiel',
    group: 'special',
    price: 400,
    priceOriginal: null,
    badge: 'α╕₧α╕┤α╣Çα╕¿α╕⌐',
    badgeType: 'new',
    rating: 4.8,
    reviewCount: 11,
    sold: 43,
    href: 'products/ruhiel.html',
    emoji: '≡ƒÆÄ',
    shortDesc: 'α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕½α╕▓α╕óα╕▓α╕ü α╕ùα╕Öα╣üα╕Ñα╣ëα╕ç α╕£α╕Ñα╕úα╕╣α╕¢α╕óα╕▓α╕º α╕úα╕¬α╕èα╕▓α╕òα╕┤α╣Çα╕¢α╣çα╕Öα╣Çα╕¡α╕üα╕Ñα╕▒α╕üα╕⌐α╕ôα╣î',
    tags: ['α╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕₧α╕┤α╣Çα╕¿α╕⌐', 'α╕ùα╕Öα╣üα╕Ñα╣ëα╕ç', 'α╕₧α╕úα╕╡α╣Çα╕íα╕╡α╕óα╕í', 'α╕½α╕▓α╕óα╕▓α╕ü'],
  },
];

/* "α╕¢α╕Ñα╕╣α╕üα╕çα╣êα╕▓α╕ó" group IDs */
const EASY_GROW_IDS = ['booth7', 'cuba', 'big', 'a034', 'ta21'];

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   LIFF INIT
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
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

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   sendInterest(product) ΓÇö α╕¬α╣êα╕çα╕éα╣ëα╕¡α╕äα╕ºα╕▓α╕í + α╣Çα╕₧α╕┤α╣êα╕íα╕òα╕░α╕üα╕úα╣ëα╕▓
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
async function sendInterest(productOrName) {
  // α╕úα╕¡α╕çα╕úα╕▒α╕Üα╕ùα╕▒α╣ëα╕ç object α╣üα╕Ñα╕░ string
  const isObj = typeof productOrName === 'object';
  const productName = isObj ? productOrName.nameTh : productOrName;
  const product = isObj ? productOrName : null;

  const btn = document.getElementById('btn-order');
  if (btn) { btn.disabled = true; btn.textContent = 'ΓÅ│ α╕üα╕│α╕Ñα╕▒α╕çα╕¬α╣êα╕ç...'; }

  try {
    const ok = await initLiff();
    if (!ok) throw new Error('LIFF init failed');

    if (!liff.isLoggedIn()) {
      sessionStorage.setItem('pendingProduct', JSON.stringify(productOrName));
      liff.login();
      return;
    }

    const msg = `≡ƒî┐ α╕¬α╕Öα╣âα╕êα╕¬α╕▒α╣êα╕çα╕ïα╕╖α╣ëα╕¡α╕òα╣ëα╕Öα╣äα╕íα╣ë: ${productName}${product ? `\n≡ƒÆ░ α╕úα╕▓α╕äα╕▓: α╕┐${product.price.toLocaleString()}/α╕òα╣ëα╕Ö` : ''}\n\nα╕üα╕úα╕╕α╕ôα╕▓α╕òα╕┤α╕öα╕òα╣êα╕¡α╣üα╕¡α╕öα╕íα╕┤α╕Öα╣Çα╕₧α╕╖α╣êα╕¡α╕¬α╕▒α╣êα╕çα╕ïα╕╖α╣ëα╕¡ ≡ƒÿè`;
    await liff.sendMessages([{ type: 'text', text: msg }]);

    // α╣Çα╕₧α╕┤α╣êα╕íα╕Ñα╕çα╕òα╕░α╕üα╕úα╣ëα╕▓
    if (product) Cart.add(product);
    else Cart.addById(productName);

    showToast('Γ£à α╕¬α╣êα╕çα╕éα╣ëα╕¡α╕äα╕ºα╕▓α╕íα╕¬α╕│α╣Çα╕úα╣çα╕ê! α╣Çα╕₧α╕┤α╣êα╕íα╣âα╕Öα╕òα╕░α╕üα╕úα╣ëα╕▓α╣üα╕Ñα╣ëα╕º');
    if (liff.isInClient()) setTimeout(() => liff.closeWindow(), 1800);

  } catch (err) {
    console.error('[sendInterest]', err);
    // Fallback: α╣Çα╕₧α╕┤α╣êα╕íα╣âα╕Öα╕òα╕░α╕üα╕úα╣ëα╕▓α╕¡α╕óα╕╣α╣êα╕öα╕╡α╣üα╕íα╣ë LIFF α╣äα╕íα╣êα╕ùα╕│α╕çα╕▓α╕Ö
    if (product) Cart.add(product);
    showToast('≡ƒ¢Æ α╣Çα╕₧α╕┤α╣êα╕íα╣âα╕Öα╕òα╕░α╕üα╕úα╣ëα╕▓α╣üα╕Ñα╣ëα╕º (α╕üα╕úα╕╕α╕ôα╕▓α╕òα╕┤α╕öα╕òα╣êα╕¡α╣üα╕¡α╕öα╕íα╕┤α╕Öα╣éα╕öα╕óα╕òα╕úα╕ç)');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> α╕¬α╕Öα╣âα╕êα╕¬α╕▒α╣êα╕çα╕ïα╕╖α╣ëα╕¡`;
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

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   CART ΓÇö α╕êα╕▒α╕öα╕üα╕▓α╕úα╕òα╕░α╕üα╕úα╣ëα╕▓α╕¬α╕┤α╕Öα╕äα╣ëα╕▓ (localStorage)
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
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
    // fallback α╣Çα╕íα╕╖α╣êα╕¡α╣äα╕íα╣êα╕íα╕╡ product object
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

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   WISHLIST ΓÇö α╕Üα╕▒α╕Öα╕ùα╕╢α╕üα╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕ö (localStorage)
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
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

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   TOAST
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
function showToast(message, ms = 3000) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('toast--show')));
  setTimeout(() => { el.classList.remove('toast--show'); setTimeout(() => el.remove(), 400); }, ms);
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   PRODUCT GRID ΓÇö render & filter
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
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
  return 'Γÿà'.repeat(full) + (half ? 'Γÿå' : '') + 'Γÿå'.repeat(5 - full - (half ? 1 : 0));
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
          aria-label="α╣Çα╕₧α╕┤α╣êα╕íα╣âα╕Öα╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕ö" data-product="${p.id}" id="wish-${p.id}">
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
          <span>(${p.rating}) ┬╖ ${p.reviewCount} α╕úα╕╡α╕ºα╕┤α╕º</span>
        </div>
        <div class="product-card__price-row">
          <span class="product-card__price">α╕┐${p.price.toLocaleString()}</span>
          ${p.priceOriginal ? `<span class="product-card__price-original">α╕┐${p.priceOriginal.toLocaleString()}</span>` : ''}
        </div>
        <span class="product-card__unit">α╕òα╣êα╕¡α╕òα╣ëα╕Ö</span>
        <a href="${p.href}" id="link-${p.id}">
          <button class="product-card__btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            α╕öα╕╣α╕úα╕▓α╕óα╕Ñα╕░α╣Çα╕¡α╕╡α╕óα╕ö
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
  if (counter) counter.textContent = `${list.length} α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣î`;
  grid.innerHTML = list.length
    ? list.map(renderProductCard).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
         <div class="empty-state__icon">≡ƒöì</div>
         <div class="empty-state__title">α╣äα╕íα╣êα╕₧α╕Üα╕¬α╕┤α╕Öα╕äα╣ëα╕▓</div>
         <div class="empty-state__desc">α╕Ñα╕¡α╕çα╣Çα╕¢α╕Ñα╕╡α╣êα╕óα╕Öα╕äα╕│α╕äα╣ëα╕Öα╕½α╕▓α╕½α╕úα╕╖α╕¡α╣Çα╕Ñα╕╖α╕¡α╕üα╕üα╕Ñα╕╕α╣êα╕íα╕¡α╕╖α╣êα╕Ö</div>
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
      showToast(added ? 'Γ¥ñ∩╕Å α╣Çα╕₧α╕┤α╣êα╕íα╣âα╕Öα╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕öα╣üα╕Ñα╣ëα╕º' : '≡ƒñì α╕Öα╕│α╕¡α╕¡α╕üα╕êα╕▓α╕üα╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕ö', 2000);
    });
  });
}

/* ΓöÇΓöÇ Category Filter ΓöÇΓöÇ */
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

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   SEARCH OVERLAY
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
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
    ? `<div class="search-overlay__results-title">α╕₧α╕Ü ${hits.length} α╕úα╕▓α╕óα╕üα╕▓α╕ú</div>
       <div class="search-result-list">
         ${hits.map(p => `
           <a class="search-result-item" href="${p.href}" id="search-${p.id}">
             <div class="search-result-item__emoji">${p.emoji}</div>
             <div class="search-result-item__info">
               <div class="search-result-item__name">${p.nameTh}</div>
               <div class="search-result-item__meta">${p.variety} ┬╖ ${p.shortDesc}</div>
             </div>
             <div class="search-result-item__price">α╕┐${p.price.toLocaleString()}</div>
           </a>`).join('')}
       </div>`
    : `<div class="search-no-result">
         <div class="search-no-result__icon">≡ƒî┐</div>
         <div>α╣äα╕íα╣êα╕₧α╕Ü "${q}"</div>
       </div>`;
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   SLIDE-UP PANELS (Cart & Profile)
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
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

/* ΓöÇΓöÇ Cart Panel ΓöÇΓöÇ */
function renderCartPanel() {
  const body = document.getElementById('cart-panel-body');
  const footer = document.getElementById('cart-panel-footer');
  if (!body) return;
  const items = Cart.getAll();
  if (!items.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty__icon">≡ƒ¢Æ</div>
      <div class="cart-empty__title">α╕òα╕░α╕üα╕úα╣ëα╕▓α╕ºα╣êα╕▓α╕çα╣Çα╕¢α╕Ñα╣êα╕▓</div>
      <div class="cart-empty__desc">α╕üα╕öα╕¢α╕╕α╣êα╕í "α╕¬α╕Öα╣âα╕êα╕¬α╕▒α╣êα╕çα╕ïα╕╖α╣ëα╕¡" α╣Çα╕₧α╕╖α╣êα╕¡α╣Çα╕₧α╕┤α╣êα╕íα╕òα╣ëα╕Öα╣äα╕íα╣ëα╕Ñα╕çα╕òα╕░α╕üα╕úα╣ëα╕▓</div>
    </div>`;
    if (footer) footer.innerHTML = '';
    return;
  }
  body.innerHTML = items.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item__emoji">${item.emoji || '≡ƒî┐'}</div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.nameTh}</div>
        <div class="cart-item__variety">${item.variety}</div>
      </div>
      <div class="cart-item__price">α╕┐${(item.price || 0).toLocaleString()}</div>
      <button class="cart-item__remove" onclick="removeCartItem('${item.id}')" aria-label="α╕Ñα╕Üα╕¡α╕¡α╕ü">Γ£ò</button>
    </div>`).join('');
  if (footer) {
    footer.innerHTML = `
      <div class="cart-panel__total">
        <span class="cart-panel__total-label">α╕úα╕ºα╕íα╕ùα╕▒α╣ëα╕çα╕½α╕íα╕ö (${items.length} α╕òα╣ëα╕Ö)</span>
        <span class="cart-panel__total-price">α╕┐${Cart.total().toLocaleString()}</span>
      </div>
      <button class="cart-panel__clear" onclick="clearCart()">α╕Ñα╣ëα╕▓α╕çα╕òα╕░α╕üα╕úα╣ëα╕▓α╕ùα╕▒α╣ëα╕çα╕½α╕íα╕ö</button>`;
  }
}

function removeCartItem(id) {
  Cart.remove(id);
  renderCartPanel();
  showToast('≡ƒùæ∩╕Å α╕Ñα╕Üα╕¡α╕¡α╕üα╕êα╕▓α╕üα╕òα╕░α╕üα╕úα╣ëα╕▓α╣üα╕Ñα╣ëα╕º', 2000);
}

function clearCart() {
  Cart.clear();
  renderCartPanel();
  showToast('≡ƒùæ∩╕Å α╕Ñα╣ëα╕▓α╕çα╕òα╕░α╕üα╕úα╣ëα╕▓α╕ùα╕▒α╣ëα╕çα╕½α╕íα╕öα╣üα╕Ñα╣ëα╕º', 2000);
}

/* ΓöÇΓöÇ Profile Panel ΓöÇΓöÇ */
function renderProfilePanel() {
  const body = document.getElementById('profile-panel-body');
  if (!body) return;
  // Mock profile data ΓÇö α╣üα╕ùα╕Öα╕ùα╕╡α╣êα╕öα╣ëα╕ºα╕óα╕éα╣ëα╕¡α╕íα╕╣α╕Ñα╕êα╕▓α╕ü LIFF α╣âα╕Öα╕¡α╕Öα╕▓α╕äα╕ò
  const profile = {
    name: 'α╕äα╕╕α╕ôα╕óα╕╕α╕ùα╕ÿα╕Öα╕▓ α╕¬α╕ºα╕Öα╕¡α╣éα╕ºα╕äα╕▓α╣éα╕ö',
    tag: 'α╕¬α╕íα╕▓α╕èα╕┤α╕ü Premium ┬╖ α╣Çα╕èα╕╡α╕óα╕çα╕úα╕▓α╕ó',
    avatar: '≡ƒî┐',
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
        <div class="profile-stat__label">α╣âα╕Öα╕òα╕░α╕üα╕úα╣ëα╕▓</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat__num">${profile.wishlistCount}</div>
        <div class="profile-stat__label">α╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕ö</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat__num">${profile.points}</div>
        <div class="profile-stat__label">α╕äα╕░α╣üα╕Öα╕Ö</div>
      </div>
    </div>
    <div class="profile-menu">
      <div class="profile-menu-item" onclick="openPanel('cart-panel');renderCartPanel();">
        <div class="profile-menu-item__icon">≡ƒ¢Æ</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">α╕òα╕░α╕üα╕úα╣ëα╕▓α╕éα╕¡α╕çα╕ëα╕▒α╕Ö</div>
          <div class="profile-menu-item__desc">${profile.ordersCount} α╕úα╕▓α╕óα╕üα╕▓α╕úα╕ùα╕╡α╣êα╕¬α╕Öα╣âα╕ê</div>
        </div>
        <span class="profile-menu-item__arrow">ΓÇ║</span>
      </div>
      <div class="profile-menu-item">
        <div class="profile-menu-item__icon">Γ¥ñ∩╕Å</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">α╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕ö</div>
          <div class="profile-menu-item__desc">${profile.wishlistCount} α╕¬α╕▓α╕óα╕₧α╕▒α╕Öα╕ÿα╕╕α╣îα╕ùα╕╡α╣êα╕ûα╕╣α╕üα╣âα╕ê</div>
        </div>
        <span class="profile-menu-item__arrow">ΓÇ║</span>
      </div>
      <div class="profile-menu-item">
        <div class="profile-menu-item__icon">≡ƒôì</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">α╕ùα╕╡α╣êα╕¡α╕óα╕╣α╣êα╕êα╕▒α╕öα╕¬α╣êα╕ç</div>
          <div class="profile-menu-item__desc">α╣Çα╕₧α╕┤α╣êα╕íα╕ùα╕╡α╣êα╕¡α╕óα╕╣α╣êα╕¬α╕│α╕½α╕úα╕▒α╕Üα╕êα╕▒α╕öα╕¬α╣êα╕çα╕òα╣ëα╕Öα╣äα╕íα╣ë</div>
        </div>
        <span class="profile-menu-item__arrow">ΓÇ║</span>
      </div>
      <div class="profile-menu-item">
        <div class="profile-menu-item__icon">≡ƒô₧</div>
        <div class="profile-menu-item__text">
          <div class="profile-menu-item__title">α╕òα╕┤α╕öα╕òα╣êα╕¡α╣üα╕¡α╕öα╕íα╕┤α╕Ö</div>
          <div class="profile-menu-item__desc">LINE: @yutthanafarm</div>
        </div>
        <span class="profile-menu-item__arrow">ΓÇ║</span>
      </div>
    </div>`;
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   PRODUCT PAGE SLIDER INIT (α╣âα╕èα╣ëα╣âα╕Öα╕½α╕Öα╣ëα╕▓ product detail)
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
function initSlider(trackId, dotsId) {
  const track = document.getElementById(trackId || 'slider-track');
  const dotsEl = document.getElementById(dotsId || 'slider-dots');
  if (!track || !dotsEl) return;

  const slides = track.querySelectorAll('.product-slider__slide');
  const dots = dotsEl.querySelectorAll('.product-slider__dot');

  function updateDots(idx) {
    dots.forEach((d, i) => d.classList.toggle('product-slider__dot--active', i === idx));
  }

  // Scroll event ΓåÆ update dots
  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    updateDots(idx);
  }, { passive: true });

  // Dot click ΓåÆ scroll to slide
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    });
  });

  updateDots(0);
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
   DOM READY
   ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
document.addEventListener('DOMContentLoaded', () => {
  // ΓöÇΓöÇ Init cart badge ΓöÇΓöÇ
  Cart.init();

  // ΓöÇΓöÇ Render product grid (index.html only) ΓöÇΓöÇ
  renderProductGrid();
  initCategoryFilter();

  // ΓöÇΓöÇ Search button ΓöÇΓöÇ
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

  // ΓöÇΓöÇ Panel overlay close ΓöÇΓöÇ
  document.getElementById('panel-overlay')?.addEventListener('click', closePanel);
  document.querySelectorAll('.panel__close').forEach(btn => btn.addEventListener('click', closePanel));

  // ΓöÇΓöÇ Bottom nav ΓöÇΓöÇ
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

  // ΓöÇΓöÇ Slider (product detail page) ΓöÇΓöÇ
  initSlider();

  // ΓöÇΓöÇ Wishlist init on product detail page ΓöÇΓöÇ
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
      showToast(added ? 'Γ¥ñ∩╕Å α╣Çα╕₧α╕┤α╣êα╕íα╣âα╕Öα╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕öα╣üα╕Ñα╣ëα╕º' : '≡ƒñì α╕Öα╕│α╕¡α╕¡α╕üα╕êα╕▓α╕üα╕úα╕▓α╕óα╕üα╕▓α╕úα╣éα╕¢α╕úα╕ö', 2000);
    });
  }

  // ΓöÇΓöÇ Check pending product (after LIFF redirect) ΓöÇΓöÇ
  checkPendingProduct();

  // ΓöÇΓöÇ Intersection observer for fade-in ΓöÇΓöÇ
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; observer.unobserve(e.target); }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
