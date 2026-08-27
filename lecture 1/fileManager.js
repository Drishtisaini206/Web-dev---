// fileManager.js
const fs = require('fs');
const filePath = './test.txt';

try {
  // 1. Create File
  console.log('Creating File...');
  fs.writeFileSync(filePath, 'Hello Node.js\n');
  console.log('File Created');

  // 2. Read File
  console.log('Reading File:');
  const initialContent = fs.readFileSync(filePath, 'utf8');
  console.log(initialContent.trim());

  // 3. Update File
  console.log('Updating File...');
  fs.appendFileSync(filePath, 'Learning FS Module\n');
  console.log('File Updated:');
  const updatedContent = fs.readFileSync(filePath, 'utf8');
  console.log(updatedContent.trim());

  // 4. Delete File
  console.log('Deleting File...');
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('File Deleted');
  }
} catch (error) {
  console.error('Error handling file operations:', error.message);
}