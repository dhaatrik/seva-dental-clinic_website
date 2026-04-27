
import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import { ChatBotIcon, SendIcon, XIcon, ChatHeaderIcon } from './IconComponents';
import { getChatbotResponse } from '../services/geminiService';
import { PHONE_NUMBER } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import Tooltip from './Tooltip';
import { useTranslation } from 'react-i18next';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundCount, setNotFoundCount] = useState(0);
  const [isEscalated, setIsEscalated] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t('chatbot.initialMessage', { defaultValue: "Hello! I'm the Smile Guide. How can I help you on your adventure today?" }) }]);
    }
  }, [t, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading, isEscalated]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPhone.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: userPhone }, { role: 'model', text: `Thank you. Our front desk will call you at ${userPhone} shortly.` }]);
    setUserPhone('');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const currentInput = userInput;
    const lowerInput = currentInput.toLowerCase();
    
    // Check for escalation triggers
    if (lowerInput.includes('human') || lowerInput.includes('emergency')) {
      const newMessages: Message[] = [...messages, { role: 'user', text: currentInput }];
      setMessages([...newMessages, { role: 'model', text: t('chatbot.handoffMessage', { defaultValue: "I'm sorry, I'm having trouble answering that. Would you like our human team to call you? Please enter your phone number if it's an emergency or urgent." }) }]);
      setUserInput('');
      setIsEscalated(true);
      return;
    }

    const newMessages: Message[] = [...messages, { role: 'user', text: currentInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const history = messages.map(({ role, text }) => ({ role, text }));
    let botResponse = await getChatbotResponse(history, currentInput);
    
    let currentNotFoundCount = notFoundCount;
    if (botResponse.includes('[NOT_FOUND]')) {
      botResponse = botResponse.replace('[NOT_FOUND]', '').trim();
      currentNotFoundCount++;
      setNotFoundCount(currentNotFoundCount);
    } else {
      setNotFoundCount(0); // Reset on success
    }

    if (currentNotFoundCount >= 2) {
      setIsEscalated(true);
      botResponse += " " + t('chatbot.handoffMessage', { defaultValue: "Would you like our human team to call you? Please enter your phone number." });
    }
    
    setMessages([...newMessages, { role: 'model', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      <Tooltip text={isOpen ? t('chatbot.closeChat', { defaultValue: "Close Chat" }) : t('chatbot.openChat', { defaultValue: "Chat with Smile Guide" })} position="left">
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-gentle-green to-gentle-green/90 text-pure-white rounded-full shadow-[0_8px_30px_rgb(26,54,45,0.3)] flex items-center justify-center transform hover:scale-110 hover:shadow-[0_12px_40px_rgb(26,54,45,0.4)] transition-all duration-500 z-50 focus:outline-none focus:ring-4 focus:ring-gentle-green/30 group"
          aria-label={t('chatbot.openChatAria', { defaultValue: "Open Smile Guide chat" })}
        >
          <div className="absolute inset-0 rounded-full bg-gentle-green/20 animate-ping opacity-75"></div>
          <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
            {isOpen ? <XIcon className="w-8 h-8" /> : <ChatBotIcon className="w-8 h-8" />}
          </div>
        </button>
      </Tooltip>

      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[calc(100%-3rem)] sm:w-[400px] h-[65vh] max-h-[700px] z-50 animate-fade-in-up origin-bottom-right">
            <div className="bg-pure-white h-full rounded-3xl shadow-2xl flex flex-col border border-gentle-green/10 overflow-hidden">
                <header className="bg-gradient-to-r from-gentle-green to-gentle-green/90 text-pure-white p-5 flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center space-x-3">
                        <div className="bg-pure-white/20 p-2 rounded-full backdrop-blur-sm">
                          <ChatHeaderIcon className="w-6 h-6 text-warm-coral"/>
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-lg tracking-wide">{t('chatbot.title', { defaultValue: 'Smile Guide' })}</h2>
                          <p className="text-xs font-body opacity-80">{t('chatbot.status', { defaultValue: 'Online & ready to help' })}</p>
                        </div>
                    </div>
                    <Tooltip text={t('chatbot.closeChat', { defaultValue: "Close chat" })} position="bottom">
                      <button onClick={toggleChat} aria-label={t('chatbot.closeChat', { defaultValue: "Close chat" })} className="p-2 rounded-full hover:bg-pure-white/20 transition-colors"><XIcon className="w-5 h-5" /></button>
                    </Tooltip>
                </header>

                <div className="flex-grow p-5 overflow-y-auto bg-calm-blue/5 scrollbar-thin scrollbar-thumb-gentle-green/20 scrollbar-track-transparent">
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-warm-coral text-primary-text rounded-br-sm' : 'bg-pure-white text-primary-text rounded-bl-sm border border-gentle-green/5'}`}>
                                    <p className="text-sm whitespace-pre-wrap font-body leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[85%] px-5 py-4 rounded-2xl bg-pure-white text-primary-text rounded-bl-sm border border-gentle-green/5 shadow-sm flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gentle-green/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gentle-green/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gentle-green/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <footer className="p-4 bg-pure-white border-t border-gentle-green/10 z-10">
                    {isEscalated ? (
                      <form onSubmit={handlePhoneSubmit} className="flex items-center space-x-3">
                          <input
                              type="tel"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              placeholder={t('chatbot.phonePlaceholder', { defaultValue: "Enter phone number" })}
                              className="flex-grow px-5 py-3 bg-calm-blue/10 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-gentle-green/50 focus:bg-pure-white text-primary-text placeholder:text-secondary-text/60 font-body text-sm transition-all"
                              disabled={isLoading}
                              aria-label="Phone input"
                          />
                          <Tooltip text={t('chatbot.sendTooltip', { defaultValue: "Send" })} position="top">
                              <button
                                  type="submit"
                                  disabled={isLoading || !userPhone.trim()}
                                  className="w-12 h-12 bg-warm-coral text-pure-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 hover:shadow-md transition-all transform active:scale-95"
                                  aria-label="Send phone number"
                              >
                                  <SendIcon className="w-5 h-5 ml-1"/>
                              </button>
                          </Tooltip>
                      </form>
                    ) : (
                      <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                          <input
                              type="text"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              placeholder={t('chatbot.placeholder', { defaultValue: "Type your message..." })}
                              className="flex-grow px-5 py-3 bg-calm-blue/10 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-gentle-green/50 focus:bg-pure-white text-primary-text placeholder:text-secondary-text/60 font-body text-sm transition-all"
                              disabled={isLoading}
                              aria-label={t('chatbot.inputAria', { defaultValue: "Chat input" })}
                          />
                          <Tooltip text={t('chatbot.sendTooltip', { defaultValue: "Send message" })} position="top">
                              <button
                                  type="submit"
                                  disabled={isLoading || !userInput.trim()}
                                  className="w-12 h-12 bg-gentle-green text-pure-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 hover:shadow-md transition-all transform active:scale-95"
                                  aria-label={t('chatbot.sendAria', { defaultValue: "Send message" })}
                              >
                                  <SendIcon className="w-5 h-5 ml-1"/>
                              </button>
                          </Tooltip>
                      </form>
                    )}
                </footer>
            </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;