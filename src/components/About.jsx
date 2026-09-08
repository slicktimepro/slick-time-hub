import React from 'react';

export default function About({ language }) {
  
  // --- ENGLISH VERSION ---
  if (language === 'en') {
    return (
      <section className="max-w-5xl mx-auto px-4 py-12 space-y-16 font-sans text-slate-800">
        
        {/* Hero Section with Snails Promoted */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-blue">
            About Slick Time Productions
          </h2>
          <div className="flex justify-center">
            <img 
              src="/snails-race.gif" 
              alt="Slick Time Racing Snails" 
              className="rounded-2xl shadow-lg border-4 border-brand-yellow max-h-64 object-cover"
            />
          </div>
        </div>

        {/* MEET TEACHER TONY SECTION */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border-2 border-brand-orange space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🧙‍♂️</span>
            <h3 className="text-3xl font-display font-black text-brand-orange">
              Meet Teacher Tony & Discover the Slick Time Universe
            </h3>
          </div>
          <div className="space-y-4 leading-relaxed text-slate-700">
            <p>
              Welcome to the Slick Time Universe. Behind every great spell and clever puzzle is a dedicated wizard. For our "Smart Magic" ecosystem, that creator is Anthony Jiles—affectionately known to his students as <strong>Teacher Tony</strong>.
            </p>
            <p>
              Growing up in Indianapolis, Indiana, USA, Tony attended Ten Little Indiana Day School, a private school so charmingly small that multiple grades shared a single classroom and teacher. This close-knit environment shaped his collaborative educational philosophy long before he graduated from Ben Davis High School in 1989. Before making education his calling, Tony proudly served in the U.S. Navy and built a multifaceted professional background spanning web development, copywriting, academic translation, technical writing, non-profit grant writing, and cloud computing.
            </p>
            <p>
              For the past <strong>22 years</strong>, Teacher Tony has lived and taught in Taiwan, guiding students across cram schools, elementary schools, junior highs, and high schools. Specializing in English Literature and Writing, his classrooms have always focused heavily on story-based instruction and multimedia curriculum design.
            </p>
            <div className="bg-slate-50 border-l-4 border-brand-orange p-4 rounded-r-xl italic text-slate-600 text-sm">
              "While I bring over two decades of classroom teaching and curriculum design experience to this project, 2D animation is an exciting new frontier for me. As our studio grows, you can expect our production fidelity to continuously evolve—meaning earlier scenes and episodes will be iteratively refined and polished over time!" — Teacher Tony
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-brand-orange flex items-center gap-2">
              <span>🐌</span> The Story Behind the Name
            </h4>
            <p className="leading-relaxed">
              If you grew up watching classic Western animation, you might remember the high-energy, witty world of cartoons like Tom Slick. Created by animation pioneers Jay Ward and Bill Scott, these shows were famous for their clever writing, rapid-fire pacing, and unforgettable, stylized characters who always found creative ways out of a jam.
            </p>
            <p className="leading-relaxed">
              As a childhood tribute to that era of storytelling, our company logo even features our signature drag-racing snails—a playful nod to high-speed energy wrapped in a whimsical, unexpected package. We took the word "Slick" because it represents something smooth, clever, and expertly crafted.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-brand-blue flex items-center gap-2">
              <span>✨</span> Modern Animation with a Purpose
            </h4>
            <p className="leading-relaxed">
              While our roots are in classic, comedic cartoon storytelling, our mission is built for the modern classroom. We have modernized that vintage, high-energy aesthetic to create a unique "STEM-Magic" universe.
            </p>
            <p className="leading-relaxed">
              We believe that when children are fully immersed in a brilliant story, time flows perfectly. By blending vibrant 2D animation with structured educational logic, we turn complex subjects into captivating adventures. Our stories don't rely on pure, unexplained magic to solve problems; instead, our characters use computational thinking, science, and math to save the day.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-3xl font-display font-bold text-center text-brand-blue">Our Core Pillars</h4>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-brand-yellow">
              <div className="text-4xl mb-4">🧪</div>
              <h5 className="text-lg font-bold text-slate-800 mb-2">Story-Driven STEM</h5>
              <p className="text-sm text-slate-600">We bridge narrative wonder with hard logic, teaching math, science, and coding through character-driven adventures.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-brand-blue">
              <div className="text-4xl mb-4">🗣️</div>
              <h5 className="text-lg font-bold text-slate-800 mb-2">CLIL & Bilingual Excellence</h5>
              <p className="text-sm text-slate-600">Tailored specifically for Taiwan's unique educational goals, our media naturally pairs English acquisition with core content.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-brand-red">
              <div className="text-4xl mb-4">🎨</div>
              <h5 className="text-lg font-bold text-slate-800 mb-2">Creative Craftsmanship</h5>
              <p className="text-sm text-slate-600">Utilizing advanced 2D animation workflows in Adobe After Effects to create professional, visually rich media.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- TRADITIONAL CHINESE VERSION ---
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-16 font-sans text-slate-800">
      
      {/* Hero Section with Snails Promoted */}
      <div className="text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-display font-black text-brand-blue">
          關於 Slick Time Productions
        </h2>
        <div className="flex justify-center">
          <img 
            src="/snails-race.gif" 
            alt="Slick Time Racing Snails" 
            className="rounded-2xl shadow-lg border-4 border-brand-yellow max-h-64 object-cover"
          />
        </div>
      </div>

      {/* MEET TEACHER TONY SECTION (CHINESE) */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border-2 border-brand-orange space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🧙‍♂️</span>
          <h3 className="text-3xl font-display font-black text-brand-orange">
            認識 Tony 老師與 Slick Time 宇宙
          </h3>
        </div>
        <div className="space-y-4 leading-relaxed text-slate-700 text-justify">
          <p>
            歡迎來到 Slick Time 宇宙。在每個精彩的魔法咒語與巧妙謎題背後，都有一位充滿熱忱的創造者，正是深受學生喜愛的 <strong>Tony 老師 (Anthony Jiles)</strong>。
          </p>
          <p>
            Tony 老師在美國印第安納州的印第安納波利斯長大，曾就讀於 Ten Little Indiana Day School 這所溫馨的小學，當時多個年級共用同一間教室與老師。這種緊密的學習環境，在他 1989 年從貝恩戴維斯高中 (Ben Davis High School) 畢業前，就已深深塑造了他的教育理念。在投身教育界之前，Tony 老師曾服役於美國海軍，並累積了多元的專業背景，涵蓋網頁開發、文案撰寫、學術中英翻譯、技術寫作、非營利組織補助金申請寫作以及雲端運算。
          </p>
          <p>
            在過去的 <strong>22 年裡</strong>，Tony 老師深耕台灣，教學足跡遍佈補習班、國小、國中與高中。他專精於英語文學與寫作教學，並始終致力於將故事引導式教學與多媒體融入課程設計中。
          </p>
          <div className="bg-slate-50 border-l-4 border-brand-orange p-4 rounded-r-xl italic text-slate-600 text-sm">
            「雖然我擁有超過二十年的課堂教學與課程設計經驗，但 2D 動畫對我而言是一個充滿挑戰的嶄新領域。隨著工作室的不斷成長，您可以期待我們的製作水準持續精進——這意味著先前的場景與早期內容也會在日後逐步獲得優化與打磨！」—— Tony 老師
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-brand-orange flex items-center gap-2">
            <span>🐌</span> 品牌背後的故事：向經典美式動畫致敬
          </h4>
          <p className="leading-relaxed text-justify">
            如果您曾接觸過美式經典卡通，或許會記得《Tom Slick》那種充滿活力、機智的動畫世界。這部由動畫先驅 Jay Ward 與 Bill Scott 創作的經典作品，以其幽默犀利的對白與明快節奏聞名。
          </p>
          <p className="leading-relaxed text-justify">
            為了向童年這段深刻的動畫情懷致敬，我們的品牌標誌特別採用了「賽車蝸牛」作為象徵——將「極速能量」與「慢速蝸牛」幽默結合。在英文中，"Slick" 代表著流暢、聰明且製作精湛；我們希望延續這種俐落、巧妙的創作精神。
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-brand-blue flex items-center gap-2">
            <span>✨</span> 賦予現代教育全新意義的動畫
          </h4>
          <p className="leading-relaxed text-justify">
            雖然我們的根基源自經典幽默的卡通敘事，但我們的使命是為現代課堂而生。我們將這種復古、高能量的視覺美學進行現代化改造，打造出一個獨一無二的「STEM 魔法」宇宙。
          </p>
          <p className="leading-relaxed text-justify">
            透過活潑的 2D 動畫與結構化的教學邏輯，我們將複雜的學科轉化為引人入勝的冒險。在我們故事裡，角色們不依賴毫無根據的魔法來解決問題，而是運用運算思維、科學與數學來化險為夷。
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-3xl font-display font-bold text-center text-brand-blue">我們的核心三大支柱</h4>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-brand-yellow">
            <div className="text-4xl mb-4">🧪</div>
            <h5 className="text-lg font-bold text-slate-800 mb-2">故事驅動的 STEM 教育</h5>
            <p className="text-sm text-slate-600">將敘事想像力與硬核邏輯完美結合，引導孩子學習數學、科學與程式邏輯。</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-brand-blue">
            <div className="text-4xl mb-4">🗣️</div>
            <h5 className="text-lg font-bold text-slate-800 mb-2">學科雙語整合 (CLIL) 卓越教學</h5>
            <p className="text-sm text-slate-600">專為台灣獨特的雙語教育目標量身打造，讓英語學習自然融入核心學科知識。</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-brand-red">
            <div className="text-4xl mb-4">🎨</div>
            <h5 className="text-lg font-bold text-slate-800 mb-2">匠心獨具的創意視覺</h5>
            <p className="text-sm text-slate-600">運用 Adobe After Effects 的高階 2D 動畫技術，打造出專業的影音教材。</p>
          </div>
        </div>
      </div>
    </section>
  );
}