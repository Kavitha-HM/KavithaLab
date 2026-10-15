import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'data');
const files = [
  'professor.json',
  'members.json',
  'research.json',
  'publications.json',
  'news.json',
  'site-config.json'
];

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  try {
    const raw = fs.readFileSync(fullPath, 'utf8');
    JSON.parse(raw);
    console.log(`OK: ${file}`);
  } catch (error) {
    console.error(`ERROR: ${file}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (process.exitCode) {
  console.error('\nOne or more JSON files are invalid. Fix them before publishing.');
}
