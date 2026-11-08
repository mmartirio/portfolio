import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { projects } from '../src/data/projects.js';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'public', 'screenshots');
const manifestPath = join(root, 'src', 'data', 'screenshots.json');

const WIDTH = 1440;
const HEIGHT = 900;
const SETTLE_MS = 4000;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find((path) => existsSync(path));
if (!executablePath) {
  console.error('Chrome não encontrado. Defina CHROME_PATH com o caminho do executável.');
  process.exit(1);
}

const wait = (ms) => new Promise((done) => setTimeout(done, ms));

async function dismissCookieBanner(page) {
  const clicked = await page.evaluate(() => {
    const labels = /^(sim|aceitar|aceito|accept|ok|entendi|concordo|permitir)( todos| tudo| cookies)?$/i;
    const button = [...document.querySelectorAll('button, a[role="button"]')].find((el) =>
      labels.test(el.textContent.trim()),
    );
    button?.click();
    return Boolean(button);
  });
  if (clicked) await wait(800);
}

mkdirSync(outDir, { recursive: true });
const manifest = {};

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  defaultViewport: { width: WIDTH, height: HEIGHT },
  args: ['--hide-scrollbars'],
});

try {
  for (const project of projects) {
    const page = await browser.newPage();
    try {
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 45_000 });
      await wait(SETTLE_MS);
      await dismissCookieBanner(page);

      const png = await page.screenshot({ type: 'png' });
      const file = `${project.id}.webp`;
      await sharp(png).webp({ quality: 82 }).toFile(join(outDir, file));

      manifest[project.id] = `/screenshots/${file}`;
      console.log(`✓ ${project.id}`);
    } catch (error) {
      console.warn(`✗ ${project.id}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\n${Object.keys(manifest).length}/${projects.length} capturas salvas em public/screenshots/`);
