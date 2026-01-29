function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">
          🎨 Anime Palette Analyzer
        </p>
        <p className="text-sm opacity-90 mb-4">
          Extract dominant colors and discover the psychology behind anime aesthetics
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <a 
            href="https://github.com/Evastrings/anime-palette-analyzer" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <span>•</span>
          <a 
            href="https://ng.linkedin.com/in/elijahakande" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a 
            href="https://x.com/hxdlab" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Portfolio
          </a>
        </div>
        <p className="text-xs opacity-75 mt-4">
          Built with React, FastAPI, and scikit-learn
        </p>
      </div>
    </footer>
  );
}

export default Footer;