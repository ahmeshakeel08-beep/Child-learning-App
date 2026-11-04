import fs from 'fs';
import path from 'path';

const icon96Path = path.resolve('public/pwa-96x96.png');
const icon192Path = path.resolve('public/pwa-192x192.png');
const indexHtmlPath = path.resolve('index.html');

const b64_96 = fs.readFileSync(icon96Path).toString('base64');
const dataUri96 = `data:image/png;base64,${b64_96}`;

let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace or ensure data uri tags are present for apple-touch-icon and icon
const iconTags = `
    <!-- Embedded Data-URI Icons for instant Android Home Screen & Shortcut Icon -->
    <link rel="icon" type="image/png" href="${dataUri96}" />
    <link rel="apple-touch-icon" href="${dataUri96}" />
    <link rel="apple-touch-icon-precomposed" href="${dataUri96}" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="shortcut icon" href="${dataUri96}" />
    <link rel="icon" type="image/png" sizes="96x96" href="/pwa-96x96.png" />
    <link rel="icon" type="image/png" sizes="144x144" href="/pwa-144x144.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/pwa-192x192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/pwa-512x512.png" />`;

html = html.replace(
  /<link rel="manifest"[\s\S]*?<link rel="apple-touch-icon-precomposed"[^>]*>/,
  iconTags.trim()
);

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Successfully injected Data-URI icon into index.html!');
