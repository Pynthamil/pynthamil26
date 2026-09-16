const fs = require('fs');

// 1. Update layout.tsx
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
layout = layout.replace(
    'family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
    'family=Instrument+Serif:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap'
);
fs.writeFileSync('src/app/layout.tsx', layout);

// 2. Update tailwind.config.ts
let tailwind = fs.readFileSync('tailwind.config.ts', 'utf8');
tailwind = tailwind.replace(
    /serif: \['"But Head"', "serif"\],/g,
    'serif: [\'"Instrument Serif"\', "serif"],'
);
fs.writeFileSync('tailwind.config.ts', tailwind);

// 3. Update globals.css
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace('.but-head-regular {', '.instrument-serif {\n    font-family: "Instrument Serif", serif;\n');
css = css.replace(/font-family: "But Head", serif;/g, '');
fs.writeFileSync('src/app/globals.css', css);

// 4. Update all components
const files = [
    'src/components/PortfolioView.tsx',
    'src/app/blog/[slug]/BlogPostClient.tsx',
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx',
    'src/app/messaging/page.tsx',
    'src/app/orca/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/but-head-regular/g, 'instrument-serif');
        fs.writeFileSync(file, content);
    }
}
console.log("Swapped to Instrument Serif");
