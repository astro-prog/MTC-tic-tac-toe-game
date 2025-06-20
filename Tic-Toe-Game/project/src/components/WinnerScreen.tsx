import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw, Home, Sparkles } from 'lucide-react';
import { Player } from '../App';

interface WinnerScreenProps {
  winner: Player | null;
  isDraw: boolean;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

const WinnerScreen: React.FC<WinnerScreenProps> = ({
  winner,
  isDraw,
  onPlayAgain,
  onNewGame,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* MTC Logo Watermark */}
      <div className="absolute top-8 left-8 opacity-30">
        <img 
          src="/MTC_logo-removebg-preview.png" 
          alt="MTC Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-6 h-6 text-red-400" />
            </div>
          ))}
        </div>
      )}

      <div className={`text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Winner Content */}
        {winner && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Trophy className="w-32 h-32 text-red-400 drop-shadow-lg animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👑</span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-red-500 mb-4 drop-shadow-lg">
              🎉 Congratulations! 🎉
            </h1>

            <h2 className="text-4xl font-bold text-white mb-6">
              {winner.name} Wins!
            </h2>

            <div className="bg-gradient-to-r from-red-400/20 to-purple-400/20 border border-red-400/30 rounded-3xl p-8 max-w-md mx-auto mb-8">
              <div className={`text-6xl font-bold mb-4 ${
                winner.symbol === 'X' ? 'text-red-400' : 'text-purple-400'
              }`}>
                {winner.symbol}
              </div>
              <p className="text-xl text-white/90">
                Amazing victory, {winner.name}!
              </p>
              <p className="text-white/70 mt-2">
                You played brilliantly! 🌟
              </p>
            </div>
          </>
        )}

        {/* Draw Content */}
        {isDraw && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="text-8xl">🤝</div>
            </div>

            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-red-500 mb-6 drop-shadow-lg">
              It's a Draw!
            </h1>

            <div className="bg-gradient-to-r from-red-400/20 to-purple-400/20 border border-red-400/30 rounded-3xl p-8 max-w-md mx-auto mb-8">
              <p className="text-xl text-white/90 mb-2">
                Great game, everyone!
              </p>
              <p className="text-white/70">
                Both players showed excellent skills! 🎯
              </p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Play Again
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={onNewGame}
            className="group relative px-8 py-4 bg-black/40 backdrop-blur-sm border border-red-500/30 text-white text-xl font-semibold rounded-full hover:bg-red-900/20 transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              New Game
            </span>
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-pulse text-red-400">
        🎊
      </div>
      <div className="absolute top-3/4 right-1/4 text-4xl opacity-20 animate-pulse delay-1000 text-purple-400">
        ⭐
      </div>
      <div className="absolute top-1/2 left-1/6 text-3xl opacity-15 animate-pulse delay-500 text-red-300">
        🎉
      </div>
      <div className="absolute top-1/3 right-1/6 text-3xl opacity-15 animate-pulse delay-1500 text-purple-300">
        👏
      </div>
    </div>
  );
};

export default WinnerScreen;