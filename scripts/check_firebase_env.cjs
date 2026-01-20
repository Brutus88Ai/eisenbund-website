const fs = require('fs');
const path = require('path');

const required = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID'
];

let env = {};
const envPath = path.join(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf8');
  raw.split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^"|"$/g, '');
  });
}

// include process.env too
required.forEach(k => {
  if (!env[k] && process.env[k]) env[k] = process.env[k];
});

const missing = required.filter(k => !env[k]);

console.log('Checking Firebase env variables...');
if (missing.length === 0) {
  console.log('✔ All required VITE_FIREBASE_* variables are set.');
  process.exit(0);
} else {
  console.log('✖ Missing variables:');
  missing.forEach(m => console.log('  -', m));
  console.log('\nTip: Copy `.env.example` → `.env` and fill the missing values.');
  process.exit(1);
}
