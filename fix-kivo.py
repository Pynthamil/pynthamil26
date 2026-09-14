import re

with open('src/app/messaging/page.tsx', 'r') as f:
    content = f.read()

# 1. Move the WIP banner
wip_banner = """        {/* WIP BANNER */}
        <div className="w-full mt-16 mb-4 p-5 sm:p-6 border border-dashed border-[#00BF63]/40 dark:border-[#E4FFC1]/40 bg-[#00BF63]/[0.02] dark:bg-[#E4FFC1]/[0.04] rounded-none flex flex-col gap-2.5">
          <Lock className="w-4 h-4 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={2.5} />
          <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
            The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00BF63] dark:hover:text-[#E4FFC1] underline decoration-wavy underline-offset-[5px] decoration-[#00BF63] dark:decoration-[#E4FFC1] decoration-2 transition-colors">reach out</a> directly!
          </p>
        </div>"""

if wip_banner in content:
    # Remove from current location
    content = content.replace(wip_banner, "")
else:
    print("Could not find WIP banner exactly as formatted")
    # Let's try finding it dynamically if the exact string fails
    start = content.find('{/* WIP BANNER */}')
    if start != -1:
        end = content.find('</div>', content.find('</div>', start) + 1) + 6
        wip_banner = content[start:end]
        content = content[:start] + content[end:]

# Now insert it under OVERVIEW
# Let's find the end of OVERVIEW section
# It ends with:
#               <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed border-l-2 border-[#00BF63]/30 dark:border-[#E4FFC1]/30 pl-4 py-1 my-4">
#                 The platform combines end-to-end encrypted communication with a fast, minimal interface. The project explores how a messaging product can provide the convenience of mainstream chat apps without relying on advertising, invasive tracking, or exposing users’ personal identifiers.
#               </p>
#             </div>
overview_end_marker = """without relying on advertising, invasive tracking, or exposing users’ personal identifiers.
              </p>
            </div>"""

if overview_end_marker in content:
    # adjust the mt-16 to mt-4 mb-8 since it will be inside the space-y-8 or similar
    wip_banner_adjusted = wip_banner.replace("mt-16 mb-4", "mt-4 mb-8")
    content = content.replace(overview_end_marker, overview_end_marker + '\n\n' + wip_banner_adjusted)
else:
    print("Could not find overview end marker")

# 2. Remove bullet points from Problem section
# The problem section contains:
#              <div className="pt-4 space-y-3">
#                <h4 className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-[17px]">Pain points</h4>
#                <ul className="list-disc pl-5 space-y-3 text-[16px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#00BF63] dark:marker:text-[#E4FFC1]">
#                  ...
#                </ul>
#              </div>

bullets_search = re.compile(r'<div className="pt-4 space-y-3">\s*<h4 className="font-semibold text-\[#2C2C2C\] dark:text-\[#F2F2F2\] text-\[17px\]">Pain points</h4>\s*<ul className="list-disc.*?</ul>\s*</div>', re.DOTALL)
if bullets_search.search(content):
    content = bullets_search.sub('', content)
else:
    print("Could not find bullets section")

with open('src/app/messaging/page.tsx', 'w') as f:
    f.write(content)
print("Done modifying kivo page")
