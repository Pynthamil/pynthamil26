import re

with open('src/app/messaging/page.tsx', 'r') as f:
    content = f.read()

# The anchor text to insert after
jump_anchor = """            <div className="pt-2 pb-2 flex">
              <a href="#solution" className="inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] px-4 py-2 bg-[#13151E] dark:bg-[#F2F2F2] text-white dark:text-[#13151E] hover:bg-[#2C2C2C] dark:hover:bg-neutral-300 transition-all rounded-sm shadow-sm group">
                Jump to Solution
                <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
              </a>
            </div>"""

problem_section = """

            {/* PROBLEM */}
            <div id="problem" className="space-y-4 scroll-mt-20 pt-10">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                PROBLEM
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Messaging is convenient, but privacy often comes with trade-offs
              </h3>
              <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                Modern messaging apps make communication effortless, but users are often identified through phone numbers, surrounded by unnecessary data collection, and dependent on infrastructure where privacy and convenience aren't always designed together.
              </p>
              
              <div className="pt-4 space-y-3">
                <h4 className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-[17px]">Pain points</h4>
                <ul className="list-disc pl-5 space-y-3 text-[16px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#00BF63] dark:marker:text-[#E4FFC1]">
                  <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Phone-number dependency</strong> — users have to expose a personal identifier to communicate.</li>
                  <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Privacy vs. convenience</strong> — privacy-focused products can introduce friction or feel less polished.</li>
                  <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Centralized message handling</strong> — poorly designed systems can expose message content or excessive metadata.</li>
                  <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Slow or unreliable delivery</strong> — real-time communication becomes complicated when users go offline, reconnect, or use multiple devices.</li>
                  <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Bloated experiences</strong> — unnecessary features, ads, and tracking compete with the core messaging experience.</li>
                </ul>
              </div>
            </div>"""

if jump_anchor in content:
    content = content.replace(jump_anchor, jump_anchor + problem_section)
    with open('src/app/messaging/page.tsx', 'w') as f:
        f.write(content)
    print("Successfully added problem section.")
else:
    print("Could not find jump anchor.")

