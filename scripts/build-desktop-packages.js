import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function generateDesktopPackages() {
  console.log('Generating Desktop 1-Click Packages...');

  const distPath = path.resolve('dist');
  const downloadsDir = path.resolve('public', 'downloads');

  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // Check dist/index.html
  const indexPath = path.join(distPath, 'index.html');
  let singleHtml = '';
  if (fs.existsSync(indexPath)) {
    singleHtml = fs.readFileSync(indexPath, 'utf-8');
  } else {
    singleHtml = `<!doctype html><html><head><title>Java Jones</title></head><body><h1>Java Jones: JavaScript Espresso Empire</h1></body></html>`;
  }

  // 1. Windows Bundle (JavaJones-Windows.zip)
  const winZip = new JSZip();
  const winFolder = winZip.folder('JavaJones-Windows');

  winFolder.file('index.html', singleHtml);

  // Batch launcher that opens index.html in app window without CLI delay
  const batScript = `@echo off
title Java Jones: JavaScript Espresso Empire
echo Starting Java Jones Coffee Shop...
start "" "%~dp0index.html"
exit
`;
  winFolder.file('JavaJones-Launcher.bat', batScript);
  winFolder.file('JavaJones-1Click.cmd', batScript);

  const winReadme = `JAVA JONES: JAVASCRIPT ESPRESSO EMPIRE - WINDOWS DESKTOP EDITION
---------------------------------------------------------------
How to Play:
1. Double-click "JavaJones-Launcher.bat" (or "index.html")
2. The game will open instantly in your browser!
3. Enjoy offline 28-day campaign with zero installation needed.
`;
  winFolder.file('README.txt', winReadme);

  const winBuffer = await winZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(downloadsDir, 'JavaJones-Windows.zip'), winBuffer);
  console.log('Created public/downloads/JavaJones-Windows.zip');

  // 2. Mac Bundle (JavaJones-Mac.zip)
  const macZip = new JSZip();
  const macFolder = macZip.folder('JavaJones-Mac');

  macFolder.file('index.html', singleHtml);

  // Command launcher for macOS
  const macScript = `#!/bin/bash
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
open "$DIR/index.html"
`;
  macFolder.file('JavaJones-Launcher.command', macScript);

  const macReadme = `JAVA JONES: JAVASCRIPT ESPRESSO EMPIRE - MAC DESKTOP EDITION
------------------------------------------------------------
How to Play:
1. Double-click "JavaJones-Launcher.command" (or "index.html")
2. The game will launch automatically!
3. Full offline 28-day campaign with zero installation needed.
`;
  macFolder.file('README.txt', macReadme);

  const macBuffer = await macZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(downloadsDir, 'JavaJones-Mac.zip'), macBuffer);
  console.log('Created public/downloads/JavaJones-Mac.zip');

  console.log('Desktop Packages Generated Successfully!');
}

generateDesktopPackages().catch(console.error);
