import re

with open('src/data/portfolio.ts', 'r') as f:
    content = f.read()

old_plue = """    {
      title: "Plue",
      description: "Engineering Intern project — coming soon.",
      year: "2026",
      link: "#",
      tags: ["Engineering", "Frontend"],
      status: "Coming Soon",
      category: "Software Engineering",
      themeColor: "#111111",
    },"""

new_plue = """    {
      title: "Plue",
      description: "Engineering Intern project — coming soon.",
      year: "2026",
      link: "#",
      tags: ["Engineering", "Frontend"],
      status: "Coming Soon",
      category: "Software Engineering",
      themeColor: "#111111",
      banner: "/plue.png",
    },"""

content = content.replace(old_plue, new_plue)

with open('src/data/portfolio.ts', 'w') as f:
    f.write(content)
