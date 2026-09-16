const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the specific heading text
    content = content.replace(
        '>\n                    Making uncertainty visible\n                  </h3>',
        '>\n                    Designing for ambiguity taught me that AI becomes more useful when uncertainty is visible, not hidden.\n                  </h3>'
    );
    
    // Wait, the formatting in the file might not be exactly that.
    // Let's use a regex to be safe.
    content = content.replace(
        /<h3 className="text-\[26px\] sm:text-\[28px\] instrument-serif italic text-\[#2C2C2C\] dark:text-\[#F2F2F2\]">\s*Making uncertainty visible\s*<\/h3>/,
        '<h3 className="text-[26px] sm:text-[28px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">\n                    Designing for ambiguity taught me that AI becomes more useful when uncertainty is visible, not hidden.\n                  </h3>'
    );
    
    fs.writeFileSync(file, content);
    console.log("Replaced heading in Semantic");
}
