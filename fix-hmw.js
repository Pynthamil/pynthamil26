const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(
            /text-\[17px\] sm:text-\[19px\] font-semibold (text-\[#2C2C2C\].*?How might we)/g,
            'text-[24px] sm:text-[26px] instrument-serif font-normal $1'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated HMW font in ${file}`);
    }
}
