
import React from 'react';
import { JournalLog } from '../types';

interface SidebarProps {
  logs: JournalLog[];
  currentDate: string;
  onSelectDate: (date: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ logs, currentDate, onSelectDate }) => {
  // Sort logs by date descending
  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 h-screen flex flex-col shrink-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <i className="fas fa-book-open"></i>
          心迹日志
        </h1>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          历史记录
        </div>
        <nav className="space-y-1 px-2">
          {sortedLogs.map((log) => {
            const isActive = log.date === currentDate;
            return (
              <button
                key={log.date}
                onClick={() => onSelectDate(log.date)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm">{log.date}</span>
                  <span className="text-xs text-slate-400 group-hover:text-slate-500">
                    {log.isAnalyzed ? '✨ 已分析' : log.completed ? '✅ 已完成' : '✍️ 记录中'}
                  </span>
                </div>
                <i className={`fas fa-chevron-right text-xs transition-transform ${isActive ? 'translate-x-1' : 'opacity-0'}`}></i>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Login / Profile Section */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
            <i className="fas fa-user text-sm"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 truncate">访客用户</p>
            <p className="text-xs text-slate-400 truncate">点击管理账号</p>
          </div>
          <button className="text-slate-300 group-hover:text-slate-500 transition-colors">
            <i className="fas fa-ellipsis-v text-xs"></i>
          </button>
        </div>
        <div className="mt-2 text-[10px] text-center text-slate-300">
          记录美好生活每一天
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
