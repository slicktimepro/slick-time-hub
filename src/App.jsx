import ParentDashboard from './components/ParentDashboard';
import StudentDashboard from './components/StudentDashboard';
import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

import NamePicker from './components/NamePicker';
import About from './components/About';
import Pricing from './components/Pricing';
import LineCommunity from './components/LineCommunity';
import TPT from './components/TPT';
import ReleaseSchedule from './components/ReleaseSchedule';
import HeaderAuth from './components/HeaderAuth';
import RegistrationForm from './components/RegistrationForm';
import ProfileSelector from './components/ProfileSelector';
import PinGate from './components/PinGate';
import QRCode from 'react-qr-code';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [language, setLanguage] = useState('zh'); 
  
  const [selectedRegistrationTier, setSelectedRegistrationTier] = useState('club-sandwich');

  const [user, setUser] = useState(null);
  const [parentData, setParentData] = useState(null);
  const [students, setStudents] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null); 
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setParentData(null);
        setStudents([]);
        setActiveProfile(null);
        setIsDataLoading(false);
        setCurrentView('home');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        
        // ARCHITECTURAL UPGRADE: Prevent race conditions during registration.
        // If the user is actively creating an account, yield UI control to the form 
        // so it doesn't unmount while writing to Firestore.
        if (currentView === 'register') {
          return;
        }

        setIsDataLoading(true);
        try {
          const parentSnap = await getDoc(doc(db, 'users', user.uid));
          
          if (parentSnap.exists()) {
            setParentData({ uid: parentSnap.id, ...parentSnap.data() });
            
            const studentsRef = collection(db, 'users', user.uid, 'students');
            const studentSnaps = await getDocs(studentsRef);
            setStudents(studentSnaps.docs.map(d => ({ id: d.id, ...d.data() })));

            if (currentView === 'home') {
              setCurrentView('profile-selector');
            }
          } else {
            setCurrentView('register');
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setIsDataLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, currentView]);

  const handleGlobalLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  const handleProfileSelection = (selection) => {
    setActiveProfile(selection); 
    if (selection.type === 'parent') {
      setCurrentView('pin-gate'); 
    } else {
      setCurrentView('student-dashboard');
    }
  };

  const renderNavLinks = () => (
    <>
      <button onClick={() => setCurrentView('home')} className={currentView === 'home' ? 'text-brand-yellow' : 'hover:text-brand-yellow transition-colors'}>
        {language === 'zh' ? '首頁' : 'Home'}
      </button>
      <button onClick={() => setCurrentView('release-schedule')} className={currentView === 'release-schedule' ? 'text-brand-red' : 'hover:text-brand-red transition-colors'}>
        {language === 'zh' ? '發布時程' : 'Release Schedule'}
      </button>
      <button onClick={() => setCurrentView('about')} className={currentView === 'about' ? 'text-brand-orange' : 'hover:text-brand-orange transition-colors'}>
        {language === 'zh' ? '關於我們' : 'About'}
      </button>
      <button onClick={() => setCurrentView('name-engine')} className={currentView === 'name-engine' ? 'text-brand-green' : 'hover:text-brand-green transition-colors'}>
        {language === 'zh' ? '英文命名引擎' : 'Name Engine'}
      </button>
      <button onClick={() => setCurrentView('tpt')} className={currentView === 'tpt' ? 'text-brand-blue font-bold' : 'hover:text-brand-blue transition-colors'}>
        {language === 'zh' ? '教育者資源' : 'For Educators'}
      </button>
      <button 
        onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
        className="px-3 py-1 border border-slate-600 rounded-full text-xs hover:bg-slate-800 transition-colors ml-2"
      >
        {language === 'zh' ? 'EN / 中文' : '中文 / EN'}
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      <div className="bg-brand-orange text-white text-center py-2.5 px-4 text-sm sm:text-base font-bold tracking-widest font-accent shadow-md relative z-[60]">
        {language === 'zh' 
          ? '🚀 歡迎來到 Slick Time！我們目前正在進行全面系統升級與版本迭代，各個功能與內容單元將採取「階段性分批上線」的方式陸續與大家見面。感謝您的耐心等候與持續支持！ ✨' 
          : '🚀 Welcome to Slick Time! We are currently rolling out a system-wide platform upgrade. To ensure peak performance, new sections and features will go live in staggered, phased updates. Thank you for your patience and ongoing support! ✨'}
      </div>

      <header className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
        {user ? (
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
            <div className="flex items-center gap-3">
              <img src="/slick-time-logo.png" alt="Slick Time Productions Logo" className="h-8 w-auto object-contain" />
              <h1 className="text-2xl font-display font-bold text-brand-yellow tracking-wider">
                Slick Time
              </h1>
            </div>
            
            <div className="flex-grow flex justify-center md:justify-start md:ml-8">
              <HeaderAuth 
                language={language} 
                user={user} 
                onLogout={handleGlobalLogout} 
                setCurrentView={setCurrentView} 
                currentView={currentView}
              />
            </div>
            
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 font-medium items-center text-sm md:text-base mt-4 md:mt-0">
              {renderNavLinks()}
            </nav>
          </div>

        ) : (

          <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4">
            
            <div className="flex flex-col xl:flex-row justify-between items-center gap-4 w-full">
              <div className="flex items-center gap-3">
                <img src="/slick-time-logo.png" alt="Slick Time Productions Logo" className="h-8 w-auto object-contain" />
                <h1 className="text-2xl font-display font-bold text-brand-yellow tracking-wider">
                  Slick Time
                </h1>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <HeaderAuth 
                  language={language} 
                  user={user} 
                  onLogout={handleGlobalLogout} 
                  setCurrentView={setCurrentView} 
                  currentView={currentView} 
                />
                
                <button 
                  onClick={() => setCurrentView('register')} 
                  className="hidden sm:block px-6 py-1.5 bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                >
                  {language === 'zh' ? '註冊帳號' : 'Sign Up'}
                </button>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 font-medium items-center text-sm md:text-base border-t border-slate-800 pt-3">
              {renderNavLinks()}
            </nav>
            
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col">
        
        {user && isDataLoading && (
          <div className="flex-grow flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand-orange"></div>
          </div>
        )}

        {!isDataLoading && currentView === 'profile-selector' && user && (
          <div className="w-full bg-slate-50 py-12 flex-grow">
            <div className="max-w-5xl mx-auto px-4">
              <ProfileSelector 
                parentData={parentData} 
                students={students} 
                onSelectProfile={handleProfileSelection} 
                language={language} 
              />
            </div>
          </div>
        )}

        {!isDataLoading && currentView === 'pin-gate' && user && parentData && (
          <div className="w-full bg-slate-50 py-12 flex-grow flex items-center">
            <PinGate 
              language={language}
              userId={user.uid}
              storedPinHash={parentData.parentPin}
              onSuccess={() => setCurrentView('parent-dashboard')}
              onCancel={() => setCurrentView('profile-selector')}
            />
          </div>
        )}

        {!isDataLoading && currentView === 'student-dashboard' && activeProfile && (
          <div className="w-full flex-grow">
            <StudentDashboard 
              activeProfile={activeProfile.data} 
              language={language} 
              onExit={() => setCurrentView('profile-selector')} 
            />
          </div>
        )}
        
        {!isDataLoading && currentView === 'parent-dashboard' && activeProfile && (
          <div className="w-full bg-slate-50 flex-grow">
            <ParentDashboard 
              language={language}
              user={user}
              parentData={parentData}
              onExit={() => setCurrentView('profile-selector')}
            />
          </div>
        )}

        {!isDataLoading && currentView === 'home' && (
          <div className="w-full">
            <div className="text-center py-20 lg:py-28 bg-slate-900 text-white border-b-8 border-brand-red relative overflow-hidden">
              <div className="max-w-4xl mx-auto px-4 relative z-10">
                <span className="inline-block px-4 py-1.5 bg-brand-yellow/20 text-brand-yellow font-bold text-sm rounded-full tracking-wide mb-6 uppercase">
                  Bilingual Education Studio
                </span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight">
                  {language === 'zh' ? '運算魔法與' : 'Bilingual Education Meets '}
                  <span className="text-brand-yellow block md:inline">
                    {language === 'zh' ? '雙語教育的結合' : 'Computational Magic'}
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                  {language === 'zh' ? '歡迎來到專為台灣 ESL 學習者、教師與家長打造的創意中心。' : 'Welcome to the creative hub for Taiwanese ESL learners, teachers, and parents.'}
                </p>
                <button 
                  onClick={() => setCurrentView('name-engine')}
                  className="px-8 py-4 bg-brand-orange text-white text-lg font-bold rounded-full shadow-lg hover:bg-[#d95b1a] transition-transform hover:-translate-y-1"
                >
                  {language === 'zh' ? '體驗英文命名引擎' : 'Try the Name Engine'}
                </button>
              </div>
            </div>
            
            <Pricing 
              language={language} 
              onSelectTier={(tierId) => {
                setSelectedRegistrationTier(tierId);
                setCurrentView('register');
              }}
            />
            
            <LineCommunity language={language} />
          </div>
        )}

        {!isDataLoading && currentView === 'register' && (
          <div className="w-full bg-slate-50 py-12 flex-grow">
            <div className="max-w-5xl mx-auto px-4">
              
              <RegistrationForm 
                language={language} 
                onSuccess={() => setCurrentView('profile-selector')} 
                initialTier={selectedRegistrationTier}
              />
              
            </div>
          </div>
        )}

        {!isDataLoading && currentView === 'release-schedule' && (
          <div className="w-full bg-slate-50 py-12 flex-grow">
            <div className="max-w-5xl mx-auto px-4">
              <ReleaseSchedule language={language} />
            </div>
          </div>
        )}
        
        {!isDataLoading && currentView === 'about' && <About language={language} />}
        {!isDataLoading && currentView === 'name-engine' && <div className="py-8"><NamePicker /></div>}
        {!isDataLoading && currentView === 'tpt' && <TPT language={language} />}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-6 mt-auto flex flex-col items-center gap-2">
        <p className="text-sm font-medium">
          {language === 'zh' ? '需要協助嗎？請聯繫客服：' : 'Need help? Contact support at: '}
          <a 
            href="mailto:slicktimepro@gmail.com" 
            className="text-brand-yellow hover:text-amber-300 transition-colors ml-1 font-bold tracking-wide"
          >
            slicktimepro@gmail.com
          </a>
        </p>
        <p className="text-xs mt-2">
          © {new Date().getFullYear()} Slick Time Productions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}