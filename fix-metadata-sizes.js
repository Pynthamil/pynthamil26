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
        
        // Bump labels
        content = content.replace(
            /text-xs sm:text-\[12\.5px\] font-semibold/g,
            'text-[13px] sm:text-[14px] font-semibold'
        );
        
        // Bump values
        content = content.replace(
            /text-\[14px\] sm:text-\[15px\] text-\[#2C2C2C\]/g,
            'text-[16px] sm:text-[17px] text-[#2C2C2C]'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated metadata font size in ${file}`);
    }
}
