import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const iconSvgPath = path.resolve('public/icon.svg');
const maskableSvgPath = path.resolve('public/icon-maskable.svg');

const densities = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

async function generateAndroidMipmaps() {
  const iconSvg = fs.readFileSync(iconSvgPath);
  const maskableSvg = fs.readFileSync(maskableSvgPath);

  const baseResDir = path.resolve('android/app/src/main/res');
  const publicAndroidDir = path.resolve('public/android-res');

  // Create directories
  [baseResDir, publicAndroidDir].forEach((base) => {
    densities.forEach((d) => {
      fs.mkdirSync(path.join(base, d.folder), { recursive: true });
    });
    fs.mkdirSync(path.join(base, 'mipmap-anydpi-v26'), { recursive: true });
    fs.mkdirSync(path.join(base, 'drawable'), { recursive: true });
    fs.mkdirSync(path.join(base, 'values'), { recursive: true });
  });

  // Generate PNGs for each density
  for (const d of densities) {
    console.log(`Generating ${d.folder} (${d.size}x${d.size})...`);
    
    // Regular icon
    const iconBuf = await sharp(iconSvg).resize(d.size, d.size).png().toBuffer();
    // Round icon (with safe padding)
    const roundBuf = await sharp(maskableSvg).resize(d.size, d.size).png().toBuffer();

    [baseResDir, publicAndroidDir].forEach((base) => {
      fs.writeFileSync(path.join(base, d.folder, 'ic_launcher.png'), iconBuf);
      fs.writeFileSync(path.join(base, d.folder, 'ic_launcher_round.png'), roundBuf);
    });
  }

  // Generate Adaptive Foreground (432x432 for 108dp base)
  const foregroundBuf = await sharp(maskableSvg).resize(432, 432).png().toBuffer();
  [baseResDir, publicAndroidDir].forEach((base) => {
    fs.writeFileSync(path.join(base, 'drawable', 'ic_launcher_foreground.png'), foregroundBuf);
  });

  // Adaptive Icon XMLs
  const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
`;

  const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#4F46E5</color>
</resources>
`;

  [baseResDir, publicAndroidDir].forEach((base) => {
    fs.writeFileSync(path.join(base, 'mipmap-anydpi-v26', 'ic_launcher.xml'), adaptiveXml);
    fs.writeFileSync(path.join(base, 'mipmap-anydpi-v26', 'ic_launcher_round.xml'), adaptiveXml);
    fs.writeFileSync(path.join(base, 'values', 'ic_launcher_background.xml'), colorsXml);
  });

  console.log('All Android launcher mipmap icons and adaptive icons successfully generated!');
}

generateAndroidMipmaps().catch((err) => {
  console.error('Error generating Android mipmaps:', err);
  process.exit(1);
});
