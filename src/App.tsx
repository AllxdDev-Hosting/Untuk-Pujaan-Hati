import React, { useState } from 'react';
import { Heart, Copy, Settings, Download, Globe, Code } from 'lucide-react';

interface FormData {
  title: string;
  subtitle: string;
  firstImage: string;
  secondImage: string;
  yesClickText: string;
  yesButtonText: string;
  noButtonPhrases: string;
  backgroundImage: string;
  buttonAnimation: 'grow' | 'random';
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    firstImage: '',
    secondImage: '',
    yesClickText: '',
    yesButtonText: '',
    noButtonPhrases: '',
    backgroundImage: '',
    buttonAnimation: 'grow'
  });

  const generateHTML = () => {
    const phrases = formData.noButtonPhrases.split('\n').map(p => p.trim()).filter(Boolean);
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${formData.backgroundImage ? 'transparent' : 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'};
            background-image: ${formData.backgroundImage ? `url('${formData.backgroundImage}')` : 'none'};
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            text-align: center;
            overflow: hidden;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.95);
            padding: 2.5rem;
            border-radius: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 90%;
            width: 500px;
            position: relative;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .container h1 {
            color: #1a1a1a;
            font-size: 2rem;
            margin-bottom: 1rem;
            font-weight: 600;
            line-height: 1.2;
        }
        
        .container p {
            color: #4a4a4a;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .image {
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 20px;
            margin: 1.5rem 0;
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
            max-width: 100%;
        }
        
        .image:hover {
            transform: scale(1.02);
        }
        
        .buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            margin-top: 1.5rem;
            position: relative;
            min-height: 60px;
            padding: 1rem;
            flex-wrap: wrap;
        }
        
        .yes-btn {
            padding: 0.8rem 2.5rem;
            font-size: 1.1rem;
            background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 100;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            width: 100%;
            max-width: 200px;
        }
        
        .yes-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }
        
        .no-btn {
            padding: 0.8rem 2.5rem;
            font-size: 1.1rem;
            background: #f0f0f0;
            color: #666;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 200px;
        }
        
        .no-btn:hover {
            background: #e8e8e8;
            transform: translateY(-2px);
        }
        
        .no-btn.moving {
            position: absolute;
        }
        
        .hidden {
            display: none !important;
        }
        
        .success-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: ${formData.backgroundImage ? 'transparent' : 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'};
            background-image: ${formData.backgroundImage ? `url('${formData.backgroundImage}')` : 'none'};
            background-size: cover;
            background-position: center;
            z-index: 1000;
            opacity: 0;
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 1rem;
        }
        
        .success-container.visible {
            display: flex;
            opacity: 1;
        }
        
        .success-image {
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 20px;
            margin: 2rem 0;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            animation: floatAnimation 3s ease-in-out infinite;
            max-width: 100%;
        }
        
        @keyframes floatAnimation {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        
        .success-text {
            font-size: 2rem;
            color: #1a1a1a;
            text-align: center;
            margin: 2rem;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.95);
            padding: 1.5rem 2.5rem;
            border-radius: 16px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .yes-btn.growing {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 99;
        }

        @media (max-width: 768px) {
            .container {
                padding: 1.5rem;
            }
            
            .container h1 {
                font-size: 1.5rem;
            }
            
            .container p {
                font-size: 1rem;
            }
            
            .success-text {
                font-size: 1.5rem;
                padding: 1rem 1.5rem;
                margin: 1rem;
            }
            
            .image, .success-image {
                width: 250px;
                height: 250px;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 1rem;
            }
            
            .buttons {
                gap: 0.5rem;
            }
            
            .yes-btn, .no-btn {
                padding: 0.6rem 1.5rem;
                font-size: 1rem;
            }
            
            .image, .success-image {
                width: 200px;
                height: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="container" id="mainContainer">
        <h1 id="title">${formData.title}</h1>
        <p id="subtitle">${formData.subtitle}</p>
        <img src="${formData.firstImage}" alt="Valentine" class="image" id="valentineImage">
        <div class="buttons" id="buttonContainer">
            <button class="yes-btn" id="yesBtn">${formData.yesButtonText}</button>
            <button class="no-btn" id="noBtn">No</button>
        </div>
    </div>

    <div class="success-container" id="successContainer">
        <img src="${formData.secondImage}" alt="Success" class="success-image">
        <p class="success-text">${formData.yesClickText}</p>
    </div>

    <script>
        const phrases = ${JSON.stringify(phrases)};
        let phraseIndex = 0;
        let yesScale = 1;
        let isTransitioning = false;
        let isFirstClick = true;

        function getRandomPosition() {
            const buttonContainer = document.getElementById('buttonContainer');
            const noBtn = document.getElementById('noBtn');
            const rect = buttonContainer.getBoundingClientRect();
            
            const maxDistanceX = rect.width * 0.4;
            const maxDistanceY = rect.height * 0.4;
            
            const angle = Math.random() * Math.PI * 2;
            const distanceX = Math.random() * maxDistanceX;
            const distanceY = Math.random() * maxDistanceY;
            
            const x = Math.cos(angle) * distanceX;
            const y = Math.sin(angle) * distanceY;
            
            return { x, y };
        }

        document.getElementById('yesBtn').addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;

            const yesBtn = document.getElementById('yesBtn');
            const mainContainer = document.getElementById('mainContainer');
            const successContainer = document.getElementById('successContainer');

            yesBtn.classList.add('growing');
            
            function grow() {
                yesScale *= 1.5;
                yesBtn.style.transform = \`translate(-50%, -50%) scale(\${yesScale})\`;
                
                if (yesScale < 100) {
                    requestAnimationFrame(grow);
                } else {
                    successContainer.classList.add('visible');
                    mainContainer.style.opacity = 0;
                    setTimeout(() => {
                        mainContainer.classList.add('hidden');
                        yesBtn.classList.add('hidden');
                    }, 500);
                }
            }
            
            grow();
        });

        document.getElementById('noBtn').addEventListener('click', () => {
            if (isTransitioning) return;
            
            const noBtn = document.getElementById('noBtn');
            
            if (isFirstClick && '${formData.buttonAnimation}' === 'random') {
                noBtn.classList.add('moving');
                const buttonContainer = document.getElementById('buttonContainer');
                const rect = buttonContainer.getBoundingClientRect();
                noBtn.style.left = '50%';
                noBtn.style.top = '50%';
                isFirstClick = false;
            }
            
            phraseIndex = (phraseIndex + 1) % phrases.length;
            noBtn.textContent = phrases[phraseIndex];
            
            if ('${formData.buttonAnimation}' === 'random') {
                const pos = getRandomPosition();
                noBtn.style.transform = \`translate(calc(-50% + \${pos.x}px), calc(-50% + \${pos.y}px))\`;
            } else {
                yesScale += 0.3;
                const yesBtn = document.getElementById('yesBtn');
                yesBtn.style.transform = \`scale(\${yesScale})\`;
                yesBtn.style.fontSize = \`\${1 + (yesScale * 0.2)}rem\`;
            }
        });
    </script>
</body>
</html>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateHTML());
  };

  const handleDownload = () => {
    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'valentine.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-8 border border-pink-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
            <Heart className="text-pink-600 h-6 w-6 sm:h-8 sm:w-8" /> 
            <span>Untuk Mu Website Generator</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-6">
              <div className="bg-pink-50 rounded-xl p-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-pink-600" />
                  Configuration
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                      placeholder="Enter subtitle..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.backgroundImage}
                      onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})}
                      placeholder="https://example.com/background.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Image URL</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.firstImage}
                      onChange={(e) => setFormData({...formData, firstImage: e.target.value})}
                      placeholder="Enter first image URL..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Second Image URL</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.secondImage}
                      onChange={(e) => setFormData({...formData, secondImage: e.target.value})}
                      placeholder="Enter second image URL..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yes Click Text</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.yesClickText}
                      onChange={(e) => setFormData({...formData, yesClickText: e.target.value})}
                      placeholder="Enter yes click text..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yes Button Text</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.yesButtonText}
                      onChange={(e) => setFormData({...formData, yesButtonText: e.target.value})}
                      placeholder="Enter yes button text..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Animation</label>
                    <select
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      value={formData.buttonAnimation}
                      onChange={(e) => setFormData({...formData, buttonAnimation: e.target.value as 'grow' | 'random'})}
                    >
                      <option value="grow">Big Yes Button</option>
                      <option value="random">Random No Button Position</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No Button Phrases</label>
                    <textarea
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                      rows={5}
                      value={formData.noButtonPhrases}
                      onChange={(e) => setFormData({...formData, noButtonPhrases: e.target.value})}
                      placeholder="Enter phrases (one per line)..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Preview</h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <iframe
                  srcDoc={generateHTML()}
                  className="w-full h-[400px] sm:h-[600px] border-0 rounded-lg"
                  title="Preview"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-end gap-3 sm:gap-4">
            <a
              href="https://myhome-allxddev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> AllxdDev Web
            </a>
            <a
              href="https://gitpublis.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:ring-2 focus:ring-green-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Publish Website
            </a>
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 focus:ring-2 focus:ring-purple-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Download HTML
            </button>
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-200 focus:ring-2 focus:ring-pink-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Copy className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Copy Code
            </button>
          </div>
        </div>

        <footer className="text-center text-gray-600 py-4">
          <a 
            href="https://github.com/AllxdDev-Hosting" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Created by AllxdDev-Hosting
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
