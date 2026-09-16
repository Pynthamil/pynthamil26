const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
        'A non-intrusive intelligence layer',
        'Designing an intelligence layer that turns unstructured email into clear, actionable context'
    );
    
    fs.writeFileSync(file, content);
    console.log("Updated solution title in Semantic");
}
