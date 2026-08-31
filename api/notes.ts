import { Redis } from '@upstash/redis';

// Default initial seeded notes if Redis is empty on first deployment
const defaultNotes = [
  {
    id: 'note-1',
    author: 'Giridharan K',
    rollNo: '21CS042',
    message: 'We came as strangers. We leave as family. Thank you KRCE for giving me the best 4 years of my life.',
    tag: 'Brotherhood',
    year: '2021-2025',
    color: 'gold',
    rotation: -2,
    likes: 47,
    createdAt: new Date('2025-05-20T10:00:00Z').toISOString()
  },
  {
    id: 'note-2',
    author: 'Aishwarya R',
    rollNo: '21CS008',
    message: 'Different dreams. One unforgettable journey. CSE-A will forever be the warmest corner of my heart.',
    tag: 'Nostalgia',
    year: '2021-2025',
    color: 'navy',
    rotation: 2,
    likes: 38,
    createdAt: new Date('2025-05-21T11:30:00Z').toISOString()
  },
  {
    id: 'note-3',
    author: 'Dinesh Kumar M',
    rollNo: '21CS024',
    message: 'Four years passed in what felt like four seconds. The lab errors will fade, but the laughter stays forever.',
    tag: 'Memories',
    year: '2021-2025',
    color: 'ivory',
    rotation: -1.5,
    likes: 52,
    createdAt: new Date('2025-05-22T14:15:00Z').toISOString()
  },
  {
    id: 'note-4',
    author: 'Kavitha S',
    rollNo: '21CS056',
    message: 'Classmates once. Friends forever. To every late-night presentation and tea break talk: thank you.',
    tag: 'Gratitude',
    year: '2021-2025',
    color: 'gold',
    rotation: 3,
    likes: 41,
    createdAt: new Date('2025-05-23T09:45:00Z').toISOString()
  },
  {
    id: 'note-5',
    author: 'Santhosh V',
    rollNo: '21CS089',
    message: 'From first-year fear to final-year freedom. CSE-A made every single struggle worthwhile.',
    tag: 'Pride',
    year: '2021-2025',
    color: 'navy',
    rotation: -2.5,
    likes: 60,
    createdAt: new Date('2025-05-24T16:20:00Z').toISOString()
  },
  {
    id: 'note-6',
    author: 'Priyanka N',
    rollNo: '21CS073',
    message: 'Engineers by degree, creators by mindset, family by heart. Go conquer the world, guys!',
    tag: 'Farewell',
    year: '2021-2025',
    color: 'ivory',
    rotation: 1.8,
    likes: 35,
    createdAt: new Date('2025-05-25T18:00:00Z').toISOString()
  }
];

const REDIS_KEY = 'krce_csea_memory_wall_v1';

// In-memory fallback if Redis credentials are not configured locally
let inMemoryFallback = [...defaultNotes];

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

export default async function handler(req: any, res: any) {
  const redis = getRedisClient();

  if (req.method === 'GET') {
    try {
      if (redis) {
        const storedNotes = await redis.get<any[]>(REDIS_KEY);
        if (storedNotes && Array.isArray(storedNotes) && storedNotes.length > 0) {
          const sorted = storedNotes.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          return res.status(200).json(sorted);
        } else {
          // Initialize empty Redis store with seeded notes
          await redis.set(REDIS_KEY, defaultNotes);
          return res.status(200).json(defaultNotes);
        }
      }
    } catch (err: any) {
      console.error('Upstash Redis GET error:', err?.message);
    }

    // Local in-memory fallback
    const sorted = [...inMemoryFallback].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return res.status(200).json(sorted);
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const author = String(body.author || '').trim().substring(0, 50);
    const rollNo = body.rollNo ? String(body.rollNo).trim().substring(0, 20) : undefined;
    const message = String(body.message || '').trim().substring(0, 500);
    const tag = String(body.tag || 'Memories').trim().substring(0, 30);
    const color = ['gold', 'navy', 'ivory'].includes(body.color) ? body.color : 'gold';

    // Validation
    if (!author || author.length < 2) {
      return res.status(400).json({ error: 'Author name must be at least 2 characters long.' });
    }
    if (!message || message.length < 5) {
      return res.status(400).json({ error: 'Message must be at least 5 characters long.' });
    }

    const newNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      author,
      rollNo,
      message,
      tag,
      year: '2021-2025',
      color,
      rotation: (Math.random() * 6) - 3,
      likes: 1,
      createdAt: new Date().toISOString()
    };

    try {
      if (redis) {
        const stored = (await redis.get<any[]>(REDIS_KEY)) || defaultNotes;
        const updated = [newNote, ...(Array.isArray(stored) ? stored : [])];
        await redis.set(REDIS_KEY, updated);
        return res.status(201).json(newNote);
      }
    } catch (err: any) {
      console.error('Upstash Redis POST error:', err?.message);
      return res.status(500).json({ error: 'Failed to persist note to Upstash Redis database.' });
    }

    // Local fallback
    inMemoryFallback.unshift(newNote);
    return res.status(201).json(newNote);
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
