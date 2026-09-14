import re

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'r') as f:
    content = f.read()

# We need to change the grid layout to perfectly center the main content (max-w 560px).
# If we have a perfectly centered 560px column, the sidebar needs to sit to its left.
# We can do this with CSS grid by having 3 columns:
# 1fr (left space), 560px (center), 1fr (right space).
# The sidebar goes in the left space, justified to the right so it hugs the center column.
# The header and article go in the center space.

# Let's find the main grid wrapper:
grid_search = '<main className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,560px)] justify-center max-w-[1000px] gap-x-8 lg:gap-x-16 mx-auto">'
# Replace it with a 3-column grid that takes full width:
grid_replace = '<main className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,560px)_1fr] max-w-[1400px] mx-auto">'

# Now update the Header Section
header_search = '{/* Header Section (Top Nav, Title, Hero Image, Action Bar) */}\n        <div className="lg:col-span-2 lg:row-start-1 w-full max-w-[560px] mx-auto animate-in fade-in duration-200">'
header_replace = '{/* Header Section (Top Nav, Title, Hero Image, Action Bar) */}\n        <div className="lg:col-start-2 lg:row-start-1 w-full animate-in fade-in duration-200">'

# Now update the Sidebar
# It goes in col 1. We want it to stick to the right side of col 1, next to the center column.
sidebar_search = '<aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start animate-in fade-in duration-200 pt-2">'
sidebar_replace = '<aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start animate-in fade-in duration-200 pt-2 justify-self-end pr-12 lg:pr-16 w-[220px] box-content">'

# Now update the Article Text Content
article_search = '<article className="lg:col-start-2 lg:row-start-2 w-full animate-in fade-in duration-200">'
article_replace = '<article className="lg:col-start-2 lg:row-start-2 w-full animate-in fade-in duration-200">'

content = content.replace(grid_search, grid_replace)
content = content.replace(header_search, header_replace)
content = content.replace(sidebar_search, sidebar_replace)

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'w') as f:
    f.write(content)

print("Layout updated to 3-column perfect center.")
