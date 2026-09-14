import re

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'r') as f:
    content = f.read()

# 1. Add TOC hook imports if needed
if 'useEffect' not in content:
    content = content.replace("import { useState }", "import { useState, useEffect, useRef }")
else:
    if 'useRef' not in content:
        content = content.replace("useState,", "useState, useRef,")

# 2. Add TOC hook logic
hook_logic = """
  // Table of Contents logic
  const [headings, setHeadings] = useState<{id: string, text: string}[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find all h2 in the article
    const article = document.querySelector('article');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2'));
    const newHeadings = elements.map((el, index) => {
      // Give it an ID if it doesn't have one
      if (!el.id) {
        el.id = `heading-${index}`;
      }
      return {
        id: el.id,
        text: el.textContent || ''
      };
    });
    setHeadings(newHeadings);

    // Intersection Observer for highlighting
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' }); // Trigger near the top

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [slug]);
"""

# Insert hook logic inside BlogPostClient just before return
content = content.replace("const handleShare", hook_logic + "\n  const handleShare")


# 3. Update the layout
# We want to change the outer structure to include the sidebar.
# Old:
#       {/* Main Container */}
#       <main className="w-full relative z-10 flex flex-col max-w-[560px] animate-in fade-in duration-200">
# New:
#       <div className="w-full relative z-10 flex flex-row items-start justify-center max-w-[1000px] gap-8 lg:gap-16">
#         <aside className="hidden lg:block w-[240px] shrink-0 sticky top-24 self-start animate-in fade-in duration-200">
#           <nav className="flex flex-col space-y-3">
#             {headings.map(h => (
#               <a 
#                 key={h.id} 
#                 href={`#${h.id}`}
#                 className={`text-[13px] leading-snug transition-colors ${activeId === h.id ? 'font-medium text-[#2C2C2C] dark:text-[#F2F2F2]' : 'text-[#737373] dark:text-[#a3a3a3] hover:text-[#2C2C2C] dark:hover:text-[#F2F2F2]'}`}
#               >
#                 {h.text}
#               </a>
#             ))}
#           </nav>
#         </aside>
#         <main className="w-full flex-1 max-w-[560px] animate-in fade-in duration-200">

content = content.replace(
    '      {/* Main Container */}\n      <main className="w-full relative z-10 flex flex-col max-w-[560px] animate-in fade-in duration-200">',
    """      {/* Main Container Wrapper */}
      <div className="w-full relative z-10 flex flex-row items-start justify-center max-w-[1000px] gap-8 lg:gap-16 mx-auto">
        
        {/* Table of Contents Sidebar */}
        <aside className="hidden lg:block w-[220px] shrink-0 sticky top-24 self-start animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3.5 pr-4 border-l border-neutral-200/50 dark:border-neutral-800/50 pl-4">
            {headings.map((h, idx) => (
              <a 
                key={h.id} 
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(h.id);
                }}
                className={`text-[13px] leading-[1.4] transition-colors block ${activeId === h.id || (idx === 0 && activeId === '') ? 'font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]' : 'text-[#737373] dark:text-[#a3a3a3] hover:text-[#2C2C2C] dark:hover:text-[#F2F2F2]'}`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full flex-1 max-w-[560px] animate-in fade-in duration-200">"""
)

# And we need to close the div at the very end.
content = content.replace(
    '      </main>\n    </div>',
    '      </main>\n      </div>\n    </div>'
)

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'w') as f:
    f.write(content)

