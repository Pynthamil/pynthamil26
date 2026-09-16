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
        
        // 1. Put the arrow back
        const imgArrow = '<img src="/back.svg" alt="Up Arrow" className="w-[18px] h-[18px] object-contain" />';
        const svgArrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
        content = content.replace(imgArrow, svgArrow);
        
        // 2. Replace Nova SVGs with back.svg
        const novasBlock = `<div className="flex items-center justify-center space-x-6">\n            <img src="/nova-working.svg" alt="Nova" className="w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] object-contain opacity-90 drop-shadow-sm" />\n            <img src="/nova-looking.svg" alt="Nova" className="w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] object-contain opacity-90 drop-shadow-sm" />\n          </div>`;
        const newShapesBlock = `<div className="flex items-center justify-center">\n            <img src="/back.svg" alt="Thanks" className="w-[140px] h-auto object-contain opacity-90 drop-shadow-sm" />\n          </div>`;
        
        content = content.replace(novasBlock, newShapesBlock);
        
        fs.writeFileSync(file, content);
        console.log(`Updated layout in ${file}`);
    }
}
