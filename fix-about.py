import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# 1. Update project title hover
content = content.replace(
    'className="but-head-regular text-[22px] tracking-[0.02em] transition-colors hover:opacity-80 text-[#0F172A] dark:text-[#F2F2F2] italic"',
    'className="but-head-regular text-[22px] tracking-[0.02em] transition-all hover:underline decoration-wavy underline-offset-4 decoration-2 text-[#0F172A] dark:text-[#F2F2F2] italic"'
)

# 2. Update Experience rendering
# From:
#                         <div className="flex flex-col">
#                           <span className="font-semibold text-[#0F172A] dark:text-[#F2F2F2] tracking-[0.02em]">
#                             {item.role}
#                           </span>
#                           <span className="text-[13.5px] sm:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium tracking-[0.02em] mt-0.5 flex items-center space-x-1.5">
#                             <span className="font-mono text-[#64748B] dark:text-[#8E95B8] select-none">└</span>
#                             <span>{item.company}</span>
#                           </span>
#                         </div>

old_exp = """                        <div className="flex flex-col">
                          <span className="font-semibold text-[#0F172A] dark:text-[#F2F2F2] tracking-[0.02em]">
                            {item.role}
                          </span>
                          <span className="text-[13.5px] sm:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium tracking-[0.02em] mt-0.5 flex items-center space-x-1.5">
                            <span className="font-mono text-[#64748B] dark:text-[#8E95B8] select-none">└</span>
                            <span>{item.company}</span>
                          </span>
                        </div>"""

new_exp = """                        <div className="flex flex-col justify-center h-full">
                          <span className="font-bold text-[#0F172A] dark:text-[#F2F2F2] tracking-[0.02em]">
                            {item.role.toLowerCase().replace(/\\b\\w/g, s => s.toUpperCase())} @ {item.company.toLowerCase().replace(/\\b\\w/g, s => s.toUpperCase())}
                          </span>
                        </div>"""

content = content.replace(old_exp, new_exp)

# 3. Update all grey pluses to green pluses
grey_plus = '<span className="font-mono text-[#475569] dark:text-[#94A3B8] select-none pt-0.5">+</span>'
green_plus = '<span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>'

content = content.replace(grey_plus, green_plus)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)

print("Modifications done.")
