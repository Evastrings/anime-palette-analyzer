import { useState, useEffect } from 'react';

function UploadZone({ onColorsExtracted, shouldReset }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for reset from parent
  useEffect(() => {
    if (shouldReset) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsLoading(false);
    }
  }, [shouldReset]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      console.log('File selected:', file.name);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Colors received:', data);

      onColorsExtracted(data.d_colors);

    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Make sure your backend is running!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Upload your image and get the palette needed to get started
      </h2>

      <div
        className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
          ${isDragging 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 bg-white'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {selectedFile ? (
          <div>
            <p className="text-2xl mb-4">Image Selected!</p>
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg mb-4"
            />
            <p className="text-gray-600 font-medium mb-4">{selectedFile.name}</p>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAnalyze();
              }}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Analyzing Colors...' : 'Analyze Colors'}
            </button>

            <p className="text-sm text-gray-500 mt-4">or click zone to choose different image</p>
          </div>
        ) : (
          <div>
            <p className="text-6xl mb-4">📁</p>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Drag & drop your anime image here
            </p>
            <p className="text-gray-500">or click to browse</p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Extracting dominant colors...</p>
        </div>
      )}
    </div>
  );
}

export default UploadZone;