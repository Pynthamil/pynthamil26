import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# Remove the subtitle <p> block in all 4 instances
old = '''                              <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                                {project.description}
                              </p>'''

content = content.replace(old, '')

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
