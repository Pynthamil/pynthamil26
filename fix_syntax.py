import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# We need to find the sidebar and move it out.
# Find this block:
#            </div>
#            <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block"><ProjectSidebar alwaysVisible={true}
# ...
#            />
#            </div>
#          </div>
#        )}

# And replace it with:
#            </div>
#          </div>
#          <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block"><ProjectSidebar alwaysVisible={true} ... /></div>
#          </>
#        )}

sidebar_regex = r'(</div>\s*)<div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block"><ProjectSidebar alwaysVisible=\{true\}(.*?)/>\s*</div>\s*</div>\s*\)}'

new_code = r'\1</div>\n            <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block"><ProjectSidebar alwaysVisible={true}\2/></div>\n          </>\n        )}'

content = re.sub(sidebar_regex, new_code, content, flags=re.DOTALL)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
