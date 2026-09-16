const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Highlight 1
    const search1 = 'Turning everyday emails into clear actions, from quick requests to time-sensitive commitments';
    const replace1 = 'Turning everyday emails into clear actions, from <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">quick requests to time-sensitive commitments</span>';
    
    // Highlight 2
    const search2 = 'Not just drafting replies, but helping you understand the conversation behind them.';
    const replace2 = 'Not just drafting replies, but <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">helping you understand the conversation behind them.</span>';
    
    content = content.replace(search1, replace1);
    content = content.replace(search2, replace2);
    
    fs.writeFileSync(file, content);
    console.log("Added Semantic highlights");
}
