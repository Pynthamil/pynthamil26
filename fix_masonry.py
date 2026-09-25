import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# We need to extract the li generation logic so we don't repeat it.
# Actually, the grid container is:
# <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[1240px] mx-auto items-start font-mono text-[16.5px] sm:text-[18px] tracking-[0.02em]">

masonry_replacement = """<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-[1240px] mx-auto items-start font-mono text-[16.5px] sm:text-[18px] tracking-[0.02em]">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-1/2">
                      {portfolioData.projects.filter((_, i) => i % 2 === 0).map((project: Project, idx: number) => {
                        const originalIdx = portfolioData.projects.indexOf(project);
                        const isInternal = project.link && project.link.startsWith("/");
                        const isSemantic = project.title === "Semantic Email Copilot";
                        const isOrca = project.title === "ORCA";
                        const aspectClass = isSemantic ? "aspect-[3/4] sm:aspect-[1/1.4]" : "aspect-[4/3] sm:aspect-[1.15/1]";
                        const imageSizeClass = "h-[85%] sm:h-[85%]";
                        const hoverScaleClass = isSemantic ? "" : "group-hover:scale-[1.03]";

                        return (
                          <div
                            key={originalIdx}
                            className="group flex flex-col py-1.5 cursor-dot transition-opacity w-full"
                            onClick={() => {
                              if (isInternal && project.link) {
                                playTone(880);
                                window.location.href = project.link;
                              } else {
                                setSelectedProject(project);
                              }
                            }}
                          >
                            {(project.banner || project.status === "Coming Soon") && (
                              <div 
                                className={`w-full mb-3 overflow-hidden rounded-[8px] sm:rounded-[12px] flex items-center justify-center relative ${aspectClass} transition-all duration-500 bg-[#D5F1FF] dark:bg-[#1A1A1A]`}
                              >
                                <div 
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                  style={{ backgroundColor: project.themeColor }}
                                />

                                {project.title === "ORCA" ? (
                                  <div className={`z-10 w-[92%] sm:w-[88%] mt-12 sm:mt-0 overflow-hidden rounded-[8px] sm:rounded-[12px] bg-white/60 group-hover:bg-white/20 dark:bg-white/10 p-2.5 sm:p-3.5 backdrop-blur-md border border-white/80 group-hover:border-white/10 shadow-sm group-hover:shadow-none transition-all duration-700 ease-out ${hoverScaleClass}`}>
                                    <div className="w-full overflow-hidden rounded-[6px] sm:rounded-[8px] bg-white dark:bg-[#141415] flex items-center justify-center">
                                      <img 
                                        src={project.banner} 
                                        alt={project.title} 
                                        className="w-full h-auto object-cover"
                                      />
                                    </div>
                                  </div>
                                ) : project.banner?.match(/\.(mp4|webm|mov)$/i) ? (
                                  <video 
                                    src={project.banner} 
                                    loop 
                                    muted 
                                    playsInline 
                                    className={`transition-transform duration-700 ease-out ${hoverScaleClass} bg-transparent ${project.coverBg ? `w-auto ${imageSizeClass} object-contain drop-shadow-2xl` : 'w-full h-full object-cover'}`}
                                  />
                                ) : project.banner ? (
                                  <img 
                                    src={project.banner} 
                                    alt={project.title} 
                                    className="z-10 w-auto h-[80%] sm:h-[80%] object-contain drop-shadow-lg transition-transform duration-700 ease-out translate-y-[4%] sm:translate-y-[6%]"
                                  />
                                ) : null}
                                {project.category && (
                                  <div className="absolute top-5 right-5 flex items-center gap-1.5 px-5 py-2 rounded-[8px] text-[16px] sm:text-[18px] font-sans font-medium tracking-wide whitespace-nowrap bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-slate-700 dark:text-white group-hover:bg-white/20 group-hover:border-white/50 group-hover:text-white transition-all shadow-sm z-10">
                                    {project.category.toLowerCase()}
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="flex flex-col mt-2 px-1">
                              <p className="text-[22px] sm:text-[25px] font-sans text-[#475569] dark:text-[#CBD5E1] leading-[1.35] transition-colors group-hover:text-[#0F172A] dark:group-hover:text-[#F2F2F2]">
                                {project.title}
                              </p>
                              <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-1/2">
                      {portfolioData.projects.filter((_, i) => i % 2 !== 0).map((project: Project, idx: number) => {
                        const originalIdx = portfolioData.projects.indexOf(project);
                        const isInternal = project.link && project.link.startsWith("/");
                        const isSemantic = project.title === "Semantic Email Copilot";
                        const isOrca = project.title === "ORCA";
                        const aspectClass = isSemantic ? "aspect-[3/4] sm:aspect-[1/1.4]" : "aspect-[4/3] sm:aspect-[1.15/1]";
                        const imageSizeClass = "h-[85%] sm:h-[85%]";
                        const hoverScaleClass = isSemantic ? "" : "group-hover:scale-[1.03]";

                        return (
                          <div
                            key={originalIdx}
                            className="group flex flex-col py-1.5 cursor-dot transition-opacity w-full"
                            onClick={() => {
                              if (isInternal && project.link) {
                                playTone(880);
                                window.location.href = project.link;
                              } else {
                                setSelectedProject(project);
                              }
                            }}
                          >
                            {(project.banner || project.status === "Coming Soon") && (
                              <div 
                                className={`w-full mb-3 overflow-hidden rounded-[8px] sm:rounded-[12px] flex items-center justify-center relative ${aspectClass} transition-all duration-500 bg-[#D5F1FF] dark:bg-[#1A1A1A]`}
                              >
                                <div 
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                  style={{ backgroundColor: project.themeColor }}
                                />

                                {project.title === "ORCA" ? (
                                  <div className={`z-10 w-[92%] sm:w-[88%] mt-12 sm:mt-0 overflow-hidden rounded-[8px] sm:rounded-[12px] bg-white/60 group-hover:bg-white/20 dark:bg-white/10 p-2.5 sm:p-3.5 backdrop-blur-md border border-white/80 group-hover:border-white/10 shadow-sm group-hover:shadow-none transition-all duration-700 ease-out ${hoverScaleClass}`}>
                                    <div className="w-full overflow-hidden rounded-[6px] sm:rounded-[8px] bg-white dark:bg-[#141415] flex items-center justify-center">
                                      <img 
                                        src={project.banner} 
                                        alt={project.title} 
                                        className="w-full h-auto object-cover"
                                      />
                                    </div>
                                  </div>
                                ) : project.banner?.match(/\.(mp4|webm|mov)$/i) ? (
                                  <video 
                                    src={project.banner} 
                                    loop 
                                    muted 
                                    playsInline 
                                    className={`transition-transform duration-700 ease-out ${hoverScaleClass} bg-transparent ${project.coverBg ? `w-auto ${imageSizeClass} object-contain drop-shadow-2xl` : 'w-full h-full object-cover'}`}
                                  />
                                ) : project.banner ? (
                                  <img 
                                    src={project.banner} 
                                    alt={project.title} 
                                    className="z-10 w-auto h-[80%] sm:h-[80%] object-contain drop-shadow-lg transition-transform duration-700 ease-out translate-y-[4%] sm:translate-y-[6%]"
                                  />
                                ) : null}
                                {project.category && (
                                  <div className="absolute top-5 right-5 flex items-center gap-1.5 px-5 py-2 rounded-[8px] text-[16px] sm:text-[18px] font-sans font-medium tracking-wide whitespace-nowrap bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-slate-700 dark:text-white group-hover:bg-white/20 group-hover:border-white/50 group-hover:text-white transition-all shadow-sm z-10">
                                    {project.category.toLowerCase()}
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="flex flex-col mt-2 px-1">
                              <p className="text-[22px] sm:text-[25px] font-sans text-[#475569] dark:text-[#CBD5E1] leading-[1.35] transition-colors group-hover:text-[#0F172A] dark:group-hover:text-[#F2F2F2]">
                                {project.title}
                              </p>
                              <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>"""

import re
# We need to replace the entire <ul className="grid ...">...</ul> block.
# There are two of them in the file (home view and projects view).
# So we'll find <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[1240px] mx-auto items-start font-mono text-[16.5px] sm:text-[18px] tracking-[0.02em]">
# and grab everything up to its corresponding </ul>

pattern = re.compile(r'<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-\[1240px\] mx-auto items-start font-mono text-\[16\.5px\] sm:text-\[18px\] tracking-\[0\.02em\]">.*?</ul>', re.DOTALL)

content = pattern.sub(masonry_replacement.replace('\\', '\\\\'), content)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)

