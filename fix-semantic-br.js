const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add two <br /> tags after the paragraph.
    content = content.replace(
        '<p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">\n                    An AI-powered inbox layer that understands incoming emails, extracts what matters, and turns them into actionable tasks, deadlines, and context so nothing important gets lost.\n                  </p>',
        '<p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">\n                    An AI-powered inbox layer that understands incoming emails, extracts what matters, and turns them into actionable tasks, deadlines, and context so nothing important gets lost.\n                  </p>\n                  <br/><br/>'
    );
    
    fs.writeFileSync(file, content);
    console.log("Added br tags");
}
