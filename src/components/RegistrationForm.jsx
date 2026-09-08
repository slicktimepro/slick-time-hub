import { hashPin } from '../utils/crypto';
import React, { useState } from 'react';
// ARCHITECTURAL UPGRADE: Added sendEmailVerification
import { auth, db, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser'; 
import AvatarSelector from './AvatarSelector';
import PrivacyPolicy from './PrivacyPolicy';

export default function RegistrationForm({ language, onSuccess }) {
  const currentUser = auth.currentUser;
  const isOAuth = currentUser?.providerData?.some(
    (provider) => provider.providerId === 'google.com'
  );

  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    gradeLevel: 'elem_1_3',
    email: currentUser?.email || '',
    password: '',
    confirmPassword: '',
    consentGiven: false,
    avatarId: '',
    avatarSrc: '',
    parentPin: '',
    subscriptionTier: 'hung-rui-chen', 
    bankLastFour: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectAvatar = (id, src) => {
    setFormData(prev => ({ ...prev, avatarId: id, avatarSrc: src }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isOAuth && formData.password !== formData.confirmPassword) {
      setError(language === 'zh' ? '密碼不一致。' : 'Passwords do not match.');
      return;
    }
    if (!formData.avatarId) {
      setError(language === 'zh' ? '請為學生選擇一個頭像。' : 'Please select a student avatar.');
      return;
    }
    if (!formData.consentGiven) {
      setError(language === 'zh' ? '請同意隱私權政策。' : 'You must agree to the Privacy Policy.');
      return;
    }
    
    if (formData.subscriptionTier !== 'hung-rui-chen' && formData.bankLastFour.length !== 4) {
      setError(language === 'zh' ? '請輸入有效的匯款帳號後4碼。' : 'Please enter a valid 4-digit bank account ending.');
      return;
    }

    setLoading(true);
    
    try {
      let targetUser = currentUser;

      if (!isOAuth) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        targetUser = userCredential.user;
      }

      if (!targetUser) {
        throw new Error("Authentication state lost. Please try logging in again.");
      }

      // ARCHITECTURAL UPGRADE: Force token sync to bypass the Firestore race condition
      await targetUser.getIdToken(true);

      // ARCHITECTURAL UPGRADE: Native Firebase Email Verification
      if (!isOAuth) {
        await sendEmailVerification(targetUser);
      }

      const securedPinHash = await hashPin(formData.parentPin, targetUser.uid);
      const parentRef = doc(db, 'users', targetUser.uid);

      try {
        await setDoc(parentRef, {
          parentName: formData.parentName,
          email: formData.email, 
          parentPin: securedPinHash, 
          createdAt: new Date().toISOString(),
          subscriptionTier: formData.subscriptionTier,
          bankLastFour: formData.subscriptionTier !== 'hung-rui-chen' ? formData.bankLastFour : null,
          accountStatus: formData.subscriptionTier !== 'hung-rui-chen' ? 'pending_verification' : 'active'
        });
      } catch (err) {
        throw new Error("Parent DB Rejected: " + err.message);
      }

      const studentsRef = collection(db, 'users', targetUser.uid, 'students');
      try {
        await addDoc(studentsRef, {
          screenName: formData.studentName,
          gradeLevel: formData.gradeLevel,
          avatarId: formData.avatarId,
          avatarSrc: formData.avatarSrc,
          progress: {} 
        });
      } catch (err) {
        throw new Error("Student DB Rejected: " + err.message);
      }

      try {
        await emailjs.send(
          'service_visz2nl', 
          'template_v3dnbgf', 
          {
            parent_name: formData.parentName,
            student_name: formData.studentName,
            user_email: formData.email,
            tier: formData.subscriptionTier,
            bank_digits: formData.subscriptionTier !== 'hung-rui-chen' ? formData.bankLastFour : 'N/A'
          },
          'dvpGNHjW5ZIsFra3X' 
        );
      } catch (emailErr) {
        console.error("Non-blocking error: Admin alert email failed to send.", emailErr);
      }

      setSuccess(true);
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-2xl border-2 border-green-200">
        <h2 className="text-2xl font-black text-green-800 mb-4">
          {language === 'zh' ? '註冊成功！' : 'Registration Successful!'}
        </h2>
        <p className="text-green-700 mb-4 font-medium">
          {language === 'zh' ? '歡迎加入 Slick Time。您的家庭帳號已建立。' : 'Welcome to Slick Time. Your family account is ready.'}
        </p>

        {/* ARCHITECTURAL UPGRADE: Email Verification Prompt */}
        {!isOAuth && (
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl mb-4 text-left shadow-sm">
            <p className="text-sky-800 font-bold text-sm flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              {language === 'zh' ? '請驗證您的電子郵件' : 'Please Verify Your Email'}
            </p>
            <p className="text-sky-700 text-xs mt-1 leading-relaxed">
              {language === 'zh' ? '我們已發送一封驗證信至您的信箱。請點擊信中的連結以完全啟用您的帳號。' : 'We have sent a verification link to your inbox. Please click the link to fully activate your account.'}
            </p>
          </div>
        )}

        {/* ARCHITECTURAL UPGRADE: Secure Bank Transfer UI */}
        {formData.subscriptionTier !== 'hung-rui-chen' && (
          <div className="mt-4 mb-6 text-left bg-white p-5 rounded-xl border-2 border-green-300 shadow-sm">
            <h3 className="text-lg font-black text-green-900 mb-2 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              {language === 'zh' ? '匯款資訊' : 'Bank Transfer Details'}
            </h3>
            <p className="text-slate-600 mb-4 text-sm font-medium leading-relaxed">
              {language === 'zh' ? '請將訂閱款項匯至以下帳戶。完成後，系統將自動核對您提供的後4碼：' : 'Please transfer your subscription fee to the following account. We will verify using your last 4 digits: '}
              <span className="font-black text-brand-orange text-lg ml-1 tracking-widest">{formData.bankLastFour}</span>
            </p>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-sans">{language === 'zh' ? '銀行名稱 (Bank)' : 'Bank Name'}</span>
                <span className="font-bold text-slate-800">台新國際商業銀行 (Taishin Bank)</span> 
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-sans">{language === 'zh' ? '銀行代碼 (Code)' : 'Bank Code'}</span>
                <span className="font-bold text-slate-800">812</span> 
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">{language === 'zh' ? '帳號 (Account)' : 'Account Number'}</span>
                <span className="font-bold text-slate-800 tracking-wider">2093-10-0019768-3</span> 
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={onSuccess}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-sm"
        >
          {language === 'zh' ? '前往控制台' : 'Continue to Dashboard'}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-200 font-sans relative">
        <h2 className="text-3xl font-display font-black text-slate-900 mb-6 text-center">
          {language === 'zh' ? '建立家庭帳號' : 'Create Family Account'}
        </h2>
        
        <form onSubmit={handleRegister} className="space-y-6 text-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {language === 'zh' ? '家長姓名' : "Parent's Name"}
              </label>
              <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {language === 'zh' ? '學生姓名' : "Student's Name"}
              </label>
              <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {language === 'zh' ? '學習階段' : 'Learning Level'}
            </label>
            <select name="gradeLevel" value={formData.gradeLevel} onChange={handleChange}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none">
              <option value="preschool_k">{language === 'zh' ? '學前至幼稚園 (Pre-School - Kindergarten)' : 'Pre-School - Kindergarten'}</option>
              <option value="elem_1_3">{language === 'zh' ? '國小一至三年級 (Elementary: 1st - 3rd Grade)' : 'Elementary: 1st - 3rd Grade'}</option>
              <option value="elem_4_6">{language === 'zh' ? '國小四至六年級 (Elementary: 4th - 6th Grade)' : 'Elementary: 4th - 6th Grade'}</option>
              <option value="junior_high">{language === 'zh' ? '國中 (Junior High)' : 'Junior High'}</option>
            </select>
          </div>

          <div className="border-t border-b border-slate-100 py-4 my-4">
            <AvatarSelector 
              language={language} 
              selectedAvatarId={formData.avatarId} 
              onSelectAvatar={handleSelectAvatar} 
            />
          </div>

          {!isOAuth && (
            <>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'zh' ? '密碼' : 'Password'}
                  </label>
                  <input type="password" name="password" required minLength="6" value={formData.password} onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'zh' ? '確認密碼' : 'Verify Password'}
                  </label>
                  <input type="password" name="confirmPassword" required minLength="6" value={formData.confirmPassword} onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none" />
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {language === 'zh' ? '訂閱方案' : 'Subscription Tier'}
              </label>
              <select name="subscriptionTier" value={formData.subscriptionTier} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none">
                <option value="hung-rui-chen">{language === 'zh' ? '免費 (Hung Rui Chen)' : 'Free (Hung Rui Chen)'}</option>
                <option value="club-sandwich">{language === 'zh' ? '總匯三明治 (Club Sandwich)' : 'Club Sandwich'}</option>
                <option value="grand-submarine">{language === 'zh' ? '豪華潛艇堡 (Grand Submarine)' : 'Grand Submarine'}</option>
              </select>
            </div>
            
            {/* UPGRADED: Show bank input if NOT the free tier */}
            {formData.subscriptionTier !== 'hung-rui-chen' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'zh' ? '匯款帳號後4碼' : 'Bank Acct Last 4 Digits'}
                </label>
                <input 
                  type="text" 
                  name="bankLastFour" 
                  required 
                  maxLength="4" 
                  pattern="\d{4}" 
                  value={formData.bankLastFour} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData(prev => ({ ...prev, bankLastFour: val }));
                  }} 
                  placeholder="1234" 
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none tracking-widest" 
                />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="block font-bold text-slate-700 mb-1">
              {language === 'zh' ? '家長控制台 PIN 碼 (4位數字)' : 'Parent Dashboard PIN (4 Digits)'}
            </label>
            <input 
              type="text" 
              inputMode="numeric"
              pattern="\d{4}"
              maxLength="4"
              name="parentPin" 
              required 
              value={formData.parentPin} 
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setFormData(prev => ({ ...prev, parentPin: val }));
              }}
              placeholder="1234"
              className="w-full md:w-1/2 p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-brand-blue outline-none tracking-[0.5em] font-black" 
            />
            <p className="text-xs text-slate-500 mt-1">
              {language === 'zh' ? '這將用來保護家長專區，防止學生誤觸。' : 'This protects the Parent Area from accidental student access.'}
            </p>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" name="consentGiven" id="consent" checked={formData.consentGiven} onChange={handleChange}
              className="mt-1 w-4 h-4 text-brand-blue" />
            <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed">
              {language === 'zh' ? '我同意 Slick Time 的' : 'I agree to the Slick Time '}
              <button 
                type="button" 
                onClick={() => setShowPrivacyModal(true)}
                className="text-brand-blue hover:text-brand-orange underline font-bold"
              >
                {language === 'zh' ? '隱私權政策' : 'Privacy Policy'}
              </button>
              {language === 'zh' ? '，並同意處理相關註冊資料。' : ', and consent to data processing.'}
            </label>
          </div>

          {error && <div className="p-3 bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full py-4 mt-4 bg-brand-orange hover:bg-orange-600 text-white font-black text-lg rounded-xl transition-all shadow-md">
            {loading ? '...' : (language === 'zh' ? '完成註冊' : 'Complete Registration')}
          </button>
        </form>
      </div>

      {showPrivacyModal && (
        <PrivacyPolicy language={language} onClose={() => setShowPrivacyModal(false)} />
      )}
    </>
  );
}