const fs = require('fs');

const file = 'src/app/messaging/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
        /text-\[15px\] sm:text-\[16px\]/g,
        'text-[17px] sm:text-[19px]'
    );
    
    fs.writeFileSync(file, content);
    console.log("Updated font sizes in Messaging");
}
