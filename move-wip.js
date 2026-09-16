const fs = require('fs');

const file = 'src/app/messaging/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // The exact WIP banner to remove
    const wipBannerRegex = /[ \t]*\{\/\* WIP BANNER \*\/\}\n[ \t]*<div className="w-full mt-4 mb-8 p-5 sm:p-6 border border-dashed border-\[#00BF63\]\/40 dark:border-\[#E4FFC1\]\/40 bg-\[#00BF63\]\/\[0\.02\] dark:bg-\[#E4FFC1\]\/\[0\.04\] rounded-none flex flex-col gap-2\.5">\n[ \t]*<Lock className="w-4 h-4 text-\[#00BF63\] dark:text-\[#E4FFC1\]" strokeWidth=\{2\.5\} \/>\n[ \t]*<p className="text-\[14\.5px\] sm:text-\[15\.5px\] text-\[#475569\] dark:text-\[#CBD5E1\] leading-relaxed">\n[ \t]*The full case study is still a work in progress\. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail\.com" className="text-\[#2C2C2C\] dark:text-\[#F2F2F2\] hover:text-\[#00BF63\] dark:hover:text-\[#E4FFC1\] underline decoration-wavy underline-offset-\[5px\] decoration-\[#00BF63\] dark:decoration-\[#E4FFC1\] decoration-2 transition-colors">reach out<\/a> directly!\n[ \t]*<\/p>\n[ \t]*<\/div>/g;
    
    // Store the exact banner block to insert it later
    const bannerCode = `        {/* WIP BANNER */}
        <div className="w-full mt-12 mb-8 p-5 sm:p-6 border border-dashed border-[#00BF63]/40 dark:border-[#E4FFC1]/40 bg-[#00BF63]/[0.02] dark:bg-[#E4FFC1]/[0.04] rounded-none flex flex-col gap-2.5">
          <Lock className="w-4 h-4 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={2.5} />
          <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
            The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00BF63] dark:hover:text-[#E4FFC1] underline decoration-wavy underline-offset-[5px] decoration-[#00BF63] dark:decoration-[#E4FFC1] decoration-2 transition-colors">reach out</a> directly!
          </p>
        </div>\n\n`;

    // Remove all instances of it
    content = content.replace(wipBannerRegex, '');
    
    // Insert before Thanks block
    content = content.replace('{/* Thanks for reading block */}', bannerCode + '        {/* Thanks for reading block */}');
    
    fs.writeFileSync(file, content);
    console.log("Moved WIP banner to the end");
}
