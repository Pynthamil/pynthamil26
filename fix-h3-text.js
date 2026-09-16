const fs = require('fs');

const file = 'src/app/orca/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const oldText = 'Research is fragmented, making evidence difficult to find and verify.';
    const oldText2 = 'Finding an answer is only half the problem when researchers still have to verify where it came from.';
    const newText = 'Research is scattered across papers, datasets, and citations, making even simple questions difficult to verify.';
    
    content = content.replace(oldText, newText);
    content = content.replace(oldText2, newText);
    
    fs.writeFileSync(file, content);
    console.log(`Updated text`);
}
