import { VideoItem } from '../types';

export const videoMemories: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'CSE-A Batch 2021-2025 Farewell Anthem',
    category: 'Farewell',
    duration: '03:42',
    poster: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-sitting-on-the-grass-together-42790-large.mp4',
    description: 'A cinematic montage capturing our 4-year journey from Day 1 at KRCE to our final farewell ceremony.',
    year: 2025
  },
  {
    id: 'vid-2',
    title: 'The Industrial Visit Bus Vibe & Bonfire',
    category: 'Friends',
    duration: '02:15',
    poster: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-friends-sitting-around-a-campfire-41604-large.mp4',
    description: 'Singing, dancing, and late-night talks under the stars during our 3rd year college tour.',
    year: 2023
  },
  {
    id: 'vid-3',
    title: 'Symposium Inauguration & Flash Mob',
    category: 'Events',
    duration: '04:10',
    poster: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-crowd-at-a-music-festival-42525-large.mp4',
    description: 'When CSE-A took the stage and lit up the auditorium with unmatched energy.',
    year: 2023
  },
  {
    id: 'vid-4',
    title: 'Last Lab Day & Behind-the-Scenes Fun',
    category: 'College Days',
    duration: '01:50',
    poster: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-students-working-together-in-a-classroom-41607-large.mp4',
    description: 'Funny bloopers, project deadline chaos, and high-fives after clearing our final practical lab.',
    year: 2024
  },
  {
    id: 'vid-5',
    title: 'The Graduation Cap Toss Moment',
    category: 'Graduation Day',
    duration: '02:30',
    poster: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-graduates-throwing-their-caps-in-the-air-42791-large.mp4',
    description: 'Tossing our black caps in the air in front of the KRCE main entrance. The official end of college life.',
    year: 2025
  }
];

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
