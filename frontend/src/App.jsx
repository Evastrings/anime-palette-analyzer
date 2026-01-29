import { useState } from 'react';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import ColorGrid from './components/ColorGrid';
import Footer from './components/Footer';

function App() {
  const [colors, setColors] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleColorsExtracted = (extractedColors) => {
    setColors(extractedColors);
    setResetTrigger(false);
  };

  const handleReset = () => {
    setColors(null);
    setResetTrigger(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow">
        <Hero />
        <UploadZone 
          onColorsExtracted={handleColorsExtracted} 
          shouldReset={resetTrigger}
        />
        <ColorGrid colors={colors} onReset={handleReset} />
      </div>
      <Footer />
    </div>
  );
}

export default App;