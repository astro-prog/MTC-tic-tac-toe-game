import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

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
        <div className="mb-8">
          <Loader2 className="w-16 h-16 text-red-400 animate-spin mx-auto" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-8">
          Loading Game...
        </h2>

        {/* Progress Bar */}
        <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-purple-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-white/70 text-lg">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;