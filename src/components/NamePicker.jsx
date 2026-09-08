import { useState } from 'react';
import { nameData } from '../data/nameData';

export default function NamePicker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('全部');
  const [visibleCount, setVisibleCount] = useState(50);
  
  // NEW: State for the A-Z alphabet filter
  const [letterFilter, setLetterFilter] = useState('');

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const speakName = (name) => {
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; 
    window.speechSynthesis.speak(utterance);
  };

  const filteredNames = nameData.filter(item => {
    // 1. Text Search Filter
    const matchesSearch = 
      (item.englishName && item.englishName.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.traditionalChinese && item.traditionalChinese.includes(searchTerm)) ||
      (item.meaning && item.meaning.includes(searchTerm)); 
      
    // 2. Gender Button Filter
    let matchesGender = true;
    if (genderFilter === '男生') {
      matchesGender = ['male', 'mostly_male'].includes(item.gender);
    } else if (genderFilter === '女生') {
      matchesGender = ['female', 'mostly_female'].includes(item.gender);
    } else if (genderFilter === '中性') {
      matchesGender = ['unisex'].includes(item.gender);
    }

    // 3. Alphabet Bar Filter
    const matchesLetter = letterFilter === '' || (item.englishName && item.englishName.toUpperCase().startsWith(letterFilter));

    return matchesSearch && matchesGender && matchesLetter;
  });

  const translateDifficulty = (level) => {
    if (level === 'Easy') return '發音簡單';
    if (level === 'Medium') return '發音中等';
    return '發音較難';
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 font-sans">
      <h2 className="text-3xl font-black text-slate-800 mb-8 text-center font-display">
        尋找你的英文名字 (Name Engine)
      </h2>
      
      {/* 1. SEARCH & MAIN FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input 
          type="text" 
          placeholder="搜尋名字或含義 (例如: 勇敢, 智慧)..."
          className="flex-1 p-3 border-2 border-slate-200 rounded-xl focus:border-brand-blue outline-none"
          value={searchTerm}
          onChange={(e) => {
             setSearchTerm(e.target.value);
             setLetterFilter(''); // Clear letter if typing a search
             setVisibleCount(50);
          }}
        />
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['全部', '男生', '女生', '中性'].map(gender => (
            <button 
              key={gender}
              onClick={() => {
                setGenderFilter(gender);
                setVisibleCount(50);
              }}
              className={`px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap ${
                genderFilter === gender 
                  ? 'bg-brand-blue text-white' 
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-brand-blue'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* 2. ALPHABET A-Z BAR */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap justify-center gap-1 md:gap-2">
        <button 
          onClick={() => { setLetterFilter(''); setVisibleCount(50); }}
          className={`px-3 py-1 text-sm font-bold rounded-lg transition-colors ${
            letterFilter === '' ? 'bg-brand-yellow text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          All
        </button>
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => { 
              setLetterFilter(letter); 
              setSearchTerm(''); // Clear typed search when a letter is clicked
              setVisibleCount(50); 
            }}
            className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-lg transition-colors ${
              letterFilter === letter 
                ? 'bg-brand-blue text-white shadow-md' 
                : 'text-slate-600 hover:bg-brand-blue/10 hover:text-brand-blue'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* 3. COLOR LEGEND */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 text-xs md:text-sm font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#b8cce4]"></div> 男生 (Male)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3b5973]"></div> 偏男生 (Mostly Male)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f4f5ef] border border-slate-300"></div> 中性 (Unisex)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7b3a4a]"></div> 偏女生 (Mostly Female)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#e2c1cf]"></div> 女生 (Female)
        </div>
      </div>

      {/* 4. NAME CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNames.slice(0, visibleCount).map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow relative overflow-hidden group">
            
            {/* Color Accent Mapping */}
            <div className={`absolute top-0 left-0 w-3 h-full ${
              item.gender === 'male' ? 'bg-[#b8cce4]' : 
              item.gender === 'female' ? 'bg-[#e2c1cf]' : 
              item.gender === 'mostly_male' ? 'bg-[#3b5973]' : 
              item.gender === 'mostly_female' ? 'bg-[#7b3a4a]' : 
              'bg-[#f4f5ef] border-r border-slate-200'
            }`} />

            <div className="pl-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-slate-800 font-display">{item.englishName}</h3>
                
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider ${
                  item.phoneticDifficulty === 'Easy' ? 'bg-brand-green/20 text-green-800 border border-brand-green' :
                  item.phoneticDifficulty === 'Medium' ? 'bg-brand-yellow/20 text-yellow-800 border border-brand-yellow' :
                  'bg-brand-red/20 text-red-800 border border-brand-red'
                }`}>
                  {translateDifficulty(item.phoneticDifficulty)}
                </span>
              </div>
              
              {item.traditionalChinese && (
                <p className="text-lg font-bold text-slate-700 mt-1">{item.traditionalChinese}</p>
              )}
              
              <p className="text-sm text-slate-600 mt-2 line-clamp-2" title={item.meaning}>
                {item.meaning || "無說明"}
              </p>
              
              <div className="flex items-center gap-3 mt-3">
                {item.origin && (
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 truncate max-w-[150px]">
                    {item.origin}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-medium">
                  音節數: {item.syllables}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => speakName(item.englishName)}
              className="w-12 h-12 bg-slate-50 text-brand-blue rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-slate-900 transition-colors text-xl shrink-0 ml-4 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              title="聆聽發音"
            >
              🔊
            </button>
          </div>
        ))}
      </div>
      
      {/* 5. LOAD MORE / EMPTY STATES */}
      {filteredNames.length > visibleCount && (
        <div className="text-center mt-12 mb-8">
          <button 
            onClick={() => setVisibleCount(prev => prev + 50)}
            className="px-8 py-3 bg-brand-orange text-white rounded-full font-bold shadow-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            載入更多名字 (Load More)
          </button>
        </div>
      )}
      
      {filteredNames.length === 0 && (
        <div className="text-center mt-12 p-8 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium text-lg">找不到符合的名字</p>
          <p className="text-slate-400 text-sm mt-2">請嘗試搜尋其他含義，或清除字母過濾器！</p>
        </div>
      )}
    </div>
  );
}