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
        
        const search = '<h2 className="text-[32px] sm:text-[38px] font-bold text-[#2C2C2C] dark:text-[#F2F2F2] mb-12 tracking-tight">';
        const replace = '<h2 className="text-[48px] sm:text-[56px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] mb-12 tracking-tight">';
        
        content = content.replace(search, replace);
        
        fs.writeFileSync(file, content);
        console.log(`Updated Thanks font in ${file}`);
    }
}
