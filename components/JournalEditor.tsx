
import React from 'react';
import { JournalSections } from '../types';

interface JournalEditorProps {
  sections: JournalSections;
  onChange: (key: keyof JournalSections, value: string) => void;
  onSave: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const SectionBox: React.FC<{
  title: string;
  icon: string;
  color: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
}> = ({ title, icon, color, value, placeholder, onChange }) => (
  <div className="mb-8 last:mb-0">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white`}>
        <i className={`fas ${icon} text-sm`}></i>
      </div>
      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full min-h-[120px] p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm resize-none text-slate-600 leading-relaxed"
    />
  </div>
);

const JournalEditor: React.FC<JournalEditorProps> = ({ sections, onChange, onSave, onAnalyze, isLoading }) => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 pb-32">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">今天过得怎么样？</h2>
        <p className="text-slate-500">通过这五个维度，记录下今天的每一个精彩瞬间。</p>
      </div>

      <SectionBox
        title="让我感到开心的事"
        icon="fa-smile"
        color="bg-yellow-400"
        value={sections.happy}
        onChange={(v) => onChange('happy', v)}
        placeholder="记录下今天让你露出微笑的小确幸..."
      />

      <SectionBox
        title="让我感到充实的事"
        icon="fa-battery-full"
        color="bg-green-500"
        value={sections.fulfilling}
        onChange={(v) => onChange('fulfilling', v)}
        placeholder="哪些瞬间让你觉得自己有所收获？"
      />

      <SectionBox
        title="可以改进的事"
        icon="fa-tools"
        color="bg-orange-400"
        value={sections.improvement}
        onChange={(v) => onChange('improvement', v)}
        placeholder="今天有哪些地方如果重来会做得更好？"
      />

      <SectionBox
        title="思考"
        icon="fa-lightbulb"
        color="bg-blue-500"
        value={sections.reflection}
        onChange={(v) => onChange('reflection', v)}
        placeholder="有什么深刻的感悟或是突然闯入脑海的想法？"
      />

      <SectionBox
        title="感谢"
        icon="fa-heart"
        color="bg-pink-500"
        value={sections.gratitude}
        onChange={(v) => onChange('gratitude', v)}
        placeholder="想要对谁说声谢谢？或者是感谢今天的自己..."
      />

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-0 left-64 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 flex justify-center gap-4 z-10">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="px-10 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
        >
          <i className="fas fa-save"></i>
          保存日志
        </button>
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fas fa-magic"></i>
          )}
          DeepSeek 智能分析
        </button>
      </div>
    </div>
  );
};

export default JournalEditor;
