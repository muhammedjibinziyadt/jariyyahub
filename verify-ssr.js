/**
 * SSR Verification Script
 * Run this script to verify Server-Side Rendering is working
 * 
 * Usage: node verify-ssr.js
 */

const http = require('http');

console.log('\n🔍 Verifying SSR Configuration...\n');

// Configuration
const PORT = 3000;
const HOST = 'localhost';
const ROUTES = ['/', '/contact', '/core', '/subwing'];

function checkSSR(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'SSR-Verification-Script'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // Check if response contains actual HTML content
        const hasHtml = data.includes('<!DOCTYPE html>');
        const hasContent = data.includes('Noorul Ulama') || data.includes('نور العلماء');
        const hasMetaTags = data.includes('<meta name="description"');
        const hasTitle = data.includes('<title>');
        
        // Check that it's not just an empty shell
        const notEmptyShell = data.length > 1000;

        resolve({
          path,
          success: hasHtml && hasContent && hasMetaTags && hasTitle && notEmptyShell,
          details: {
            hasHtml,
            hasContent,
            hasMetaTags,
            hasTitle,
            contentLength: data.length,
            statusCode: res.statusCode
          }
        });
      });
    });

    req.on('error', (error) => {
      reject({ path, error: error.message });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject({ path, error: 'Request timeout' });
    });

    req.end();
  });
}

async function verifyAllRoutes() {
  console.log(`📡 Checking server at http://${HOST}:${PORT}\n`);
  
  const results = [];
  
  for (const route of ROUTES) {
    try {
      const result = await checkSSR(route);
      results.push(result);
      
      if (result.success) {
        console.log(`✅ ${route.padEnd(15)} - SSR is working!`);
        console.log(`   └─ Content Length: ${result.details.contentLength} bytes`);
      } else {
        console.log(`❌ ${route.padEnd(15)} - SSR might not be working`);
        console.log(`   └─ Details:`, result.details);
      }
    } catch (error) {
      console.log(`❌ ${route.padEnd(15)} - Error: ${error.error}`);
      results.push({ path: route, success: false, error: error.error });
    }
  }

  console.log('\n' + '='.repeat(60) + '\n');
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  if (successful === total) {
    console.log(`🎉 SUCCESS! All ${total} routes are server-side rendered!\n`);
    console.log('Your SSR configuration is working correctly.\n');
  } else {
    console.log(`⚠️  ${successful}/${total} routes passed SSR verification.\n`);
    console.log('Some routes may need attention.\n');
  }

  // Additional checks
  console.log('📋 Quick Verification Steps:\n');
  console.log('1. Open http://localhost:3000 in your browser');
  console.log('2. Right-click → "View Page Source" (Ctrl+U)');
  console.log('3. Look for actual HTML content (not empty divs)');
  console.log('4. Check for meta tags in the <head> section\n');
  
  console.log('📖 For detailed verification guide, see: SSR_VERIFICATION_GUIDE.md\n');
}

// Main execution
console.log('Starting SSR verification...');
console.log('Make sure your dev server is running (npm run dev)\n');

setTimeout(() => {
  verifyAllRoutes().catch((error) => {
    console.error('\n❌ Verification failed:', error.message);
    console.log('\n💡 Make sure your development server is running:');
    console.log('   npm run dev\n');
    process.exit(1);
  });
}, 500);

