export interface Game {
  id: string;
  title: string;
  description: string;
  category: 'Action' | 'Puzzle' | 'Arcade' | 'Racing' | 'Idle';
  thumbnail: string;
  sourceUrl: string;
  rating: number;
  playCount: string;
  color: string;
}

export const GAMES: Game[] = [
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'Fast-paced hexagonal puzzle game. Match colors to clear blocks!',
    category: 'Puzzle',
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop',
    sourceUrl: 'https://hextris.io/',
    rating: 4.8,
    playCount: '1.2M',
    color: 'from-neon-cyan to-blue-600'
  },
  {
    id: '2048-neon',
    title: '2048 Neon',
    description: 'The classic 2048 puzzle reskinned with futuristic neon aesthetics.',
    category: 'Puzzle',
    thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop',
    sourceUrl: 'https://gabrielecirulli.github.io/2048/',
    rating: 4.9,
    playCount: '2.5M',
    color: 'from-neon-violet to-neon-pink'
  },
  {
    id: 'clumsy-bird',
    title: 'Cyber Bird',
    description: 'Navigate through the neon pipes in this addictive endless flyer.',
    category: 'Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1614850523531-13768804c865?w=400&h=400&fit=crop',
    sourceUrl: 'https://ellisonleao.github.io/clumsy-bird/',
    rating: 4.5,
    playCount: '800K',
    color: 'from-yellow-400 to-orange-600'
  },
  {
    id: 'tower-master',
    title: 'Tower Master',
    description: 'Stack the blocks as high as possible. Precision is key!',
    category: 'Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1614850523011-8f49ffc73908?w=400&h=400&fit=crop',
    sourceUrl: 'https://www.google.com/logos/2010/pacman10-i.html', // Placeholder for another arcade
    rating: 4.7,
    playCount: '1.1M',
    color: 'from-emerald-400 to-cyan-600'
  }
];
