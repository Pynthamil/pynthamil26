const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add text-center to the main container
    content = content.replace(
        '<div className="bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 p-5 rounded-sm space-y-4 mt-4">',
        '<div className="bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 p-5 rounded-sm space-y-4 mt-4 text-center">'
    );
    
    // Add items-center to the flex col
    content = content.replace(
        '<div className="flex flex-col gap-4 pt-2">',
        '<div className="flex flex-col items-center gap-4 pt-2">'
    );
    
    fs.writeFileSync(file, content);
    console.log("Centered the uncertainty block");
}
