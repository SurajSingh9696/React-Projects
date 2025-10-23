import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const ImagineAi = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [quality, setQuality] = useState('medium');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setGeneratedImage('');
    
    try {
      // Generate image using Puter.ai directly
      const imageElement = await window.puter.ai.txt2img(prompt.trim(), { 
        model: "gpt-image-1", 
        quality: quality
      });

      // Convert the image element to base64 for consistent handling
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      ctx.drawImage(imageElement, 0, 0);
      
      const base64Image = canvas.toDataURL('image/png').split(',')[1];
      setGeneratedImage(base64Image);
      
    } catch (err) {
      console.error('Puter.ai Error:', err);
      setError('Failed to generate image. Please try again. Make sure you have an active internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const promptSuggestions = [
    "A minimalist architectural design in a futuristic city",
    "Abstract data visualization with neural network patterns",
    "Cyberpunk street scene with neon reflections",
    "Modern interior design with smart home technology",
    "Futuristic vehicle concept with clean lines",
    "AI brain concept with glowing neural connections"
  ];

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const loadingGridVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const loadingDotVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div className="logo-section">
            <motion.div 
              className="logo-mark"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="logo-icon">AI</div>
            </motion.div>
            <div className="logo-text">
              <h1 className="logo">Imagination<span className="ai-accent">.Ai</span></h1>
              <p className="tagline">AI-Powered Image Generation</p>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1582 17.4668C18.1125 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.88299 19.5345 5.67422 18.3258C4.46545 17.117 3.62593 15.589 3.2539 13.9205C2.88187 12.252 2.9927 10.5121 3.57345 8.9043C4.1542 7.29651 5.18085 5.88749 6.53323 4.84182C7.88562 3.79615 9.5078 3.15731 11.21 3C10.2134 4.34827 9.73375 6.00945 9.85849 7.68141C9.98324 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2663 19.6517 13.7866 21 12.79Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="layout-grid">
            {/* Left Panel - Input */}
            <motion.section 
              className="input-panel"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="panel-header">
                <h2 className="panel-title">Create</h2>
                <p className="panel-description">
                  Describe your vision and watch AI bring it to life
                </p>
              </div>
              
              <form onSubmit={handleGenerate} className="prompt-form">
                <div className="input-group">
                  <div className="input-wrapper">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your vision with precision and detail..."
                      className="prompt-input"
                      disabled={isLoading}
                      rows="4"
                    />
                    <div className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Quality Settings */}
                  <div className="settings-group">
                    <label className="settings-label">Image Quality</label>
                    <div className="quality-buttons">
                      {['low', 'medium', 'high'].map((level) => (
                        <motion.button
                          key={level}
                          type="button"
                          className={`quality-btn ${quality === level ? 'quality-btn-active' : ''}`}
                          onClick={() => setQuality(level)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isLoading}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="generate-btn"
                    disabled={isLoading || !prompt.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <span>Generating with AI...</span>
                      </div>
                    ) : (
                      <>
                        <span>Generate Image</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>

              {/* Prompt Suggestions - Hidden on mobile */}
              <div className="suggestions-section desktop-only">
                <p className="suggestions-label">Example Prompts</p>
                <div className="suggestions-grid">
                  {promptSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      className="suggestion-chip"
                      onClick={() => setPrompt(suggestion)}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Powered by Puter.ai */}
              <div className="api-info">
                <div className="api-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                          stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Powered by Puter.ai
                </div>
              </div>
            </motion.section>

            {/* Right Panel - Output */}
            <motion.section 
              className="output-panel"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="panel-header">
                <h2 className="panel-title">Output</h2>
                <p className="panel-description">
                  {generatedImage ? 'Your AI-generated image' : 'Image will appear here'}
                  {generatedImage && <span className="quality-badge">Quality: {quality}</span>}
                </p>
              </div>

              <div className="output-container">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      className="loading-state-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="ai-loading-animation">
                        <div className="loading-header">
                          <motion.div
                            className="loading-icon"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12" 
                                    stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </motion.div>
                          <h3>AI is Creating</h3>
                          <p>Generating your image with AI...</p>
                        </div>
                        
                        <motion.div 
                          className="loading-grid"
                          variants={loadingGridVariants}
                          initial="initial"
                          animate="animate"
                        >
                          {[...Array(9)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="loading-dot"
                              variants={loadingDotVariants}
                              style={{
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </motion.div>
                        
                        <div className="loading-progress">
                          <motion.div 
                            className="progress-bar"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : generatedImage ? (
                    <motion.div
                      key="image"
                      className="image-result-container"
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="image-wrapper">
                        <img
                          src={`data:image/png;base64,${generatedImage}`}
                          alt={prompt}
                          className="generated-image"
                        />
                        <div className="image-overlay">
                          <div className="overlay-content">
                            <p className="image-prompt">"{prompt}"</p>
                            <div className="image-meta">
                              <span>Puter.ai • {quality} quality</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="image-actions">
                        <motion.button
                          className="download-btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = `data:image/png;base64,${generatedImage}`;
                            link.download = `imagination-ai-${prompt.replace(/\s+/g, '-')}.png`;
                            link.click();
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" 
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Download Image
                        </motion.button>
                        
                        <motion.button
                          className="secondary-btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setGeneratedImage('');
                            setPrompt('');
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Create New
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      className="empty-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="empty-illustration">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                          <path d="M8 16H16M8 12H16M8 8H12M4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20Z" 
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="empty-content">
                        <h3>Ready to Create</h3>
                        <p>Enter a prompt and generate your first AI-powered visual</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="error-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                              stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="footer-content">
          <p>Imagination.Ai — Powered by Puter.ai</p>
          <div className="footer-links">
            <span>v1.0.0</span>
            <span>•</span>
            <span>Cloud AI</span>
            <span>•</span>
            <span>Real-time Generation</span>
          </div>
        </div>
      </motion.footer>

      {/* Puter.ai Script */}
      <script src="https://js.puter.com/v2/" async></script>
    </div>
  );
};

export default ImagineAi;