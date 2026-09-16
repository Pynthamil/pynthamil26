const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'Email is full of tasks, deadlines, and commitments, but inboxes bury them in clutter, making it easy to lose track of what matters.';
    const replace = 'Email is full of tasks, deadlines, and commitments, but inboxes bury them in clutter, making it <span className="bg-[#6666FF]/15 dark:bg-[#8888FF]/20 px-1 rounded-sm">easy to lose track of what matters.</span>';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Added purple highlight");
}
