const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace <br/><br/> with just <br/>
    content = content.replace(
        '<br/><br/>',
        '<br/>'
    );
    
    fs.writeFileSync(file, content);
    console.log("Removed one br tag");
}
