const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a valid uncompressed / deflate-compressed PNG in pure Node.js
function createPng(width, height) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 2; // Color type: 2 (Truecolor, RGB)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdr = createChunk('IHDR', ihdrData);

  // Raw Image Data (Filter byte 0 + RGB for each pixel)
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // No filter

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      // Vibrant yellow/amber icon with blue gaming controller accent
      const isBorder = x < 8 || x >= width - 8 || y < 8 || y >= height - 8;
      const isCenter = Math.hypot(x - width / 2, y - height / 2) < width * 0.35;

      if (isBorder) {
        rawData[pxOffset] = 234;     // R
        rawData[pxOffset + 1] = 179; // G
        rawData[pxOffset + 2] = 8;   // B (Amber border)
      } else if (isCenter) {
        rawData[pxOffset] = 59;      // R
        rawData[pxOffset + 1] = 130; // G
        rawData[pxOffset + 2] = 246; // B (Sky Blue Center)
      } else {
        rawData[pxOffset] = 254;     // R
        rawData[pxOffset + 1] = 240; // G
        rawData[pxOffset + 2] = 138; // B (Soft Sunny Yellow)
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = createChunk('IDAT', compressed);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Simple CRC32 implementation
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

const dir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'icon-192.png'), createPng(192, 192));
fs.writeFileSync(path.join(dir, 'icon-512.png'), createPng(512, 512));
console.log('PNG Icons 192x192 and 512x512 successfully created!');
