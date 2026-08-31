import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import heicConvert from 'heic-convert';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '..', 'public', 'images');
const optDir = path.join(__dirname, '..', 'public', 'images_opt');

async function convertHeicFiles() {
  const files = fs.readdirSync(imgDir);
  const heicFiles = files.filter(f => f.toLowerCase().endsWith('.heic'));

  console.log(`Converting ${heicFiles.length} HEIC files to JPG/WebP...`);

  for (const file of heicFiles) {
    const filePath = path.join(imgDir, file);
    const baseName = path.parse(file).name.toLowerCase();
    const webpPath = path.join(optDir, `${baseName}.webp`);
    const jpgPath = path.join(imgDir, `${baseName}.jpg`);

    try {
      const inputBuffer = fs.readFileSync(filePath);
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.9
      });

      // Save JPG fallback
      fs.writeFileSync(jpgPath, outputBuffer);

      // Save optimized WebP
      await sharp(outputBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);

      console.log(`Converted: ${file} -> ${baseName}.webp & ${baseName}.jpg`);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err.message);
    }
  }
  console.log('Finished HEIC conversion.');
}

convertHeicFiles();
