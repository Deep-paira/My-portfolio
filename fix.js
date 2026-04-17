const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) results.push(file);
    }
  });
  return results;
}
walk('.').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/\[var\(--([a-zA-Z0-9-]+)\)\]/g, '$1');
  if(content !== newContent) fs.writeFileSync(file, newContent);
});
