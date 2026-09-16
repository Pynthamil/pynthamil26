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
            /<div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mt-12 mb-4"><\/div>/g,
            ''
        );
        
        fs.writeFileSync(file, content);
        console.log(`Removed grey line from ${file}`);
    }
}
