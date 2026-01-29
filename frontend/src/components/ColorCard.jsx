import { useState } from 'react';
import { getColorPsychology } from '../utils/colorPsychology';

function ColorCard({ hex, rgb, percentage }) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const psychology = getColorPsychology(hex);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
      style={{ backgroundColor: hex }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Color Display */}
      <div className="aspect-square flex items-center justify-center">
        {!showDetails ? (
          <p className="text-white text-lg font-semibold bg-black bg-opacity-30 px-4 py-2 rounded-lg backdrop-blur-sm">
            Hover me!
          </p>
        ) : (
          <div className="absolute inset-0 bg-black bg-opacity-90 p-4 flex flex-col justify-start items-center text-white overflow-y-auto">
            {/* Psychology Mood */}
            <div className="w-full mb-3 text-center">
              <p className="text-xl font-bold mb-1">{psychology.mood}</p>
              <p className="text-2xl font-bold mb-2">{percentage.toFixed(2)}%</p>
            </div>

            {/* Emotions Tags */}
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {psychology.emotions.map((emotion, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full"
                >
                  {emotion}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-xs text-center mb-3 opacity-90 leading-relaxed">
              {psychology.description}
            </p>

            {/* Hex Code */}
            <button
              onClick={() => copyToClipboard(hex, 'hex')}
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-3 py-2 mb-2 transition-all"
            >
              <p className="text-xs opacity-70">HEX</p>
              <p className="font-mono font-bold text-sm">{hex}</p>
              {copied === 'hex' && <p className="text-xs text-green-300 mt-1">✓ Copied!</p>}
            </button>

            {/* RGB */}
            <button
              onClick={() => copyToClipboard(`rgb(${rgb.join(', ')})`, 'rgb')}
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-3 py-2 transition-all"
            >
              <p className="text-xs opacity-70">RGB</p>
              <p className="font-mono font-bold text-sm">({rgb.join(', ')})</p>
              {copied === 'rgb' && <p className="text-xs text-green-300 mt-1">✓ Copied!</p>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColorCard;