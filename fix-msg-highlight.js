const fs = require('fs');

const file = 'src/app/messaging/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'What went wrong initially: tightly coupled message delivery.';
    const replace = 'What went wrong initially: <span className="bg-[#00BF63]/15 dark:bg-[#00BF63]/25 px-1.5 py-0.5 rounded-sm">tightly coupled message delivery.</span>';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Added green highlight in Messaging");
}
