with open('src/app/blog/[slug]/BlogPostClient.tsx', 'r') as f:
    content = f.read()

# The header section has <div className="space-y-6"> which needs to be closed.
# The end of the header section is just before the <aside> tag.
aside_start = content.find('{/* Table of Contents Sidebar */}')
if aside_start != -1:
    # insert </div> before aside_start, inside the header div
    # Wait, the header div already has a closing </div> for the lg:col-start-2 wrapper!
    # We need TWO closing divs before the aside_start.
    content = content[:aside_start] + '</div>\n        ' + content[aside_start:]

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'w') as f:
    f.write(content)
