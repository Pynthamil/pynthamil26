const fs = require('fs');
const file = 'src/components/PortfolioView.tsx';

if (fs.existsSync(file)) {
    let lines = fs.readFileSync(file, 'utf8').split('\n');
    
    // Find the specific line that contains the home-experience span
    for (let i = 460; i < 480; i++) {
        if (lines[i].includes('instrument-serif italic underline decoration-wavy')) {
            lines[i] = lines[i].replace(' underline decoration-wavy underline-offset-[5px] decoration-1 decoration-[#00B5B2]/30 dark:decoration-[#00B5B2]/30', '');
            break; // only replace the first occurrence (which is the homepage one)
        }
    }
    
    fs.writeFileSync(file, lines.join('\n'));
    console.log("Removed curly underline from homepage experience");
}
