import React from 'react';

const translations = {
  en: {
    heroTitle: "Slick Time for Educators",
    heroSubtitle: "Professional-grade CLIL & STEM resources designed to save you prep time and captivate your classroom.",
    
    item1Title: "The \"Slick Script\" Transition Toolkit",
    item1Desc: "A library of ready-to-use, whimsical classroom management scripts. Master the \"Snail's Pace\" gathering method and character-led prompts to calm high-energy rooms without raising your voice.",
    
    item2Title: "Complete CLIL Lesson Plans & Guides",
    item2Desc: "45-minute structured lesson flows mapping Snail Phonics to Sandy & Tansy STEM content. Includes differentiated \"Level A\" and \"Level B\" worksheets to easily manage mixed-level classrooms.",
    
    item3Title: "The \"Studio Pass\" Custom Pipeline",
    item3Desc: "A B2B Custom Tier License. Submit difficult-to-teach science topics and receive a custom 1-minute animated hook starring Sandy and Tansy specifically designed for your curriculum.",
    
    item4Title: "The \"Grand Architect\" Asset Toolkit",
    item4Desc: "Access to raw, editable assets to build your own immersive slides. Includes high-resolution character sprites, transparent environments, and original sound effect stems.",
    
    ctaButton: "Get B2B Access",
    ctaInquiry: "Contact us for school-wide licensing",
  },
  zh: {
    heroTitle: "Slick Time 教師專業資源",
    heroSubtitle: "專為教育工作者打造的旗艦級 CLIL 與 STEM 數位教材，大幅節省備課時間，打造高專注力課堂。",
    
    item1Title: "「Slick Script」課堂指令與過渡工具包",
    item1Desc: "一系列隨插即用的趣味課堂管理腳本。運用「蝸牛慢步」集合法與角色引導，讓您不需拉高嗓門就能輕鬆穩定高能量的雙語班級。",
    
    item2Title: "CLIL 完整教案與分級學習單",
    item2Desc: "45 分鐘結構化教案，將基礎拼音與 Sandy & Tansy 的 STEM 內容完美結合。包含針對混齡班級設計的 A/B 分級實作學習單。",
    
    item3Title: "「Studio Pass」客製化動畫專線",
    item3Desc: "專屬 B2B 授權。提交您覺得難教的科學主題，我們的動畫團隊將為您的班級量身打造 60 秒的專屬動畫引言！",
    
    item4Title: "「大建築師」創意素材庫",
    item4Desc: "解鎖頂級簡報範本、高畫質角色圖檔 (包含賽車蝸牛與精靈)、透明背景元素與原創音效，讓您自由打造沉浸式教材。",
    
    ctaButton: "取得專業授權",
    ctaInquiry: "聯繫我們獲取全校授權方案",
  }
};

export default function TPT({ language = 'en' }) {
  const t = translations[language] || translations['en'];

  return (
    <div className="font-sans bg-slate-50 min-h-screen pb-20">
      
      {/* Educator Hero Section */}
      <section className="bg-slate-900 pt-20 pb-24 px-4 text-center border-b-8 border-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 bg-brand-blue/20 text-blue-300 font-bold text-sm rounded-full tracking-wider mb-6 uppercase">
            {language === 'zh' ? '💼 B2B 數位教材商店' : '💼 B2B Digital Storefront'}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* TPT Product Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Adjusted to grid-cols-2 for a perfectly balanced 2x2 square with 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-yellow-100 text-2xl flex items-center justify-center rounded-xl mb-6">📢</div>
            <h3 className="text-xl font-black font-display text-slate-800 mb-3">{t.item1Title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">{t.item1Desc}</p>
            <button className="w-full py-3 bg-slate-100 hover:bg-brand-blue hover:text-white text-brand-blue font-bold rounded-xl transition-colors">
              {t.ctaButton}
            </button>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-emerald-100 text-2xl flex items-center justify-center rounded-xl mb-6">📝</div>
            <h3 className="text-xl font-black font-display text-slate-800 mb-3">{t.item2Title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">{t.item2Desc}</p>
            <button className="w-full py-3 bg-slate-100 hover:bg-brand-blue hover:text-white text-brand-blue font-bold rounded-xl transition-colors">
              {t.ctaButton}
            </button>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-brand-orange flex flex-col hover:-translate-y-1 transition-transform relative">
            <div className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] uppercase font-black px-3 py-1 rounded-bl-lg">Premium</div>
            <div className="w-12 h-12 bg-orange-100 text-2xl flex items-center justify-center rounded-xl mb-6">🎬</div>
            <h3 className="text-xl font-black font-display text-slate-800 mb-3">{t.item3Title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">{t.item3Desc}</p>
            <button className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl transition-colors">
              {t.ctaInquiry}
            </button>
          </div>

          {/* Product 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-pink-100 text-2xl flex items-center justify-center rounded-xl mb-6">🎨</div>
            <h3 className="text-xl font-black font-display text-slate-800 mb-3">{t.item4Title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">{t.item4Desc}</p>
            <button className="w-full py-3 bg-slate-100 hover:bg-brand-blue hover:text-white text-brand-blue font-bold rounded-xl transition-colors">
              {t.ctaButton}
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}