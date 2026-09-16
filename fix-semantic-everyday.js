const fs = require('fs');

const file = 'src/app/semantic/page.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const search = 'Everyday situations, big and small';
    const replace = 'Turning everyday emails into clear actions, from quick requests to time-sensitive commitments';
    
    content = content.replace(search, replace);
    
    fs.writeFileSync(file, content);
    console.log("Updated everyday heading text in Semantic");
}
