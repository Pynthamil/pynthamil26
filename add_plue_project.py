import re

with open('src/data/portfolio.ts', 'r') as f:
    content = f.read()

new_proj = """    {
      title: "Plue",
      description: "Engineering Intern project — coming soon.",
      year: "2026",
      link: "#",
      tags: ["Engineering", "Frontend"],
      status: "Coming Soon",
      category: "Software Engineering",
      themeColor: "#4e5df8",
    },
    {
      title: "ORCA",
      description: "AI research assistant that turns complex marine science papers into clear, cited answers.",
      year: "2026",
      link: "/orca","""

# Notice I'm replacing the start of the ORCA entry to inject Plue right before it.
old_proj = """    {
      title: "ORCA",
      description: "AI research assistant that turns complex marine science papers into clear, cited answers.",
      year: "2026",
      link: "/orca","""

content = content.replace(old_proj, new_proj)

with open('src/data/portfolio.ts', 'w') as f:
    f.write(content)
