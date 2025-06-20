import React, { useState, useEffect } from 'react';
import { RotateCcw, Home } from 'lucide-react';
import { Player, GameMode } from '../App';

interface GameBoardProps {
  players: Player[];
  currentPlayer: Player;
  gameMode: GameMode;
  onGameComplete: (winner: Player | null, isDraw: boolean) => void;
  onCurrentPlayerChange: (player: Player) => void;
}

type Board = (string | null)[];

const GameBoard: React.FC<GameBoardProps> = ({
  players,
  currentPlayer,
  gameMode,
  onGameComplete,
  onCurrentPlayerChange,
}) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  const checkWinner = (board: Board): { winner: string | null; line: number[] | null } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: null };
  };

  const isBoardFull = (board: Board): boolean => {
    return board.every(cell => cell !== null);
  };

  const getComputerMove = (board: Board): number => {
    const computerSymbol = players.find(p => p.name === 'Computer')?.symbol || 'O';
    const humanSymbol = computerSymbol === 'X' ? 'O' : 'X';

    // Check if computer can win
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = computerSymbol;
        if (checkWinner(newBoard).winner === computerSymbol) {
          return i;
        }
      }
    }

    // Check if computer needs to block human from winning
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = humanSymbol;
        if (checkWinner(newBoard).winner === humanSymbol) {
          return i;
        }
      }
    }

    // Take center if available
    if (board[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available spot
    const availableSpots = board.map((spot, index) => spot === null ? index : null)
                               .filter(spot => spot !== null) as number[];
    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
  };

  const handleGameEnd = (gameResult: { winner: string | null; line: number[] | null }, newBoard: Board) => {
    if (gameResult.winner) {
      setWinningLine(gameResult.line);
      setShowWinAnimation(true);
      
      // Show blinking animation for 2 seconds, then show winner screen
      setTimeout(() => {
        setShowWinAnimation(false);
        const winningPlayer = players.find(p => p.symbol === gameResult.winner);
        onGameComplete(winningPlayer || null, false);
      }, 2000);
    } else if (isBoardFull(newBoard)) {
      // Small delay for draw to feel natural
      setTimeout(() => {
        onGameComplete(null, true);
      }, 500);
    }
  };

  const makeMove = (index: number, symbol: string) => {
    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult.winner || isBoardFull(newBoard)) {
      handleGameEnd(gameResult, newBoard);
      return true; // Game ended
    }
    return false; // Game continues
  };

  const handleCellClick = (index: number) => {
    if (board[index] || showWinAnimation) return;
    if (gameMode === 'computer' && currentPlayer.name === 'Computer') return;

    const gameEnded = makeMove(index, currentPlayer.symbol);
    if (!gameEnded) {
      // Switch to next player
      const nextPlayer = players.find(p => p.name !== currentPlayer.name);
      if (nextPlayer) {
        onCurrentPlayerChange(nextPlayer);
      }
    }
  };

  // Computer move effect - simplified and more reliable
  useEffect(() => {
    if (gameMode === 'computer' && 
        currentPlayer.name === 'Computer' && 
        !showWinAnimation &&
        !checkWinner(board).winner &&
        !isBoardFull(board)) {
      
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(board);
        const gameEnded = makeMove(computerMove, currentPlayer.symbol);
        
        if (!gameEnded) {
          // Switch back to human player
          const humanPlayer = players.find(p => p.name !== 'Computer');
          if (humanPlayer) {
            onCurrentPlayerChange(humanPlayer);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, gameMode, showWinAnimation]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinningLine(null);
    setShowWinAnimation(false);
    onCurrentPlayerChange(players[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* MTC Logo Watermark */}
      <div className="absolute top-8 left-8 opacity-50">
        <img 
          src="/MTC_logo-removebg-preview.png" 
          alt="MTC Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Tic Tac Toe
          </h1>
          
          {/* Current Player */}
          <div className="bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4 max-w-md mx-auto">
            <p className="text-white/80 mb-2">Current Turn</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-red-400">
                {currentPlayer.symbol}
              </span>
              <span className="text-xl text-white">
                {currentPlayer.name}
                {gameMode === 'computer' && currentPlayer.name === 'Computer' && (
                  <span className="ml-2 text-sm text-white/70 animate-pulse">
                    thinking...
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={cell !== null || showWinAnimation || (gameMode === 'computer' && currentPlayer.name === 'Computer')}
              className={`aspect-square backdrop-blur-sm border rounded-2xl text-6xl font-bold text-white transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed flex items-center justify-center ${
                winningLine?.includes(index) && showWinAnimation
                  ? 'bg-green-500/60 border-green-400 animate-pulse'
                  : 'bg-black/40 border-red-500/30 hover:bg-red-900/20 hover:border-red-400/50'
              }`}
            >
              <span className={cell === 'X' ? 'text-red-400' : 'text-purple-400'}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        {/* Players Info */}
        <div className="flex justify-center gap-6 mb-8">
          {players.map((player, index) => (
            <div
              key={index}
              className={`bg-black/40 backdrop-blur-sm border rounded-2xl p-4 w-32 text-center transition-all duration-300 ${
                currentPlayer.name === player.name
                  ? 'border-red-400 bg-red-400/20'
                  : 'border-red-500/30'
              }`}
            >
              <div className={`text-2xl font-bold mb-1 ${
                player.symbol === 'X' ? 'text-red-400' : 'text-purple-400'
              }`}>
                {player.symbol}
              </div>
              <div className="text-sm text-white/80">
                {player.name}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetGame}
            disabled={showWinAnimation}
            className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-red-500/30 text-white rounded-xl hover:bg-red-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;