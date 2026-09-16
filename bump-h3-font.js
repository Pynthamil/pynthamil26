const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(/<h3 className="text-\[22px\] sm:text-\[24px\] but-head-regular /g, '<h3 className="text-[26px] sm:text-[28px] but-head-regular ');
        
        fs.writeFileSync(file, content);
        console.log(`Bumped h3 font in ${file}`);
    }
}
