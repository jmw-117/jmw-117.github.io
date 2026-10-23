const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const root = path.resolve(__dirname, '..');
const resolveFrom = process.env.JW_BUILD_MODULES ? createRequire(path.resolve(process.env.JW_BUILD_MODULES, '../package.json')) : require;
const React = resolveFrom('react');
const ReactDOMServer = resolveFrom('react-dom/server');
const ts = resolveFrom('typescript');
const content = require('../lib/site-content.json');
const pagePath = path.join(root, 'app/page.tsx');
const result = ts.transpileModule(fs.readFileSync(pagePath, 'utf8'), {
  compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2018, esModuleInterop: true },
  reportDiagnostics: true,
});
const errors = (result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
if (errors.length) throw new Error(errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')).join('\n'));
const context = { exports: {}, React, Date, require: createRequire(pagePath) };
vm.runInNewContext(result.outputText, context, { filename: 'page.js' });
const body = ReactDOMServer.renderToStaticMarkup(React.createElement(context.exports.default));
const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const origin = content.origin;
const html = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(content.title)}</title><meta name="description" content="${escape(content.description)}">
<link rel="canonical" href="${origin}/"><meta property="og:title" content="${escape(content.title)}">
<meta property="og:description" content="${escape(content.description)}"><meta property="og:type" content="website">
<meta property="og:url" content="${origin}/"><meta property="og:locale" content="en_GB">
<meta property="og:image" content="${origin}/john-wilson.jpg"><meta property="og:image:alt" content="John Wilson">
<meta name="twitter:card" content="summary"><meta name="theme-color" content="#0e1828">
<link rel="icon" href="/favicon.svg"><style>${css}</style></head><body>${body}</body></html>`;
const out = path.join(root, 'dist');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html);
const assets = ['favicon.svg', 'iris.jpg', 'seb.jpg', 'imbalance.png', 'staffordshire-2.png', 'John_Wilson_CV.pdf', 'john-wilson.jpg', 'architecture.webp', '_headers'];
for (const file of assets) fs.copyFileSync(path.join(root, 'public', file), path.join(out, file));
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`);
console.log(JSON.stringify({ built: 'dist/index.html', bytes: Buffer.byteLength(html), react: React.version, assets: assets.length, browserJavaScript: 0 }));
