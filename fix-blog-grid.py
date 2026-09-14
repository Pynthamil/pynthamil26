import re

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'r') as f:
    content = f.read()

# Current structure:
#      {/* Main Container Wrapper */}
#      <div className="w-full relative z-10 flex flex-row items-start justify-center max-w-[1000px] gap-8 lg:gap-16 mx-auto">
#        
#        {/* Table of Contents Sidebar */}
#        <aside className="hidden lg:block w-[220px] shrink-0 sticky top-24 self-start animate-in fade-in duration-200">
#           ...
#        </aside>
#
#        {/* Main Content */}
#        <main className="w-full flex-1 max-w-[560px] animate-in fade-in duration-200">
#        {/* Top Navigation */}
#        ...
#        {/* Article Header */}
#        <article className="space-y-6">
#          ... up to Action Bar ...
#          {/* Action Bar */}
#          <div className="flex items-center justify-between py-4 border-b border-neutral-200/70 dark:border-[#a3a3a3]/20 mb-8 ...">
#             ...
#          </div>
#
#          {/* ARTICLE 1: ... */}

# We need to change the flex container to grid:
# <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,560px)] justify-center max-w-[1000px] gap-x-8 lg:gap-x-16 mx-auto">
#   
#   {/* Header Section */}
#   <div className="lg:col-start-2 lg:row-start-1 w-full animate-in fade-in duration-200">
#      {/* Top Nav, Article Header, Action Bar */}
#   </div>
#
#   <aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start animate-in fade-in duration-200">
#      ...
#   </aside>
#
#   <main className="lg:col-start-2 lg:row-start-2 w-full animate-in fade-in duration-200">
#      <article className="space-y-6">
#         ...

# Let's do string replacement carefully.
# 1. Replace the flex wrapper with grid wrapper
content = content.replace(
    '<div className="w-full relative z-10 flex flex-row items-start justify-center max-w-[1000px] gap-8 lg:gap-16 mx-auto">',
    '<div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,560px)] justify-center max-w-[1000px] gap-x-8 lg:gap-x-16 mx-auto">'
)

# 2. Update aside to have grid placement
content = content.replace(
    '<aside className="hidden lg:block w-[220px] shrink-0 sticky top-24 self-start animate-in fade-in duration-200">',
    '<aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start animate-in fade-in duration-200 pt-1">'
)

# 3. Update main. We need to split the header out.
# Find the start of main
main_start = content.find('        {/* Main Content */}\n        <main className="w-full flex-1 max-w-[560px] animate-in fade-in duration-200">')
if main_start != -1:
    # Replace the main tag with the header div
    content = content[:main_start] + '        {/* Header Section */}\n        <div className="lg:col-start-2 lg:row-start-1 w-full animate-in fade-in duration-200">' + content[main_start + len('        {/* Main Content */}\n        <main className="w-full flex-1 max-w-[560px] animate-in fade-in duration-200">'):]

# 4. Close the header div and open the main tag right after Action bar
# Action bar ends with:
#               <span>{isCopied ? "Copied!" : "Share"}</span>
#             </button>
#           </div>
action_bar_end = content.find('          {/* =========================================================\n              ARTICLE 1: GIT COMMIT GO')
if action_bar_end != -1:
    # Insert closing div for header and opening main for content
    # Wait, the `<article className="space-y-6">` wraps the whole thing originally!
    # Let's check where `<article>` starts.
    # It starts right after `{/* Article Header */}`
    pass

with open('debug_grid.py', 'w') as f:
    f.write("Done")
