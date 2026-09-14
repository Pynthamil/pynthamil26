import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# 1. Extract Experience Section
exp_start = content.find('<section id="experience"')
if exp_start == -1:
    print("Could not find experience section")
    exit(1)

exp_end = content.find('</section>', exp_start) + 10
exp_code = content[exp_start:exp_end]

# Modify the id so we don't have duplicate IDs on the page, just in case
exp_code = exp_code.replace('id="experience"', 'id="home-experience"')

# 2. Inject into Home view
# We will inject it AFTER the Work section in the Home view.
# The Home view has the `Work Section` block ending with `)}`
home_view_start = content.find('VIEW 1: HOME VIEW')
home_work_start = content.find('{/* Work Section */}', home_view_start)
home_work_end = content.find(')}', content.find('</section>', home_work_start)) + 2

# Actually, the home_work_end is the end of the conditionally rendered Work block.
# Let's insert the Experience block right after it.
# We should wrap it in `{portfolioData.experiences.length > 0 && (` just in case?
# It's already wrapped if it needs to be, but in the About view it's just a section.
# We will just append it.

insertion_point = home_work_end
new_content = content[:insertion_point] + "\n\n            {/* Experience Section */}\n            " + exp_code + content[insertion_point:]

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(new_content)

print("Done injecting Experience into Home")
