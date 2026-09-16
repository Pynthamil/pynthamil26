const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace my-10 with my-16 in the semantic BEFORE/AFTER block
    content = content.replace(
        '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-10">',
        '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-16">'
    );
    
    fs.writeFileSync(file, content);
    console.log("Increased margin on BEFORE/AFTER block");
}
