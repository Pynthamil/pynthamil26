import re

with open('src/data/portfolio.ts', 'r') as f:
    content = f.read()

new_exp = """    {
      id: "scientiflow",
      company: "SCIENTIFLOW",
      role: "FRONTEND DEVELOPER INTERN",
      period: "MAY 2025 – JUL 2025",
      color: "#111111",
      glowColor: "transparent",
      url: "#",
      bullets: [
        "Designed and developed an interactive drag-and-drop interface for data visualization",
        "Implemented interactive CSV/JSON upload and preview interfaces for 10,000+ row datasets"
      ]
    },
    {
      id: "acm-vit",
      company: "ACM VIT",
      role: "DESIGN CORE",
      period: "DEC 2024 – PRESENT",
      color: "#0088FF",
      glowColor: "transparent",
      url: "https://acmvit.in/",
      bullets: [
        "Led design initiatives and crafted high-fidelity prototypes for chapter events and digital products",
        "Collaborated with developers to ensure seamless translation of UI/UX designs into production"
      ]
    },"""

# Note: The above re.sub assumes exact formatting. To be safe, I'll use replace with a snippet.

old_exp = """    {
      id: "scientiflow",
      company: "SCIENTIFLOW",
      role: "FRONTEND DEVELOPER INTERN",
      period: "MAY 2025 – JUL 2025",
      color: "#111111",
      glowColor: "transparent",
      url: "#",
      bullets: [
        "Designed and developed an interactive drag-and-drop interface for data visualization",
        "Implemented interactive CSV/JSON upload and preview interfaces for 10,000+ row datasets"
      ]
    },"""

content = content.replace(old_exp, new_exp)

with open('src/data/portfolio.ts', 'w') as f:
    f.write(content)
