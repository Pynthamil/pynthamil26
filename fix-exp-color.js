const fs = require('fs');
const file = 'src/components/PortfolioView.tsx';
let content = fs.readFileSync(file, 'utf8');

const search = 'decoration-1 decoration-neutral-300 dark:decoration-neutral-600';
const replace = 'decoration-2 decoration-[#00B5B2]/50 dark:decoration-[#00B5B2]/50';
content = content.replace(new RegExp(search, 'g'), replace);

fs.writeFileSync(file, content);
console.log("Fixed underline color");
