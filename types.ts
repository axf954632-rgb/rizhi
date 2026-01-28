
export interface JournalSections {
  happy: string;
  fulfilling: string;
  improvement: string;
  reflection: string;
  gratitude: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface JournalLog {
  date: string; // ISO Date String YYYY-MM-DD
  sections: JournalSections;
  isAnalyzed: boolean;
  chatHistory: ChatMessage[];
  completed: boolean;
}

export type ViewState = 'EDITING' | 'SUCCESS' | 'CHAT';
