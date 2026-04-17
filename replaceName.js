const fs = require('fs');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(walk(file));
            }
        } else {
            if(file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}
walk('.').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/Maya Arora/g, 'Deep').replace(/Maya\./g, 'Deep.').replace(/Maya/g, 'Deep');
  if(content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log("Updated: " + file);
  }
});
