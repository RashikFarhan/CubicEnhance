import re
import json

md_content = open('leadership.md', encoding='utf-8').read()

departments = {}
current_dept = None

lines = md_content.split('\n')
for i, line in enumerate(lines):
    line = line.strip()
    
    m_dept = re.search(r'## \d+\.\s+(.*?)\s+\(\d+\s+Members\)', line)
    if m_dept:
        current_dept = m_dept.group(1).strip()
        departments[current_dept] = []
        continue
        
    m_emp = re.match(r'\*\s+\*\*(.*?)\*\*\s+-\s+(.*?)\s+\((.*?)\)', line)
    if m_emp and current_dept:
        name = m_emp.group(1).strip()
        role = m_emp.group(2).strip()
        loc = m_emp.group(3).strip()
        
        # Look ahead for level and focus
        level = ""
        focus = ""
        for j in range(1, 4):
            if i + j < len(lines):
                look_line = lines[i+j].strip()
                if look_line.startswith('* *Level:*'):
                    level = look_line.replace('* *Level:*', '').strip()
                elif look_line.startswith('* *Focus:*'):
                    focus = look_line.replace('* *Focus:*', '').strip()
        
        departments[current_dept].append({
            "name": name,
            "role": role,
            "location": loc,
            "level": level,
            "focus": focus
        })

with open('employees.json', 'w', encoding='utf-8') as f:
    json.dump(departments, f, indent=2)

print(f"Extracted {sum(len(d) for d in departments.values())} employees across {len(departments)} departments.")
