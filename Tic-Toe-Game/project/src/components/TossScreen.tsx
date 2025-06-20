import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { Player } from '../App';

interface TossScreenProps {
  players: Player[];
  onTossComplete: (firstPlayer: Player) => void;
}

const TossScreen: React.FC<TossScreenProps> = ({ players, onTossComplete }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startToss = () => {
    setIsFlipping(true);
    setShowResult(false);
    
    // Simulate coin flip duration
    setTimeout(() => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      setWinner(randomPlayer);
      setIsFlipping(false);
      setShowResult(true);
    }, 2000);
  };

  const handleContinue = () => {
    if (winner) {
      onTossComplete(winner);
    }
  };

  useEffect(() => {
    // Auto start toss after component mounts
    const timer = setTimeout(() => {
      startToss();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* MTC Logo Watermark */}
      <div className="absolute top-8 left-8 opacity-30">
        <img 
          src="/MTC_logo-removebg-preview.png" 
          alt="MTC Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Coin Toss
        </h1>
        <p className="text-xl text-white/80 mb-12">
          Let's decide who goes first!
        </p>

        {/* Coin Animation */}
        <div className="mb-12">
          <div className={`inline-block transition-all duration-500 ${
            isFlipping ? 'animate-spin' : ''
          }`}>
            <Coins className="w-32 h-32 text-red-400 drop-shadow-lg" />
          </div>
        </div>

        {/* Players */}
        <div className="flex justify-center gap-8 mb-8">
          {players.map((player, index) => (
            <div
              key={index}
              className={`bg-black/40 backdrop-blur-sm border rounded-2xl p-6 w-48 transition-all duration-500 ${
                showResult && winner?.name === player.name
                  ? 'border-red-400 bg-red-400/20 scale-105'
                  : 'border-red-500/30'
              }`}
            >
              <div className="text-3xl font-bold text-white mb-2">
                {player.symbol}
              </div>
              <div className="text-lg text-white">
                {player.name}
              </div>
              {showResult && winner?.name === player.name && (
                <div className="mt-2 text-red-400 font-bold">
                  Goes First! ⭐
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status */}
        {isFlipping && (
          <p className="text-white/70 text-lg mb-8 animate-pulse">
            Flipping coin...
          </p>
        )}

        {showResult && winner && (
          <div className="space-y-6">
            <div className="bg-red-400/20 border border-red-400/30 rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                🎉 {winner.name} wins the toss!
              </h3>
              <p className="text-white/80">
                You'll play as <span className="font-bold text-xl">{winner.symbol}</span> and go first
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xl font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TossScreen;