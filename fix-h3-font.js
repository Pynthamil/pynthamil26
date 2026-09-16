const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace font-semibold with but-head-regular inside h3 tags with text-[20px]
        // This is safe because they all follow the same pattern.
        content = content.replace(/<h3 className="text-\[20px\] sm:text-\[22px\] font-semibold /g, '<h3 className="text-[22px] sm:text-[24px] but-head-regular ');
        
        fs.writeFileSync(file, content);
        console.log(`Updated h3 font in ${file}`);
    }
}
