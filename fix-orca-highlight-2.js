const fs = require('fs');

const file = 'src/app/orca/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'A focused research assistant that lets scientists move from question to evidence-backed answer without leaving the research workflow.';
    const replace = 'A focused research assistant that lets scientists move from <span className="bg-[#FFF0F5] dark:bg-[#007FFF] dark:text-white px-1 box-decoration-clone">question to evidence-backed answer</span> without leaving the research workflow.';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Added second pink highlight to Orca");
}
