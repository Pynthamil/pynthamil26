import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# We need to change:
# {viewMode === "about" && (
#   <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200 mt-10 sm:mt-16">
# to:
# {viewMode === "about" && (
#   <>
#     <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200 mt-10 sm:mt-16">

old_start = '''{viewMode === "about" && (
          <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200 mt-10 sm:mt-16">'''
new_start = '''{viewMode === "about" && (
          <>
          <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200 mt-10 sm:mt-16">'''

content = content.replace(old_start, new_start)

# And we need to move the sidebar out of that div.
old_end = '''              </div>
            </div>
            <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block"><ProjectSidebar alwaysVisible={true}
              sections={[
                { id: "experience", label: "Experience" },
                { id: "fun-facts", label: "Fun Facts & Grass" },
                { id: "github-activity", label: "Code Activity" },
                { id: "come-say-hi", label: "Come Say Hi" }
              ]}
              playTone={playTone}
            /></div>
          </div>
        )}'''

new_end = '''              </div>
            </div>
          </div>
          <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block"><ProjectSidebar alwaysVisible={true}
              sections={[
                { id: "experience", label: "Experience" },
                { id: "fun-facts", label: "Fun Facts & Grass" },
                { id: "github-activity", label: "Code Activity" },
                { id: "come-say-hi", label: "Come Say Hi" }
              ]}
              playTone={playTone}
            /></div>
          </>
        )}'''

content = content.replace(old_end, new_end)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
