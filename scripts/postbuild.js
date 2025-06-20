const fs = require('fs');
const path = require('path');

// Copy Prisma Query Engine to .next/server for Vercel
const sourceDir = path.join(__dirname, '../lib/generated/prisma');
const targetDir = path.join(__dirname, '../.next/server');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Find and copy query engine files
const files = fs.readdirSync(sourceDir);
const engineFiles = files.filter(file => 
  file.includes('query_engine') || 
  file.includes('libquery_engine')
);

engineFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to .next/server`);
  } catch (err) {
    console.error(`Error copying ${file}:`, err);
  }
});

console.log('Postbuild: Prisma engine files copied successfully');