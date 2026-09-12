with open("src/components/PortfolioView.tsx", "r") as f:
    lines = f.readlines()

exp_start = -1
exp_end = -1
proj_start = -1
proj_end = -1

for i, line in enumerate(lines):
    if "{/* Experience List Section */}" in line:
        exp_start = i
    if "          {/* Projects Section */}" in line:
        exp_end = i - 1
        proj_start = i
    if "          {/* Home Footer */}" in line:
        proj_end = i - 1

if exp_start != -1 and exp_end != -1 and proj_start != -1 and proj_end != -1:
    exp_lines = lines[exp_start:exp_end+1]
    proj_lines = lines[proj_start:proj_end+1]
    
    # Check for extra newlines at the end of proj_lines or start of exp_lines to format nicely
    
    new_lines = lines[:exp_start] + proj_lines + ["\n"] + exp_lines + lines[proj_end+1:]
    
    with open("src/components/PortfolioView.tsx", "w") as f:
        f.writelines(new_lines)
    print(f"Swapped: Exp({exp_start}-{exp_end}), Proj({proj_start}-{proj_end})")
else:
    print("Could not find line boundaries.")
