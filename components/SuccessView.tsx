
import React, { useEffect, useState } from 'react';

const SuccessView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative Fireworks-like elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-ping opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              backgroundColor: ['#6366f1', '#fbbf24', '#f472b6', '#34d399'][Math.floor(Math.random() * 4)],
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>

      <div className={`text-center transition-all duration-1000 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-8xl mb-8">🎆</div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">今日日志完成！</h1>
        <p className="text-slate-500 text-lg mb-10">你真棒！每一天的记录都是成长的足迹。</p>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-lg"
        >
          返回查看
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
