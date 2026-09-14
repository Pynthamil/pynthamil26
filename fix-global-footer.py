import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# Define the new unified footer
unified_footer = """
        {/* Unified Footer for all views */}
        <footer className="w-full pt-10 sm:pt-12 mt-auto border-t border-transparent flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 font-sans text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
          <div className="flex-1 text-left hidden sm:block">coding is an art and im an artist</div>
          <div className="flex-shrink-0 flex justify-center w-full sm:w-auto">
             <a 
               href="mailto:pavendanpynthamil@gmail.com" 
               className="flex items-center justify-center space-x-2 px-3 py-1.5 bg-[#EEF2FF] dark:bg-[#312E81]/20 border border-[#818CF8] dark:border-[#4F46E5] text-[#4F46E5] dark:text-[#818CF8] text-[14px] font-medium rounded-md hover:bg-[#E0E7FF] dark:hover:bg-[#312E81]/40 transition-colors"
             >
                <span>email</span>
                <Mail className="w-3.5 h-3.5" />
             </a>
          </div>
          <div className="flex-1 text-right hidden sm:block">made w love &copy; 2026</div>
          <div className="flex sm:hidden flex-col items-center gap-1 mt-4">
             <div>coding is an art and im an artist</div>
             <div>made w love &copy; 2026</div>
          </div>
        </footer>
      </main>"""

# Find and remove home footer
home_footer_search = re.compile(r'\s*\{/\*.*?\*/\}\s*<footer className="pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-sans text-\[14px\] sm:text-\[14\.5px\] text-\[#64748B\] dark:text-\[#8E95B8\]">\s*<div>coding is an art and im an artist</div>\s*<div>made w love &copy; 2026</div>\s*</footer>')
content = re.sub(home_footer_search, '', content)

# Find and remove about footer
about_footer_search = re.compile(r'\s*\{/\* About Footer \*/\}\s*<footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 font-sans text-\[14px\] sm:text-\[14\.5px\] text-\[#64748B\] dark:text-\[#8E95B8\]">\s*<div className="flex-1 text-left">coding is an art and im an artist</div>\s*<div className="flex-shrink-0 flex justify-center">.*?</footer>', re.DOTALL)
content = re.sub(about_footer_search, '', content)

# Find and remove blog footer
blog_footer_search = re.compile(r'\s*\{/\* Blog Footer \*/\}\s*<footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-sans text-\[14px\] sm:text-\[14\.5px\] text-\[#64748B\] dark:text-\[#8E95B8\]">\s*<div>coding is an art and im an artist</div>\s*<div>made w love &copy; 2026</div>\s*</footer>')
content = re.sub(blog_footer_search, '', content)

# Insert the unified footer right before </main>
# The </main> is around line 940:
#          </div>
#        )}
#      </main>
content = content.replace('      </main>', unified_footer)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)

print("Unified footer applied.")
