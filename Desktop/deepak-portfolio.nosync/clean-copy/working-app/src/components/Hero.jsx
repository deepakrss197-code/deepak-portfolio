import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const fullText = "Hi, I'm Deepak — CSE Student | Future Software Engineer";
  
  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [text]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-grid">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff9f]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="z-10 text-center max-w-4xl mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#00ff9f]/30 bg-[#00ff9f]/10 text-[#00ff9f] text-sm font-semibold tracking-wider">
            SYSTEM.INIT()
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow leading-tight">
            {text}
            <span className={`inline-block w-3 md:w-5 h-8 md:h-14 bg-[#00ff9f] ml-2 align-middle ${isTyping ? '' : 'animate-pulse'}`}></span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Building premium cybernetic experiences & robust software architecture. 
            Currently executing learning protocols in computer science.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-[#0a0a0a] border border-[#00ff9f] text-[#00ff9f] hover:-translate-y-1 hover:box-glow transition-all duration-300 w-full sm:w-auto text-center uppercase tracking-widest font-bold"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-[#00ff9f] text-[#0a0a0a] hover:-translate-y-1 hover:bg-white transition-all duration-300 w-full sm:w-auto text-center uppercase tracking-widest font-bold font-sans"
            >
              Initiate Contact
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-24 left-6 md:left-12 w-8 h-8 border-t-2 border-l-2 border-[#00ff9f]/30"></div>
      <div className="absolute top-24 right-6 md:right-12 w-8 h-8 border-t-2 border-r-2 border-[#00ff9f]/30"></div>
      <div className="absolute bottom-12 left-6 md:left-12 w-8 h-8 border-b-2 border-l-2 border-[#00ff9f]/30"></div>
      <div className="absolute bottom-12 right-6 md:right-12 w-8 h-8 border-b-2 border-r-2 border-[#00ff9f]/30"></div>
      
    </section>
  );
};

export default Hero;
