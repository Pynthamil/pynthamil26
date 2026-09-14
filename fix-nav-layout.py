import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

nav_search = """            {/* Right / Under on Mobile: Navigation Links & Dark Mode Toggle */}
            <nav className="flex items-center space-x-4 sm:space-x-5 text-[15.5px] sm:text-[16.5px] font-medium sm:pt-1">
              
              <button
                onClick={() => handleNavClick("about")}
                className={`transition-colors cursor-pointer select-none ${
                  viewMode === "about"
                    ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                    : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("blog")}
                className={`transition-colors cursor-pointer select-none ${
                  viewMode === "blog"
                    ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                    : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                }`}
              >
                Blog
              </button>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" strokeWidth={2} />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" strokeWidth={2} />
                )}
              </button>
            </nav>"""

nav_replacement = """            {/* Right / Under on Mobile: Navigation Links & Dark Mode Toggle */}
            <div className="flex items-center justify-between w-full">
              <nav className="flex items-center space-x-4 sm:space-x-5 text-[15.5px] sm:text-[16.5px] font-medium sm:pt-1">
                
                <button
                  onClick={() => handleNavClick("about")}
                  className={`transition-colors cursor-pointer select-none ${
                    viewMode === "about"
                      ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                      : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => handleNavClick("blog")}
                  className={`transition-colors cursor-pointer select-none ${
                    viewMode === "blog"
                      ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                      : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                  }`}
                >
                  Blog
                </button>
              </nav>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" strokeWidth={2} />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" strokeWidth={2} />
                )}
              </button>
            </div>"""

if nav_search in content:
    content = content.replace(nav_search, nav_replacement)
    with open('src/components/PortfolioView.tsx', 'w') as f:
        f.write(content)
    print("Updated layout")
else:
    print("Could not find exact text to replace")
