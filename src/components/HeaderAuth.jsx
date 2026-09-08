import React, { useState } from 'react';
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// ARCHITECTURAL UPGRADE: Added currentView to props
export default function HeaderAuth({ language, user, onLogout, setCurrentView, currentView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Google OAuth Handler ---
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if the user has completed the Slick Time onboarding (Family PIN, Student Data)
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        // They authenticated with Google, but haven't created a family account yet.
        // Route them to the registration form to finish setup.
        setCurrentView('register');
      }
      // If the document DOES exist, App.jsx's Auth Listener will automatically 
      // pick them up and route them to the ProfileSelector Gatekeeper.
      
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Standard Email/Password Handler ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      // Routing is handled globally in App.jsx
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Authenticated State UI
  if (user) {
    return (
      <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-sm">
        <span className="text-brand-yellow font-bold truncate max-w-[150px]">{user.email}</span>
        <button
          onClick={onLogout}
          className="px-3 py-1 bg-brand-red text-white font-bold rounded-lg hover:bg-red-600 transition-colors text-xs"
        >
          {language === 'zh' ? '登出' : 'Logout'}
        </button>
      </div>
    );
  }

  // 2. Logged-Out State UI
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 relative">
      
      {/* ARCHITECTURAL UPGRADE: Conditionally hide the native form to prevent DOM validation collisions */}
      {currentView !== 'register' && (
        <form onSubmit={handleLogin} className="flex items-center gap-2 animate-fade-in">
          <input
            type="email"
            required
            placeholder={language === 'zh' ? '電子郵件 (Email)' : 'Email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-32 md:w-36 px-3 py-1.5 text-xs bg-white text-slate-900 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none border border-slate-300"
          />
          <input
            type="password"
            required
            placeholder={language === 'zh' ? '密碼 (Password)' : 'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-32 md:w-36 px-3 py-1.5 text-xs bg-white text-slate-900 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none border border-slate-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-1.5 bg-brand-orange hover:bg-orange-600 text-white text-xs font-extrabold rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            {loading ? '...' : (language === 'zh' ? '登入' : 'Login')}
          </button>
        </form>
      )}

      {/* Third-Party OAuth & Registration */}
      {/* ARCHITECTURAL UPGRADE: Dynamically removed the left border if the login form is hidden */}
      <div className={`flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-start ${currentView !== 'register' ? 'sm:border-l border-slate-600 sm:pl-2' : ''}`}>
        <button 
          type="button"
          onClick={handleGoogleLogin} 
          disabled={loading}
          className="flex items-center justify-center gap-2 px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-sm w-full sm:w-auto"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
          {language === 'zh' ? 'Google 登入' : 'Google'}
        </button>

        {/* Hide this redundant sign-up link if they are already on the register page */}
        {currentView !== 'register' && (
          <button
            type="button"
            onClick={() => setCurrentView('register')}
            className="text-[11px] text-slate-400 hover:text-brand-yellow underline transition-colors whitespace-nowrap sm:hidden"
          >
            {language === 'zh' ? '建立新帳號' : 'Sign up'}
          </button>
        )}
      </div>

      {error && (
        <div className="absolute top-full mt-1 left-0 bg-red-600 text-white text-[10px] p-1.5 rounded shadow-md z-50">
          {error}
        </div>
      )}
    </div>
  );
}