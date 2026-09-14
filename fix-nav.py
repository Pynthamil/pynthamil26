import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# Add to useState type
state_search = 'useState<"home" | "about" | "blog">(initialViewMode);'
state_replace = 'useState<"home" | "projects" | "about" | "blog">(initialViewMode);'
content = content.replace(state_search, state_replace)
content = content.replace('initialViewMode?: "home" | "about" | "blog"', 'initialViewMode?: "home" | "projects" | "about" | "blog"')

# Add Projects to nav bar
nav_search = """                <button
                  onClick={() => handleNavClick("about")}"""
nav_replace = """                <button
                  onClick={() => handleNavClick("projects")}
                  className={`transition-colors cursor-pointer select-none ${
                    viewMode === "projects"
                      ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                      : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => handleNavClick("about")}"""
content = content.replace(nav_search, nav_replace)

# Now extract "Work Section" (selected works) from Home and put it in a new view.
work_section_start = content.find('{/* Work Section */}')
if work_section_start != -1:
    # find where it ends
    # It's inside `{portfolioData.projects.length > 0 && (` ...
    # And after that is `</div>` (end of viewMode === "home")
    # Let's find the closing `</section>`
    work_section_end = content.find('</section>', work_section_start) + 10
    
    # Wait, there's another closing brace for the condition
    # `)}`
    condition_end = content.find(')}', work_section_end) + 2
    
    work_section_content = content[work_section_start:condition_end]
    
    # Remove from home view
    content = content[:work_section_start] + content[condition_end:]
    
    # Insert new Projects view before About view
    about_view_start = content.find('{/* ========================================================')
    about_view_start = content.find('VIEW 2: ABOUT VIEW', about_view_start)
    about_view_start = content.rfind('{/* ', 0, about_view_start)
    
    projects_view = f"""        {{/* ========================================================
            VIEW: PROJECTS VIEW
            ======================================================== */}}
        {{viewMode === "projects" && (
          <div className="flex flex-col animate-in fade-in duration-200">
            {work_section_content}
          </div>
        )}}

"""
    content = content[:about_view_start] + projects_view + content[about_view_start:]

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
print("Added Projects view")
