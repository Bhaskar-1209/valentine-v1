import { useState } from 'react';
import { 
  Heart, Sparkles, Wand2, Crown, Gift, MousePointer2, 
  Star, Box, CheckCircle2, Camera, MessageSquare, 
  HelpCircle, ArrowRight, ArrowLeft, Trophy 
} from 'lucide-react';
import img1 from '../public/1.jpeg';
import img2 from '../public/2.jpeg';
import img3 from '../public/3.jpeg';
import img4 from '../public/4.jpeg';
import img5 from '../public/5.png';
import img6 from '../public/6.jpeg';
import gif1 from '../public/gif1.gif';
import gif2 from '../public/gif-3.gif';
import gif3 from '../public/gif2.png';
// Note: To use the AI feature, a valid Gemini API key is required in the environment.
const apiKey = "AIzaSyBeoReWnqkphSILKBrAfwFRvkETtA6D8q4"; 

export default function App() {
  const [page, setPage] = useState('invite'); // Pages: 'invite', 'selection', 'quiz', 'letter', 'gallery'
  const [noButtonPos, setNoButtonPos] = useState({ top: '0px', left: '0px' });
  const [isMoved, setIsMoved] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [aiNote, setAiNote] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  // const images = [img1, img2, img3, img4, img5, img6];
const [currentGif, setCurrentGif] = useState(gif1); // default on load
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [wrongMsg, setWrongMsg] = useState("");

  // Quiz States
  const [quizStep, setQuizStep] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // No button funny responses
  const noTexts = [
    "No", "Pakka?", "Sahi mein?", "Ek baar aur soch lo...", "Maan jao na please!",
    "Dil tod doge mera? 💔", "Itna gussa? 🥺", "Ab toh 'Yes' daba do!",
    "Please Please Please!", "Main ro dunga... 😭", "Arey yaar, maan bhi jao!",
    "Kya kar rahi ho?", "Chocolate dunga! 🍫", "Diamond ring chahiye? 💍",
    "I love you infinity!"
  ];

  // Logic to move the No button randomly
  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 180);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPos({ top: `${y}px`, left: `${x}px` });
    setIsMoved(true);
    setNoCount(prev => prev + 1);
    setCurrentGif(gif2);

  };

  // AI-powered Love Note Generator
  const generateAiLoveNote = async () => {
    if (!apiKey) {
      setAiNote("Aap meri duniya ka sabse haseen hissa ho. ❤️");
      return;
    }

    setLoadingAi(true);
    const systemPrompt = "You are a deeply romantic husband. Write a very short, sweet, and poetic one-line 'reason why I love you' for your wife in Hindi. Keep it emotional.";
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Write a unique romantic compliment for my wife. in hindi only"  }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiNote(text || "Aapki smile meri duniya roshan kar deti hai. ❤️");
    } catch (error) {
      setAiNote("Aap meri har khushi ka raaz ho. ❤️");
    } finally {
      setLoadingAi(false);
    }
  };

  // Quiz Questions Data
  const quizData = [
    {
      q: "Duniya mein sabse zyada cute kaun hai?",
      options: ["Main (Your Wife)", "Koi nahi", "Sirf main hi hoon"],
      correct: [0, 2]
    },
    {
      q: "Aapko sabse zyada pyaar kaun karta hai?",
      options: ["My Husband", "Mera Pagal Pati", "Both A and B"],
      correct: [2]
    },
    {
      q: "Hamari agli date kahan honi chahiye?",
      options: ["Time Spend", "Long Drive", "Jahan aap chahe!"],
      correct: [0, 1, 2]
    }
  ];

  const handleQuizAnswer = () => {
    if (quizStep < quizData.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const checkAnswer = (index) => {
  const correctAnswers = quizData[quizStep].correct;

  if (correctAnswers.includes(index)) {
    setWrongMsg("");
    setSelectedAnswer(index);

    setTimeout(() => {
      if (quizStep < quizData.length - 1) {
        setQuizStep(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 600);
  } else {
    setWrongMsg("Galat jawab 😜 dobara try karo!");
  }
};


  // --- UI PAGES ---

  // 1. Initial Invite Page
  const InvitePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-200 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="text-center z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="mb-8">
          <img 
  src={currentGif}
  className="w-56 h-56 md:w-72 md:h-72 mx-auto rounded-full border-8 border-white shadow-2xl object-cover"
  alt="Cute Reaction"
/>

        </div>
        <h1 className="text-4xl md:text-6xl font-black text-red-600 mb-12 drop-shadow-md">Will you be my Valentine? 💖</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full min-h-[150px]">
          <button 
            // onClick={() => setPage('selection')} 
            onClick={() => {
  setCurrentGif(gif3);
  setTimeout(() => setPage('selection'), 800);
}}

            className="bg-green-500 text-white font-black py-5 px-12 rounded-2xl shadow-2xl transform active:scale-90 transition-all text-4xl"
          >
            YES! 😍
          </button>
          <button 
            onMouseEnter={moveNoButton} 
            onTouchStart={moveNoButton}
            style={isMoved ? { position: 'fixed', top: noButtonPos.top, left: noButtonPos.left, transition: 'all 0.15s' } : {}}
            className="bg-red-500 text-white font-bold py-4 px-10 rounded-xl shadow-xl z-30 min-w-[150px] text-xl"
          >
            {noCount < noTexts.length ? noTexts[noCount] : `Ab maan bhi jao! (${noCount})`}
          </button>
        </div>
      </div>
    </div>
  );

  // 2. Gift Selection Page
  const SelectionPage = () => (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6 text-center animate-in fade-in duration-500">
      <header className="mb-12 mt-6">
        <Heart className="w-16 h-16 text-red-500 mx-auto animate-pulse mb-4" fill="currentColor" />
        <h1 className="text-4xl font-black text-red-600">Yayy! Pick Your Surprises 🎁</h1>
        <p className="text-pink-600 font-bold italic">Teenon gifts aapke liye hain, ek ek karke dekhiye!</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <button onClick={() => setPage('quiz')} className="bg-white p-10 rounded-[2.5rem] border-4 border-blue-200 shadow-xl hover:scale-105 transition-transform flex flex-col items-center gap-4 group">
          <Gift className="w-16 h-16 text-blue-400 group-hover:animate-bounce" />
          <span className="font-black text-blue-600 uppercase tracking-widest">Gift1</span>
        </button>
        <button onClick={() => setPage('letter')} className="bg-white p-10 rounded-[2.5rem] border-4 border-red-200 shadow-xl hover:scale-105 transition-transform flex flex-col items-center gap-4 group">
          <Gift className="w-16 h-16 text-red-400 group-hover:animate-bounce" />
          <span className="font-black text-red-600 uppercase tracking-widest">Gift2</span>
        </button>
        <button onClick={() => setPage('gallery')} className="bg-white p-10 rounded-[2.5rem] border-4 border-purple-200 shadow-xl hover:scale-105 transition-transform flex flex-col items-center gap-4 group">
          <Gift className="w-16 h-16 text-purple-400 group-hover:animate-bounce" />
          <span className="font-black text-purple-600 uppercase tracking-widest">Gift3</span>
        </button>
      </div>
    </div>
  );

  // 3. Quiz Gift Page
  const QuizPage = () => (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6 text-center animate-in slide-in-from-right duration-500">
      <button onClick={() => setPage('selection')} className="absolute top-6 left-6 flex items-center gap-2 font-bold text-blue-600 hover:scale-105 transition-all"><ArrowLeft /> Back</button>
      <div className="max-w-xl w-full mt-20">
        {!quizFinished ? (
          <div className="bg-white p-8 rounded-[3rem] border-4 border-blue-400 shadow-2xl">
            <div className="text-blue-400 font-black mb-2 uppercase tracking-widest text-sm">Question {quizStep + 1} of 3</div>
            <h2 className="text-2xl font-black text-gray-800 mb-8">{quizData[quizStep].q}</h2>
            <div className="space-y-4">
              {quizData[quizStep].options.map((opt, i) => (
                <button 
    key={i}
    onClick={() => checkAnswer(i)}
    className={`w-full py-4 px-6 bg-blue-50 hover:bg-blue-100 rounded-2xl font-bold text-blue-700 border-2 border-blue-100 transition-all active:scale-95
    ${selectedAnswer === i ? "bg-green-200 border-green-400" : ""}`}
  >
    {opt}
  </button>
              ))}
              {wrongMsg && (
  <p className="text-red-500 font-bold mt-4 animate-bounce">
    {wrongMsg}
  </p>
)}

            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-[3rem] border-4 border-green-400 shadow-2xl animate-in zoom-in">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-black text-green-600 mb-2">Quiz Champion!</h2>
            <p className="text-gray-600 mb-6 font-medium">Sare jawab bilkul sahi! Aap meri perfect wife ho. ❤️</p>
            <button onClick={() => setPage('selection')} className="bg-green-500 text-white font-black py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all">
              Next Gift dekhte hain! <ArrowRight className="inline ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // 4. Love Letter Gift Page
  const LetterPage = () => (
    <div className="min-h-screen bg-red-50 flex flex-col items-center p-6 text-center animate-in slide-in-from-right duration-500 overflow-y-auto">
      <button onClick={() => setPage('selection')} className="absolute top-6 left-6 flex items-center gap-2 font-bold text-red-600 z-20 hover:scale-105"><ArrowLeft /> Back</button>
      <div className="max-w-xl w-full mt-20 bg-white p-10 rounded-[3rem] border-4 border-red-300 shadow-2xl text-left relative overflow-hidden">
        <Heart className="absolute -bottom-10 -right-10 w-40 h-40 text-red-50 opacity-50" fill="currentColor" />
        <h2 className="text-3xl font-black text-red-600 mb-6">Mere Pyaare Bche 🐢,</h2>
        <div className="space-y-6 text-gray-700 font-medium leading-relaxed italic text-lg">
          <p>Main words mein nahi bata sakta ki aap meri life me kitne important person ho.</p>
          <p>Bhagwan ji ne merko ek itna pyara bcha diya hai, jo mera lucky charm bna h apke life me aane se meri life me bhot badal gayi hai.</p>
          <p>Love you bhor sara meri bugadi🫂❤️</p>
          <p className="font-black text-red-500 text-2xl mt-10">Forever Yours, <br/> Your Love ❤️</p>
        </div>
      </div>
      
      {/* AI Memory Generator Section */}
      <div className="mt-8 max-w-xl w-full bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-lg animate-in fade-in delay-500">
        <p className="text-pink-600 font-bold mb-4 flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Magic Memory Generator <Sparkles className="w-4 h-4" /></p>
        <div className="p-4 bg-red-50 rounded-xl italic text-gray-700 mb-4 min-h-[60px] flex items-center justify-center">
          {loadingAi ? (
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </div>
          ) : (aiNote || "Click below for a fresh reason why I love you!")}
        </div>
        <button onClick={generateAiLoveNote} className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-pink-600 transition-all active:scale-95 shadow-md">
          Generate New Reason
        </button>
      </div>
    </div>
  );

  // 5. Memory Gallery Gift Page
//   const GalleryPage = () => (
//     <div className="min-h-screen bg-purple-50 flex flex-col items-center p-6 text-center animate-in slide-in-from-right duration-500 overflow-y-auto">
//       <button onClick={() => setPage('selection')} className="absolute top-6 left-6 flex items-center gap-2 font-bold text-purple-600 z-20 hover:scale-105"><ArrowLeft /> Back</button>
//       <div className="max-w-2xl w-full mt-20">
//         <h2 className="text-3xl font-black text-purple-600 mb-8">Apki Khubsurat Yaadein ✨</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {images.map((photo, i) => (
//   <div 
//     key={i} 
//     className={`aspect-square bg-white p-2 rounded-2xl border-4 border-purple-200 shadow-lg transform transition-all duration-300 hover:rotate-0 hover:scale-110 ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}
//   >
//     <img 
//       src={photo}
//       className="w-full h-full object-cover rounded-lg" 
//       alt={`Memory ${i + 1}`}
//     />
//   </div>
// ))}

//         </div>
//         <p className="mt-10 text-purple-400 font-black italic text-lg">Aur aisi bohot saari memories abhi baaki hain! ❤️</p>
//       </div>
//     </div>
//   );

const GalleryPage = () => {
const images = [
  { src: img1, caption: "Sunshine mixed with my happiness" },
  { src: img2, caption: "Lost in the view, found in you" },
  { src: img3, caption: "Every prayer leads me to you" },
  { src: img4, caption: "A dream walking in real life" },
  { src: img5, caption: "Sky, water, and my forever" },
  { src: img6, caption: "You make my world bloom" },
];

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center p-4">
      <button
        onClick={() => setPage("selection")}
        className="absolute top-6 left-6 flex items-center gap-2 font-bold text-purple-700 hover:scale-105"
      >
        <ArrowLeft /> Back
      </button>

      {/* Pink Board */}
      <div className="bg-pink-200 rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl w-full">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
          Look at this cutie 😭
        </h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((item, i) => (
            <div
              key={i}
              className={`bg-[#f7f1e3] p-3 shadow-lg transform transition duration-300 hover:scale-110 ${
                i % 2 === 0 ? "rotate-2" : "-rotate-2"
              }`}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-40 md:h-48 object-cover"
              />
              <p className="text-center mt-2 font-semibold text-gray-700">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


  // Router for rendering the current page
  return (
    <div className="font-sans">
      {page === 'invite' && <InvitePage />}
      {page === 'selection' && <SelectionPage />}
      {page === 'quiz' && <QuizPage />}
      {page === 'letter' && <LetterPage />}
      {page === 'gallery' && <GalleryPage />}
    </div>
  );
}