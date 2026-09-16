const fs = require('fs');

const files = [
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(/className="text-\[26px\] sm:text-\[28px\] instrument-serif font-normal/g, 'className="text-[26px] sm:text-[28px] instrument-serif italic');
        
        fs.writeFileSync(file, content);
        console.log(`Updated to italic in ${file}`);
    }
}
