const fs = require('fs');

// Project pages
const projectFiles = [
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx',
    'src/app/messaging/page.tsx',
    'src/app/orca/page.tsx'
];

for (const file of projectFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(
            'text-[38px] sm:text-[44px]',
            'text-[48px] sm:text-[56px]'
        );
        fs.writeFileSync(file, content);
    }
}

// Blog post titles
const blogFile = 'src/app/blog/[slug]/BlogPostClient.tsx';
if (fs.existsSync(blogFile)) {
    let content = fs.readFileSync(blogFile, 'utf8');
    content = content.replace(
        'text-[34px] sm:text-[38px]',
        'text-[42px] sm:text-[48px]'
    );
    fs.writeFileSync(blogFile, content);
}

// Main site title
const navFile = 'src/components/PortfolioView.tsx';
if (fs.existsSync(navFile)) {
    let content = fs.readFileSync(navFile, 'utf8');
    content = content.replace(
        'text-[32px] sm:text-[36px]',
        'text-[38px] sm:text-[44px]'
    );
    fs.writeFileSync(navFile, content);
}

console.log("Bumped title sizes");
