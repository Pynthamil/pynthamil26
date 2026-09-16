const fs = require('fs');

const file = 'src/app/orca/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix "The fix:" paragraph
    content = content.replace(
        /<p className="text-\[15px\] sm:text-\[16px\] text-\[#475569\] dark:text-\[#CBD5E1\] leading-relaxed pt-2">/g,
        '<p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">'
    );
    
    // Fix QUESTION box
    content = content.replace(
        /<div className="text-\[15px\] font-medium text-\[#2C2C2C\] dark:text-\[#F2F2F2\]">/g,
        '<div className="text-[16px] sm:text-[18px] font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">'
    );
    
    // Fix RETRIEVED EVIDENCE, GENERATED ANSWER, CITATION boxes
    content = content.replace(
        /<div className="text-\[14px\] text-\[#475569\] dark:text-\[#CBD5E1\]">/g,
        '<div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">'
    );
    
    fs.writeFileSync(file, content);
    console.log("Updated specific text sizes in Orca");
}
