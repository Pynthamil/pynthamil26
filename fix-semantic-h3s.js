const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
        /<h3 className="text-\[18px\] sm:text-\[20px\] font-semibold text-\[#2C2C2C\] dark:text-\[#F2F2F2\]">/g,
        '<h3 className="text-[26px] sm:text-[28px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">'
    );
    
    fs.writeFileSync(file, content);
    console.log("Fixed headings");
}
