import React from 'react';
import VideoFlashcard from './VideoFlashcard';

// Reusable Zhuyin text formatter
const ZT = ({ char, bopomofo }) => (
  <ruby className="mx-[1px]">
    {char}
    <rt className="text-[0.65em] font-normal text-sky-200 opacity-90 tracking-tighter">{bopomofo}</rt>
  </ruby>
);

export default function Ep1Sc1Flashcards() {
  // Scene 1 Vocabulary Database (Lab removed)
  // ARCHITECTURAL UPDATE: Cache-busting ?v=2 parameters added to force iOS to fetch fresh assets
  const SCENE_1_VOCAB = [
    {
      id: 1,
      english: "Waterproof",
      chinese: <><ZT char="防" bopomofo="ㄈㄤˊ" /><ZT char="水" bopomofo="ㄕㄨㄟˇ" /></>,
      videoSrc: "/shorts/flashcard_waterproof.mp4?v=2",
      orientation: "portrait"
    },
    {
      id: 2,
      english: "Activate",
      chinese: <><ZT char="啟" bopomofo="ㄑㄧˇ" /><ZT char="動" bopomofo="ㄉㄨㄥˋ" /></>,
      videoSrc: "/shorts/flashcard_activate.mp4?v=2",
      orientation: "landscape"
    },
    {
      id: 3,
      english: "Gravity",
      chinese: <><ZT char="地" bopomofo="ㄉㄧˋ" /><ZT char="心" bopomofo="ㄒㄧㄣ" /><ZT char="引" bopomofo="ㄧㄣˇ" /><ZT char="力" bopomofo="ㄌㄧˋ" /></>,
      videoSrc: "/shorts/flashcard_gravity.mp4?v=2",
      orientation: "portrait"
    },
    {
      id: 4,
      english: "Soggy",
      chinese: <><ZT char="濕" bopomofo="ㄕ" /><ZT char="軟" bopomofo="ㄖㄨㄢˇ" /></>,
      videoSrc: "/shorts/flashcard_soggy.mp4?v=2",
      orientation: "landscape"
    },
    {
      id: 6,
      english: "Goggles",
      chinese: <><ZT char="護" bopomofo="ㄏㄨˋ" /><ZT char="目" bopomofo="ㄇㄨˋ" /><ZT char="鏡" bopomofo="ㄐㄧㄥˋ" /></>,
      videoSrc: "/shorts/flashcard_goggles.mp4?v=2",
      orientation: "landscape"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 my-8 bg-slate-950/50 rounded-3xl border border-slate-800 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-amber-400 mb-2">
          Scene 1 Vocabulary
        </h2>
        <p className="text-slate-300 font-bold">
          Watch the video, listen, and click to translate! <br/>
          <span className="text-sm text-sky-300"><ZT char="看" bopomofo="ㄎㄢˋ" /><ZT char="影" bopomofo="ㄧㄥˇ" /><ZT char="片" bopomofo="ㄆㄧㄢˋ" />，<ZT char="聽" bopomofo="ㄊㄧㄥ" /><ZT char="發" bopomofo="ㄈㄚ" /><ZT char="音" bopomofo="ㄧㄣ" />，<ZT char="點" bopomofo="ㄉㄧㄢˇ" /><ZT char="擊" bopomofo="ㄐㄧˊ" /><ZT char="翻" bopomofo="ㄈㄢ" /><ZT char="卡" bopomofo="ㄎㄚˇ" />！</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SCENE_1_VOCAB.map((word) => (
          <VideoFlashcard 
            key={word.id}
            videoSrc={word.videoSrc}
            englishWord={word.english}
            chineseWordComponents={word.chinese}
            orientation={word.orientation}
          />
        ))}
      </div>
    </div>
  );
}