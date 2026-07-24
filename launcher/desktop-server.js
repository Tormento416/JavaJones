import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read embedded index.html
let htmlContent = '';
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  htmlContent = fs.readFileSync(indexPath, 'utf-8');
} else {
  htmlContent = `<!doctype html><html><head><title>Java Jones</title></head><body><h1>Java Jones: JavaScript Espresso Empire</h1></body></html>`;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlContent);
});

server.listen(0, '127.0.0.1', () => {
  const address = server.address();
  const port = typeof address === 'object' && address !== null ? address.port : 3456;
  const url = `http://127.0.0.1:${port}`;
  console.log(`Java Jones Coffee Shop Desktop App running at ${url}`);

  const platform = process.platform;
  if (platform === 'win32') {
    exec(`start "" "${url}"`);
  } else if (platform === 'darwin') {
    exec(`open "${url}"`);
  } else {
    exec(`xdg-open "${url}"`);
  }
});
