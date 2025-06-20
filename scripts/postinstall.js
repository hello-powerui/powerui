const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Running postinstall script...');

try {
  // Generate Prisma Client
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Ensure the generated client exists
  const generatedPath = path.join(__dirname, '..', 'lib', 'generated', 'prisma');
  if (fs.existsSync(generatedPath)) {
    console.log('✓ Prisma Client generated successfully at:', generatedPath);
    
    // List the contents to verify binaries
    const files = fs.readdirSync(generatedPath);
    console.log('Generated files:', files);
  } else {
    console.error('❌ Prisma Client generation failed - directory not found');
    process.exit(1);
  }
  
  console.log('Postinstall completed successfully');
} catch (error) {
  console.error('Postinstall script failed:', error);
  process.exit(1);
}