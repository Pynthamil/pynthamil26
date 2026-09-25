import re

with open('src/data/portfolio.ts', 'r') as f:
    content = f.read()

# Current array starts with Plue, then ORCA, then Semantic, then Shelf
# We want ORCA, then Semantic, then Plue, then Shelf.

plue_card = """    {
      title: "Plue",
      description: "Engineering Intern project — coming soon.",
      year: "2026",
      link: "#",
      tags: ["Engineering", "Frontend"],
      status: "Coming Soon",
      category: "Software Engineering",
      themeColor: "#4e5df8",
    },
"""
content = content.replace(plue_card, "")

semantic_card = """    {
      title: "Semantic Email Copilot",
      description: "Context-aware email copilot synthesizing threads, prioritizing actionable items, and drafting smart replies.",
      year: "2026",
      link: "/semantic",
      tags: ["Figma", "UI/UX"],
      banner: "/semantic1.svg",
      status: "Concept",
      category: "Product Design",
      themeColor: "#6666FF",
    },"""

plue_card_updated = """    {
      title: "Plue",
      description: "Engineering Intern project — coming soon.",
      year: "2026",
      link: "#",
      tags: ["Engineering", "Frontend"],
      status: "Coming Soon",
      category: "Software Engineering",
      themeColor: "#111111",
    },"""

new_semantic_and_plue = semantic_card + "\n" + plue_card_updated

content = content.replace(semantic_card, new_semantic_and_plue)

with open('src/data/portfolio.ts', 'w') as f:
    f.write(content)
