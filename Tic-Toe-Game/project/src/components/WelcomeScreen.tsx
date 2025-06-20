import React, { useEffect, useState } from 'react';
import { Crown, Gamepad2 } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff0000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* MTC Logo Watermark */}
      <div className="absolute top-8 left-8 opacity-50">
        <img 
          src="/MTC_logo-removebg-preview.png" 
          alt="MTC Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="absolute bottom-8 right-8 text-red-400/30 font-bold text-lg">
        © MTC Games
      </div>

      {/* Main Content */}
      <div className={`text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Crown className="w-24 h-24 text-red-400 drop-shadow-lg" />
            <div className="absolute -bottom-2 -right-2">
              <Gamepad2 className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to
        </h1>
        <h2 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-red-500 mb-8 drop-shadow-lg">
          MTC's
        </h2>
        <h3 className="text-5xl font-bold text-white mb-12 drop-shadow-lg">
          Tic Tac Toe
        </h3>

        <button
          onClick={onComplete}
          className="group relative px-12 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="relative z-10">Start Game</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;