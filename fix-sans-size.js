const fs = require('fs');

const files = [
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(
            /<p className="text-\[15px\] sm:text-\[15\.5px\]/g,
            '<p className="text-[17px] sm:text-[19px]'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated sans font size in ${file}`);
    }
}
