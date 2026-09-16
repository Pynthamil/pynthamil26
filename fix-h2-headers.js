const fs = require('fs');

const files = [
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx',
    'src/app/blog/[slug]/BlogPostClient.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Match both 'leading-snug' and 'tracking-tight' variants
        content = content.replace(
            /<h2 className="text-\[20px\] sm:text-\[22px\] font-semibold (text-\[#2C2C2C\] dark:text-\[#F2F2F2\][^"]+)">/g,
            '<h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal $1">'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated h2 headings in ${file}`);
    }
}
