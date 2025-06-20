const fs = require('fs');
const path = require('path');

// Multiple target directories where Vercel might look for the query engine
const sourceDir = path.join(__dirname, '../lib/generated/prisma');
const targetDirs = [
  path.join(__dirname, '../.next/server'),
  path.join(__dirname, '../.next/server/chunks'),
  path.join(__dirname, '../lib/generated/prisma'),
];

// Ensure all target directories exist
targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Find all query engine files
if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

const files = fs.readdirSync(sourceDir);
const engineFiles = files.filter(file => 
  file.includes('query_engine') || 
  file.includes('libquery_engine') ||
  file.endsWith('.node')
);

console.log(`Found engine files: ${engineFiles.join(', ')}`);

// Copy to all target directories
engineFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  
  targetDirs.forEach(targetDir => {
    const targetPath = path.join(targetDir, file);
    
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ Copied ${file} to ${targetDir}`);
    } catch (err) {
      console.error(`✗ Error copying ${file} to ${targetDir}:`, err.message);
    }
  });
});

// Also copy the entire schema.prisma file for reference
const schemaSource = path.join(__dirname, '../prisma/schema.prisma');
const schemaTarget = path.join(__dirname, '../lib/generated/prisma/schema.prisma');

if (fs.existsSync(schemaSource)) {
  try {
    fs.copyFileSync(schemaSource, schemaTarget);
    console.log('✓ Copied schema.prisma');
  } catch (err) {
    console.error('✗ Error copying schema.prisma:', err.message);
  }
}

console.log('Postbuild: Prisma engine files copy completed');