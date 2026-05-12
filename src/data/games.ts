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
    thumbnail: '/games/hextris.png',
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
    thumbnail: '/games/2048.png',
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
    thumbnail: '/games/cyber-bird.png',
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
    thumbnail: '/games/tower-master.png',
    sourceUrl: 'https://www.google.com/logos/2010/pacman10-i.html',
    rating: 4.7,
    playCount: '1.1M',
    color: 'from-emerald-400 to-cyan-600'
  },
  {
    id: 'neon-snake',
    title: 'Neon Snake',
    description: 'Classic snake game with glowing neon trails and high-speed action.',
    category: 'Arcade',
    thumbnail: '/games/neon-snake.png',
    sourceUrl: 'https://poki.com/en/g/block-the-pig', // Placeholder
    rating: 4.6,
    playCount: '950K',
    color: 'from-neon-cyan to-emerald-500'
  },
  {
    id: 'space-warp',
    title: 'Space Warp',
    description: 'Travel through deep space while dodging digital anomalies.',
    category: 'Action',
    thumbnail: '/games/space-warp.png',
    sourceUrl: 'https://poki.com/en/g/temple-run-2', // Placeholder
    rating: 4.9,
    playCount: '3.1M',
    color: 'from-neon-violet to-indigo-600'
  },
  {
    id: 'cyber-clicker',
    title: 'Cyber Clicker',
    description: 'Mine digital crystals to upgrade your futuristic empire.',
    category: 'Idle',
    thumbnail: '/games/cyber-clicker.png',
    sourceUrl: 'https://poki.com/en/g/clicker-heroes', // Placeholder
    rating: 4.4,
    playCount: '2.1M',
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'laser-jump',
    title: 'Laser Jump',
    description: 'Timed jumps over high-voltage laser beams.',
    category: 'Action',
    thumbnail: '/games/laser-jump.png',
    sourceUrl: 'https://poki.com/en/g/geometry-dash', // Placeholder
    rating: 4.7,
    playCount: '1.4M',
    color: 'from-neon-pink to-rose-600'
  }
];
