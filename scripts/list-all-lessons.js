const fs = require('fs');
const content = fs.readFileSync('lib/courses/os-data.ts', 'utf8');

// Match all lessons with id, slug, title
const lessonRegex = /id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g;
let match;
const lessons = [];
while ((match = lessonRegex.exec(content)) !== null) {
  lessons.push({ id: match[1], title: match[2], slug: match[3] });
}

console.log(JSON.stringify(lessons, null, 2));
