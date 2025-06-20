const fs = require('fs');
const path = require('path');

console.log('Postbuild: Ensuring Prisma client is properly generated...');

// The default Prisma client location
const prismaClientPath = path.join(__dirname, '../node_modules/.prisma/client');

if (!fs.existsSync(prismaClientPath)) {
  console.error('Prisma client not found at default location. Running prisma generate...');
  const { execSync } = require('child_process');
  execSync('npx prisma generate', { stdio: 'inherit' });
}

// List contents to verify
if (fs.existsSync(prismaClientPath)) {
  const files = fs.readdirSync(prismaClientPath);
  console.log('Prisma client files:', files.filter(f => f.includes('engine')).join(', '));
}

console.log('Postbuild: Completed');