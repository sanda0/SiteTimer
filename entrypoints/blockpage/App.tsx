import React, { useState, useEffect } from 'react';
import blockImg from "@/assets/undraw_secure-login_m11a.svg";

function App() {
  const quotes = [
    "Focus is the key to unlocking your full potential.",
    "Stay focused and extra sparkly.",
    "Where your focus goes, your energy flows.",
    "Distraction is the enemy of focus.",
    "Success demands focus and hard work.",
    "Focus on your goals, not the obstacles.",
    "Be so focused that your dreams become reality.",
    "Clarity and focus are the foundations of success.",
    "What you focus on expands.",
    "Focus is not just a skill, it’s a lifestyle."
  ];

  // Select a random quote on render
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <div className='w-[20%] mb-4'>
          <img src={blockImg} alt="Block" />
        </div>
        <div className='text-xl font-semibold text-gray-700'>
          <p>{quote}</p>
        </div>
      </div>
    </>
  );
}

export default App;
