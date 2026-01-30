const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/assets/banners');
fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, path.basename(file, ext) + '.webp');
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`Converted: ${file}`))
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
});
