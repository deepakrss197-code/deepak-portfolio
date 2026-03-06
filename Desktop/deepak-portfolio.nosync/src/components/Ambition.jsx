import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Ambition = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="ambition" className="py-32 relative overflow-hidden bg-[#020202]" ref={containerRef}>
      
      {/* Deep Space Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ff9f]/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,159,0.03)_0%,transparent_70%)]"></div>
        
        {/* Animated laser lines */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00ff9f]/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00ff9f]/20 to-transparent"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-12 max-w-5xl">
        <motion.div
          style={{ y: headerY, opacity }}
          className="mb-16 flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-[1px] bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"></div>
            <span className="text-[#00ff9f] font-mono tracking-[0.4em] text-sm font-bold uppercase">Vision.Execute</span>
            <div className="w-16 h-[1px] bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl mb-8">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00ff9f] to-[#008855]">Ambition</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ y: contentY, opacity }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff9f]/0 via-[#00ff9f]/20 to-[#00ff9f]/0 blur-sm rounded-lg opacity-50"></div>
          
          <div className="relative p-10 md:p-16 backdrop-blur-3xl bg-[#050505]/80 border border-[#00ff9f]/20 shadow-[0_0_50px_rgba(0,255,159,0.05)] overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00ff9f]/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00ff9f]/50"></div>
            
            {/* Scanline overlay inside card */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.02)_1px,transparent_1px)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              <p className="text-xl md:text-3xl leading-[1.6] text-gray-200 font-light tracking-wide text-center">
                “My long-term vision is to architect <span className="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">global-scale software systems</span> that drive tangible impact.”
              </p>
              
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#00ff9f] to-transparent mx-auto opacity-50"></div>

              <p className="text-gray-400 text-lg md:text-xl leading-[1.8] font-light text-center max-w-3xl mx-auto">
                I am driven by the complex challenges of scalability, fault tolerance, and pushing the extreme boundaries of web optimization. I don't just want to write code; I aim to be a core engineering contributor who solves deeply meaningful problems. 
              </p>

              <div className="pt-8 flex flex-wrap justify-center gap-4">
                 {['Highly Concurrent APIs', 'Zero-Latency UX', 'Scalable Architectures', 'Relentless Innovation'].map((item, i) => (
                    <div key={i} className="px-4 py-2 bg-[#00ff9f]/5 border border-[#00ff9f]/30 text-[#00ff9f] font-mono text-xs tracking-widest uppercase hover:bg-[#00ff9f] hover:text-[#050505] transition-all duration-300 interactive cursor-default pointer-events-auto">
                       {item}
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ambition;
