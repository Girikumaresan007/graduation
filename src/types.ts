export interface MemoryItem {
  id: string;
  title: string;
  year: number;
  category: 'Classroom' | 'Labs' | 'Symposium' | 'Canteen' | 'Tour' | 'Farewell' | 'Culturals' | 'College Days';
  image: string;
  caption: string;
  location?: string;
  author?: string;
  likes: number;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  poster: string;
  videoUrl: string;
  description: string;
  year: number;
}

export interface PersonItem {
  id: string;
  name: string;
  nickname: string;
  roleTitle: string;
  quote: string;
  avatar: string;
  specialSkill: string;
  favoriteSpot: string;
}

export interface MemoryWallNote {
  id: string;
  author: string;
  rollNo?: string;
  message: string;
  tag: string;
  year: string;
  color: string;
  rotation: number;
  likes: number;
}

export interface TimelineYearData {
  year: number;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  moments: string[];
  quote: string;
  image: string;
}

export interface UserMemoryCard {
  id: string;
  name: string;
  memory: string;
  message: string;
  theme: 'gold' | 'navy' | 'ivory';
  date: string;
}
