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
  localId?: '2048' | 'snake' | 'breakout' | 'bird' | 'tetris' | 'trex' | 'clicker' | 'jump' | 'dodge' | 'memory';
}

export const GAMES: Game[] = [
  {
    id: 'hextris',
    title: 'Neon Tetris',
    description: 'The ultimate block-fitting challenge with futuristic neon aesthetics.',
    category: 'Puzzle',
    thumbnail: '/games/hextris.png',
    sourceUrl: '#',
    rating: 4.8,
    playCount: '1.2M',
    color: 'from-neon-cyan to-blue-600',
    localId: 'tetris'
  },
  {
    id: '2048-neon',
    title: '2048 Neon',
    description: 'The classic 2048 puzzle reskinned with futuristic neon aesthetics.',
    category: 'Puzzle',
    thumbnail: '/games/2048.png',
    sourceUrl: '#',
    rating: 4.9,
    playCount: '2.5M',
    color: 'from-neon-violet to-neon-pink',
    localId: '2048'
  },
  {
    id: 'cyber-bird',
    title: 'Cyber Bird',
    description: 'Navigate through the neon pipes in this addictive endless flyer.',
    category: 'Arcade',
    thumbnail: '/games/cyber-bird.png',
    sourceUrl: '#',
    rating: 4.5,
    playCount: '800K',
    color: 'from-yellow-400 to-orange-600',
    localId: 'bird'
  },
  {
    id: 'neon-snake',
    title: 'Neon Snake',
    description: 'Classic snake game with glowing neon trails and high-speed action.',
    category: 'Arcade',
    thumbnail: '/games/neon-snake.png',
    sourceUrl: '#',
    rating: 4.6,
    playCount: '950K',
    color: 'from-neon-cyan to-emerald-500',
    localId: 'snake'
  },
  {
    id: 'space-warp',
    title: 'Space Warp',
    description: 'Travel through deep space while dodging digital anomalies.',
    category: 'Action',
    thumbnail: '/games/space-warp.png',
    sourceUrl: '#',
    rating: 4.9,
    playCount: '3.1M',
    color: 'from-neon-violet to-indigo-600',
    localId: 'dodge'
  },
  {
    id: 'cyber-clicker',
    title: 'Cyber Clicker',
    description: 'Mine digital crystals to upgrade your futuristic empire.',
    category: 'Idle',
    thumbnail: '/games/cyber-clicker.png',
    sourceUrl: '#',
    rating: 4.4,
    playCount: '2.1M',
    color: 'from-orange-400 to-red-600',
    localId: 'clicker'
  },
  {
    id: 'laser-jump',
    title: 'Laser Jump',
    description: 'Timed jumps over high-voltage laser beams.',
    category: 'Action',
    thumbnail: '/games/laser-jump.png',
    sourceUrl: '#',
    rating: 4.7,
    playCount: '1.4M',
    color: 'from-neon-pink to-rose-600',
    localId: 'jump'
  },
  {
    id: 'neon-breakout',
    title: 'Neon Breakout',
    description: 'Classic block-breaking action with futuristic glowing visuals.',
    category: 'Arcade',
    thumbnail: '/games/neon-breakout.png',
    sourceUrl: '#',
    rating: 4.8,
    playCount: '1.1M',
    color: 'from-neon-cyan to-emerald-500',
    localId: 'breakout'
  },
  {
    id: 't-rex-cyber',
    title: 'T-Rex Cyber',
    description: 'A robotic dinosaur running through a synthwave desert.',
    category: 'Arcade',
    thumbnail: '/games/t-rex-cyber.png',
    sourceUrl: '#',
    rating: 4.6,
    playCount: '2.3M',
    color: 'from-orange-400 to-yellow-600',
    localId: 'trex'
  },
  {
    id: 'cyber-memory',
    title: 'Neural Match',
    description: 'Sync local data clusters in this neon memory challenge.',
    category: 'Puzzle',
    thumbnail: '/games/cyber-chess.png',
    sourceUrl: '#',
    rating: 4.7,
    playCount: '300K',
    color: 'from-neon-violet to-purple-800',
    localId: 'memory'
  }
];
