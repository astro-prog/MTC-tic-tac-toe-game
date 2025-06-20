import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import LoadingScreen from './components/LoadingScreen';
import ModeSelection from './components/ModeSelection';
import PlayerSetup from './components/PlayerSetup';
import TossScreen from './components/TossScreen';
import GameBoard from './components/GameBoard';
import WinnerScreen from './components/WinnerScreen';

export type GameMode = 'computer' | 'human';
export type Player = {
  name: string;
  symbol: 'X' | 'O';
};

export type GameState = 
  | 'welcome'
  | 'loading'
  | 'modeSelection'
  | 'playerSetup'
  | 'toss'
  | 'game'
  | 'winner';

function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [gameMode, setGameMode] = useState<GameMode>('computer');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleWelcomeComplete = () => {
    setGameState('loading');
  };

  const handleLoadingComplete = () => {
    setGameState('modeSelection');
  };

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setGameState('playerSetup');
  };

  const handlePlayersSetup = (setupPlayers: Player[]) => {
    setPlayers(setupPlayers);
    setGameState('toss');
  };

  const handleTossComplete = (firstPlayer: Player) => {
    setCurrentPlayer(firstPlayer);
    setGameState('game');
  };

  const handleGameComplete = (gameWinner: Player | null, draw: boolean) => {
    setWinner(gameWinner);
    setIsDraw(draw);
    setGameState('winner');
  };

  const handlePlayAgain = () => {
    setWinner(null);
    setIsDraw(false);
    setCurrentPlayer(null);
    setGameState('modeSelection');
  };

  const handleNewGame = () => {
    setWinner(null);
    setIsDraw(false);
    setCurrentPlayer(null);
    setPlayers([]);
    setGameState('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-purple-950">
      {gameState === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      {gameState === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {gameState === 'modeSelection' && (
        <ModeSelection onModeSelect={handleModeSelect} />
      )}
      {gameState === 'playerSetup' && (
        <PlayerSetup 
          gameMode={gameMode} 
          onPlayersSetup={handlePlayersSetup} 
        />
      )}
      {gameState === 'toss' && (
        <TossScreen 
          players={players} 
          onTossComplete={handleTossComplete} 
        />
      )}
      {gameState === 'game' && (
        <GameBoard 
          players={players}
          currentPlayer={currentPlayer!}
          gameMode={gameMode}
          onGameComplete={handleGameComplete}
          onCurrentPlayerChange={setCurrentPlayer}
        />
      )}
      {gameState === 'winner' && (
        <WinnerScreen 
          winner={winner}
          isDraw={isDraw}
          onPlayAgain={handlePlayAgain}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
}

export default App;