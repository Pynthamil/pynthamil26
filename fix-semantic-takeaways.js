const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix the header wrapper
    content = content.replace(
        '<div className="space-y-2 text-center pb-2">',
        '<div className="space-y-1">'
    );
    
    fs.writeFileSync(file, content);
    console.log("Left-aligned takeaways heading in semantic");
}
