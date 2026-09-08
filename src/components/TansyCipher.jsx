import { useState } from 'react';
// Imports your brand new optimized WebP fairy graphic from your assets folder
import tansyCharacter from '../assets/tansy.webp'; 

export default function TansyCipher({ language }) {
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const challenges = [
    { binary: '0001', decimal: 1, letter: 'A', clue: 'The first letter of the alphabet!' },
    { binary: '0011', decimal: 3, letter: 'C', clue: 'C is for Computational Magic!' },
    { binary: '0101', decimal: 5, letter: 'E', clue: 'Excellent logic engineers use this letter!' },
    { binary: '1000', decimal: 8, letter: 'H', clue: 'Help Tansy unlock the final node!' }
  ];

  const checkAnswer = () => {
    const active = challenges[currentChallenge];
    if (userInput.trim() === active.decimal.toString() || userInput.trim().toUpperCase() === active.letter) {
      setScore(score + 10);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setUserInput('');
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1);
        } else {
          setCurrentChallenge(0); 
        }
      }, 1500);
    } else {
      alert(language === 'zh' ? '密碼不正確，再試一次！' : 'Cipher incorrect, try again!');
    }
  };

  const activeChallenge = challenges[currentChallenge];

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center mt-8">
      
      {/* Character Image & Welcome Header Block */}
      <div className="mb-6 flex flex-col items-center">
        <img 
          src={tansyCharacter} 
          alt="Tansy the Fairy" 
          className="w-32 h-32 object-contain mb-4 animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <div className="inline-block px-4 py-1 bg-purple-50 text-purple-700 font-bold rounded-full text-xs uppercase tracking-wider mb-2">
          ⚙️ {language === 'zh' ? '運算思維遊戲' : 'Computational Logic Mini-Game'}
        </div>
        <h2 className="text-3xl font-black text-slate-800">
          {language === 'zh' ? '坦西的科技密碼' : "Tansy's Tech Cipher"}
        </h2>
      </div>

      {/* Playing Instructions Section */}
      <div className="mb-6 p-4 bg-purple-50/50 rounded-2xl border border-purple-100 text-left text-sm">
        <span className="font-bold text-xs text-purple-700 uppercase block mb-1">
          📋 {language === 'zh' ? '遊戲說明' : 'How to Play'}
        </span>
        <p className="text-slate-700 leading-relaxed font-medium">
          {language === 'zh' 
            ? '觀察黑盒子中顯示的 4 位元二進位制代碼。利用你所學的二進位制規則（1、2、4、8），計算出它代表的十進位制數字，或根據下方的線索提示輸入對應的英文字母，並點擊「解碼」！' 
            : 'Look at the 4-bit binary signal code in the black box. Use your binary logic place values (8-4-2-1) to calculate the decimal number, or crack the secret alphabet code using the clue below, then hit DECODE!'}
        </p>
      </div>

      {/* The Binary Display Panel */}
      <div className="bg-slate-900 text-green-400 font-mono text-5xl font-bold py-6 rounded-2xl tracking-widest shadow-inner mb-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] text-slate-500 tracking-normal uppercase">
          {language === 'zh' ? '訊號輸入' : 'SIGNAL INPUT'}
        </div>
        {activeChallenge.binary}
      </div>

      <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-left">
        <span className="font-bold text-xs text-slate-400 uppercase block mb-1">Clue / 提示</span>
        <p className="text-slate-700 font-semibold">{activeChallenge.clue}</p>
      </div>

      {showSuccess ? (
        <div className="py-4 text-green-600 font-bold text-xl animate-bounce">
          🎉 {language === 'zh' ? '解碼成功！+10 分' : 'Decoded Successfully! +10 pts'}
        </div>
      ) : (
        <div className="flex gap-3 mb-8">
          <input 
            type="text"
            className="flex-1 p-4 border-2 border-slate-200 rounded-xl font-bold text-center text-xl outline-none focus:border-purple-500"
            placeholder={language === 'zh' ? '輸入數字或字母...' : 'Enter number or letter...'}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <button 
            onClick={checkAnswer}
            className="px-6 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-700 transition-colors shadow-md text-sm"
          >
            {language === 'zh' ? '解碼' : 'DECODE'}
          </button>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-sm font-bold text-slate-500">
        <div>{language === 'zh' ? `目前得分: ${score}` : `Score: ${score}`}</div>
        <div className="text-purple-600">⚡ 4-Bit Core</div>
      </div>
    </div>
  );
}