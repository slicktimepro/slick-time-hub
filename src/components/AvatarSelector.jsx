import React from 'react';

export default function AvatarSelector({ language, selectedAvatarId, onSelectAvatar }) {
  const avatars = [
    { id: 'sandy', src: '/sandy.webp', nameEn: 'Sandy Witch', nameZh: 'Sandy 女巫', bg: 'bg-pink-100', border: 'border-pink-300' },
    { id: 'tansy', src: '/tansy.webp', nameEn: 'Tansy the Fairy', nameZh: 'Tansy 仙子', bg: 'bg-cyan-100', border: 'border-cyan-300' },
    { id: 'blue', src: '/blue.webp', nameEn: 'Blue Snail', nameZh: '小藍蝸牛', bg: 'bg-blue-100', border: 'border-blue-300' },
    { id: 'yellow', src: '/yellow.webp', nameEn: 'Yellow Snail', nameZh: '小黃蝸牛', bg: 'bg-yellow-100', border: 'border-yellow-300' },
    { id: 'gobble', src: '/gobble.webp', nameEn: 'Gobble', nameZh: 'Gobble', bg: 'bg-green-100', border: 'border-green-300' }
  ];

  return (
    <div className="w-full font-sans py-4">
      <label className="block font-bold text-slate-700 mb-4 text-center md:text-left">
        {language === 'zh' ? '選擇你的角色頭像' : 'Choose Your Character Avatar'}
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {avatars.map((avatar) => {
          const isSelected = selectedAvatarId === avatar.id;
          
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onSelectAvatar(avatar.id, avatar.src)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 border-4 shadow-sm group
                ${isSelected 
                  ? `${avatar.bg} ${avatar.border} scale-105 shadow-md` 
                  : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                }
              `}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm z-20">
                  ✓
                </div>
              )}

              <div className="h-20 w-20 flex items-center justify-center mb-2">
                <img 
                  src={avatar.src} 
                  alt={avatar.nameEn} 
                  className={`max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
              </div>
              
              <span className={`text-xs font-bold text-center tracking-wide ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                {language === 'zh' ? avatar.nameZh : avatar.nameEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}