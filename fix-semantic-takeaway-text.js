const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = '<h2 className="text-[26px] sm:text-[30px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">\n                  Designing for ambiguity taught me that AI becomes more useful when uncertainty is visible, not hidden.\n                </h2>';
    const replace = '<h2 className="text-[26px] sm:text-[30px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">\n                  Designing for email taught me that intelligence is only useful when it turns complexity into something people can confidently act on.\n                </h2>';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Updated takeaway text in Semantic");
}
