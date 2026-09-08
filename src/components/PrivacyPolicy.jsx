import React from 'react';

export default function PrivacyPolicy({ language, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-2 border-slate-200 relative">
        
        {/* Sticky Close Button */}
        <div className="sticky top-0 right-0 flex justify-end pb-2 bg-white z-10">
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 text-sm text-slate-700">
          {language === 'zh' ? (
            <>
              <h2 className="text-2xl font-black text-slate-900 mb-4 font-display">Slick Time 隱私權政策</h2>
              <p><strong>生效日期：</strong> 2026年9月4日</p>
              
              <h3 className="text-lg font-bold text-brand-blue">1. 我們收集的資料</h3>
              <p>我們收集您的姓名、電子郵件地址，以及學生的學習階段、自訂暱稱與頭像（例如 Sandy Witch 或 Gobble）。此外，我們會追蹤學生在動畫與教材中的學習進度，以提供個人化的教育體驗。</p>
              
              <h3 className="text-lg font-bold text-brand-blue">2. 資料使用目的</h3>
              <p>上述資料僅用於提供並優化 Slick Time 的數位教育服務、管理您的家庭帳號，以及寄送與課程或帳號相關的重要通知。我們遵守台灣《個人資料保護法》(PDPA) 的規範。</p>
              
              <h3 className="text-lg font-bold text-brand-blue">3. 資料安全與儲存</h3>
              <p>您的資料安全地儲存於受高等級加密保護的 Google Firebase 伺服器中。我們實施嚴格的角色存取控制 (RBAC)，確保只有授權的家長帳號能夠存取其子女的學習資料。</p>

              <h3 className="text-lg font-bold text-brand-blue">4. 兒童隱私保護</h3>
              <p>Slick Time 是一套教育平台，我們絕不將學生的個人識別資訊 (PII) 販售給第三方，亦不在此平台展示第三方廣告。</p>

              <h3 className="text-lg font-bold text-brand-blue">5. 家長權利與聯絡方式</h3>
              <p>家長隨時有權查閱、修改或要求刪除其帳號及相關學生資料。如有任何隱私相關問題，請透過官方聯絡管道與我們聯繫。</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-black text-slate-900 mb-4 font-display">Slick Time Privacy Policy</h2>
              <p><strong>Effective Date:</strong> September 4, 2026</p>
              
              <h3 className="text-lg font-bold text-brand-blue">1. Information We Collect</h3>
              <p>We collect the parent's name and email address, along with the student's learning level, chosen screen name, and avatar (e.g., Sandy Witch or Gobble). We also track student progress across animations and curriculum modules to personalize the educational experience.</p>
              
              <h3 className="text-lg font-bold text-brand-blue">2. How We Use Your Data</h3>
              <p>This data is used exclusively to provide and improve Slick Time's digital educational services, manage your family account, and communicate essential updates. We operate in strict compliance with Taiwan's Personal Data Protection Act (PDPA).</p>
              
              <h3 className="text-lg font-bold text-brand-blue">3. Data Security & Storage</h3>
              <p>Your data is securely stored on Google Firebase servers utilizing industry-standard encryption. We enforce strict Role-Based Access Control (RBAC) to ensure that only authorized parent accounts can access their child's learning data.</p>

              <h3 className="text-lg font-bold text-brand-blue">4. Children's Privacy</h3>
              <p>Slick Time is an educational platform. We do not sell personally identifiable information (PII) of our students to third parties, nor do we run third-party advertising on the platform.</p>

              <h3 className="text-lg font-bold text-brand-blue">5. Parental Rights & Contact</h3>
              <p>Parents retain the right to review, update, or request the deletion of their account and associated student data at any time. For privacy inquiries, please contact us via our official support channels.</p>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
            >
              {language === 'zh' ? '關閉並返回註冊' : 'Close and Return'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}