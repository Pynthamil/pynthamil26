const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = "Connecting scattered context taught me that the best email assistant doesn't just draft a reply, it helps users understand the conversation behind it.";
    const replace = 'Not just drafting replies, but helping you understand the conversation behind them.';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Shortened the semantic heading");
}
