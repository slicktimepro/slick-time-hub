import React from 'react';

export default function ProfileSelector({ parentData, students, onSelectProfile, language }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 font-sans relative">
      
      {/* HEADER */}
      <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-12 text-center drop-shadow-sm">
        {language === 'zh' ? '請問今天誰要登入呢？' : "Who is learning today?"}
      </h2>
      
      {/* PROFILE GRID */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-4xl">
        
        {/* Render Student Profiles */}
        {students && students.map((student) => (
          <button 
            key={student.id}
            onClick={() => onSelectProfile({ type: 'student', data: student })}
            className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-3"
            aria-label={`Login as ${student.screenName}`}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-white border-4 border-slate-200 group-hover:border-brand-blue group-hover:shadow-2xl overflow-hidden flex items-center justify-center shadow-lg transition-all relative">
              <img 
                src={student.avatarSrc || '/snail-icon.webp'} 
                alt={student.screenName} 
                className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <span className="mt-4 font-black text-xl md:text-2xl text-slate-700 group-hover:text-brand-blue font-display tracking-wide">
              {student.screenName}
            </span>
          </button>
        ))}

        {/* Render Parent Profile Trigger */}
        <button 
          // ARCHITECTURAL UPGRADE: Direct handoff to the App.jsx PinGate interceptor
          onClick={() => onSelectProfile({ type: 'parent', data: parentData })}
          className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-3"
          aria-label="Access Parent Dashboard"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-slate-800 border-4 border-slate-700 group-hover:border-brand-orange group-hover:shadow-xl flex items-center justify-center shadow-lg transition-all">
            <svg className="w-16 h-16 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="mt-4 font-bold text-lg md:text-xl text-slate-500 group-hover:text-brand-orange">
            {language === 'zh' ? '家長控制台' : 'Parent Dashboard'}
          </span>
        </button>

      </div>
    </div>
  );
}