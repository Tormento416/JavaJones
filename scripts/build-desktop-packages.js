import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import JSZip from 'jszip';

async function generateDesktopPackages() {
  console.log('Generating Standalone 1-Click Executable Desktop Apps...');

  const distPath = path.resolve('dist');
  const launcherDir = path.resolve('launcher');
  const downloadsDir = path.resolve('public', 'downloads');

  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // 1. Copy dist/index.html to launcher/index.html
  const distIndex = path.join(distPath, 'index.html');
  const launcherIndex = path.join(launcherDir, 'index.html');

  if (fs.existsSync(distIndex)) {
    fs.copyFileSync(distIndex, launcherIndex);
    console.log('Copied single-file app bundle to launcher/index.html');
  }

  // 2. Build Windows .exe standalone binary
  console.log('Packaging JavaJones-Windows.exe...');
  const winExeOutput = path.join(downloadsDir, 'JavaJones-Windows.exe');
  execSync(
    `npx pkg launcher/desktop-server.cjs --target node18-win-x64 --output "${winExeOutput}"`,
    { stdio: 'inherit' }
  );

  // 3. Build Mac .dmg standalone binary
  console.log('Packaging JavaJones-Mac.dmg...');
  const macDmgOutput = path.join(downloadsDir, 'JavaJones-Mac.dmg');
  execSync(
    `npx pkg launcher/desktop-server.cjs --target node18-macos-x64 --output "${macDmgOutput}"`,
    { stdio: 'inherit' }
  );

  // 4. Create Windows .zip containing JavaJones-Windows.exe
  const winZip = new JSZip();
  if (fs.existsSync(winExeOutput)) {
    const winExeBuffer = fs.readFileSync(winExeOutput);
    winZip.file('JavaJones-Windows.exe', winExeBuffer);

    const winReadme = `JAVA JONES: JAVASCRIPT ESPRESSO EMPIRE - WINDOWS SINGLE EXE EDITION
-------------------------------------------------------------------
How to Play:
1. Double-click "JavaJones-Windows.exe".
2. The game opens instantly in an offline browser app window!
3. No installation or subfolders required.
`;
    winZip.file('README.txt', winReadme);

    const winZipBuffer = await winZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
    fs.writeFileSync(path.join(downloadsDir, 'JavaJones-Windows.zip'), winZipBuffer);
    console.log('Created public/downloads/JavaJones-Windows.zip');
  }

  // 5. Create Mac .zip containing JavaJones-Mac.dmg
  const macZip = new JSZip();
  if (fs.existsSync(macDmgOutput)) {
    const macDmgBuffer = fs.readFileSync(macDmgOutput);
    macZip.file('JavaJones-Mac.dmg', macDmgBuffer);

    const macReadme = `JAVA JONES: JAVASCRIPT ESPRESSO EMPIRE - MAC EDITION
---------------------------------------------------------
How to Play:
1. Double-click "JavaJones-Mac.dmg".
2. The game launches immediately!
3. Full 28-day campaign with zero installation.
`;
    macZip.file('README.txt', macReadme);

    const macZipBuffer = await macZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
    fs.writeFileSync(path.join(downloadsDir, 'JavaJones-Mac.zip'), macZipBuffer);
    console.log('Created public/downloads/JavaJones-Mac.zip');
  }

  console.log('All Desktop Executables & Archives Generated Successfully!');
}

generateDesktopPackages().catch(console.error);
