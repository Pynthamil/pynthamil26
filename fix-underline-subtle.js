const fs = require('fs');

const file = 'src/components/PortfolioView.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
        /decoration-2 decoration-\[#00B5B2\]\/50 dark:decoration-\[#00B5B2\]\/50/g,
        'decoration-1 decoration-[#00B5B2]/30 dark:decoration-[#00B5B2]/30'
    );
    
    fs.writeFileSync(file, content);
    console.log("Made underline subtle");
}
