const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'Designing for ambiguity taught me that AI becomes more useful when uncertainty is visible, not hidden.';
    const replace = 'Designing for ambiguity taught me that AI becomes more useful <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">when uncertainty is visible, not hidden.</span>';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Highlighted uncertainty text in Semantic");
}
