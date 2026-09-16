const fs = require('fs');

const file = 'src/app/orca/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // The specific li tags in the list
    const search = '<li className="pl-1">';
    const replace = '<li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">';
    
    // Only apply it to the 4 specific ones in that list or all pl-1 lis?
    // Let's do it carefully using a regex that matches those specific ones or just replace all `<li className="pl-1">` in orca since it's a nice effect.
    content = content.replace(/<li className="pl-1">/g, replace);
    
    fs.writeFileSync(file, content);
    console.log("Added wavy hover effect to list items in Orca");
}
