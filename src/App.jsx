import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Download, Clock, Hash } from 'lucide-react';
import { useLesson } from './context/LessonContext'; [cite: 2]
import StageView from './components/LessonPlayer/StageView'; [cite: 2]

// Static test data for the framework 
const testLesson = {
  title: "Intro to Computational Magic",
  stages: [
    { 
      type: 'video', 
      src: 'https://www.w3schools.com/html/mov_bbb.mp4', 
      label: 'The Hook' 
    },
    { 
      type: 'interactive', 
      problemId: 'Magic-Logic-Puzzle-01', 
      label: 'Solve the Riddle' 
    }
  ]
};

export default function App() {
  const [sections, setSections] = useState([
    { id: 'sec-1', title: 'Project Overview', content: 'Slick Time is an extensive project aimed at revolutionizing how we track, manage, and experience time. This document serves as the master source of truth for the project architecture, branding, and features.' }, [cite: 4]
    { id: 'sec-2', title: 'Domain Name Brainstorming', content: '- slicktime.io\n- slicktime.app\n- getslicktime.com\n- slicktime.co\n- timeslick.com\n- slicktimehq.com\n- myslicktime.com' }, [cite: 4]
    { id: 'sec-3', title: 'Core Features', content: '1. Real-time syncing\n2. Dynamic reporting\n3. Cross-platform support' }, [cite: 4]
    { id: 'sec-4', title: 'Character Profile: Wanda Witch', content: 'Role: Master of Time Dilation.\nTheme: Midnight blues, deep purples, and silver sparkles.\nMechanics: Represents deep, focused work. She brews potions that "slow down the clock". Methodical, hates being rushed.' }, [cite: 4, 5]
    { id: 'sec-5', title: 'Character Profile: Tansy the Fairy', content: 'Role: Champion of Time Acceleration (Sprints).\nTheme: Bright spring greens, yellows, and glowing gold.\nMechanics: Chaotic but highly efficient. Represents the "sprint" or "pomodoro" mechanic.' }, [cite: 5, 6]
    { id: 'sec-6', title: 'World Lore & Integration Themes', content: 'The core theme is the balance of opposites. Users must learn to harness both Wanda\'s slow magic and Tansy\'s frantic dust to achieve "Slick Time" (the flow state).' }, [cite: 6, 7, 8]
    { id: 'sec-7', title: 'Slogans & Taglines (English)', content: 'Core Theme: "Where Fun Teaches" / Stealth Learning\nOptions:\n- Slick Time: Where Fun Teaches.\n- The magic of learning, hidden in play.\n- Play the game. Master the time.' }, [cite: 8, 9]
    { id: 'sec-8', title: 'Brand Stories (English)', content: 'Story 1: The Teacher\'s Secret - Tricking students into loving to learn.\nStory 2: The Hidden Medicine - Hiding the "vegetables" of time management inside a fun game.' }, [cite: 9, 10]
    { id: 'sec-9', title: 'Taiwanese Mandarin Localization', content: '1. 玩出大智慧 (Play out great wisdom)\n2. 最快樂的『偷吃步』學習法 (The happiest "shortcut" learning method)\n3. 時間施了魔法，學習變成玩耍 (Time casts a spell, learning becomes play)' }, [cite: 10, 11]
    { id: 'sec-10', title: 'My Take: Stealth Learning Gameplay Loops', content: '- The "Pomodoro" Potion (Wanda): 25 minutes of uninterrupted simmering.\n- The "Timebox" Tornado (Tansy): 10-minute countdown with high-BPM fairy music.' }, [cite: 11, 12]
    { id: 'sec-11', title: 'Target Audience & Dual UI Strategy', content: '1. The Realm (Child UI): Pure magic, quests, characters. No charts.\n2. The Oracle (Parent/Teacher UI): A sleek, data-rich interface hidden behind a pin code.' }, [cite: 12, 13, 14, 15]
    { id: 'sec-12', title: 'Slick Time Productions & Origin', content: 'Origin: Named after "Tom Slick". Backed by 21 years of ESL/CLIL teaching in Taiwan. The pivot: Transitioning to full-time animation.' }, [cite: 15, 16, 17]
    { id: 'sec-13', title: 'The True Business Model (Confidant Mentor)', content: 'B2B Content Creation & Sales. Top of Funnel: Free YouTube cartoons. Conversion: Sell the exact underlying PPTs/materials on tt242.com.' }, [cite: 17, 18, 19]
    { id: 'sec-14', title: 'tt242.com Homepage Redesign', content: 'Headline: Bring Magic to Your Classroom. Stealth Learning at its Finest.\nSub-headline: Discover premium, animated ESL & CLIL lesson materials tested by 21 years of teaching in Taiwan.' }, [cite: 19, 20, 21]
    { id: 'sec-15', title: 'CLIL Lesson Plan: 4th Grade Comm', content: 'Theme: Communication.\nWanda (Slow/Detailed/Letters) vs Tansy (Fast/Emojis/Texts).' }, [cite: 21, 22]
    { id: 'sec-16', title: 'Media Strategy: 4th Grade Comm', content: 'CARTOON CONCEPT: "The Misunderstood Magic". Tansy sends a sloppy magic text; Wanda brews it wrong. They must team up to communicate clearly.' }, [cite: 22, 23, 24]
    { id: 'sec-17', title: 'Wanda\'s Signature Personality System', content: 'ARCHETYPE: Perfectionist Potion Master. Deliberate, vocabulary-rich. Hook: Always accidentally brews a dangerous potion.' }, [cite: 24, 25]
    { id: 'sec-18', title: 'Compact Personality Card: Tansy', content: 'ROLE: The Savior. Arrives at the climax to stop the viewer from drinking Wanda\'s potion. High-energy, ADHD-friendly.' }, [cite: 25, 26, 27]
    { id: 'sec-19', title: 'YouTube Growth & Viral Strategy', content: '1. Shorts (Top Funnel): Tansy rapid-fire drills.\n2. Long-Form (Mid Funnel): Wanda narrative cartoons.\n3. CTA: Direct teachers to website.' }, [cite: 27, 28, 29]
    { id: 'sec-20', title: 'Animation Production Notes (AE)', content: 'Wanda Rig: 9-mouth phoneme sprite sheet (Neutral, A/I, E, O, U/W, M/B/P, F/V, L/D/TH, S/Z/CH). Use Time Remapping.' }, [cite: 29, 30]
    { id: 'sec-21', title: 'Definition: Asset Inventory', content: 'Systematic audit of 21 years of teaching IP. Gather, Grade (A/B/C Tier), and Map to Slick Time.' }, [cite: 30, 31]
    { id: 'sec-22', title: 'Timeline: Part-Time (Apr 16 - Jun 30)', content: 'Goal: Audit assets, build website landing page, finish character rigs, and animate first 3 Shorts before retirement day.' }, [cite: 31, 32]
    { id: 'sec-23', title: 'Timeline: Full-Time (Jul 1 Onward)', content: 'Goal: Launch YouTube channel. Spend 60+ hours storyboarding and animating the 6-minute Misunderstood Magic episode. Launch first paid B2B bundle.' }, [cite: 32, 33, 34]
    { id: 'sec-24', title: 'Milestone Progress Tracker', content: '[ ] Asset Inventory Created\n[ ] Landing Page Live\n[ ] Rigs Complete\n[ ] Final Teaching Day\n[ ] YouTube Launch' }, [cite: 34]
    { id: 'sec-25', title: 'Website Redesign Strategy', content: 'Split Homepage: "Enter the Magic Realm" (Kids) vs "The Oracle Dashboard" (Teachers B2B store). E-commerce integration required.' }, [cite: 34, 35]
    { id: 'sec-26', title: 'Domain Name Strategy (.tw)', content: 'Options: stp.com.tw, stll.com.tw (Slick Time Learning Lab). Consider keeping tt242.com as a redirect.' }, [cite: 35, 36]
    { id: 'sec-27', title: 'Hosting Providers (Dreamweaver)', content: '1. ServerZoo (Yuan Jhen) - Top Local Pick.\n2. Hostinger - Global Budget.\n3. SiteGround - Premium.' }, [cite: 36, 37, 38]
    { id: 'sec-28', title: 'Stakeholders', content: '1. Teacher Tony (Creator/Animator)\n2. Students (End-users)\n3. Parents (Advocates)\n4. ESL/CLIL Teachers (B2B Buyers)' }, [cite: 38, 39]
    { id: 'sec-29', title: 'Project Goals & Key Dates', content: 'Transition to full-time Edutainment. Soft Launch: July 1.' }, [cite: 39, 40]
    { id: 'sec-30', title: 'Asset Inventory Chart', content: 'Current A-Tier Assets:\n- 4 Down 1 Problems PPT/Docx\n- 4 Down 2 Problems 2 PPT/Docx\n- 4 Down 3 Fixing Problems PPT/Docx\n- 4 Down 4 Communication PPT\n- Kahoot Review Series' }, [cite: 40]
    { id: 'sec-31', title: 'Risks, Blockers & Next Actions', content: 'Next Actions: Decide final domain, secure hosting, draw Wanda\'s 9-mouth sprite sheet.' }, [cite: 40, 41]
    { id: 'sec-32', title: 'Previous Lessons & Materials', content: 'Logged: 4th Grade Problems (1, 2, 3), Communication, Kahoot Reviews. Licensed media confirmed clear for commercial use.' } [cite: 42]
  ]);

  const [activeSection, setActiveSection] = useState('sec-1');
  const sectionRefs = useRef({});

  // Connect the Lesson Framework Brain [cite: 43]
  const { setLessonData } = useLesson();

  useEffect(() => {
    setLessonData(testLesson);
  }, [setLessonData]);

  const scrollToSection = (id) => { [cite: 44]
    const element = sectionRefs.current[id]; [cite: 44]
    if (element) { [cite: 45]
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id); [cite: 45]
    }
  };

  const exportToMarkdown = () => { [cite: 46]
    let mdContent = `# Slick Time Project Documentation\n\n`; [cite: 46]
    sections.forEach(sec => { [cite: 47]
      mdContent += `## ${sec.title}\n\n${sec.content}\n\n`; [cite: 47]
    });
    const blob = new Blob([mdContent], { type: 'text/markdown' }); [cite: 48]
    const url = URL.createObjectURL(blob); [cite: 48]
    const a = document.createElement('a'); [cite: 48]
    a.href = url; [cite: 48]
    a.download = 'Slick_Time_Notes.md'; [cite: 49]
    document.body.appendChild(a); [cite: 49]
    a.click(); [cite: 49]
    document.body.removeChild(a); [cite: 49]
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Navigation */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Clock className="w-6 h-6 text-white" /> [cite: 49]
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Slick Time</h1> [cite: 50]
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Project Hub</p> [cite: 50]
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Table of Contents</h3> [cite: 50]
          <ul className="space-y-1">
            {sections.map((section) => ( [cite: 51]
              <li key={`toc-${section.id}`}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center space-x-2 ${activeSection === section.id ?
                  'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`} [cite: 51, 52]
                >
                  <Hash className="w-4 h-4 opacity-50 flex-shrink-0" /> [cite: 52]
                  <span className="truncate">{section.title}</span> [cite: 52]
                </button>
              </li>
            ))} [cite: 53]
          </ul>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={exportToMarkdown}
            [cite_start]className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors" [cite: 53]
          >
            <Download className="w-4 h-4" /> [cite: 54]
            <span>Export Master Backup</span> [cite: 54]
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-8 pb-32">
          
          {/* Visual Framework Integration [cite: 55] */}
          <div className="bg-white rounded-xl shadow-lg border-4 border-blue-600 overflow-hidden mb-12">
            <div className="bg-blue-600 p-4 flex items-center justify-between">
              <h2 className="text-white font-bold text-xl">Slick Time Lesson Framework Test</h2>
              <span className="text-blue-100 text-xs font-mono uppercase tracking-widest">Live Preview</span>
            </div>
            <div className="p-8 bg-slate-50">
              <StageView /> 
            </div>
          </div>

          {/* Existing Documentation Cards [cite: 55] */}
          {sections.map((section) => (
            <div 
              key={section.id} 
              [cite_start]ref={(el) => (sectionRefs.current[section.id] = el)} [cite: 55]
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-8" [cite: 55]
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{section.title}</h2> [cite: 56]
              <textarea
                [cite_start]value={section.content} [cite: 56]
                [cite_start]readOnly [cite: 56]
                [cite_start]className="w-full min-h-[150px] bg-transparent text-slate-700 text-base leading-relaxed border-none outline-none focus:ring-0 p-0" [cite: 56]
                [cite_start]style={{ height: 'auto' }} [cite: 57]
              />
            </div>
          ))} [cite: 57]
        </div>
      </div>
    </div>
  );
} [cite: 58]