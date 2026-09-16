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
            /<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">/g,
            '<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-12">'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated grid margin in ${file}`);
    }
}
