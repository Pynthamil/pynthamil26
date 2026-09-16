const fs = require('fs');

const projects = [
    'src/app/orca/page.tsx',
    'src/app/messaging/page.tsx',
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx'
];

for (const file of projects) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find the inline SVG
        const svgSearch = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
        const imgReplace = '<img src="/back.svg" alt="Up Arrow" className="w-[18px] h-[18px] object-contain" />';
        
        content = content.replace(svgSearch, imgReplace);
        fs.writeFileSync(file, content);
        console.log(`Replaced SVG in ${file}`);
    }
}
