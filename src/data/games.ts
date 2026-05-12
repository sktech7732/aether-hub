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
  localId?: '2048' | 'snake' | 'breakout' | 'bird' | 'tetris' | 'trex';
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
    color: 'from-neon-cyan to-blue-600',
    localId: 'tetris'
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
    color: 'from-neon-violet to-neon-pink',
    localId: '2048'
  },
  {
    id: 'cyber-bird',
    title: 'Cyber Bird',
    description: 'Navigate through the neon pipes in this addictive endless flyer.',
    category: 'Arcade',
    thumbnail: '/games/cyber-bird.png',
    sourceUrl: 'https://ellisonleao.github.io/clumsy-bird/',
    rating: 4.5,
    playCount: '800K',
    color: 'from-yellow-400 to-orange-600',
    localId: 'bird'
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
    color: 'from-neon-cyan to-emerald-500',
    localId: 'snake'
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
  },
  {
    id: 'cyber-drift',
    title: 'Cyber Drift',
    description: 'High-speed racing on a digital grid. Dodge obstacles and set records!',
    category: 'Racing',
    thumbnail: '/games/cyber-drift.png',
    sourceUrl: 'https://poki.com/en/g/cyber-cars-punk-racing',
    rating: 4.9,
    playCount: '500K',
    color: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'neon-breakout',
    title: 'Neon Breakout',
    description: 'Classic block-breaking action with futuristic glowing visuals.',
    category: 'Arcade',
    thumbnail: '/games/neon-breakout.png',
    sourceUrl: 'https://ellisonleao.github.io/breakout/',
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
    sourceUrl: 'https://wayou.github.io/t-rex-runner/',
    rating: 4.6,
    playCount: '2.3M',
    color: 'from-orange-400 to-yellow-600',
    localId: 'trex'
  },
  {
    id: 'sinuous-neon',
    title: 'Sinuous Neon',
    description: 'Navigate through a sea of red digital particles in deep space.',
    category: 'Action',
    thumbnail: '/games/sinuous-neon.png',
    sourceUrl: 'https://www.sinuousgame.com/',
    rating: 4.7,
    playCount: '890K',
    color: 'from-red-500 to-neon-pink'
  },
  {
    id: 'pacman-retro',
    title: 'Pacman Retro',
    description: 'The ultimate arcade legend, reborn in the neon digital maze.',
    category: 'Arcade',
    thumbnail: '/games/pacman-retro.png',
    sourceUrl: 'https://www.google.com/logos/2010/pacman10-i.html',
    rating: 4.9,
    playCount: '5.2M',
    color: 'from-yellow-400 to-neon-cyan'
  },
  {
    id: 'cyber-chess',
    title: 'Cyber Chess',
    description: 'Master the digital board with futuristic holographic strategy.',
    category: 'Puzzle',
    thumbnail: '/games/cyber-chess.png',
    sourceUrl: 'https://lichess.org/embed/game/new?bg=dark',
    rating: 4.8,
    playCount: '300K',
    color: 'from-neon-violet to-purple-800'
  }
];
