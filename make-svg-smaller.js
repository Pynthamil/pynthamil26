const fs = require('fs');

const projects = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx',
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx'
];

for (const file of projects) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(
            'w-[220px] sm:w-[280px]',
            'w-[180px] sm:w-[200px]'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Made SVG a bit smaller in ${file}`);
    }
}
