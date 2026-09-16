const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'Context mapping &amp; response synthesis';
    const replace = "Connecting scattered context taught me that the best email assistant doesn't just draft a reply, it helps users understand the conversation behind it.";
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Updated heading text in Semantic");
}
