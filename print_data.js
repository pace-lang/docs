import fs from 'fs';
import matter from 'gray-matter';

const content1 = fs.readFileSync('content/blog/v0-1-0-release.mdx', 'utf8');
const parsed1 = matter(content1);
console.log(parsed1.data);
