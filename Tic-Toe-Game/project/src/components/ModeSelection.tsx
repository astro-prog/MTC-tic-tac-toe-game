import React, { useState } from 'react';
import { Bot, Users } from 'lucide-react';
import { GameMode } from '../App';

interface ModeSelectionProps {
  onModeSelect: (mode: GameMode) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
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

      <div className={`text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <h1 className="text-5xl font-bold text-white mb-4">
          Choose Game Mode
        </h1>
        <p className="text-xl text-white/80 mb-12">
          Who would you like to challenge?
        </p>

        <div className="flex gap-8 justify-center">
          {/* VS Computer */}
          <button
            onClick={() => onModeSelect('computer')}
            className="group relative bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 w-64 h-80 hover:bg-red-900/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-red-400/50"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-6 p-6 bg-gradient-to-r from-red-600 to-purple-600 rounded-full">
                <Bot className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                VS Computer
              </h3>
              <p className="text-white/70 text-center">
                Challenge our smart AI opponent and test your skills
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* VS Human */}
          <button
            onClick={() => onModeSelect('human')}
            className="group relative bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 w-64 h-80 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-400/50"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-6 p-6 bg-gradient-to-r from-purple-600 to-red-600 rounded-full">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                VS Human
              </h3>
              <p className="text-white/70 text-center">
                Play with a friend and compete head-to-head
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;