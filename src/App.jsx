import { useState } from 'react';
import NamePicker from './components/namePicker';

export default function App() {
  const [language, setLanguage] = useState('zh');
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <span 
            className="text-xl font-black text-blue-700 whitespace-nowrap tracking-tight cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            SLICKTIME.tw
          </span>
          
          <div className="flex flex-wrap justify-center gap-4 font-semibold text-slate-600 mt-4 md:mt-0">
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600 transition-colors">
              {language === 'zh' ? '首頁' : 'Home'}
            </button>
            <button onClick={() => setCurrentPage('name-helper')} className="hover:text-blue-600 transition-colors">
              {language === 'zh' ? '英文名字助手' : 'Name Helper'}
            </button>
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600 transition-colors">
              {language === 'zh' ? '學生專區' : 'For Students'}
            </button>
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600 transition-colors">
              {language === 'zh' ? '家長專區' : 'For Parents'}
            </button>
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600 transition-colors">
              {language === 'zh' ? '教師專區' : 'For Teachers'}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </nav>

      <main className="p-6">
        {currentPage === 'home' ? (
          <div className="max-w-5xl mx-auto mt-12 space-y-16">
            <div className="text-center">
              <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-4 block">
                {language === 'zh' ? '全新：應用魔法系列' : 'NEW: Applied Magic Series'}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6">
                {language === 'zh' ? '當 STEM 遇見魔法' : 'Where STEM Meets Magic'}
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '透過運算魔法賦予年輕心靈力量。' 
                  : 'Empowering young minds through Computational Magic.'}
              </p>
              <button 
                onClick={() => setCurrentPage('name-helper')}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                {language === 'zh' ? '探索魔法' : 'Explore the Magic'}
              </button>
            </div>
          </div>
        ) : (
          /* Forces Name Picker to display the complete Chinese data layout */
          <NamePicker language="zh" />
        )}
      </main>
    </div>
  );
}