import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, MessageSquare, Send } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "System initialized. I am Deepak's AI assistant. Type 'help' to see what I can do.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (userInput) => {
    const text = userInput.toLowerCase();
    
    if (text.includes('help')) return "Available commands: 'skills', 'contact', 'hire', 'projects', 'about'. Try asking 'What are your skills?'";
    if (text.includes('skill')) return "Deepak is highly proficient in C, C++, Python, Data Structures & Algorithms, React, Node.js, and modern web development.";
    if (text.includes('contact')) return "You can reach Deepak at hello@deepak.dev or use the contact form on this page.";
    if (text.includes('hire') || text.includes('intern')) return "Deepak is currently actively seeking internship and full-time opportunities! His problem-solving skills and quick learning ability make him a great asset.";
    if (text.includes('project')) return "Deepak has built several premium projects including a Neon E-Commerce platform and an Algorithmic Trading Bot. Scroll up to see more.";
    if (text.includes('about') || text.includes('who')) return "Deepak is a Computer Science Engineering student passionate about building highly optimized, cyberpunk-aesthetic software.";
    
    const randomResponses = [
      "Processing query... I'm not sure about that. Try asking about skills or projects.",
      "Access denied. Just kidding. But please ask about Deepak's portfolio.",
      "My natural language processing module suggests asking about Deepak's tech stack instead."
    ];
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking/bot response
    setTimeout(() => {
      const response = generateResponse(userMsg);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#0a0a0a] border border-[#00ff9f] rounded-full flex items-center justify-center text-[#00ff9f] z-50 hover:bg-[#00ff9f] hover:text-[#0a0a0a] transition-colors duration-300 box-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 50 : 0, pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <Terminal size={24} />
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 bg-[#0a0a0a] border-2 border-[#00ff9f] rounded-xl z-50 overflow-hidden shadow-[0_0_30px_rgba(0,255,159,0.2)] flex flex-col h-[500px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] border-b border-[#00ff9f]/30 p-4 flex justify-between items-center text-[#00ff9f]">
              <div className="flex items-center gap-2 font-mono text-sm tracking-widest font-bold">
                <Terminal size={18} />
                DEEPAK_AI_v1.0
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a] font-mono text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded ${
                      msg.isBot 
                        ? 'bg-[#1a1a1a] border border-[#00ff9f]/20 text-gray-300' 
                        : 'bg-[#00ff9f]/10 border border-[#00ff9f]/50 text-[#00ff9f]'
                    }`}
                  >
                    {msg.isBot && <span className="text-[#00ff9f] text-xs font-bold block mb-1">&gt; SYSTEM:</span>}
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-[#00ff9f]/20 text-[#00ff9f] max-w-[85%] p-3 rounded">
                    <span className="text-xs font-bold block mb-1">&gt; SYSTEM:</span>
                    <span className="animate-pulse">Generating response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-[#1a1a1a] border-t border-[#00ff9f]/30 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#00ff9f]"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-[#00ff9f] text-[#0a0a0a] p-2 rounded hover:bg-white transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
