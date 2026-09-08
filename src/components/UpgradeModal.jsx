import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// ARCHITECTURAL UPGRADE 1: Injected 'targetTier' prop to catch the user's specific selection
export default function UpgradeModal({ isOpen, onClose, user, language, targetTier }) {
  const [bankDigits, setBankDigits] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ARCHITECTURAL UPGRADE 2: Strictly enforced 4-digit standard
    if (bankDigits.length !== 4) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const userRef = doc(db, 'users', user.uid);
      
      // ARCHITECTURAL UPGRADE 3: Decoupled Access (requestedTier) from Billing (cohort)
      await updateDoc(userRef, {
        upgradeRequest: {
          requestedTier: targetTier, // e.g., 'club-sandwich' or 'grand-submarine'
          cohort: 'founding-member', // Locks in the billing price independently
          bankDigits: bankDigits,
          status: 'pending',
          submittedAt: serverTimestamp()
        }
      });

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
        setBankDigits('');
      }, 3000);
    } catch (error) {
      console.error("Mutation Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-brand-blue p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
          <h3 className="text-2xl font-display font-black tracking-wide">
            {language === 'zh' ? '創始會員升級' : 'Founding Member Upgrade'}
          </h3>
          <p className="text-blue-100 text-sm mt-2 font-medium">
            {language === 'zh' ? '限量 50 名額' : 'Limited to 50 slots'}
          </p>
        </div>

        <div className="p-6 md:p-8 text-slate-700 text-sm md:text-base">
          {submitStatus === 'success' ? (
            <div className="text-center py-8 text-brand-green">
              <svg className="w-16 h-16 mx-auto mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-black text-xl">
                {language === 'zh' ? '申請已送出！' : 'Application Submitted!'}
              </p>
              <p className="mt-2 text-slate-500 font-medium">
                {language === 'zh' ? '管理員將在核對匯款後開通您的權限。' : 'System admin will activate your account upon verification.'}
              </p>
            </div>
          ) : (
            <>
              <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 mb-6 text-center shadow-sm">
                <p className="font-bold text-slate-800 mb-2">
                  {language === 'zh' ? '匯款資訊' : 'Transfer Information'}
                </p>
                <p className="mb-1 text-slate-600 font-bold">Bank Code: <span className="font-mono font-black text-brand-orange text-xl ml-1">812</span></p>
                <p className="text-slate-600 font-bold">Account: <span className="font-mono font-black text-brand-orange text-xl tracking-wider ml-1">20931000197683</span></p>
                
                <p className="mt-4 text-sm text-brand-blue font-medium bg-blue-50 py-2 px-3 rounded-lg border border-blue-100">
                  {language === 'zh' 
                    ? '在確認收到您的匯款後，我們將立即為您開通權限，感謝您的支持！' 
                    : 'Your subscription will be activated as soon as we verify your deposit. Thank you for your support!'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 text-center">
                    {/* ARCHITECTURAL UPGRADE: UI strings updated to request 4 digits */}
                    {language === 'zh' ? '請輸入匯款帳號後四碼' : 'Enter the last 4 digits of your bank account'}
                  </label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    maxLength="4"
                    pattern="\d{4}"
                    required
                    value={bankDigits}
                    onChange={(e) => setBankDigits(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234"
                    className="w-full px-4 py-3 bg-slate-100 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-50 font-mono text-2xl tracking-[0.5em] font-black text-center text-slate-800 transition-all"
                  />
                </div>

                {submitStatus === 'error' && (
                  <p className="text-brand-red text-xs text-center font-bold">
                    {language === 'zh' ? '系統發生錯誤，請稍後再試。' : 'System error. Please try again later.'}
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={bankDigits.length !== 4 || isSubmitting}
                  className="w-full bg-brand-orange hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-xl transition-colors mt-2 shadow-sm"
                >
                  {isSubmitting 
                    ? (language === 'zh' ? '處理中...' : 'Processing...') 
                    : (language === 'zh' ? '送出審核' : 'Submit for Verification')}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}