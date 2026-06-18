#!/usr/bin/env node
// Seed the database with all demo data
// Make sure the dev server is running first: npm run dev
// Then run: node scripts/seed.js

const http = require('http');
const data = JSON.stringify({ secret: 'proaudio-admin-2024' });
const options = {
  hostname: 'localhost', port: 3000,
  path: '/api/admin/seed', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data), 'x-admin-secret': 'proaudio-admin-2024' },
};
console.log('Seeding database...');
const req = http.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    try { const result = JSON.parse(body); console.log('✅ Seed result:', JSON.stringify(result.results, null, 2)); }
    catch { console.log('Response:', body); }
  });
});
req.on('error', e => console.error('❌ Error (is the server running?):', e.message));
req.write(data);
req.end();
