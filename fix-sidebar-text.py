import re

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'r') as f:
    content = f.read()

# I changed this:
# <aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start animate-in fade-in duration-200 pt-2 justify-self-end pr-8 xl:pr-16 w-full max-w-[240px]">
# Let's make it wider, max-w-[280px]
aside_search = 'justify-self-end pr-8 xl:pr-16 w-full max-w-[240px]'
aside_replace = 'justify-self-end pr-8 xl:pr-12 w-full max-w-[260px]'
content = content.replace(aside_search, aside_replace)

# And I changed the text class:
# className={`text-[14px] sm:text-[14.5px] leading-[1.6] transition-colors block ${activeId === h.id ...
text_search = 'text-[14px] sm:text-[14.5px] leading-[1.6] transition-colors block'
text_replace = 'text-[13.5px] sm:text-[14px] leading-[1.5] transition-colors block'
content = content.replace(text_search, text_replace)

with open('src/app/blog/[slug]/BlogPostClient.tsx', 'w') as f:
    f.write(content)

print("Fixed sidebar wrapping")
