import { MemoryItem } from '../types';

export const photoMemories: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'The Iconic Entrance Walk',
    year: 2021,
    category: 'Classroom',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
    caption: 'Walking through KRCE gates for our very first offline semester. Everything looked gigantic, exciting, and full of possibility.',
    location: 'KRCE Main Entrance',
    author: 'CSE-A Batch',
    likes: 64
  },
  {
    id: 'mem-2',
    title: 'Systems Lab Debugging Nightmares',
    year: 2022,
    category: 'Labs',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    caption: 'Staring at segmentation faults and missing semicolons. 50 students helping each other pass the OS lab test.',
    location: 'CSE Lab 2, Ground Floor',
    author: 'Karthik & Friends',
    likes: 82
  },
  {
    id: 'mem-3',
    title: 'National Tech Symposium Warriors',
    year: 2023,
    category: 'Symposium',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    caption: 'CSE-A leading the tech fest decorations, stage hosting, and coding contest coordination. Pure adrenaline!',
    location: 'KRCE Auditorium',
    author: 'Event Organizing Team',
    likes: 95
  },
  {
    id: 'mem-4',
    title: 'The Sacred Canteen Round Table',
    year: 2022,
    category: 'Canteen',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1200&auto=format&fit=crop',
    caption: 'Where more life lessons were learned than in any textbook. Hot tea, spicy parottas, and nonstop banter.',
    location: 'Campus Food Court',
    author: 'Canteen Gang',
    likes: 118
  },
  {
    id: 'mem-5',
    title: 'The Legendary IV Road Trip',
    year: 2023,
    category: 'Tour',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    caption: 'Singing Tamil hit songs on the tour bus for 8 straight hours. Hill stations, bonfires, and unforgettable memories.',
    location: 'Industrial Visit 2023',
    author: 'Tour Committee',
    likes: 142
  },
  {
    id: 'mem-6',
    title: 'Cultural Fest Traditional Day',
    year: 2023,
    category: 'Culturals',
    image: 'https://images.unsplash.com/photo-1528605248659-144006c624d7?q=80&w=1200&auto=format&fit=crop',
    caption: 'Draped in dhotis and sarees, clicking hundreds of group selfies under the college palm trees.',
    location: 'KRCE Quadrangle',
    author: 'CSE-A Squad',
    likes: 129
  },
  {
    id: 'mem-7',
    title: 'Placement Day Tears of Joy',
    year: 2024,
    category: 'Classroom',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    caption: 'The moment our friend group got placed on Day 1. Hugs that lasted minutes and video calls to parents.',
    location: 'Placement Cell Boardroom',
    author: 'Placed Cadre',
    likes: 156
  },
  {
    id: 'mem-8',
    title: 'Signed Shirts & Graduation Smiles',
    year: 2025,
    category: 'Farewell',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    caption: 'Permanent markers on white shirts. Every signature a reminder that distance will never erase our bond.',
    location: 'KRCE Open Ground',
    author: 'Batch 2021-2025',
    likes: 210
  }
];

export const galleryCategories = [
  'All',
  'Classroom',
  'Labs',
  'Symposium',
  'Canteen',
  'Tour',
  'Culturals',
  'Farewell'
] as const;
