import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# 1. Experience in Home page
start_exp = content.find('<section id="home-experience"')
if start_exp != -1:
    end_exp = content.find('<ul', start_exp)
    old_header = content[start_exp:end_exp]
    
    new_header = """<section id="home-experience" className="w-full scroll-mt-24 mb-12 sm:mb-14">
              <h2 className="font-sans text-[14px] sm:text-[15px] uppercase tracking-[0.08em] text-[#475569] dark:text-[#94A3B8] mb-3.5 font-semibold">
                Experience
              </h2>
              """
    content = content[:start_exp] + new_header + content[end_exp:]

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
print("Updated home experience")
