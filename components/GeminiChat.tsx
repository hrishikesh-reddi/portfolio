
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Command, User } from 'lucide-react';
import { chatWithHrishikesh } from '../services/geminiService';
import { Message } from '../types';

const SUGGESTED_QUESTIONS = [
  "Multimodal AI Stack",
  "UAV PID Control",
  "Cybersecurity Focus",
  "Education Background"
];

export const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hrishikesh's digital shadow is active. I can detail his experience with LLM agents, Quantum sims, or his work at Mahindra University. How shall we proceed?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);
    const response = await chatWithHrishikesh(textToSend);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <section className="py-24 border-b border-magazine">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] opacity-40 mb-10">Liaison Service</h3>
            <h2 className="font-serif text-4xl font-bold tracking-tighter mb-6">Automated Liaison</h2>
            <p className="text-sm font-serif italic text-ink/60 dark:text-white/60 leading-relaxed max-w-xs">
              Direct access to a specialized model calibrated on Hrishikesh's project history, academic achievements, and technical roadmap.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.2em] opacity-20">
            <Command size={10} /> <span>Press Enter to Send Inquiry</span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border border-magazine rounded-sm overflow-hidden bg-white/30 dark:bg-zinc-900/30 backdrop-blur-md shadow-2xl">
            <div 
              ref={scrollRef}
              className="h-[400px] overflow-y-auto p-8 lg:p-12 space-y-8 scroll-smooth"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="shrink-0 pt-1">
                      {msg.role === 'user' ? <User size={14} className="opacity-40" /> : <Bot size={14} className="text-accent" />}
                    </div>
                    <div className={`text-sm font-serif leading-relaxed max-w-[85%] ${msg.role === 'user' ? 'text-right italic text-accent' : 'text-ink/80 dark:text-white/80'}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex gap-4 items-center opacity-40">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(d => (
                      <motion.div 
                        key={d}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        className="w-1 h-1 bg-current rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest">Synthesizing...</span>
                </div>
              )}
            </div>

            <div className="border-t border-magazine p-8 bg-paper/50 dark:bg-paper-dark/50 transition-colors duration-500">
              <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
                 {SUGGESTED_QUESTIONS.map((q, idx) => (
                   <button 
                     key={idx}
                     onClick={() => handleSend(q)}
                     className="shrink-0 px-4 py-2 border border-magazine rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper dark:hover:bg-white dark:hover:text-ink transition-all shadow-sm"
                   >
                     {q}
                   </button>
                 ))}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about specific stack or research..."
                  className="w-full bg-transparent border-b border-magazine py-4 text-sm font-serif italic focus:outline-none focus:border-accent transition-colors"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-accent transition-colors disabled:opacity-20"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
