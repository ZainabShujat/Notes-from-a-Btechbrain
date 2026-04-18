const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/assets/articles');

function convertImagesRecursively(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      convertImagesRecursively(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const outputPath = path.join(dir, path.basename(file, ext) + ".webp");
        sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(() => console.log(`Converted: ${filePath}`))
          .catch(err => console.error(`Error converting ${filePath}:`, err));
      }
    }
  });
}

convertImagesRecursively(inputDir);
