import React from 'react';

const translations = {
  en: {
    pricingTitle: "The \"Sandwich\" Menu",
    pricingSubtitle: "Nutritious and delicious subscription tiers for your child's brain",
    pricingTagline: "Slick Time is structured as a Sandwich. From simple phonics to all-you-can-learn mastery!",
    scarcityBanner: "Founding Member Launch: Special discounted rates are strictly limited to the first 50 subscribers!",
    standardRate: "Standard:",
    foundingBadge: "Founding Member Rate",
    
    tier1Title: "The \"Hung Rui Chen\" Special",
    tier1Subtitle: "Entry-Level, Crust-Free Basic",
    tier1Price: "Free",
    tier1Desc: "Simple, smooth, and perfect for beginners to swallow the \"Magic Code.\"",
    tier1Feature1: "Public Library: All Standard Sandy & Tansy Episodes",
    tier1Feature2: "Blue & Yellow's Level 1 Phonics",
    tier1Feature3: "Full Access: Interactive English Name Engine",
    tier1Button: "Access Free Tiers",
    
    tier2Title: "The \"Club Sandwich\" Deluxe",
    tier2Subtitle: "The Hearty Middle Tier",
    tier2Standard: "NT$800 / mo",
    tier2Price: "NT$680 / mo",
    tier2Annual: "or NT$6,500 / year",
    tier2Desc: "The hearty breakfast choice. Adds the \"protein\" of hands-on learning.",
    tier2Feature1: "All Sandy & Tansy episodes + STEM Activity Games & Worksheets",
    tier2Feature2: "Bilingual Home-Coaching Guides for Parents",
    tier2Feature3: "Gamified Digital \"Stamp Books\" & Collectible Character Stickers",
    tier2Button: "Subscribe to Core",
    
    tier3Title: "The \"Grand Submarine\" Feast",
    tier3Subtitle: "Premium, All-Inclusive",
    tier3Standard: "NT$4,000 / mo",
    tier3Price: "NT$3,200 / mo",
    tier3Annual: "or NT$32,000 / year",
    tier3Desc: "The everything-on-it feast. Nutrient-dense learning for bilingual literacy and logic.",
    tier3Feature1: "All Access + Blue & Yellow's Advanced Phonics & Reading",
    tier3Feature2: "Sandy & Tansy's Content Scaffolding (Prep & Deep-Dive Lessons)",
    tier3Feature3: "Parent Dashboard & 1-on-1 \"Pocket Sorcerer\" Video Feedback",
    tier3Button: "Join the Grand Feast",

    // ARCHITECTURAL UPGRADE: New Transparency Strings
    noticeTitle: "Early Adopter Transparency Notice",
    noticeGating: "Bonus Grace Period: As we roll out our new platform this week, all upgraded Founding Members will temporarily enjoy unrestricted access to ALL premium content tiers. Tier-specific content locks will activate following our system update later this week. Enjoy the extra magic!",
    noticeRoadmap: "In Production: Premium features including \"Blue & Yellow's Level 1 Phonics\" and the \"Bilingual Home-Coaching Guides\" are currently in the animation and curriculum ovens! Please check our Release Schedule page for their exact launch dates."
  },
  zh: {
    pricingTitle: "「三明治」主題訂閱菜單",
    pricingSubtitle: "為孩子的腦袋提供最豐富、最有營養的學習套餐",
    pricingTagline: "Slick Time 的課程就像三明治一樣層次分明。從去邊的基礎拼音，到豐富飽滿的特製總匯，滿足您所有的學習胃口！",
    scarcityBanner: "「創始會員首發」限量 50 名額享有專屬折扣優惠！",
    standardRate: "原價：",
    foundingBadge: "創始會員優惠",
    
    tier1Title: "「洪瑞珍」特製餐",
    tier1Subtitle: "去邊原味體驗 (高親和力)",
    tier1Price: "免費體驗",
    tier1Desc: "簡單、流暢、原汁原味，最適合初學者輕鬆消化「魔法程式」。",
    tier1Feature1: "公用圖書館：所有標準的 Sandy & Tansy 故事影音",
    tier1Feature2: "小藍與小黃蝸牛的 Level 1 基礎拼音",
    tier1Feature3: "完全解鎖：英文命名引擎 (Name Engine)",
    tier1Button: "免費開啟學習",
    
    tier2Title: "「總匯三明治」豪華餐",
    tier2Subtitle: "核心雙語課程方案 (分量十足)",
    tier2Standard: "NT$800 / 月",
    tier2Price: "NT$680 / 月",
    tier2Annual: "或 年繳 NT$6,500",
    tier2Desc: "最受台灣中產家長喜愛的豐盛選擇！加上動手實作的「學習蛋白質」，效果加倍。",
    tier2Feature1: "所有 Sandy & Tansy 影音 + STEM 實作遊戲與學習單",
    tier2Feature2: "專為家長設計的雙語居家輔導指南",
    tier2Feature3: "遊戲化「數位集章本」與角色貼紙獎勵",
    tier2Button: "訂閱核心方案",
    
    tier3Title: "「豪華潛艇堡」全能餐",
    tier3Subtitle: "旗艦頂級方案 (滿滿餡料)",
    tier3Standard: "NT$4,000 / 月",
    tier3Price: "NT$3,200 / 月",
    tier3Annual: "或 年繳 NT$32,000",
    tier3Desc: "極致雙語與邏輯精通盛宴！提供高度客製化的互動內容與頂級教學輔導。",
    tier3Feature1: "全面解鎖 + 小藍與小黃蝸牛的進階拼音與閱讀",
    tier3Feature2: "Sandy & Tansy 的內容鷹架 (預習與深度探索課程)",
    tier3Feature3: "家長進度儀表板 & 一對一專屬影片回饋",
    tier3Button: "加入潛艇堡盛宴",

    // ARCHITECTURAL UPGRADE: New Transparency Strings
    noticeTitle: "創始會員升級須知與平台透明度",
    noticeGating: "額外升級體驗期： 在本週平台全新上線期間，所有升級的創始會員將暫時享有「無限制存取」所有層級內容的特權！各層級的內容存取限制將於本週稍後的系統更新中正式啟用。請盡情享受這段額外的魔法體驗！",
    noticeRoadmap: "內容製作進度： 諸如「小藍與小黃蝸牛的 Level 1 基礎拼音」與「雙語居家輔導指南」等進階功能，目前正在動畫與教材工作室火熱趕工中！詳細的上線日期請隨時關注我們的「發布時程」頁面。"
  }
};

// ARCHITECTURAL UPGRADE: Added onSelectTier prop to bubble up the user's choice
export default function Pricing({ language = 'en', onSelectTier }) {
  const t = translations[language] || translations['en'];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-accent bg-brand-pink/10 text-brand-pink mb-3 uppercase tracking-wider">
            🥪 Localized Pricing Menu
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-brand-blue mb-4">
            {t.pricingTitle}
          </h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
            {t.pricingSubtitle}
          </p>
          <p className="text-xs font-bold text-brand-pink uppercase tracking-widest mt-2">
            {t.pricingTagline}
          </p>
          <div className="w-16 h-1 bg-brand-pink mx-auto mt-4 rounded"></div>
        </div>

        {/* Global Scarcity Banner */}
        <div className="w-full max-w-4xl mx-auto mb-10 bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm animate-fade-in-up">
          <span className="text-2xl animate-pulse">🔥</span>
          <p className="text-slate-800 font-bold text-sm md:text-base">
            {t.scarcityBanner}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          
          {/* Tier 1 */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
            <div>
              <img src="/hung-rui-chen.webp" alt="Hung Rui Chen Tier" className="w-12 h-12 mb-4 object-contain" />
              <h3 className="text-xl font-black font-display text-slate-800">{t.tier1Title}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">{t.tier1Subtitle}</p>
              <div className="text-3xl font-black text-brand-blue mb-4">{t.tier1Price}</div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 border-t border-slate-200/60 pt-4">{t.tier1Desc}</p>
              
              <ul className="space-y-3 mb-8 text-slate-600 text-sm">
                <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span><span>{t.tier1Feature1}</span></li>
                <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span><span>{t.tier1Feature2}</span></li>
                <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span><span>{t.tier1Feature3}</span></li>
              </ul>
            </div>
            {/* ARCHITECTURAL UPGRADE: Button now fires the onSelectTier event */}
            <button 
              onClick={() => onSelectTier?.('hung-rui-chen')}
              className="w-full py-3 bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold rounded-xl transition-all"
            >
              {t.tier1Button}
            </button>
          </div>

          {/* Tier 2 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-brand-blue flex flex-col justify-between shadow-lg relative overflow-hidden transform lg:-translate-y-4">
            <div className="absolute top-0 right-0 bg-brand-blue text-white text-[9px] uppercase tracking-widest font-black px-4 py-1.5 rounded-bl-xl font-accent">
              Best Seller
            </div>
            <div>
              <img src="/club-sandwich.webp" alt="Club Sandwich Tier" className="w-12 h-12 mb-4 object-contain" />
              <h3 className="text-xl font-black font-display text-slate-800">{t.tier2Title}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">{t.tier2Subtitle}</p>
              
              <div className="mb-4">
                <span className="text-sm text-slate-400 line-through font-medium">{t.standardRate} {t.tier2Standard}</span>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-brand-blue">{t.tier2Price}</span>
                  <span className="inline-block mt-2 text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded max-w-fit tracking-wider uppercase">
                    {t.foundingBadge}
                  </span>
                </div>
                <span className="text-xs text-slate-400 block font-bold mt-2">{t.tier2Annual}</span>
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6 border-t border-slate-200 pt-4">{t.tier2Desc}</p>
              
              <ul className="space-y-3 mb-8 text-slate-600 text-sm">
                <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span><span>{t.tier2Feature1}</span></li>
                <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span><span>{t.tier2Feature2}</span></li>
                <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span><span>{t.tier2Feature3}</span></li>
              </ul>
            </div>
            {/* ARCHITECTURAL UPGRADE: Button now fires the onSelectTier event */}
            <button 
              onClick={() => onSelectTier?.('club-sandwich')}
              className="w-full py-3 bg-brand-blue hover:bg-blue-600 text-white font-extrabold rounded-xl transition-all shadow-md shadow-brand-blue/20"
            >
              {t.tier2Button}
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 bg-brand-pink text-white text-[9px] uppercase tracking-widest font-black px-4 py-1.5 rounded-bl-xl font-accent">
              Elite Tier
            </div>
            <div>
              <img src="/grand-sub.webp" alt="Grand Submarine Tier" className="w-12 h-12 mb-4 object-contain drop-shadow-md" />
              <h3 className="text-xl font-black font-display text-white">{t.tier3Title}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">{t.tier3Subtitle}</p>
              
              <div className="mb-4">
                <span className="text-sm text-slate-500 line-through font-medium">{t.standardRate} {t.tier3Standard}</span>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-brand-pink">{t.tier3Price}</span>
                  <span className="inline-block mt-2 text-[10px] font-bold bg-pink-900/50 text-brand-pink border border-brand-pink/30 px-2 py-1 rounded max-w-fit tracking-wider uppercase">
                    {t.foundingBadge}
                  </span>
                </div>
                <span className="text-xs text-slate-400 block font-bold mt-2">{t.tier3Annual}</span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 border-t border-slate-800 pt-4">{t.tier3Desc}</p>
              
              <ul className="space-y-3 mb-8 text-slate-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-brand-pink font-bold">✓</span><span>{t.tier3Feature1}</span></li>
                <li className="flex items-start gap-2"><span className="text-brand-pink font-bold">✓</span><span>{t.tier3Feature2}</span></li>
                <li className="flex items-start gap-2"><span className="text-brand-pink font-bold">✓</span><span>{t.tier3Feature3}</span></li>
              </ul>
            </div>
            {/* ARCHITECTURAL UPGRADE: Button now fires the onSelectTier event */}
            <button 
              onClick={() => onSelectTier?.('grand-submarine')}
              className="w-full py-3 bg-brand-pink hover:bg-pink-600 text-white font-extrabold rounded-xl transition-all shadow-md shadow-brand-pink/20"
            >
              {t.tier3Button}
            </button>
          </div>

        </div>

        {/* ARCHITECTURAL UPGRADE: Transparency & Roadmap Notice */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            {t.noticeTitle}
          </h4>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              <span className="font-bold text-slate-800 mr-2">🎁</span> 
              {t.noticeGating}
            </p>
            <p>
              <span className="font-bold text-slate-800 mr-2">🚀</span> 
              {t.noticeRoadmap}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}