const fs = require('fs');

let content = fs.readFileSync('src/app/orca/page.tsx', 'utf8');

const oldH3 = `Finding an answer is only half the problem when researchers still have to verify where it came from.`;
const newH3 = `Research is scattered across papers, datasets, and citations, making even simple questions difficult to verify.`;

const oldP = `Researchers spend hours searching across fragmented scientific sources and manually validating findings. Without a centralized way to synthesize these documents, it becomes difficult to quickly identify relevant evidence and trace conclusions back to reliable citations.`;
const newP = `Researchers spend hours jumping between fragmented scientific sources, tracing citations, and manually checking whether findings actually support a conclusion. The information exists, but the lack of connected, verifiable evidence makes research slow and difficult to trust.`;

content = content.replace(oldH3, newH3);
content = content.replace(oldP, newP);

fs.writeFileSync('src/app/orca/page.tsx', content);
console.log("Updated orca problem section via Node");
