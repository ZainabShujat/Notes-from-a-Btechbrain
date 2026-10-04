const fs = require('fs');
const content = fs.readFileSync('lib/courses/os-data.ts', 'utf8');

// find all module and lesson declarations
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('title: "Module') || line.includes("title: 'Module") || line.includes('slug:') || line.includes('cheatSheetDownloadSlug:')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
