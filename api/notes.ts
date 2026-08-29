// Vercel Serverless Function for shared persistent farewell notes
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

let globalNotes = [...defaultNotes];

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const sorted = [...globalNotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json(sorted);
  }

  if (req.method === 'POST') {
    const { author, rollNo, message, tag, color } = req.body || {};

    if (!author || !message) {
      return res.status(400).json({ error: 'Author and message are required fields.' });
    }

    const newNote = {
      id: `note-${Date.now()}`,
      author: String(author).trim(),
      rollNo: rollNo ? String(rollNo).trim() : undefined,
      message: String(message).trim(),
      tag: tag ? String(tag).trim() : 'Memories',
      year: '2021-2025',
      color: color || 'gold',
      rotation: (Math.random() * 6) - 3,
      likes: 1,
      createdAt: new Date().toISOString()
    };

    globalNotes.unshift(newNote);
    return res.status(201).json(newNote);
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
