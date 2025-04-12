const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
  console.log('Created assets directory');
}

const screenshotPath = path.join(assetsDir, 'app-screenshot.png');

console.log('Taking screenshot...');
console.log('Please make sure the app is visible on your screen.');
console.log('Waiting 5 seconds before taking the screenshot...');

// Wait 5 seconds to give time to switch to the browser window
setTimeout(() => {
  screenshot().then((img) => {
    fs.writeFileSync(screenshotPath, img);
    console.log(`Screenshot saved to ${screenshotPath}`);
  }).catch((err) => {
    console.error('Error taking screenshot:', err);
  });
}, 5000); 