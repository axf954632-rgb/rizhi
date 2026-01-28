
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface AIChatProps {
  history: ChatMessage[];
  onSendMessage: (msg: string) => void;
  onBack: () => void;
  isTyping: boolean;
}

const AIChat: React.FC<AIChatProps> = ({ history, onSendMessage, onBack, isTyping }) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
            title="返回日志"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">DeepSeek 深度交流</h3>
              <p className="text-xs text-slate-400">正在与你的今日思绪共鸣</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-400 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-100">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="进一步聊聊你的感受..."
            disabled={isTyping}
            className="flex-1 px-6 py-3 bg-slate-50 border border-slate-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
