import React from 'react';

const translations = {
  en: {
    lineTitle: "Join Our LINE Community",
    lineSubtitle: "Get instant access to free resources, Snail greetings, and parent tips!",
    lineButton: "Follow on LINE OA",
    lineSnailBubble: "Welcome to Slick Time! 🐌🏠 We are Blue Snail and Yellow Snail, your guides to the world of Smart Magic! We believe learning should be nutritious and fun. Let's make magic together!",
  },
  zh: {
    lineTitle: "加入我們的 LINE 官方帳號",
    lineSubtitle: "現在加入即刻領取免費禮物！由小藍與小黃蝸牛親自為您送上！",
    lineButton: "加入 LINE 官方帳號 (LINE OA)",
    lineSnailBubble: "歡迎來到 Slick Time！ we are Blue Snail and Yellow Snail, 您通往『聰明魔法 (Smart Magic)』世界的導遊！我們深信，學習應該是充滿營養且有趣的。請點擊按鈕加入，讓我們一起創造魔法吧！",
  }
};

export default function LineCommunity({ language = 'zh' }) {
  const t = translations[language] || translations['zh'];

  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-100 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden flex flex-col lg:flex-row items-center gap-10">
          <div className="absolute top-0 left-0 w-3 h-full bg-[#06C755]" /> {/* LINE Green */}
          
          {/* Stylized Snail speech bubble visual */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
  src="/snail-icon.webp" 
  alt="Blue and Yellow Snails" 
  className="w-10 h-10 object-contain inline-block mr-2 animate-bounce" 
/>
              <span className="text-xs uppercase font-accent font-black tracking-widest text-[#06C755]">
                Blue & Yellow Snail Greeting
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl relative mb-6">
              {/* Speech bubble pointer */}
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-slate-50 border-l border-b border-slate-100 rotate-45 transform -translate-y-2 hidden lg:block"></div>
              <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed italic">
                "{t.lineSnailBubble}"
              </p>
            </div>
            <h3 className="text-2xl font-black font-display text-slate-800 mb-2">
              {t.lineTitle}
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              {t.lineSubtitle}
            </p>
          </div>

          {/* LINE CTA Button */}
          <div className="shrink-0 w-full lg:w-auto text-center">
            <button className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold rounded-2xl shadow-lg shadow-[#06C755]/20 transition-all text-lg">
              {/* Inline SVG of LINE icon style */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 5.84 2 10.56c0 2.76 1.51 5.21 3.96 6.84l-.59 2.51c-.1.43.43.76.81.5l2.97-1.95c.9.27 1.87.42 2.85.42 5.52 0 10-3.84 10-10.56S17.52 2 12 2zm3.32 11.23h-1.42c-.2 0-.35-.16-.35-.35v-3.23c0-.2.16-.35.35-.35h1.42c.2 0 .35.16.35.35v.35c0 .2-.16.35-.35.35h-1.07v.71h1.07c.2 0 .35.16.35.35v.35c0 .2-.16.35-.35.35h-1.07v.72h1.07c.2 0 .35.16.35.35v.35c0 .2-.16.35-.35.35h-1.07v.72h1.07c.2 0 .35.16.35.35v.35c0 .2-.16.36-.35.36zm-2.58 0h-1.43c-.2 0-.35-.16-.35-.35V7.65c0-.2.16-.35.35-.35h.35c.2 0 .35.16.35.35v4.52h.73c.2 0 .35.16.35.35v.35c0 .2-.15.36-.35.36zm-2.15 0h-.35c-.2 0-.35-.16-.35-.35V7.65c0-.2.16-.35.35-.35h.35c.2 0 .35.16.35.35v4.52c0 .2-.15.36-.35.36zm-1.8 0H7.36c-.2 0-.35-.16-.35-.35v-1.42c0-.2.16-.35.35-.35h1.43c.2 0 .35.16.35.35v1.42c0 .2-.16.35-.35.35z"/>
              </svg>
              <span>{t.lineButton}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

