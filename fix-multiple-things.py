import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# 1. Update selected works heading to font-sans uppercase
selected_works_search = '<h2 className="but-head-regular text-[22px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] mb-3.5">\n                  selected works\n                </h2>'
selected_works_replace = '<h2 className="font-sans text-[14px] sm:text-[15px] uppercase tracking-[0.08em] text-[#475569] dark:text-[#94A3B8] mb-3.5 font-semibold">\n                  selected works\n                </h2>'

if selected_works_search in content:
    content = content.replace(selected_works_search, selected_works_replace)

# 2. Dropdown / Navigator Items
# We need to make sure the sections actually have IDs first!
# Let's search for the titles and inject IDs if they don't have them.
# The `come-say-hi` ID currently wraps a lot of stuff.
# wait, what i am currently learning:
currently_learning_search = '<h2 className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">\n                    what i am currently learning\n                  </h2>'
currently_learning_replace = '<h2 id="currently-learning" className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">\n                    what i am currently learning\n                  </h2>'
content = content.replace(currently_learning_search, currently_learning_replace)

funfacts_search = '<h2 className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">\n                    fun facts about me\n                  </h2>'
funfacts_replace = '<h2 id="fun-facts" className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">\n                    fun facts about me\n                  </h2>'
content = content.replace(funfacts_search, funfacts_replace)

touchgrass_search = '<h2 className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">\n                    when i touch grass\n                  </h2>'
touchgrass_replace = '<h2 id="touching-grass" className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">\n                    when i touch grass\n                  </h2>'
content = content.replace(touchgrass_search, touchgrass_replace)

# Now update the Sidebar array
sidebar_search = """            <ProjectSidebar 
              sections={[
                { id: "meet-the-human", label: "Meet The Human" },
                { id: "fun-facts", label: "Fun Facts" },
                { id: "how-i-learn", label: "How I Learn" },
                { id: "touching-grass", label: "Touching Grass" },
                { id: "come-say-hi", label: "Come Say Hi" },
                { id: "about-my-blog", label: "About My Blog" },
                { id: "stack", label: "Stack" }
              ]}"""
sidebar_replace = """            <ProjectSidebar 
              sections={[
                { id: "experience", label: "Experience" },
                { id: "meet-the-human", label: "Meet The Human" },
                { id: "stack", label: "Stack" },
                { id: "currently-learning", label: "What I Am Currently Learning" },
                { id: "fun-facts", label: "Fun Facts" },
                { id: "touching-grass", label: "When I Touch Grass" },
                { id: "about-my-blog", label: "About My Blog" }
              ]}"""

if sidebar_search in content:
    content = content.replace(sidebar_search, sidebar_replace)
else:
    print("Could not find the Sidebar component to replace")

# 3. Bio text fix
bio_search = '{", "}democratizing learning by making a world where humans can learn on their own terms. also learning how to make minimal interfaces fascinating and not so boring.'
bio_replace = '{", "}democratizing learning by making a world where humans can learn on their own terms.'

if bio_search in content:
    content = content.replace(bio_search, bio_replace)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)

print("Done")
