const fs = require('fs');

const file = 'src/app/messaging/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = '<li className="pl-1">';
    const replace = '<li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">';
    
    content = content.replace(/<li className="pl-1">/g, replace);
    
    fs.writeFileSync(file, content);
    console.log("Added wavy hover effect to list items in Messaging");
}
