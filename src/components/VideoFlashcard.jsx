import React, { useState } from 'react';

// Reusable Zhuyin helper 
const ZhuyinText = ({ char, bopomofo }) => (
  <ruby className="mx-[2px]">
    {char}
    <rt className="text-[0.65em] font-normal text-sky-200 opacity-90 tracking-tighter">{bopomofo}</rt>
  </ruby>
);

const VideoFlashcard = ({ videoSrc, englishWord, chineseWordComponents, orientation = 'portrait' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Native Text-to-Speech Function
  const playAudio = (e, text) => {
    e.stopPropagation(); 
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 0.85; 
      window.speechSynthesis.speak(utter);
    }
  };

  // ARCHITECTURAL UPGRADE: Dynamic Aspect Ratio
  const aspectRatioClass = orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/16]';

  return (
    <div className="max-w-xs w-full rounded-2xl border-4 border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col mx-auto transition-all">
      
      {/* Top Section: Dynamic Video Player */}
      <div className={`relative w-full bg-black ${aspectRatioClass}`}>
        <video 
          key={videoSrc} // ARCHITECTURAL FIX: Forces a clean HTML5 mount for WebKit
          className="w-full h-full object-cover" 
          controls 
          controlsList="nodownload"
          preload="metadata"
          playsInline={true} 
          muted={true}       
        >
          {/* Explicit MIME typing for Apple AVFoundation */}
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Bottom Section: Interactive Bilingual Flip Block */}
      <div 
        className="relative w-full h-24 cursor-pointer [perspective:1000px] group flex-shrink-0"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
          
          {/* Front Face: English + Controls */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-800 flex flex-col items-center justify-center border-t-2 border-slate-700 group-hover:bg-slate-750 transition-colors px-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 absolute top-2">Vocabulary</span>
            
            <div className="flex items-center justify-between w-full mt-3">
              <h3 className="text-3xl font-black text-amber-400 tracking-wide drop-shadow-md truncate pr-2">
                {englishWord}
              </h3>
              
              {/* Action Icons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => playAudio(e, englishWord)}
                  className="p-2 rounded-full bg-slate-700 text-sky-400 hover:text-white hover:bg-sky-600 transition shadow-sm z-10" 
                  title="Listen to Pronunciation"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                </button>

                <button 
                  className="p-2 rounded-full bg-slate-700 text-amber-400 hover:text-slate-900 hover:bg-amber-400 transition shadow-sm z-10"
                  title="Flip to Translation"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Back Face: Traditional Chinese + Zhuyin */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-sky-900 flex flex-col items-center justify-center border-t-2 border-sky-700">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1 absolute top-2">Translation</span>
            <div className="flex items-center justify-center w-full mt-3 px-4">
              <h3 className="text-3xl font-bold text-white flex items-center justify-center gap-1">
                {chineseWordComponents}
              </h3>
            </div>
            <div className="absolute bottom-2 right-4 text-sky-400 opacity-60 flex items-center gap-1 text-[10px] uppercase font-bold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
              Click to flip back
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default VideoFlashcard;