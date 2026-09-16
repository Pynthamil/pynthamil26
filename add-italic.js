const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add italic to the class lists of these h3s
        content = content.replace(/className="text-\[26px\] sm:text-\[28px\] but-head-regular text-\[#2C2C2C\]/g, 'className="text-[26px] sm:text-[28px] but-head-regular italic text-[#2C2C2C]');
        
        fs.writeFileSync(file, content);
        console.log(`Added italic in ${file}`);
    }
}
