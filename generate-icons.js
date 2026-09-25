const fs = require('fs');
const path = require('path');

// Minimal 1x1 transparent/colored PNG generator in pure node
function createColorPng(width, height, r, g, b) {
  // Simple SVG as fallback or base
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="#0f172a"/>
    <rect x="15" y="15" width="70" height="70" rx="14" fill="#fbbf24"/>
    <text x="50" y="62" font-size="38" text-anchor="middle" font-family="sans-serif">🎮</text>
  </svg>`;
  return svg;
}

const dir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'icon.svg'), createColorPng(512, 512, 251, 191, 36));
console.log('Icon generated');
