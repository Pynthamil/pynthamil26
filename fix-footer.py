import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# Add Mail to imports
import_search = 'import { Moon, Sun } from "lucide-react";'
import_replace = 'import { Moon, Sun, Mail } from "lucide-react";'
content = content.replace(import_search, import_replace)

# Update Footer
footer_search = """            {/* About Footer */}
            <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-sans text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
              <div>coding is an art and im an artist</div>
              <div>made w love &copy; 2026</div>
            </footer>"""

footer_replace = """            {/* About Footer */}
            <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 font-sans text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
              <div className="flex-1 text-left">coding is an art and im an artist</div>
              <div className="flex-shrink-0 flex justify-center">
                 <a 
                   href="mailto:pavendanpynthamil@gmail.com" 
                   className="flex items-center space-x-2 px-3 py-1.5 bg-[#EEF2FF] dark:bg-[#312E81]/20 border border-[#818CF8] dark:border-[#4F46E5] text-[#4F46E5] dark:text-[#818CF8] text-[14px] font-medium rounded-md hover:bg-[#E0E7FF] dark:hover:bg-[#312E81]/40 transition-colors"
                 >
                    <span>email</span>
                    <Mail className="w-3.5 h-3.5" />
                 </a>
              </div>
              <div className="flex-1 text-right">made w love &copy; 2026</div>
            </footer>"""

if footer_search in content:
    content = content.replace(footer_search, footer_replace)
    with open('src/components/PortfolioView.tsx', 'w') as f:
        f.write(content)
    print("Footer updated")
else:
    print("Footer not found")
