import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';

const RAW_SPRITES_DIR = './asset-pipeline/raw/sprites';
const OUTPUT_DIR = './public/animations';

async function buildSpriteSheets() {
  await fs.ensureDir(OUTPUT_DIR);
  
  // Find all character directories (e.g., sandy_poses)
  // Using glob format to match directories in Windows/Unix
  const characterDirs = await glob(`${RAW_SPRITES_DIR}/*/`);

  if (characterDirs.length === 0) {
    console.log('⚠️ No animation folders found in asset-pipeline/raw/sprites');
    return;
  }

  for (const dir of characterDirs) {
    // Normalize path for cross-platform compatibility
    const normalizedDir = path.normalize(dir).replace(/\\$/, '');
    const animName = path.basename(normalizedDir);
    
    // Grab all PNG frames inside the character's folder
    const frames = await glob(`${normalizedDir}/*.png`);
    
    if (frames.length === 0) {
        console.log(`⚠️ No PNG frames found in ${animName}`);
        continue;
    }

    console.log(`⚙️ Processing ${animName} (${frames.length} frames)...`);

    // Extract dimensions from the first frame
    const { width, height } = await sharp(frames[0]).metadata();
    
    const sheetWidth = width * frames.length;
    const sheetHeight = height;

    // Map each frame to its horizontal position on the sprite sheet
    const compositeOperations = await Promise.all(frames.map(async (file, index) => ({
      input: file,
      left: index * width,
      top: 0
    })));

    // Generate and compress the WebP Sprite Sheet
    await sharp({
      create: { 
        width: sheetWidth, 
        height: sheetHeight, 
        channels: 4, 
        background: { r: 0, g: 0, b: 0, alpha: 0 } 
      }
    })
    .composite(compositeOperations)
    .webp({ quality: 80, effort: 6 }) 
    .toFile(`${OUTPUT_DIR}/${animName}.webp`);

    // Generate the JSON metadata map for the Student Dashboard React component
    const metadata = {
      name: animName,
      frameCount: frames.length,
      frameWidth: width,
      frameHeight: height,
      fps: 24, // Matches standard animation timing
      url: `/animations/${animName}.webp`
    };

    await fs.writeJson(`${OUTPUT_DIR}/${animName}.json`, metadata);
    console.log(`✅ ${animName} optimized successfully!`);
  }
}

buildSpriteSheets().catch(console.error);