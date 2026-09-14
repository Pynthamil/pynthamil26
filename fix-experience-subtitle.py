with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# Find the Experience heading
heading_search = """              <h2 className="but-head-regular text-[22px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] mb-4">
                Experience
              </h2>"""

replacement = """              <h2 className="but-head-regular text-[22px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] mb-1">
                Experience
              </h2>
              <p className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] mb-5">
                where i've worked
              </p>"""

content = content.replace(heading_search, replacement)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)

