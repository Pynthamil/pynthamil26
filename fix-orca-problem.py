import re

with open('src/app/orca/page.tsx', 'r') as f:
    content = f.read()

# Current text
old_h3 = """Finding an answer is only half the problem when researchers still have to verify where it came from."""
new_h3 = """Research is scattered across papers, datasets, and citations, making even simple questions difficult to verify."""

old_p = """Researchers spend hours searching across fragmented scientific sources and manually validating findings. Without a centralized way to synthesize these documents, it becomes difficult to quickly identify relevant evidence and trace conclusions back to reliable citations."""
new_p = """Researchers spend hours jumping between fragmented scientific sources, tracing citations, and manually checking whether findings actually support a conclusion. The information exists, but the lack of connected, verifiable evidence makes research slow and difficult to trust."""

content = content.replace(old_h3, new_h3)
content = content.replace(old_p, new_p)

with open('src/app/orca/page.tsx', 'w') as f:
    f.write(content)
print("Updated orca problem section")
