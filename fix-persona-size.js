const fs = require('fs');
const file = 'src/components/PersonaShowcase.tsx';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the outermost wrapper
    content = content.replace(
        '<div className="w-full my-4 space-y-3">',
        '<div className="w-[85%] sm:w-[75%] mx-auto my-6 space-y-3">'
    );
    
    fs.writeFileSync(file, content);
    console.log("Reduced persona size");
}
