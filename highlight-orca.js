const fs = require('fs');

const file = 'src/app/orca/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'I designed ORCA around a simple principle: AI should accelerate scientific research without hiding the evidence behind its answers.';
    const replace = 'I designed ORCA around a simple principle: <span className="bg-[#007FFF]/15 dark:bg-[#007FFF]/25 px-1.5 py-0.5 rounded-sm">AI should accelerate scientific research without hiding the evidence behind its answers.</span>';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Added blue highlight in Orca");
}
