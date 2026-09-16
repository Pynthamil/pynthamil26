const fs = require('fs');

const file = 'src/app/orca/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldText = 'Research is scattered across papers, datasets, and citations, making even simple questions difficult to verify.';
const newText = 'Research is fragmented, making evidence difficult to find and verify.';

content = content.replace(oldText, newText);

fs.writeFileSync(file, content);
console.log('Updated orca text');
