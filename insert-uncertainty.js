const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const newSection = `              <div className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[26px] sm:text-[28px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">
                    Making uncertainty visible
                  </h3>
                  <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                    Not every email contains enough information to confidently infer an action or deadline.
                  </p>
                  <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                    Semantic Email distinguishes between <strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">explicit information</strong> and <strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">AI-inferred intent</strong>. When context is ambiguous, the system surfaces the interpretation for the user to review rather than silently treating it as fact.
                  </p>
                </div>
                
                <div className="bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 p-5 rounded-sm space-y-4 mt-4">
                  <p className="instrument-serif italic text-[24px] sm:text-[26px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                    "Could you get this to me sometime next week?"
                  </p>
                  
                  <div className="flex flex-col gap-4 pt-2">
                    <div>
                      <div className="font-mono text-[12px] sm:text-[13px] font-semibold text-[#6666FF] dark:text-[#8888FF] mb-1">ACTION</div>
                      <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">Send the document</div>
                    </div>
                    <div>
                      <div className="font-mono text-[12px] sm:text-[13px] font-semibold text-[#6666FF] dark:text-[#8888FF] mb-1">DEADLINE</div>
                      <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">
                        Next week &middot; <span className="italic text-[#6666FF]/80 dark:text-[#8888FF]/80">Inferred</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                  This keeps the copilot helpful without taking control, letting users <strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">confirm, edit, or dismiss</strong> suggestions before they become actionable tasks.
                </p>
              </div>`;

    const searchStr = `                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#8888FF] mt-3 text-center">
                    // contextual response drafting &amp; thread synthesis
                  </p>
                </div>
              </div>`;
              
    content = content.replace(searchStr, searchStr + '\n\n' + newSection);
    
    fs.writeFileSync(file, content);
    console.log("Added uncertainty section");
}
