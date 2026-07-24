import JSZip from 'jszip';

export async function downloadDesktopBundle(platform: 'windows' | 'mac') {
  const zip = new JSZip();

  // Get current document HTML or standalone bundle
  const fullHtml = document.documentElement.outerHTML;

  if (platform === 'windows') {
    const folder = zip.folder('JavaJones-Windows');
    if (!folder) return;

    folder.file('index.html', fullHtml);

    // 1-Click Batch launcher for Windows
    const batLauncher = `@echo off
title Java Jones: JavaScript Espresso Empire
echo Launching Java Jones Coffee Shop...
start "" "%~dp0index.html"
exit
`;
    folder.file('JavaJones-Launcher.bat', batLauncher);
    folder.file('JavaJones-1Click.exe.bat', batLauncher);

    const readme = `JAVA JONES: JAVASCRIPT ESPRESSO EMPIRE - WINDOWS DESKTOP EDITION
---------------------------------------------------------------
How to Launch (1-Click):
1. Double-click "JavaJones-Launcher.bat" (or "index.html").
2. The game opens instantly in your default web browser!
3. Full 28-day campaign offline with zero installation or CLI needed.
`;
    folder.file('README.txt', readme);

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'JavaJones-Windows-Desktop.zip';
    a.click();
    URL.revokeObjectURL(url);
  } else {
    const folder = zip.folder('JavaJones-Mac');
    if (!folder) return;

    folder.file('index.html', fullHtml);

    // 1-Click Command launcher for Mac
    const macLauncher = `#!/bin/bash
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
open "$DIR/index.html"
`;
    folder.file('JavaJones-Launcher.command', macLauncher);

    const readme = `JAVA JONES: JAVASCRIPT ESPRESSO EMPIRE - MAC DESKTOP EDITION
------------------------------------------------------------
How to Launch (1-Click):
1. Double-click "JavaJones-Launcher.command" (or "index.html").
2. The game will launch automatically!
3. Full 28-day campaign offline with zero CLI or node setup.
`;
    folder.file('README.txt', readme);

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'JavaJones-Mac-Desktop.zip';
    a.click();
    URL.revokeObjectURL(url);
  }
}
