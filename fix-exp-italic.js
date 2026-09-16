const fs = require('fs');

const file = 'src/components/PortfolioView.tsx';
let content = fs.readFileSync(file, 'utf8');

// The string to replace:
const searchString = 'className="instrument-serif font-normal text-[24px] sm:text-[26px] text-[#0F172A] dark:text-[#F2F2F2] tracking-[0.02em]"';
const replaceString = 'className="instrument-serif italic underline decoration-wavy underline-offset-[5px] decoration-1 decoration-neutral-300 dark:decoration-neutral-600 font-normal text-[24px] sm:text-[26px] text-[#0F172A] dark:text-[#F2F2F2] tracking-[0.02em]"';

content = content.replace(new RegExp(searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceString);

fs.writeFileSync(file, content);
console.log("Updated experience formatting");
