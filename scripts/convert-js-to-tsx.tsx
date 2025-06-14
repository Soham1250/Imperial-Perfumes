import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

async function convertJsToTsx() {
  try {
    // Get all .js files recursively
    const files = await getJsFiles(ROOT_DIR);
    
    // Filter out node_modules and .next directories
    const filteredFiles = files.filter(file => 
      !file.includes('node_modules') && 
      !file.includes('.next') &&
      !file.endsWith('.test.js') &&
      !file.endsWith('.config.js')
    );

    console.log(`Found ${filteredFiles.length} .js files to convert to .tsx`);
    
    // Convert each file
    for (const file of filteredFiles) {
      await convertFile(file);
    }
    
    console.log('\n✅ All files converted successfully!');
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

async function getJsFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getJsFiles(res) : res;
  }));
  return Array.prototype.concat(...files).filter(file => file.endsWith('.js'));
}

async function convertFile(filePath) {
  try {
    // Skip if already converted
    if (filePath.endsWith('.tsx')) {
      return;
    }

    // Read the file content
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Create new file path with .tsx extension
    const newPath = filePath.replace(/\.js$/, '.tsx');
    
    // Write the new file
    await fs.writeFile(newPath, content, 'utf-8');
    
    // Remove the old .js file
    await fs.unlink(filePath);
    
    console.log(`✅ Converted: ${path.relative(ROOT_DIR, filePath)} -> ${path.relative(ROOT_DIR, newPath)}`);
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
  }
}

// Run the conversion
convertJsToTsx();
