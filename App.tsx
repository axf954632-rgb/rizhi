
import React, { useState, useEffect, useCallback } from 'react';
import { JournalLog, JournalSections, ViewState, ChatMessage } from './types';
import Sidebar from './components/Sidebar';
import JournalEditor from './components/JournalEditor';
import SuccessView from './components/SuccessView';
import AIChat from './components/AIChat';
import { analyzeJournal, sendMessageToGemini, startJournalChat } from './services/geminiService';

const STORAGE_KEY = 'mindful_journal_logs_v1';

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

const INITIAL_SECTIONS: JournalSections = {
  happy: '',
  fulfilling: '',
  improvement: '',
  reflection: '',
  gratitude: '',
};

const App: React.FC = () => {
  const [logs, setLogs] = useState<JournalLog[]>([]);
  const [currentDate, setCurrentDate] = useState(getTodayDate());
  const [viewState, setViewState] = useState<ViewState>('EDITING');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize logs
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let initialLogs: JournalLog[] = [];
    
    if (stored) {
      initialLogs = JSON.parse(stored);
    }

    // Ensure today's log exists
    const today = getTodayDate();
    if (!initialLogs.find(l => l.date === today)) {
      initialLogs.push({
        date: today,
        sections: { ...INITIAL_SECTIONS },
        isAnalyzed: false,
        chatHistory: [],
        completed: false
      });
    }

    setLogs(initialLogs);
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }
  }, [logs]);

  const currentLog = logs.find(l => l.date === currentDate);

  // Set initial view state only when selecting a different date
  useEffect(() => {
    if (currentLog?.isAnalyzed) {
      setViewState('CHAT');
    } else if (currentLog?.completed) {
      setViewState('SUCCESS');
    } else {
      setViewState('EDITING');
    }
  }, [currentDate]);

  const handleSectionChange = (key: keyof JournalSections, value: string) => {
    setLogs(prev => prev.map(l => 
      l.date === currentDate ? { ...l, sections: { ...l.sections, [key]: value }, completed: false } : l
    ));
  };

  const handleSave = () => {
    setLogs(prev => prev.map(l => 
      l.date === currentDate ? { ...l, completed: true } : l
    ));
    setViewState('SUCCESS');
  };

  const handleAnalyze = async () => {
    if (!currentLog) return;
    setIsLoading(true);
    try {
      const resultText = await analyzeJournal(currentLog.sections);
      const initialMessage: ChatMessage = { role: 'model', text: resultText };
      
      setLogs(prev => prev.map(l => 
        l.date === currentDate ? { 
          ...l, 
          isAnalyzed: true, 
          completed: true,
          chatHistory: [initialMessage] 
        } : l
      ));
      setViewState('CHAT');
    } catch (error) {
      console.error("Analysis failed", error);
      alert("分析失败，请检查网络连接。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (msg: string) => {
    if (!currentLog) return;

    // Optimistic update
    const userMsg: ChatMessage = { role: 'user', text: msg };
    setLogs(prev => prev.map(l => 
      l.date === currentDate ? { ...l, chatHistory: [...l.chatHistory, userMsg] } : l
    ));

    setIsLoading(true);
    try {
      const chat = startJournalChat(currentLog.chatHistory);
      const reply = await sendMessageToGemini(chat, msg);
      
      const modelMsg: ChatMessage = { role: 'model', text: reply };
      setLogs(prev => prev.map(l => 
        l.date === currentDate ? { ...l, chatHistory: [...l.chatHistory, modelMsg] } : l
      ));
    } catch (error) {
      console.error("Chat failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar 
        logs={logs} 
        currentDate={currentDate} 
        onSelectDate={setCurrentDate} 
      />
      
      <main className="flex-1 h-screen overflow-y-auto relative">
        {viewState === 'SUCCESS' ? (
          <SuccessView onBack={() => setViewState('EDITING')} />
        ) : viewState === 'CHAT' ? (
          <AIChat 
            history={currentLog?.chatHistory || []} 
            onSendMessage={handleSendMessage}
            onBack={() => setViewState('EDITING')}
            isTyping={isLoading}
          />
        ) : (
          currentLog && (
            <JournalEditor 
              sections={currentLog.sections} 
              onChange={handleSectionChange}
              onSave={handleSave}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          )
        )}
      </main>
    </div>
  );
};

export default App;
