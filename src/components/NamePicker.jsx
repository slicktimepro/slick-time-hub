import { useState } from 'react';
import { nameData } from '../data/nameData';

export default function NamePicker({ language }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');

  const speakName = (name) => {
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const filteredNames = nameData.filter(item => {
    // Search function: matches English, Chinese name, AND Chinese Meaning!
    const matchesSearch = 
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.chineseName && item.chineseName.includes(searchTerm)) ||
      (item.meaningZh && item.meaningZh.includes(searchTerm)); 
      
    // Gender filter: corresponds to '男' and '女'
    const matchesGender = genderFilter === 'All' || item.sex === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">
        {language === 'zh' ? '尋找你的英文名字' : 'Find Your English Name'}
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          placeholder={language === 'zh' ? "搜尋名字或含義 (例如: 勇敢)..." : "Search names or meanings..."}
          className="flex-1 p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          {['All', '男', '女'].map(gender => (
            <button 
              key={gender}
              onClick={() => setGenderFilter(gender)}
              className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                genderFilter === gender 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300'
              }`}
            >
              {gender === 'All' 
                ? (language === 'zh' ? '全部' : 'All') 
                : (language === 'zh' ? gender : (gender === '男' ? 'Boys' : 'Girls'))}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNames.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              {/* THE FORCEFIELD IS RIGHT HERE ON THIS H3 TAG! */}
              <h3 translate="no" className="notranslate text-2xl font-black text-blue-700">{item.name}</h3>
              
              {item.chineseName && (
                <p className="text-lg font-bold text-slate-700 mt-1">{item.chineseName}</p>
              )}
              
              <p className="text-sm text-slate-600 mt-2">
                {language === 'zh' ? item.meaningZh : item.meaningEn}
              </p>
              
              {(item.originEn || item.originZh) && (
                <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">
                  {language === 'zh' ? item.originZh : item.originEn}
                </span>
              )}
            </div>
            
            <button 
              onClick={() => speakName(item.name)}
              className="w-12 h-12 bg-slate-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors text-xl shrink-0 ml-4 border border-slate-200"
              title="聆聽發音"
            >
              🔊
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}