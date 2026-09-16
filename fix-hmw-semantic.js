const fs = require('fs');

const files = [
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        const search = '<p className="text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans">\n                  How might we';
        const replace = '<p className="text-[24px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">\n                  How might we';
        
        content = content.replace(search, replace);
        
        fs.writeFileSync(file, content);
        console.log(`Updated HMW font in ${file}`);
    }
}
