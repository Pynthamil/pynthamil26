import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# 1. Project Title Arrow
title_search = """                            <span 
                              className="but-head-regular text-[22px] tracking-[0.02em] transition-all hover:underline decoration-wavy underline-offset-4 decoration-2 text-[#0F172A] dark:text-[#F2F2F2] italic"
                            >
                              {project.title}
                            </span>"""

title_replace = """                            <div className="flex items-center space-x-3">
                              <span 
                                className="but-head-regular text-[22px] tracking-[0.02em] transition-all group-hover:underline decoration-wavy underline-offset-4 decoration-2 text-[#0F172A] dark:text-[#F2F2F2] italic"
                              >
                                {project.title}
                              </span>
                              {(project.link || project.github) && (
                                <span className="flex items-center justify-center w-[24px] h-[24px] rounded-full border-[1.5px] border-neutral-300/80 dark:border-neutral-600/80 text-neutral-400 dark:text-neutral-500 group-hover:border-neutral-400 group-hover:text-neutral-500 dark:group-hover:border-neutral-500 transition-colors">
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7" />
                                    <path d="M7 7h10v10" />
                                  </svg>
                                </span>
                              )}
                            </div>"""
if title_search in content:
    content = content.replace(title_search, title_replace)
else:
    print("Could not find project title")

# 2. Update Footer button text & reduce height
# Current button classes:
# space-x-2 px-3 py-1.5 bg-[#EEF2FF] dark:bg-[#312E81]/20 border border-[#818CF8] dark:border-[#4F46E5] text-[#4F46E5] dark:text-[#818CF8] text-[14px] font-medium rounded-[3px] hover:bg-[#E0E7FF] dark:hover:bg-[#312E81]/40 transition-colors focus:outline-none
# To reduce height: change py-1.5 to py-1, and maybe text-[14px] to text-[13px] if needed, but just py-0.5 or py-1 is fine.
# User wants "pavendanpynthamil@gmail.com" instead of "email"
footer_btn_search = '<span>{isEmailCopied ? "copied!" : "email"}</span>'
footer_btn_replace = '<span>{isEmailCopied ? "copied!" : "pavendanpynthamil@gmail.com"}</span>'
content = content.replace(footer_btn_search, footer_btn_replace)

py_search = 'space-x-2 px-3 py-1.5 bg-[#EEF2FF]'
py_replace = 'space-x-2 px-3 py-1 bg-[#EEF2FF]'
content = content.replace(py_search, py_replace)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
print("Updated PortfolioView")
