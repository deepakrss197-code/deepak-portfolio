import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
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
    if (text.includes('skill')) return "Deepak is highly proficient in Python, Java, JavaScript, React, HTML/CSS, Git, and Data Structures & Algorithms.";
    if (text.includes('contact')) return "You can reach Deepak at deepakrss197@email.com or use the contact form on this page.";
    if (text.includes('hire') || text.includes('intern')) return "Deepak is currently actively seeking internship and full-time opportunities! His problem-solving skills and quick learning ability make him a great asset.";
    if (text.includes('project')) return "Deepak's engineering projects include a High-Concurrency Code Editor, a Distributed Microservices API, an Algorithmic Visualizer, and a Sandboxed Execution Engine. Scroll up to see the Featured Builds section.";
    if (text.includes('about') || text.includes('who')) return "Deepak is a Computer Science Engineering student passionate about building highly optimized, cyberpunk-aesthetic software and preparing for GSoC.";
    
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
      {/* Reactor Core Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-20 h-20 rounded-full flex items-center justify-center text-[#00ff9f] z-50 transition-all duration-300 interactive group pointer-events-auto"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 50 : 0, scale: isOpen ? 0.5 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Core background glow */}
        <div className="absolute inset-0 bg-[#00ff9f]/20 blur-xl rounded-full group-hover:bg-[#00ff9f]/40 transition-colors duration-500"></div>
        
        {/* Outer rotating ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-[#00ff9f]/30 border-dashed rounded-full group-hover:border-[#00ff9f]/80"
        ></motion.div>
        
        {/* Inner rotating ring (opposite direction) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-2 border-[#00ff9f]/50 border-dotted rounded-full"
        ></motion.div>

        {/* Solid Core Center */}
        <div className="relative w-12 h-12 bg-[#0a0a0a] border-2 border-[#00ff9f] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,159,1)] overflow-hidden">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.2)_1px,transparent_1px)] bg-[length:100%_4px] mix-blend-overlay"></div>
           <Terminal size={24} className="text-[#00ff9f] drop-shadow-[0_0_8px_rgba(0,255,159,1)] z-10" />
        </div>
      </motion.button>

      {/* Cyberpunk CRT Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scaleY: 0.1, y: 100, rotateX: -90 }}
            animate={{ opacity: 1, height: '550px', scaleY: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, height: 0, scaleY: 0.1, y: 100, rotateX: 90 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
            style={{ transformOrigin: "bottom center", perspective: 1000 }}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-80 md:w-[420px] bg-[#050505]/90 backdrop-blur-2xl z-50 overflow-hidden shadow-[0_0_50px_rgba(0,255,159,0.15)] flex flex-col max-h-[85vh] border-2 border-[#00ff9f]/50 rounded-sm"
          >
            {/* Header CRT Glitch */}
            <div className="bg-[#00ff9f] p-4 flex justify-between items-center text-[#0a0a0a] relative overflow-hidden shrink-0">
              {/* Scanline effect on header */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[length:100%_3px] mix-blend-overlay pointer-events-none"></div>
              
              <div className="flex items-center gap-3 font-mono text-sm tracking-widest font-black z-10 uppercase">
                <Terminal size={20} className="animate-pulse" />
                D.E.E.P.A.K [AI CO-PILOT]
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#0a0a0a]/70 hover:text-white hover:bg-black/20 transition-all z-10 rounded-sm p-1"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#020202] font-mono text-sm shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.isBot ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-sm shadow-lg border-[1px] ${
                      msg.isBot 
                        ? 'bg-[#0a0a0a]/90 border-[#00ff9f]/30 border-l-4 border-l-[#00ff9f] text-gray-300' 
                        : 'bg-[#00ff9f]/10 border-[#00ff9f]/20 border-r-4 border-r-[#00ff9f] text-[#00ff9f]'
                    }`}
                  >
                    {msg.isBot && <span className="text-[#00ff9f] text-[10px] font-black block mb-2 tracking-[0.2em] border-b border-[#00ff9f]/20 pb-1">ROOT@DEEPAK_SYSTEM:~#</span>}
                    <span className="leading-relaxed whitespace-pre-wrap">{msg.text}</span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0a0a0a]/90 border-[1px] border-[#00ff9f]/30 border-l-4 border-l-[#00ff9f] text-[#00ff9f] max-w-[85%] p-4 rounded-sm shadow-lg w-full">
                    <span className="text-[10px] font-black block mb-2 tracking-[0.2em] border-b border-[#00ff9f]/20 pb-1">ROOT@DEEPAK_SYSTEM:~#</span>
                    <div className="font-mono text-xs opacity-80 flex flex-col gap-1 overflow-hidden h-[40px] relative">
                        <motion.div
                           animate={{ y: [0, -40] }}
                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                           className="flex flex-col"
                        >
                            <span>[0x1A4] DECRYPTING_STR...</span>
                            <span>[0x1B1] BYPASS_SEC_LAYERS...</span>
                            <span>[0x1C2] INJECT_PAYLOAD...</span>
                            <span>[0x1D9] ACCESS_GRANTED_</span>
                            <span>[0x1A4] DECRYPTING_STR...</span>
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="bg-[#050505] p-4 border-t-2 border-[#00ff9f]/30 flex gap-3 relative z-10 shrink-0">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Initialize command sequence..."
                className="flex-1 bg-[#111111] border border-[#00ff9f]/30 rounded-full px-5 py-3 text-white font-mono text-xs md:text-sm focus:outline-none focus:border-[#00ff9f] focus:shadow-[0_0_15px_rgba(0,255,159,0.3)] transition-all z-10"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-[#00ff9f] text-[#0a0a0a] p-3 rounded-full hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-[#00ff9f] shadow-[0_0_15px_rgba(0,255,159,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] z-10 interactive"
              >
                <Send size={20} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
