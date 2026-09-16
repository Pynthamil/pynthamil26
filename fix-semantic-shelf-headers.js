const fs = require('fs');

const files = [
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // 1. replace text-[18px] sm:text-[19.5px] font-medium
        content = content.replace(
            /className="text-\[18px\] sm:text-\[19\.5px\] font-medium (text-\[#2C2C2C\] dark:text-\[#F2F2F2\] leading-snug)"/g,
            'className="text-[26px] sm:text-[28px] instrument-serif font-normal $1"'
        );
        
        // 2. replace text-[18px] sm:text-[20px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-normal
        content = content.replace(
            /className="text-\[18px\] sm:text-\[20px\] (text-\[#2C2C2C\] dark:text-\[#F2F2F2\] leading-relaxed) font-normal"/g,
            'className="text-[26px] sm:text-[28px] instrument-serif font-normal $1"'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated headings in ${file}`);
    }
}
