const fs = require('fs');

const files = [
    'src/components/PortfolioView.tsx',
    'src/app/blog/[slug]/BlogPostClient.tsx',
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx',
    'src/app/messaging/page.tsx',
    'src/app/orca/page.tsx'
];

function bumpFonts(content) {
    let result = content;
    result = result.replace(/text-\[17px\] sm:text-\[18px\]/g, 'text-[18px] sm:text-[20px]');
    result = result.replace(/text-\[16px\] sm:text-\[17px\]/g, 'text-[17px] sm:text-[19px]');
    result = result.replace(/text-\[15\.5px\] sm:text-\[16\.5px\]/g, 'text-[16.5px] sm:text-[18px]');
    
    result = result.replace(/text-\[22px\] sm:text-\[24px\]/g, 'text-[24px] sm:text-[26px]');
    result = result.replace(/text-\[22px\] tracking-\[0\.02em\]/g, 'text-[24px] tracking-[0.02em]');
    
    result = result.replace(/text-\[14px\] sm:text-\[14\.5px\]/g, 'text-[15px] sm:text-[16px]');
    
    return result;
}

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = bumpFonts(content);
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
    }
}
