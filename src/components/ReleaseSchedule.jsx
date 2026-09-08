import React from 'react';

const ReleaseSchedule = ({ language }) => {
  // Mapping characters to their respective release stages
  const schedule = [
    {
      id: 1,
      title: "第 1 幕：蝴蝶救援 / Scene 1: The Butterfly Rescue",
      date: "9月5日 解鎖 / Unlocks Sept 5",
      status: "locked",
      description: "Sandy, Tansy 與 Gobble 帶領大家認識核心 CLIL 單字與 STEM 概念。 / Sandy, Tansy, and Gobble introduce the core CLIL vocabulary and STEM concepts.",
      characters: [
        { src: "/sandy.webp", alt: "Sandy Witch", offset: "-top-12 -left-6", width: "w-24" },
        { src: "/tansy.webp", alt: "Tansy the Fairy", offset: "-top-8 right-2", width: "w-16" }
      ]
    },
    {
      id: 2,
      title: "第 2 幕：進入水族箱 / Scene 2: Scales, Sandwiches, and Slipping",
      date: "9月12日 解鎖 / Unlocks Sept 12",
      status: "locked",
      description: "跟著我們深入探索放大鏡下的微觀環境。 / Dive deeper into the magnification lesson with our complex new environments.",
      characters: [
        { src: "/blue.webp", alt: "Blue the Snail", offset: "-top-10 left-4", width: "w-16" },
        { src: "/yellow.webp", alt: "Yellow the Snail", offset: "-top-10 right-4", width: "w-16" }
      ]
    },
    {
      id: 3,
      title: "第 3 幕：微觀世界 / Scene 3: The Big Clean-Up",
      date: "9月19日 解鎖 / Unlocks Sept 19",
      status: "locked",
      description: "STEM 與魔法冒險的最高潮！ / The culmination of our STEM-magic adventure!",
      characters: [
        { src: "/gobble.webp", alt: "Gobble", offset: "-top-12 right-2", width: "w-20" }
      ]
    },
    {
      id: 4,
      title: "完整第 1 集發布 / Full Episode 1 Release",
      subtitle: "The Great 放大 (Fàngdà): A Magnification Spell", // <-- ARCHITECTURAL UPGRADE: Optional Subtitle Field
      date: "9月26日 解鎖 / Unlocks Sept 26",
      status: "locked",
      description: "完整、流暢的沉浸式教育體驗。 / The complete, seamless educational experience.",
      characters: [
        { src: "/slick-time-logo.png", alt: "Slick Time Productions", offset: "-top-8 left-1/2 -translate-x-1/2", width: "w-24" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-sans">
      <div className="text-center mb-20">
        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl font-display">
          {language === 'zh' ? '放大篇發布時程' : 'Magnification Episode Drop Schedule'}
        </h2>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
          {language === 'zh'
            ? '每週六解鎖全新動畫。立即訂閱即可獲得專屬學習單與教材！'
            : 'New animations unlock every Saturday. Subscribe today for instant access to premium scaffolding materials.'}
        </p>
      </div>

      <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 pt-8">
        {schedule.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl p-6 pt-10 shadow-lg border-2 transition-all duration-300 relative ${
              item.status === 'unlocked'
                ? 'border-brand-blue bg-gradient-to-br from-white to-blue-50 transform hover:-translate-y-2 hover:shadow-xl'
                : 'border-slate-200 bg-slate-50 opacity-80'
            }`}
          >
            {/* Character Pop-Outs */}
            {item.characters.map((char, index) => (
              <img
                key={index}
                src={char.src}
                alt={char.alt}
                className={`absolute ${char.offset} ${char.width} object-contain drop-shadow-md z-10`}
              />
            ))}

            <div className="flex items-center justify-between mb-4 mt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide z-20 relative ${
                  item.status === 'unlocked'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {item.status === 'unlocked'
                  ? (language === 'zh' ? '▶ 現已開放' : '▶ Available Now')
                  : (language === 'zh' ? '🔒 未解鎖' : '🔒 Locked')}
              </span>
            </div>
            
            <h3 className={`text-xl font-black font-display leading-tight ${item.subtitle ? 'mb-1' : 'mb-2'} ${
              item.status === 'unlocked' ? 'text-slate-900' : 'text-slate-700'
            }`}>
              {item.title}
            </h3>
            
            {/* ARCHITECTURAL UPGRADE: Conditional Subtitle Injection */}
            {item.subtitle && (
              <h4 className="text-[15px] font-bold text-brand-blue mb-2 font-display tracking-wide">
                {item.subtitle}
              </h4>
            )}
            
            <p className="text-xs font-bold mb-3 uppercase tracking-wider text-brand-orange">
              {item.date}
            </p>
            
            <p className={`text-sm leading-relaxed ${
              item.status === 'unlocked' ? 'text-slate-700' : 'text-slate-500'
            }`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleaseSchedule;