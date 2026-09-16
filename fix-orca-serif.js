const fs = require('fs');

const file = 'src/app/orca/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix QUESTION box to be serif
    content = content.replace(
        '<div className="text-[16px] sm:text-[18px] font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">"How do',
        '<div className="text-[24px] sm:text-[26px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2]">"How do'
    );
    
    fs.writeFileSync(file, content);
    console.log("Updated Question to Serif in Orca");
}
