import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

# We need to change: {project.banner && (
old_check = "{project.banner && ("
new_check = "{(project.banner || project.status === \"Coming Soon\") && ("

content = content.replace(old_check, new_check)

# And change: ) : project.banner.match(/\.(mp4|webm|mov)$/i) ? (
old_match = ") : project.banner.match(/\\.(mp4|webm|mov)$/i) ? ("
new_match = ") : project.banner?.match(/\\.(mp4|webm|mov)$/i) ? ("

content = content.replace(old_match, new_match)

# And change: ( <img src={project.banner} ... /> )
# To only render the img if project.banner exists.
old_img = '''                            ) : (
                              <img 
                                src={project.banner} 
                                alt={project.title} 
                                className="z-10 w-auto h-[80%] sm:h-[80%] object-contain drop-shadow-lg transition-transform duration-700 ease-out translate-y-[4%] sm:translate-y-[6%]"
                              />
                            )}'''
new_img = '''                            ) : project.banner ? (
                              <img 
                                src={project.banner} 
                                alt={project.title} 
                                className="z-10 w-auto h-[80%] sm:h-[80%] object-contain drop-shadow-lg transition-transform duration-700 ease-out translate-y-[4%] sm:translate-y-[6%]"
                              />
                            ) : null}'''

content = content.replace(old_img, new_img)

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(content)
