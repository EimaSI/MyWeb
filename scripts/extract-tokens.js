#!/usr/bin/env node

/**
 * Design Token Extraction Script
 * This script demonstrates how to extract design tokens from Figma
 * and generate CSS variables or JSON tokens
 */

const fs = require('fs');
const path = require('path');
const { loadFigmaConfig } = require('./figma-sync');

function generateCSSTokens(tokens) {
  let css = ':root {\n';
  css += '  /* Generated from Figma Design Tokens */\n';
  
  // Colors
  if (tokens.colors) {
    css += '  /* Colors */\n';
    Object.entries(tokens.colors).forEach(([name, value]) => {
      css += `  --color-${name}: ${value};\n`;
    });
  }
  
  // Typography
  if (tokens.typography) {
    css += '  /* Typography */\n';
    Object.entries(tokens.typography).forEach(([name, value]) => {
      css += `  --font-${name}: ${value};\n`;
    });
  }
  
  // Spacing
  if (tokens.spacing) {
    css += '  /* Spacing */\n';
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      css += `  --spacing-${name}: ${value};\n`;
    });
  }
  
  css += '}\n';
  return css;
}

async function extractTokens() {
  const config = loadFigmaConfig();
  
  console.log('🎨 Design Token Extraction');
  console.log('=========================');
  
  if (!config.FIGMA_FILE_ID || config.FIGMA_FILE_ID === 'YOUR_FIGMA_FILE_ID_HERE') {
    console.log('ℹ️  This script would extract design tokens from Figma and generate:');
    console.log('   • CSS custom properties');
    console.log('   • JSON design tokens');
    console.log('   • SCSS variables');
    console.log('');
    console.log('To enable token extraction:');
    console.log('1. Set up your Figma credentials in .figmarc');
    console.log('2. Install dependencies: npm install');
    console.log('3. Run: npm run figma:tokens');
    
    // Generate example tokens for demo purposes
    const exampleTokens = {
      colors: {
        primary: '#00ccff',
        secondary: '#413d64',
        white: '#ffffff',
        gray: '#f2f2f2'
      },
      typography: {
        'font-family': 'Arial, sans-serif',
        'font-size-base': '16px',
        'font-size-large': '24px'
      },
      spacing: {
        small: '8px',
        medium: '20px',
        large: '40px'
      }
    };
    
    const exampleCSS = generateCSSTokens(exampleTokens);
    
    console.log('');
    console.log('📄 Example generated CSS tokens:');
    console.log('================================');
    console.log(exampleCSS);
    
    // Save example to a file
    const tokensDir = path.join(__dirname, '..', 'design-tokens');
    if (!fs.existsSync(tokensDir)) {
      fs.mkdirSync(tokensDir);
    }
    
    fs.writeFileSync(path.join(tokensDir, 'example-tokens.css'), exampleCSS);
    fs.writeFileSync(path.join(tokensDir, 'example-tokens.json'), JSON.stringify(exampleTokens, null, 2));
    
    console.log('💾 Example tokens saved to design-tokens/ directory');
    
    return;
  }
  
  try {
    console.log('🔄 Extracting design tokens from Figma...');
    
    // This would extract actual tokens when Figma API is connected
    /*
    const { Api } = require('figma-api');
    const api = new Api({
      personalAccessToken: config.FIGMA_ACCESS_TOKEN,
    });
    
    const file = await api.getFile(config.FIGMA_FILE_ID);
    
    // Extract colors, typography, spacing from Figma styles
    const tokens = extractFromFigmaFile(file);
    
    const cssTokens = generateCSSTokens(tokens);
    
    // Save generated tokens
    fs.writeFileSync(path.join(__dirname, '..', 'design-tokens.css'), cssTokens);
    fs.writeFileSync(path.join(__dirname, '..', 'design-tokens.json'), JSON.stringify(tokens, null, 2));
    */
    
    console.log('✅ Token extraction ready - configure Figma API to enable');
    
  } catch (error) {
    console.error('❌ Error extracting tokens:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  extractTokens().catch(console.error);
}

module.exports = { extractTokens, generateCSSTokens };