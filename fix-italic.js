const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/font-style: normal;/g, '');
fs.writeFileSync('src/app/globals.css', css);
console.log("Removed font-style: normal from globals.css to avoid conflicts");
