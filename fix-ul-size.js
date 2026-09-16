const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Fix text-[16px]
        content = content.replace(
            /<ul className="list-disc pl-5 space-y-3 text-\[16px\]/g,
            '<ul className="list-disc pl-5 space-y-3 text-[17px] sm:text-[19px]'
        );
        
        // Fix text-[16px] sm:text-[16.5px]
        content = content.replace(
            /<ul className="list-disc pl-5 space-y-2 text-\[16px\] sm:text-\[16\.5px\]/g,
            '<ul className="list-disc pl-5 space-y-3 text-[17px] sm:text-[19px]'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated ul font size in ${file}`);
    }
}
