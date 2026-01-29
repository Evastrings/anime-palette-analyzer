import ColorCard from './ColorCard';

function ColorGrid({ colors, onReset }) {
  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Extracted Color Palette
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {colors.map((color, index) => (
          <ColorCard
            key={index}
            hex={color.hex}
            rgb={color.rgb}
            percentage={color.percentage}
          />
        ))}
      </div>

      <div className="mt-8 text-center space-y-4">
        <p className="text-gray-600 text-sm">
          Hover over colors to see details • Click to copy values
        </p>
        
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Try Another Image
        </button>
      </div>
    </div>
  );
}

export default ColorGrid;