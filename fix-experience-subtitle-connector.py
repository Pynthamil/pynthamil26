import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

old_subtitle = """              <p className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] mb-5">
                where i've worked
              </p>"""

new_subtitle = """              <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 mb-5 flex items-center space-x-1.5">
                <span className="select-none">└</span>
                <span>where i've worked</span>
              </p>"""

content = content.replace(old_subtitle, new_subtitle)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)

