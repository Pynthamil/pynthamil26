import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# Change button colors to teal
old_btn = 'bg-[#EEF2FF] dark:bg-[#312E81]/20 border border-[#818CF8] dark:border-[#4F46E5] text-[#4F46E5] dark:text-[#818CF8] text-[14px] font-medium rounded-[3px] hover:bg-[#E0E7FF] dark:hover:bg-[#312E81]/40'
new_btn = 'bg-[#00B5B2]/10 dark:bg-[#00B5B2]/10 border border-[#00B5B2]/40 dark:border-[#00B5B2]/40 text-[#009B99] dark:text-[#00B5B2] text-[14px] font-medium rounded-[3px] hover:bg-[#00B5B2]/20 dark:hover:bg-[#00B5B2]/20'

content = content.replace(old_btn, new_btn)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
print("Updated button color")
