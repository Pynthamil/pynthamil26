const fs = require('fs');

const projects = [
    { file: 'src/app/orca/page.tsx', light: '#007FFF', dark: '#FFF0F5' },
    { file: 'src/app/messaging/page.tsx', light: '#00BF63', dark: '#E4FFC1' },
    { file: 'src/app/semantic/page.tsx', light: '#6666FF', dark: '#8888FF' },
    { file: 'src/app/shelf/page.tsx', light: '#FFA134', dark: '#FFA134' },
];

for (const p of projects) {
    if (fs.existsSync(p.file)) {
        let content = fs.readFileSync(p.file, 'utf8');
        
        const footerBlock = `
        {/* Thanks for reading block */}
        <div className="flex flex-col items-center justify-center w-full pt-20 pb-4 mt-16 border-t border-neutral-100 dark:border-neutral-800/60">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[${p.light}] dark:text-[${p.dark}] hover:opacity-80 transition-opacity mb-8 font-medium font-sans text-[15.5px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span className="underline underline-offset-4 decoration-2">Scroll Back to Top</span>
          </button>
          
          <h2 className="text-[32px] sm:text-[38px] font-bold text-[#2C2C2C] dark:text-[#F2F2F2] mb-12 tracking-tight">
            Thanks for reading!
          </h2>

          <div className="flex items-center justify-center space-x-6">
            <img src="/nova-working.svg" alt="Nova" className="w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] object-contain opacity-90 drop-shadow-sm" />
            <img src="/nova-looking.svg" alt="Nova" className="w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] object-contain opacity-90 drop-shadow-sm" />
          </div>
          
          <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mt-12 mb-4"></div>
        </div>
`;

        // insert right before </article>
        content = content.replace('</article>', footerBlock + '\n        </article>');
        
        fs.writeFileSync(p.file, content);
        console.log(`Added thanks block to ${p.file}`);
    }
}
