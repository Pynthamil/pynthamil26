import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# 1. Update imports
import_search = 'import { Moon, Sun, Mail } from "lucide-react";'
import_replace = 'import { Moon, Sun, Copy, Check } from "lucide-react";'
content = content.replace(import_search, import_replace)

if 'import { Moon, Sun } from "lucide-react";' in content: # fallback
    content = content.replace('import { Moon, Sun } from "lucide-react";', 'import { Moon, Sun, Copy, Check } from "lucide-react";')

# 2. Add state and function
state_search = 'const [viewMode, setViewMode] = useState<"home" | "about" | "blog">(initialViewMode);'
state_replace = """const [viewMode, setViewMode] = useState<"home" | "about" | "blog">(initialViewMode);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    if (soundOn) playClickSound();
    navigator.clipboard.writeText("pavendanpynthamil@gmail.com");
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };"""
content = content.replace(state_search, state_replace)

# 3. Update footer
footer_search = """        {/* Unified Footer for all views */}
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
        </footer>"""

footer_replace = """        {/* Unified Footer for all views */}
        <footer className="w-full pt-16 mt-auto flex flex-col items-start gap-5 font-sans text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
          <button 
             onClick={handleCopyEmail}
             className="flex items-center justify-center space-x-2 px-3 py-1.5 bg-[#EEF2FF] dark:bg-[#312E81]/20 border border-[#818CF8] dark:border-[#4F46E5] text-[#4F46E5] dark:text-[#818CF8] text-[14px] font-medium rounded-md hover:bg-[#E0E7FF] dark:hover:bg-[#312E81]/40 transition-colors focus:outline-none"
          >
             <span>{isEmailCopied ? "copied!" : "email"}</span>
             {isEmailCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-0">
             <div>coding is an art and im an artist</div>
             <div>made w love &copy; 2026</div>
          </div>
        </footer>"""

if footer_search in content:
    content = content.replace(footer_search, footer_replace)
    with open('src/components/PortfolioView.tsx', 'w') as f:
        f.write(content)
    print("Done")
else:
    print("Could not find footer to replace")

