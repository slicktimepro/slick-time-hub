import React, { useState, useEffect, useRef } from 'react';
import { hashPin } from '../utils/crypto';

export default function PinGate({ language, userId, storedPinHash, onSuccess, onCancel }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus the hidden input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-submit when 4 digits are entered
  useEffect(() => {
    if (pin.length === 4) {
      verifyPin();
    }
  }, [pin]);

  const verifyPin = async () => {
    setIsVerifying(true);
    try {
      const currentHash = await hashPin(pin, userId);
      
      if (currentHash === storedPinHash) {
        onSuccess();
      } else {
        setError(true);
        setPin(''); // Clear on failure
        setTimeout(() => setError(false), 800); // Remove shake animation class
        if (inputRef.current) inputRef.current.focus();
      }
    } catch (err) {
      console.error("Hashing error:", err);
      setError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNumpadClick = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto bg-white rounded-3xl shadow-xl border-2 border-slate-200">
      <h2 className="text-2xl font-black text-slate-900 mb-2 font-display">
        {language === 'zh' ? '請輸入家長 PIN 碼' : 'Enter Parent PIN'}
      </h2>
      <p className="text-sm text-slate-500 mb-8 text-center">
        {language === 'zh' ? '為確保帳號安全，請輸入 4 位數密碼。' : 'Enter your 4-digit PIN to access the dashboard.'}
      </p>

      {/* Hidden Native Input for Desktop Keyboard Support */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={4}
        value={pin}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, '');
          if (val.length <= 4) {
            setPin(val);
            setError(false);
          }
        }}
        className="opacity-0 absolute h-0 w-0"
      />

      {/* Visual PIN Indicators */}
      <div className={`flex gap-4 mb-10 ${error ? 'animate-bounce text-red-500' : ''}`} onClick={() => inputRef.current?.focus()}>
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index}
            className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${
              pin.length > index 
                ? (error ? 'bg-red-500 border-red-500' : 'bg-brand-blue border-brand-blue scale-110') 
                : 'border-slate-300 bg-slate-50'
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-bold mb-4 -mt-6">
          {language === 'zh' ? 'PIN 碼錯誤，請重試。' : 'Incorrect PIN. Please try again.'}
        </p>
      )}

      {/* Touch-Optimized Numpad */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumpadClick(num.toString())}
            disabled={isVerifying}
            className="h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-2xl font-black text-slate-700 transition-colors active:scale-95"
          >
            {num}
          </button>
        ))}
        <button
          onClick={onCancel}
          className="h-16 rounded-2xl text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
        >
          {language === 'zh' ? '取消' : 'Cancel'}
        </button>
        <button
          onClick={() => handleNumpadClick('0')}
          disabled={isVerifying}
          className="h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-2xl font-black text-slate-700 transition-colors active:scale-95"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          disabled={isVerifying}
          className="h-16 rounded-2xl text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}