const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const p1Start = code.indexOf('const PRODUCTS = [');
const p1End = code.indexOf('];', p1Start) + 1;
let p1Str = code.substring(p1Start + 'const PRODUCTS = ['.length, p1End);

const p2Start = code.indexOf('  /* ─── NEW ITEMS ─── */');
let p2End = code.indexOf(']; // e.g. "hass.html"', p2Start);
if (p2End === -1) p2End = code.indexOf('];', p2Start);

let p2Str = code.substring(p2Start + '  /* ─── NEW ITEMS ─── */'.length, p2End);

p1Str = p1Str.substring(0, p1Str.lastIndexOf(']')).trim();
if (p1Str.endsWith(',')) p1Str = p1Str.substring(0, p1Str.length - 1);

p2Str = p2Str.trim();
if (p2Str.startsWith('{')) {
   // list of objects
} else {
   p2Str = p2Str.replace(/^\[/, '').replace(/\]$/, '');
}

const combinedStr = '[' + p1Str + ',\n' + p2Str + ']';

fs.writeFileSync('temp.js', 'module.exports = ' + combinedStr + ';');

try {
  const parsed = require('./temp.js');
  if (!fs.existsSync('data')) fs.mkdirSync('data');
  fs.writeFileSync('data/products.json', JSON.stringify(parsed, null, 2));

  let newCode = code.substring(0, p1Start) + 'let PRODUCTS = [];\n' + code.substring(p1End + 1);

  const junkStart = newCode.indexOf('  /* ─── NEW ITEMS ─── */');
  const junkEnd = newCode.indexOf(']; // e.g. "hass.html"', junkStart);
  if (junkStart !== -1 && junkEnd !== -1) {
      newCode = newCode.substring(0, junkStart) + newCode.substring(junkEnd + ']; // e.g. "hass.html"'.length);
  }

  fs.writeFileSync('script.js', newCode);
  console.log('Extraction and fix successful!');
} catch(e) {
  console.error(e);
}
