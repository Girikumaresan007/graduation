import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '..', 'public', 'images');
const optDir = path.join(__dirname, '..', 'public', 'images_opt');
const vidDir = path.join(__dirname, '..', 'public', 'video');
const vidOptDir = path.join(__dirname, '..', 'public', 'video_opt');
const posterDir = path.join(__dirname, '..', 'public', 'video_poster');

// 1. Photos Processing
const rawImgs = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png|heic|webp)$/i.test(f));
const optFiles = fs.readdirSync(optDir).filter(f => f.endsWith('.webp'));
const optMap = new Map();

optFiles.forEach(f => {
  const stat = fs.statSync(path.join(optDir, f));
  if (stat.size > 0) {
    optMap.set(path.parse(f).name.toLowerCase(), '/images_opt/' + f);
  }
});

const categories = ['Classroom', 'Labs', 'Symposium', 'Canteen', 'Tour', 'Culturals', 'Farewell', 'College Days'];

const photoMemories = rawImgs.map((file, idx) => {
  const baseName = path.parse(file).name.toLowerCase();
  const imagePath = optMap.get(baseName) || (`/images/${file}`);

  let year = 2024;
  if (file.includes('2021')) year = 2021;
  else if (file.includes('2022')) year = 2022;
  else if (file.includes('2023')) year = 2023;
  else if (file.includes('2024')) year = 2024;
  else if (file.includes('2025') || file.includes('2026')) year = 2025;

  let cleanTitle = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  if (cleanTitle.length > 30) cleanTitle = cleanTitle.substring(0, 30) + '...';

  return {
    id: `mem-${idx + 1}`,
    title: cleanTitle,
    year: year,
    category: categories[idx % categories.length],
    image: imagePath,
    caption: `KRCE CSE-A Batch Memory - ${cleanTitle}`,
    location: 'KRCE Campus',
    author: 'CSE-A Batch',
    likes: (idx * 7 + 42) % 180 + 20
  };
});

const memoriesTsContent = `import { MemoryItem } from '../types';

export const photoMemories: MemoryItem[] = ${JSON.stringify(photoMemories, null, 2)};

export const galleryCategories = [
  'All',
  'Classroom',
  'Labs',
  'Symposium',
  'Canteen',
  'Tour',
  'Culturals',
  'Farewell',
  'College Days'
] as const;
`;

fs.writeFileSync(path.join(__dirname, 'data', 'memories.ts'), memoriesTsContent, 'utf8');
console.log('Saved memories.ts with', photoMemories.length, 'items');

// 2. Videos Processing with Exact Video Opt Check & Poster File Matching
const vidFiles = fs.readdirSync(vidDir).filter(f => f.endsWith('.mp4'));
const vidOptFiles = fs.existsSync(vidOptDir) ? fs.readdirSync(vidOptDir) : [];
const vidOptMap = new Map();

vidOptFiles.forEach(f => {
  const stat = fs.statSync(path.join(vidOptDir, f));
  if (stat.size > 0) {
    vidOptMap.set(f, '/video_opt/' + f);
  }
});

const posterFiles = fs.readdirSync(posterDir).filter(f => f.endsWith('.webp'));
const posterMap = new Map();

posterFiles.forEach(f => {
  const stat = fs.statSync(path.join(posterDir, f));
  if (stat.size > 0) {
    posterMap.set(path.parse(f).name.toLowerCase(), '/video_poster/' + f);
  }
});

const vidCategories = ['College Days', 'Farewell', 'Department Memories', 'Friends', 'Events', 'Celebrations', 'Graduation Day'];

const videoMemories = vidFiles.map((file, idx) => {
  const baseName = path.parse(file).name.toLowerCase();
  const poster = posterMap.get(baseName) || '';

  // Use /video_opt/FILENAME.mp4 if exact optimized file exists, else fallback to /video/FILENAME.mp4
  const videoUrl = vidOptMap.has(file) ? vidOptMap.get(file) : `/video/${file}`;

  let year = 2024;
  if (file.includes('2021')) year = 2021;
  else if (file.includes('2022')) year = 2022;
  else if (file.includes('2023')) year = 2023;
  else if (file.includes('2024')) year = 2024;
  else if (file.includes('2025') || file.includes('2026')) year = 2025;

  let cleanTitle = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  if (cleanTitle.length > 35) cleanTitle = cleanTitle.substring(0, 35) + '...';

  const mins = String(Math.floor(Math.random() * 3) + 1).padStart(2, '0');
  const secs = String(Math.floor(Math.random() * 50) + 10).padStart(2, '0');

  return {
    id: `vid-${idx + 1}`,
    title: cleanTitle,
    category: vidCategories[idx % vidCategories.length],
    duration: `${mins}:${secs}`,
    poster: poster,
    videoUrl: videoUrl,
    description: `CSE-A Batch Video Reel - ${cleanTitle}`,
    year: year
  };
});

const videosTsContent = `import { VideoItem } from '../types';

export const videoMemories: VideoItem[] = ${JSON.stringify(videoMemories, null, 2)};

export const videoCategories = [
  'All',
  'College Days',
  'Farewell',
  'Department Memories',
  'Friends',
  'Events',
  'Celebrations',
  'Graduation Day'
] as const;
`;

fs.writeFileSync(path.join(__dirname, 'data', 'videos.ts'), videosTsContent, 'utf8');
console.log('Saved videos.ts with', videoMemories.length, 'items');
