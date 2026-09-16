const fs = require('fs');
let content = fs.readFileSync('src/components/PortfolioView.tsx', 'utf8');

// I replaced font-serif with instrument-serif
// Now bump the text size for the roles
content = content.replace(/text-\[19px\] sm:text-\[21px\]/g, 'text-[24px] sm:text-[26px]');

fs.writeFileSync('src/components/PortfolioView.tsx', content);
console.log("Bumped experience font size");
