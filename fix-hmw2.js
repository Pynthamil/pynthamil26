const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        const search = '<h3 className="text-[17px] sm:text-[19px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">\n                  How might we';
        const replace = '<h3 className="text-[24px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">\n                  How might we';
        
        content = content.replace(search, replace);
        
        fs.writeFileSync(file, content);
        console.log(`Updated HMW font in ${file}`);
    }
}
