import re
import os

files = [
    'src/components/PortfolioView.tsx',
    'src/app/blog/[slug]/BlogPostClient.tsx',
    'src/app/semantic/page.tsx',
    'src/app/shelf/page.tsx',
    'src/app/messaging/page.tsx',
    'src/app/orca/page.tsx'
]

def bump_fonts(content):
    # Bump typical font sizes up by 1-2px
    content = content.replace('text-[17px] sm:text-[18px]', 'text-[18px] sm:text-[20px]')
    content = content.replace('text-[16px] sm:text-[17px]', 'text-[17px] sm:text-[19px]')
    content = content.replace('text-[15.5px] sm:text-[16.5px]', 'text-[16.5px] sm:text-[18px]')
    
    # Bump main h2s and titles
    content = content.replace('text-[22px] sm:text-[24px]', 'text-[24px] sm:text-[26px]')
    
    # Bump project titles which are fixed at 22px
    content = content.replace('text-[22px] tracking-[0.02em]', 'text-[24px] tracking-[0.02em]')
    
    # Bump footer slightly
    content = content.replace('text-[14px] sm:text-[14.5px]', 'text-[15px] sm:text-[16px]')
    
    return content

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        new_content = bump_fonts(content)
        
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

