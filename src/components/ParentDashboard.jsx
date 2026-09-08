import React, { useState } from 'react';
import UpgradeModal from './UpgradeModal';
import AdminQueue from './AdminQueue'; 

export default function ParentDashboard({ language, user, parentData, onExit }) {
  const [activeTab, setActiveTab] = useState('settings');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAnnual, setIsAnnual] = useState(false);
  // ARCHITECTURAL UPGRADE: Added state to track which tier the user is upgrading to
  const [upgradeTarget, setUpgradeTarget] = useState(null);
  
  const isAdmin = user?.uid === import.meta.env.VITE_ADMIN_UID;

  // ARCHITECTURAL UPGRADE 1: Edge Normalization
  // Safely cast legacy 'free' to the new 'hung-rui-chen' key on the fly.
  const rawTier = parentData?.subscriptionTier || 'hung-rui-chen';
  const normalizedTier = rawTier === 'free' ? 'hung-rui-chen' : rawTier;

  // Map the raw keys to human-readable UI badges
  const tierBadges = {
    'hung-rui-chen': language === 'zh' ? '「洪瑞珍」特製餐 (基本權限)' : 'Hung Rui Chen (Basic)',
    'club-sandwich': language === 'zh' ? '「總匯三明治」豪華餐 (核心權限)' : 'Club Sandwich (Core)',
    'grand-submarine': language === 'zh' ? '「豪華潛艇堡」全能餐 (旗艦權限)' : 'Grand Submarine (Elite)'
  };

  const noticeContent = {
    en: {
      title: "Early Adopter Transparency Notice",
      gating: "Bonus Grace Period: As we roll out our new platform this week, all upgraded Founding Members will temporarily enjoy unrestricted access to ALL premium content tiers. Tier-specific content locks will activate following our system update later this week. Enjoy the extra magic!",
      roadmap: "In Production: Premium features including \"Blue & Yellow's Level 1 Phonics\" and the \"Bilingual Home-Coaching Guides\" are currently in the animation and curriculum ovens! Please check our Release Schedule page for their exact launch dates."
    },
    zh: {
      title: "創始會員升級須知與平台透明度",
      gating: "額外升級體驗期： 在本週平台全新上線期間，所有升級的創始會員將暫時享有「無限制存取」所有層級內容的特權！各層級的內容存取限制將於本週稍後的系統更新中正式啟用。請盡情享受這段額外的魔法體驗！",
      roadmap: "內容製作進度： 諸如「小藍與小黃蝸牛的 Level 1 基礎拼音」與「雙語居家輔導指南」等進階功能，目前正在動畫與教材工作室火熱趕工中！詳細的上線日期請隨時關注我們的「發布時程」頁面。"
    }
  };
  const t = noticeContent[language] || noticeContent['en'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans relative">
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-display">
            {language === 'zh' ? '家長控制台' : 'Parent Dashboard'}
          </h2>
          <p className="text-slate-500 font-medium">
            {language === 'zh' ? `歡迎回來，${parentData?.parentName}` : `Welcome back, ${parentData?.parentName}`}
          </p>
        </div>
        
        <button 
          onClick={onExit}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors text-sm shadow-sm"
        >
          {language === 'zh' ? '離開控制台' : 'Exit Dashboard'}
        </button>
      </div>

      <div className="flex gap-2 border-b-2 border-slate-200 mb-8 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-6 py-2 font-bold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'students' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {language === 'zh' ? '學生管理' : 'Student Management'}
        </button>
        
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-2 font-bold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'settings' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {language === 'zh' ? '帳號設定' : 'Account Settings'}
        </button>

        {isAdmin && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-2 font-black rounded-t-lg transition-colors whitespace-nowrap ml-auto ${
              activeTab === 'admin' ? 'bg-brand-orange text-white' : 'bg-orange-100 text-brand-orange hover:bg-orange-200'
            }`}
          >
            {language === 'zh' ? '系統管理 (Admin)' : 'Admin Queue'}
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
        
        {activeTab === 'students' && (
          <div className="text-center text-slate-500 py-20 font-medium">
            [Student Management Component Will Render Here]
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="w-full bg-white rounded-2xl animate-fade-in-up">
            
            {/* ARCHITECTURAL UPGRADE 2: Active State Visibility */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {language === 'zh' ? '目前訂閱方案' : 'Current Subscription'}
                </p>
                <p className="text-lg font-black text-slate-800">
                  {tierBadges[normalizedTier]}
                </p>
              </div>
              <div className="text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                UID: <span className="font-mono text-slate-400 ml-1">{user?.uid}</span>
              </div>
            </div>

            {/* ARCHITECTURAL UPGRADE 3: Contextual UI Gating */}
            {normalizedTier !== 'grand-submarine' ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {language === 'zh' ? '升級創始會員方案' : 'Upgrade Your Founding Member Plan'}
                  </h3>
                  <p className="text-brand-orange font-bold text-sm bg-orange-50 inline-block px-3 py-1 rounded-full border border-orange-200">
                    {language === 'zh' ? '🔥 限量前 50 名訂閱者' : '🔥 Limited to the first 50 subscribers'}
                  </p>
                </div>

                <div className="flex justify-center items-center gap-4 mb-10">
                  <span className={`font-bold ${!isAnnual ? 'text-brand-blue' : 'text-slate-400'}`}>
                    {language === 'zh' ? '月繳' : 'Monthly'}
                  </span>
                  <button 
                    onClick={() => setIsAnnual(!isAnnual)}
                    className="w-16 h-8 rounded-full bg-slate-200 relative flex items-center px-1 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <div className={`w-6 h-6 rounded-full bg-brand-blue shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`} />
                  </button>
                  <span className={`font-bold ${isAnnual ? 'text-brand-blue' : 'text-slate-400'}`}>
                    {language === 'zh' ? '年繳' : 'Annually'} 
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                  
                  {/* Gate: Hide Club Sandwich if they already have it */}
                  {normalizedTier === 'hung-rui-chen' && (
                    <div className="border-2 border-brand-blue rounded-2xl p-6 relative flex flex-col hover:shadow-lg transition-shadow">
                      <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
                        {language === 'zh' ? '核心方案' : 'Core Plan'}
                      </div>
                      <h4 className="text-xl font-black text-slate-800 mb-1">
                        {language === 'zh' ? '「總匯三明治」豪華餐' : 'Club Sandwich Deluxe'}
                      </h4>
                      <p className="text-sm text-slate-500 mb-4">
                        {language === 'zh' ? '核心雙語課程' : 'Core Bilingual Curriculum'}
                      </p>
                      <div className="text-3xl font-black text-brand-blue mb-6">
                        {isAnnual ? 'NT$6,500' : 'NT$680'} <span className="text-sm text-slate-500 font-medium">/ {isAnnual ? (language === 'zh' ? '年' : 'year') : (language === 'zh' ? '月' : 'month')}</span>
                      </div>
                      <button 
                        onClick={() => { setUpgradeTarget('club-sandwich'); setIsModalOpen(true); }} 
                        className="mt-auto w-full py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-brand-blue/30"
                      >
                        {language === 'zh' ? '升級此方案' : 'Select Plan'}
                      </button>
                    </div>
                  )}

                  <div className={`border-2 border-slate-900 bg-slate-900 rounded-2xl p-6 relative flex flex-col hover:shadow-lg transition-shadow ${normalizedTier === 'club-sandwich' ? 'md:col-span-2 max-w-lg mx-auto w-full' : ''}`}>
                    <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
                      {language === 'zh' ? '旗艦方案' : 'Elite Tier'}
                    </div>
                    <h4 className="text-xl font-black text-white mb-1">
                      {language === 'zh' ? '「豪華潛艇堡」全能餐' : 'Grand Submarine Feast'}
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      {language === 'zh' ? '全面解鎖 + 頂級輔導' : 'Full Access + Tutoring'}
                    </p>
                    <div className="text-3xl font-black text-brand-orange mb-6">
                      {isAnnual ? 'NT$32,000' : 'NT$3,200'} <span className="text-sm text-slate-400 font-medium">/ {isAnnual ? (language === 'zh' ? '年' : 'year') : (language === 'zh' ? '月' : 'month')}</span>
                    </div>
                    <button 
                      onClick={() => { setUpgradeTarget('grand-submarine'); setIsModalOpen(true); }} 
                      className="mt-auto w-full py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-brand-orange/30"
                    >
                      {language === 'zh' ? '升級此方案' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-center border-t-4 border-brand-orange shadow-lg">
                <span className="text-4xl mb-4 block">👑</span>
                <h3 className="text-2xl font-black text-white mb-2">
                  {language === 'zh' ? '您已擁有最高權限！' : 'Maximum Access Granted!'}
                </h3>
                <p className="text-slate-300">
                  {language === 'zh' ? '感謝您作為創始會員的支持。您的帳號已解鎖 Slick Time 的所有精華內容與專屬輔導。' : 'Thank you for your support as a Founding Member. Your account is fully unlocked with all premium content and exclusive tutoring.'}
                </p>
              </div>
            )}

            <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                {t.title}
              </h4>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  <span className="font-bold text-slate-800 mr-2">🎁</span> 
                  {t.gating}
                </p>
                <p>
                  <span className="font-bold text-slate-800 mr-2">🚀</span> 
                  {t.roadmap}
                </p>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'admin' && isAdmin && (
          <AdminQueue language={language} />
        )}
      </div>

      {/* ARCHITECTURAL UPGRADE: Passed targetTier into the modal */}
      <UpgradeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user} 
        language={language} 
        targetTier={upgradeTarget}
      />
      
    </div>
  );
}