
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { JournalSections, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `你是一位专业且温暖的心理咨询师和生活教练。
你的任务是分析用户的每日日志并与之交流。
日志包含五个板块：让我感到开心的事、让我感到充实的事、可以改进的事、思考、感谢。
请根据这些内容提供深刻的洞察、鼓励以及建设性的建议。
保持回应的共情性、简洁且富有启发性。
如果用户是第一次上传分析，请先对整篇日志做一个简短而温馨的总评。`;

export const analyzeJournal = async (sections: JournalSections): Promise<string> => {
  const prompt = `这是我今天的日志内容：
  1. 让我感到开心的事：${sections.happy}
  2. 让我感到充实的事：${sections.fulfilling}
  3. 可以改进的事：${sections.improvement}
  4. 思考：${sections.reflection}
  5. 感谢：${sections.gratitude}

  请分析我的状态并给我一些反馈。`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return response.text || "抱歉，分析过程中出现了点问题，请稍后再试。";
};

export const startJournalChat = (history: ChatMessage[]): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.8,
    },
    // Convert history to compatible format if needed, but for simple chat:
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  const response = await chat.sendMessage({ message });
  return response.text || "AI 暂时无法回应。";
};
