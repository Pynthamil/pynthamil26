import re

with open('src/components/PortfolioView.tsx', 'r') as f:
    content = f.read()

about_start = content.find('{viewMode === "about" && (')
flex_start = content.find('<div className="flex flex-col space-y-6 sm:space-y-7 animate-in fade-in duration-200">', about_start)
flex_content_start = flex_start + len('<div className="flex flex-col space-y-6 sm:space-y-7 animate-in fade-in duration-200">')

def find_matching_close(s, start_idx):
    stack = []
    i = start_idx
    while i < len(s):
        if s.startswith('<!--', i) or s.startswith('{/*', i):
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
                    if len(stack) == 0: return tag_end + 1
            else:
                tag_end = s.find('>', i)
                if s[tag_end-1] != '/':
                    tag_name_match = s[i+1:tag_end].split()[0]
                    if tag_name_match[0].islower(): stack.append(tag_name_match)
                i = tag_end
        i += 1
    return -1

pos = flex_content_start
children = []
whitespace_before = []

while True:
    ws = ""
    while pos < len(content):
        if content[pos].isspace():
            ws += content[pos]
            pos += 1
        elif content.startswith('{/*', pos):
            end_comment = content.find('*/}', pos) + 3
            ws += content[pos:end_comment]
            pos = end_comment
        else:
            break
            
    if content.startswith('<ProjectSidebar', pos) or content.startswith('</div', pos):
        whitespace_before.append(ws)
        break
        
    end_pos = find_matching_close(content, pos)
    if end_pos != -1:
        whitespace_before.append(ws)
        children.append(content[pos:end_pos])
        pos = end_pos
    else:
        break

# Identify each child by its H2
# children:
# 0: Experience
# 1: meet the human
# 2: come say hi
# 3: fun facts
# 4: currently learning
# 5: touching grass
# 6: about my blog
# 7: stack

# Map current index to identifier
child_map = {
    'experience': children[0],
    'meet-the-human': children[1],
    'come-say-hi': children[2],
    'fun-facts': children[3],
    'currently-learning': children[4],
    'touching-grass': children[5],
    'about-my-blog': children[6],
    'stack': children[7]
}

# Desired order:
new_order = [
    'experience',
    'meet-the-human',
    'stack',
    'currently-learning',
    'fun-facts',
    'touching-grass',
    'about-my-blog',
    'come-say-hi'
]

# Reassemble
new_flex_content = ""
for i, key in enumerate(new_order):
    new_flex_content += whitespace_before[i] + child_map[key]

new_flex_content += whitespace_before[-1]

new_content = content[:flex_content_start] + new_flex_content + content[pos:]

with open('src/components/PortfolioView.tsx', 'w') as f:
    f.write(new_content)

print("Reordered successfully!")
