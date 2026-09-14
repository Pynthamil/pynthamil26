import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# 1. Extract the work section code
work_section_start = content.find('{/* Work Section */}')
if work_section_start == -1:
    print("Could not find work section")
    exit(1)

work_section_end = content.find('</section>', work_section_start) + 10
condition_end = content.find(')}', work_section_end) + 2

work_section_code = content[work_section_start:condition_end]

# 2. Inject it into Home view
home_view_end = content.find('</section>', content.find('VIEW 1: HOME VIEW')) + 10

# Look at what is after </section> in home view
# It's `\n            \n          </div>\n        )}`
home_view_closing = content.find('</div>\n        )}', home_view_end)

new_home_view = content[content.find('VIEW 1: HOME VIEW'):home_view_closing] + "\n            " + work_section_code + "\n          " + content[home_view_closing:home_view_closing+16]

# Replace the home view
content = content[:content.find('VIEW 1: HOME VIEW')] + new_home_view + content[home_view_closing+16:]

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)

print("Done")
