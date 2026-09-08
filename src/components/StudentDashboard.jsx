import React, { useRef } from 'react';
import Ep1Sc1Flashcards from './Ep1Sc1Flashcards';

export default function StudentDashboard({ activeProfile, language, onExit }) {
  // Architectural Setup: Refs for smooth, native DOM scrolling
  const gameSectionRef = useRef(null);
  const worksheetSectionRef = useRef(null);
  const videoSectionRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 overflow-x-hidden relative">
      
      {/* 1. Global Dashboard Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-brand-blue overflow-hidden shadow-inner">
              <img 
                src={activeProfile?.avatarSrc || '/snail-icon.webp'} 
                alt="Student Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/snail-icon.webp' }}
              />
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
              {language === 'zh' ? '你好，' : 'Hello, '}
              <span className="text-brand-blue">{activeProfile?.screenName || 'Student'}</span>!
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Episode 1: Scene 1
            </span>
            <button 
              onClick={onExit}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-colors text-sm shadow-sm"
              aria-label="Exit to profile selector"
            >
              {language === 'zh' ? '登出' : 'Exit'}
            </button>
          </div>
        </div>
      </header>

      {/* 2. The Vertical Pedagogical Sequence */}
      <main className="max-w-6xl mx-auto flex flex-col gap-24 pt-12 pb-32 px-4">
        
        {/* STEP 1: VOCABULARY (FLASHCARDS) */}
        <section className="flex flex-col items-center animate-fade-in-up">
          <div className="w-full mb-8">
            <div className="text-center mb-4">
              <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-black text-sm tracking-widest uppercase border border-brand-blue/30 shadow-sm">
                Step 1
              </span>
            </div>
            <Ep1Sc1Flashcards />
          </div>
          
          <button 
            onClick={() => scrollToSection(gameSectionRef)}
            className="group px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-black text-xl rounded-full shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 focus:ring-4 focus:ring-orange-500/50"
          >
            {language === 'zh' ? '完成任務：前往遊戲！' : 'Task Complete: Next!'} 
            <span className="inline-block ml-2 group-hover:animate-bounce">⬇️</span>
          </button>
        </section>

        {/* STEP 2: APPLICATION (HTML5 GAME) */}
        <section ref={gameSectionRef} className="flex flex-col items-center pt-12 border-t-2 border-slate-800 border-dashed scroll-mt-24">
          <div className="w-full mb-8 text-center">
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-400 font-black text-sm tracking-widest uppercase border border-amber-400/30 shadow-sm">
                Step 2
              </span>
            </div>
            
            {/* The Sandboxed Iframe - Expanded Y-Axis to completely eliminate scrolling */}
            <div className="w-full max-w-5xl mx-auto min-h-[900px] h-[90vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-950 relative">
              <iframe 
                src="/tansys-waterproof-check.html" 
                title="Tansy's Waterproof Check Game"
                className="absolute inset-0 w-full h-full border-none"
                allow="autoplay; fullscreen"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection(worksheetSectionRef)}
            className="group px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-black text-xl rounded-full shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 focus:ring-4 focus:ring-blue-500/50"
          >
            {language === 'zh' ? '完成任務：下載學習單！' : 'Task Complete: Get Worksheet!'} 
            <span className="inline-block ml-2 group-hover:animate-bounce">⬇️</span>
          </button>
        </section>

        {/* STEP 3: WORKSHEET (UPGRADED UX) */}
        <section ref={worksheetSectionRef} className="flex flex-col items-center pt-12 border-t-2 border-slate-800 border-dashed scroll-mt-24">
          <div className="w-full mb-12 text-center flex flex-col items-center">
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 font-black text-sm tracking-widest uppercase border border-indigo-500/30 shadow-sm">
                Step 3
              </span>
            </div>
            <h3 className="text-3xl font-black text-white mb-4">
              {language === 'zh' ? '紙本學習單' : 'Printable Worksheet'}
            </h3>
            <p className="text-slate-400 mb-8 max-w-md">
              {language === 'zh' ? '下載並列印學習單，與 Tansy 一起練習今天的魔法單字！' : 'Download the worksheet to practice today’s STEM-Magic vocabulary with Tansy!'}
            </p>
            
            {/* Dual Download Buttons for Accessibility */}
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/worksheets/scene_1_worksheet.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 font-bold text-lg rounded-xl border-2 border-slate-700 hover:border-indigo-500/50 transition-all shadow-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                {language === 'zh' ? '下載 PDF' : 'Download PDF'}
              </a>

              <a 
                href="/worksheets/scene_1_worksheet.png" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-bold text-lg rounded-xl border-2 border-slate-700 hover:border-emerald-500/50 transition-all shadow-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                {language === 'zh' ? '下載 圖片 (PNG)' : 'Download Image'}
              </a>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection(videoSectionRef)}
            className="group px-8 py-4 bg-brand-green hover:bg-green-600 text-white font-black text-xl rounded-full shadow-lg shadow-green-500/20 transition-all hover:-translate-y-1 focus:ring-4 focus:ring-green-500/50"
          >
            {language === 'zh' ? '完成任務：解鎖影片！' : 'Task Complete: Unlock Video!'} 
            <span className="inline-block ml-2 group-hover:animate-bounce">⬇️</span>
          </button>
        </section>

        {/* STEP 4: REWARD (SCENE 1 VIDEO) - APPLE COMPLIANT */}
        <section ref={videoSectionRef} className="flex flex-col items-center pt-12 border-t-2 border-slate-800 border-dashed scroll-mt-24">
           <div className="w-full max-w-4xl mb-8 text-center">
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-brand-red/20 text-brand-red font-black text-sm tracking-widest uppercase border border-brand-red/30 shadow-sm">
                Final Reward
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 font-display tracking-wide drop-shadow-md">
              Scene 1: The STEM-Magic Begins
            </h2>
            
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl relative">
              <video 
                key="scene-1-reward-video" // ARCHITECTURAL FIX: Forces a clean HTML5 mount
                controls 
                controlsList="nodownload"
                className="w-full h-full object-cover"
                poster="/videos/scene_1_poster.webp"
                preload="metadata"
                playsInline={true} 
                muted={true}       
              >
                {/* ARCHITECTURAL UPDATE: Cache-busting ?v=2 parameter added */}
                <source src="/videos/scene_1_butterfly_rescue.mp4?v=2" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}