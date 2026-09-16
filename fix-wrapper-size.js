const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx',
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(
            /className="space-y-8 text-\[16px\] sm:text-\[16\.5px\]/g,
            'className="space-y-8 text-[17px] sm:text-[19px]'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated wrapper font size in ${file}`);
    }
}
