import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# The about view content is inside {viewMode === "about" && (
about_start = content.find('{viewMode === "about" && (')
if about_start == -1:
    print("Could not find about view")
    exit(1)

# We want to find the individual sections:
# experience
# meet-the-human
# stack
# currently-learning
# fun-facts
# touching-grass
# about-my-blog
# come-say-hi

print("Sections found:")
for match in re.finditer(r'<(section|div) id="([^"]+)"', content[about_start:]):
    print(match.group(2))
