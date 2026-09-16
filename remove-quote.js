const fs = require('fs');

const files = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Remove orca borders
        content = content.replace(/border-l-2 border-\[#007FFF\]\/30 dark:border-\[#FFF0F5\]\/30 pl-4 py-1 /g, '');
        // Remove messaging borders
        content = content.replace(/border-l-2 border-\[#00BF63\]\/30 dark:border-\[#E4FFC1\]\/30 pl-4 py-1 /g, '');
        
        fs.writeFileSync(file, content);
        console.log(`Removed quote style from ${file}`);
    }
}
