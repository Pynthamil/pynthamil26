with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

about_start = content.find('{viewMode === "about" && (')
flex_start = content.find('<div className="flex flex-col space-y-6 sm:space-y-7 animate-in fade-in duration-200">', about_start)
flex_content_start = flex_start + len('<div className="flex flex-col space-y-6 sm:space-y-7 animate-in fade-in duration-200">')

# Simple tag matcher to find direct children of the flex container
pos = flex_content_start
children = []

def find_matching_close(s, start_idx):
    # s[start_idx] must be '<'
    # this is a very naive html tag matcher
    stack = []
    i = start_idx
    while i < len(s):
        if s.startswith('<!--', i) or s.startswith('{/*', i):
            # skip comments
            end = s.find('*/}', i) if s.startswith('{/*') else s.find('-->', i)
            if end == -1: break
            i = end + 3
            continue
            
        if s[i] == '<':
            if s.startswith('</', i):
                tag_end = s.find('>', i)
                tag_name = s[i+2:tag_end].strip()
                if stack and stack[-1] == tag_name:
                    stack.pop()
                    if len(stack) == 0:
                        return tag_end + 1
            else:
                tag_end = s.find('>', i)
                # handle self closing
                if s[tag_end-1] == '/':
                    pass
                else:
                    tag_name_match = s[i+1:tag_end].split()[0]
                    # ignore non-elements like <ProjectSidebar
                    if tag_name_match[0].islower():
                        stack.append(tag_name_match)
                i = tag_end
        i += 1
    return -1

while True:
    # skip whitespace and comments
    while pos < len(content):
        if content[pos].isspace():
            pos += 1
        elif content.startswith('{/*', pos):
            pos = content.find('*/}', pos) + 3
        else:
            break
            
    if content.startswith('<ProjectSidebar', pos):
        break
    if content.startswith('</div', pos): # end of flex
        break
        
    # pos is now pointing at `<`
    end_pos = find_matching_close(content, pos)
    if end_pos != -1:
        children.append(content[pos:end_pos])
        pos = end_pos
    else:
        break

for i, child in enumerate(children):
    
h2_match = re.search(r'<h2[^>]*>(.*?)</h2>', child, re.DOTALL)
title = h2_match.group(1).strip() if h2_match else "No H2"
print(f"Child {i}: {title}")

