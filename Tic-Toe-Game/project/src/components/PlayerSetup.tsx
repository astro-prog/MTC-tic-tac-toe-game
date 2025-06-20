import React, { useState } from 'react';
import { User, Bot } from 'lucide-react';
import { GameMode, Player } from '../App';

interface PlayerSetupProps {
  gameMode: GameMode;
  onPlayersSetup: (players: Player[]) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ gameMode, onPlayersSetup }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Symbol, setPlayer1Symbol] = useState<'X' | 'O'>('X');
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!player1Name.trim()) return;
    if (gameMode === 'human' && !player2Name.trim()) return;

    const players: Player[] = [
      { name: player1Name.trim(), symbol: player1Symbol }
    ];

    if (gameMode === 'human') {
      players.push({ 
        name: player2Name.trim(), 
        symbol: player1Symbol === 'X' ? 'O' : 'X' 
      });
    } else {
      players.push({ 
        name: 'Computer', 
        symbol: player1Symbol === 'X' ? 'O' : 'X' 
      });
    }

    onPlayersSetup(players);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      {/* MTC Logo Watermark */}
      <div className="absolute top-8 left-8 opacity-30">
        <img 
          src="/MTC_logo-removebg-preview.png" 
          alt="MTC Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className={`w-full max-w-2xl transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-3xl p-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Player Setup
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Player 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-red-400" />
                <h3 className="text-2xl font-semibold text-white">
                  {gameMode === 'computer' ? 'Your Details' : 'Player 1'}
                </h3>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-red-500/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Choose Your Symbol
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPlayer1Symbol('X')}
                    className={`flex-1 py-4 rounded-xl font-bold text-2xl transition-all duration-300 ${
                      player1Symbol === 'X'
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-black/30 text-white/70 hover:bg-red-900/30 border border-red-500/30'
                    }`}
                  >
                    X
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayer1Symbol('O')}
                    className={`flex-1 py-4 rounded-xl font-bold text-2xl transition-all duration-300 ${
                      player1Symbol === 'O'
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-black/30 text-white/70 hover:bg-red-900/30 border border-red-500/30'
                    }`}
                  >
                    O
                  </button>
                </div>
              </div>
            </div>

            {/* Player 2 (Human vs Human only) */}
            {gameMode === 'human' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-semibold text-white">
                    Player 2
                  </h3>
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="Enter player 2 name"
                    required
                  />
                </div>

                <div className="bg-black/20 border border-purple-500/20 rounded-xl p-4">
                  <p className="text-white/70 text-center">
                    Player 2 will be: <span className="font-bold text-white text-xl">
                      {player1Symbol === 'X' ? 'O' : 'X'}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Computer Preview */}
            {gameMode === 'computer' && (
              <div className="bg-black/20 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Bot className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">
                    Your Opponent
                  </h3>
                </div>
                <p className="text-white/70">
                  Computer will be: <span className="font-bold text-white text-xl">
                    {player1Symbol === 'X' ? 'O' : 'X'}
                  </span>
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xl font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Let's Play!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;