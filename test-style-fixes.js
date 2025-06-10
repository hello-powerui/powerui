// Test file to verify style fixes
// Run this in the browser console on http://localhost:3000/themes/builder

function testStyleFixes() {
  console.log('=== Testing Style Fixes ===');
  
  // Check if CSS variables are being generated
  const previewWrapper = document.querySelector('.theme-preview-wrapper');
  if (previewWrapper) {
    const computedStyles = window.getComputedStyle(previewWrapper);
    
    console.log('Border Radius:', computedStyles.getPropertyValue('--border-radius'));
    console.log('Neutral Palette Colors:');
    for (let i = 25; i <= 950; i += 25) {
      const value = computedStyles.getPropertyValue(`--neutral-${i}`);
      if (value) console.log(`  --neutral-${i}:`, value);
    }
    
    console.log('Background Style:', previewWrapper.getAttribute('data-bg-style'));
    console.log('Border Style:', previewWrapper.getAttribute('data-border-style'));
    console.log('Theme Mode:', previewWrapper.getAttribute('data-theme-mode'));
    
    // Check if style tag was injected
    const styleTags = document.querySelectorAll('style[id^="theme-preview-style-"]');
    console.log('Injected style tags:', styleTags.length);
    if (styleTags.length > 0) {
      console.log('Style content preview:', styleTags[0].textContent.substring(0, 200) + '...');
    }
  } else {
    console.log('Preview wrapper not found!');
  }
  
  // Check KPI cards
  const kpiCards = document.querySelectorAll('[style*="border-radius"]');
  console.log('Elements with border-radius:', kpiCards.length);
  
  console.log('=== Test Complete ===');
}

// Instructions:
// 1. Open http://localhost:3000/themes/builder
// 2. Open browser console (F12)
// 3. Copy and run: testStyleFixes()
// 4. Try changing border radius, dark mode, and other style options
// 5. Run testStyleFixes() again to see if values change

console.log('Test file loaded. Run testStyleFixes() to check style fixes.');