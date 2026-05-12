import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { GAMES } from '@/data/games';
import GamePlayer from '@/components/games/GamePlayer';
import Link from 'next/link';

export async function generateStaticParams() {
  return GAMES.map((game) => ({
    id: game.id,
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = GAMES.find(g => g.id === id);

  if (!game) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-black text-white">Game Not Found</h2>
          <Link href="/" className="text-neon-cyan mt-4 block underline">Back to Arcade</Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <GamePlayer game={game} />
    </DashboardLayout>
  );
}
