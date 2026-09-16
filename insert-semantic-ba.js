const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const beforeAfterBlock = `
                {/* BEFORE / AFTER BLOCK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-10">
                  {/* BEFORE */}
                  <div className="border border-neutral-200 dark:border-neutral-800 bg-[#F7F7F7] dark:bg-[#141415] p-5 sm:p-6 rounded-sm">
                    <h4 className="font-mono text-xs sm:text-[13px] font-semibold text-[#ef4444] mb-4 tracking-wider uppercase">Before</h4>
                    <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Reading through every long email thread</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Losing track of scattered deadlines</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Missing buried action items</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Manually drafting contextual responses</li>
                    </ul>
                  </div>

                  {/* AFTER */}
                  <div className="border border-[#10b981]/20 dark:border-[#10b981]/20 bg-[#10b981]/[0.02] dark:bg-[#10b981]/[0.02] p-5 sm:p-6 rounded-sm">
                    <h4 className="font-mono text-xs sm:text-[13px] font-semibold text-[#10b981] mb-4 tracking-wider uppercase">After</h4>
                    <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Instant thread summarization</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Extracted and tracked deadlines</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Highlighted key action items</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Context-aware draft generation</li>
                    </ul>
                  </div>
                </div>
`;

    const searchStr = `An AI-powered inbox layer that understands incoming emails, extracts what matters, and turns them into actionable tasks, deadlines, and context so nothing important gets lost.
                  </p>`;
                  
    content = content.replace(searchStr, searchStr + '\n' + beforeAfterBlock);
    
    fs.writeFileSync(file, content);
    console.log("Added BEFORE/AFTER block to Semantic");
}
