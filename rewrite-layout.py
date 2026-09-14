import re

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'r') as f:
    content = f.read()

# 1. We need to grab everything from `<header className="flex items-center justify-between w-full mb-8">` down to `</button>\n          </div>` which is the action bar.
# 2. We will wrap them in `<div className="lg:col-start-2 lg:row-start-1 w-full">`
# 3. We will put the `<aside>` as `<aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start">`
# 4. We will put the rest inside `<div className="lg:col-start-2 lg:row-start-2 w-full">`
# 5. The outer wrapper will be the grid.

# Let's just reconstruct the whole return block.
return_start = content.find('  return (\n    <div className="min-h-screen')

# The part before return
before_return = content[:return_start]

# We need to find the specific parts inside return.
# The ambient glow is at the top.
# The wrapper starts right after ambient glow.
ambient_glow = '      <div className="ambient-glow" />\n'
ambient_glow_pos = content.find(ambient_glow, return_start)
wrapper_start = ambient_glow_pos + len(ambient_glow)

# Everything from wrapper_start to the end of the file is the main structure.
# Let's extract the pieces:

# 1. Sidebar (aside)
sidebar_match = re.search(r'(<aside.*?</aside>)', content, re.DOTALL)
sidebar = sidebar_match.group(1)

# Modify sidebar classes to add grid positioning
sidebar = sidebar.replace(
    '<aside className="hidden lg:block w-[220px] shrink-0 sticky top-24 self-start animate-in fade-in duration-200">',
    '<aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start animate-in fade-in duration-200 pt-2">'
)

# 2. Top Nav + Article Header + Action Bar
# Starts at <header className="flex items-center justify-between w-full mb-8">
header_start = content.find('<header className="flex items-center justify-between w-full mb-8">')
# Ends at the Action Bar's closing div
# Look for: 
#             <button 
#               onClick={handleShare}
# ...
#               <span>{isCopied ? "Copied!" : "Share"}</span>
#             </button>
#           </div>
action_bar_search = r'<span>\{isCopied \? "Copied!" : "Share"\}</span>\n\s*</button>\n\s*</div>'
action_bar_match = re.search(action_bar_search, content)
action_bar_end = action_bar_match.end()

header_section_content = content[header_start:action_bar_end]
# But wait, there is an <article className="space-y-6"> opening tag inside this section.
# We should remove the <article> tag from here, and place it around the whole grid, or just change it to a div.
header_section_content = header_section_content.replace('<article className="space-y-6">', '<div className="space-y-6">')

# 3. The actual blog posts
# Starts right after action_bar_end
blog_posts_start = action_bar_end
# Ends at the </article> tag
article_end = content.find('</article>', blog_posts_start)
blog_posts_content = content[blog_posts_start:article_end]

# 4. We reconstruct the layout:
new_layout = f"""
      {{/* Main Container Wrapper - Grid Layout */}}
      <main className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,560px)] justify-center max-w-[1000px] gap-x-8 lg:gap-x-16 mx-auto">
        
        {{/* Header Section (Top Nav, Title, Hero Image, Action Bar) */}}
        <div className="lg:col-start-2 lg:row-start-1 w-full animate-in fade-in duration-200">
{header_section_content}
        </div>

        {{/* Table of Contents Sidebar */}}
{sidebar}

        {{/* Article Text Content */}}
        <article className="lg:col-start-2 lg:row-start-2 w-full animate-in fade-in duration-200">
{blog_posts_content}
        </article>

      </main>
    </div>
  );
}}
"""

# Put it all together
new_content = before_return + '  return (\n    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-24 selection:bg-neutral-200">\n      {/* Soft atmospheric ambient glow */}\n      <div className="ambient-glow" />\n' + new_layout

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'w') as f:
    f.write(new_content)

print("Layout updated.")
