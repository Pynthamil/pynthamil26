const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'Designing for email taught me that intelligence is only useful when it turns complexity into something people can confidently act on.';
    const replace = 'AI should turn complexity into something you can confidently act on.';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Updated Takeaway header in Semantic");
}
