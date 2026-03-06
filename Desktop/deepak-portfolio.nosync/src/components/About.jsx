import React, { useRef, Suspense } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import useIsMobile from '../hooks/useIsMobile';
import TechCore3D from './TechCore3D';

// Premium Word-by-Word Reveal on Scroll
const WordReveal = ({ text, className, isMobile }) => {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: isMobile ? 0 : 10, filter: isMobile ? "none" : "blur(4px)" },
            visible: { 
              opacity: 1, 
              y: 0, 
              filter: isMobile ? "none" : "blur(0px)",
              transition: { type: "spring", stiffness: 100, damping: 20 }
            }
          }}
          // Keep HTML styling for specific spans if they were passed in as raw text
          dangerouslySetInnerHTML={{ __html: word }}
        />
      ))}
    </motion.p>
  );
};

const SkillBar = ({ skill, level, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
    className="mb-6 relative group"
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm font-mono tracking-widest text-gray-400 group-hover:text-white transition-colors">{skill}</span>
      <span className="text-sm font-bold font-mono tracking-wider text-[#00ff9f] drop-shadow-[0_0_8px_rgba(0,255,159,0.8)]">{level}%</span>
    </div>
    <div className="w-full bg-[#111] border border-white/5 rounded-none h-1.5 overflow-hidden">
      <motion.div
        className="bg-[#00ff9f] h-full relative"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.175, 0.885, 0.32, 1.275], delay: 0.8 }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/80 blur-[2px]"></div>
        {/* Animated glowing tail */}
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 h-full w-2 bg-white shadow-[0_0_10px_#fff,0_0_20px_#00ff9f]"
        ></motion.div>
      </motion.div>
    </div>
  </motion.div>
);

// Feature 14: 3D Hologram Tilt Container
const HolographicCard = ({ children, className }) => {
  const ref = useRef(null);

  // Simplified state instead of raw framer motion values for the glare
  // This prevents React 19 / framer motion 11 complex hook crashes
  const [glarePosition, setGlarePosition] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setGlarePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setGlarePosition({ x: 50, y: 50 });
  };

  // Convert glare position to rotation mapping (-15 to +15 deg)
  const rotateY = `${((glarePosition.x - 50) / 50) * 15}deg`;
  const rotateX = `${-((glarePosition.y - 50) / 50) * 15}deg`;
  
  // Convert glare position to background position mapping
  const glareX = `${glarePosition.x}%`;
  const glareY = `${glarePosition.y}%`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      {/* Premium BG Mesh for Depth */}
      <div className="absolute inset-0 z-0 bg-mesh-gradient opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-screen scale-110"></div>
      
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-500 mix-blend-screen overflow-hidden rounded-none"
        style={{
          background: `radial-gradient(circle 250px at ${glareX} ${glareY}, rgba(0,255,159,0.3), transparent 80%)`
        }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Apply a smooth spring to the scroll physics for heavier UX
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Unique intense downward plunging animations
  const plungeY = useTransform(smoothProgress, [0, 0.5], [-150, 0]);
  const plungeScale = useTransform(smoothProgress, [0, 0.4], [0.8, 1]);
  const plungeOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);

  // Sharp staggered scroll
  const textY = useTransform(smoothProgress, [0.2, 0.6], [100, 0]);
  const cardY = useTransform(smoothProgress, [0.3, 0.7], [150, 0]);

  const skills = [
    { name: "Python & Java / DSA", level: 90 },
    { name: "JavaScript & React", level: 85 },
    { name: "HTML & Custom CSS", level: 95 },
    { name: "Git & Version Control", level: 80 },
    { name: "Web App Architecture", level: 75 }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Background Sharp Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center opacity-10">
         <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#00ff9f] to-transparent"></div>
         <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#00ff9f] to-transparent ml-64"></div>
         <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#00ff9f] to-transparent mr-64"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4">
        
        {/* Dynamic Plunging Header */}
        <motion.div
          style={isMobile ? {} : { y: plungeY, scale: plungeScale, opacity: plungeOpacity }}
          className="mb-24 flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-[1px] bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"></div>
            <span className="text-[#00ff9f] font-mono tracking-[0.4em] text-sm font-bold uppercase">System Profile</span>
            <div className="w-16 h-[1px] bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl">
            About <span className="text-gradient-liquid">Entity</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto perspective-[2000px]">
          
          {/* Bio text - Sharp Reveal */}
          <motion.div
            style={isMobile ? {} : { y: textY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative"
          >
            {/* Sharp accent line */}
            <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-[#00ff9f] to-transparent hidden md:block"></div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 w-full mb-12">
              
              <HolographicCard className="w-56 h-56 md:w-72 md:h-72 shrink-0 bg-[#020202] border border-[#00ff9f]/20 hover:border-[#00ff9f]/60 transition-colors duration-500 mx-auto md:mx-0 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                {/* HUD Corner Targeting Brackets */}
                <div style={{ transform: "translateZ(30px)" }} className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#00ff9f]/80 z-20 group-hover:-translate-x-3 group-hover:-translate-y-3 transition-transform duration-500 shadow-[0_0_15px_rgba(0,255,159,0.8)]"></div>
                <div style={{ transform: "translateZ(30px)" }} className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#00ff9f]/80 z-20 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500 shadow-[0_0_15px_rgba(0,255,159,0.8)]"></div>
                <div style={{ transform: "translateZ(30px)" }} className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#00ff9f]/80 z-20 group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform duration-500 shadow-[0_0_15px_rgba(0,255,159,0.8)]"></div>
                <div style={{ transform: "translateZ(30px)" }} className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#00ff9f]/80 z-20 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500 shadow-[0_0_15px_rgba(0,255,159,0.8)]"></div>
                
                {/* Floating System Data */}
                <div style={{ transform: "translateZ(50px)" }} className="absolute -left-16 top-1/2 -translate-y-1/2 rotate-[-90deg] text-[#00ff9f]/50 font-mono text-[10px] tracking-[0.3em] font-bold group-hover:text-[#00ff9f] transition-colors duration-500 z-30">
                  ID:DEEPAK_KUMAR
                </div>

                <div style={{ transform: "translateZ(60px)" }} className="absolute -top-6 right-0 bg-[#00ff9f]/10 px-2 py-1 text-[#00ff9f] font-mono text-[9px] tracking-widest border border-[#00ff9f]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <span className="inline-block w-1.5 h-1.5 bg-[#00ff9f] rounded-full mr-2 animate-pulse"></span>
                  SCAN_COMPLETE
                </div>

                {/* Actual Image container with deep 3D Pop */}
                <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden group-hover:shadow-[inset_0_0_80px_rgba(0,255,159,0.3)] transition-shadow duration-500" style={{ transform: "translateZ(10px)" }}>
                   <img 
                      src="/profile.png?v=2" 
                      alt="Deepak Kumar" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 filter contrast-125 grayscale group-hover:grayscale-0"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='%2300ff9f' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                      }}
                   />
                   
                   {/* Intense Heavy Laser Scanner */}
                   <motion.div 
                     animate={{ y: ["-50%", "250%"] }}
                     transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-0 left-0 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                     style={{ transform: "translateZ(40px)" }}
                   >
                     <div className="w-full h-[3px] bg-[#00ff9f] shadow-[0_0_20px_rgba(0,255,159,1)]"></div>
                     <div className="w-full h-32 bg-gradient-to-b from-[#00ff9f]/40 to-transparent"></div>
                   </motion.div>
                   
                   {/* Static CRT Scanlines */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.6)_50%,transparent_50%)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none opacity-50 z-10" style={{ transform: "translateZ(80px)" }}></div>
                </div>
              </HolographicCard>

              <div className="space-y-6 flex-1">
                <WordReveal 
                  isMobile={isMobile}
                  className="text-gray-300 text-lg md:text-xl leading-[1.8] font-light tracking-wide"
                  text={`INITIALIZING_ Hello world. I am Deepak, a Computer Science Engineering student obsessed with engineering high-performance digital experiences and robust architectures.`}
                />
                <WordReveal 
                  isMobile={isMobile}
                  className="text-gray-400 text-base md:text-lg leading-[1.8] font-light"
                  text={`I specialize in bridging the gap between absolute, sharp frontend aesthetics and efficient backend data processing. When my local servers aren't running, you will find me optimizing sorting algorithms or deep diving into system level networking.`}
                />
              </div>
            </div>
            
            <motion.div 
               whileHover={{ x: 10, scale: 1.02 }}
               className="group relative inline-flex items-center gap-4 text-[#00ff9f] mt-8 p-5 bg-[#00ff9f]/5 rounded-none interactive transition-all cursor-pointer overflow-hidden border border-transparent shadow-[inset_0_0_20px_rgba(0,255,159,0.05)]"
            >
              {/* Animated premium border orbit */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                 <div className="absolute top-0 -left-full w-[50%] h-[2px] bg-linear-to-r from-transparent via-neon-green to-transparent group-hover:animate-[shimmer_2s_infinite]"></div>
                 <div className="absolute bottom-0 -right-full w-[50%] h-[2px] bg-linear-to-r from-transparent via-neon-green to-transparent group-hover:animate-[shimmer_2s_infinite_reverse]"></div>
              </div>
              <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 border border-neon-green/30"></div>
              
              <Terminal size={24} className="relative z-10 group-hover:animate-pulse" />
              <div className="flex flex-col relative z-10">
                <span className="font-mono text-xs text-gray-500 mb-1 tracking-widest group-hover:text-gray-400 transition-colors">CURRENT DIRECTIVE</span>
                <span className="font-mono text-sm tracking-[0.2em] font-bold drop-shadow-[0_0_8px_rgba(0,255,159,0)] group-hover:drop-shadow-[0_0_8px_rgba(0,255,159,0.5)] transition-all">SEEKING INTERNSHIP</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column - Skills Card */}
          <motion.div style={{ y: cardY }}>
             <HolographicCard className="backdrop-blur-2xl bg-[#080808]/90 border border-white/5 p-10 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:border-[#00ff9f]/50 transition-colors duration-700">
               {/* Sharp Corner Accents */}
               <div style={{ transform: "translateZ(20px)" }} className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00ff9f]/50 pointer-events-none z-20"></div>
               <div style={{ transform: "translateZ(20px)" }} className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00ff9f]/50 pointer-events-none z-20"></div>

               {/* Premium Glossy overlay */}
               <div style={{ transform: "translateZ(10px)" }} className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/80 opacity-50 pointer-events-none z-0"></div>
               
               {/* 3D Tech Core Canvas Background */}
               {!isMobile && (
                 <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none mix-blend-screen scale-110 -translate-z-10">
                   <Canvas dpr={[1, 1.5]} eventSource={typeof window !== 'undefined' ? document.getElementById('root') : undefined} eventPrefix="client" camera={{ position: [0, 0, 8] }}>
                     <ambientLight intensity={0.5} />
                     <directionalLight position={[10, 10, 5]} intensity={1} color="#00ff9f" />
                     <Suspense fallback={null}>
                       <TechCore3D />
                     </Suspense>
                   </Canvas>
                 </div>
               )}

               <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#00ff9f]/10 blur-[100px] rounded-full group-hover:bg-[#00ff9f]/20 transition-all duration-1000 pointer-events-none z-0"></div>
               
               <div style={{ transform: "translateZ(40px)" }} className="flex items-center gap-3 mb-10 border-b border-white/10 pb-5 relative z-10 w-full">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 bg-[#ef4444] shadow-[0_0_10px_#ef4444]"></div>
                    <div className="w-2.5 h-2.5 bg-[#eab308] shadow-[0_0_10px_#eab308]"></div>
                    <div className="w-2.5 h-2.5 bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"></div>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
                  <span className="text-xs text-gray-400 font-mono tracking-[0.3em] uppercase opacity-70">modules/skills.exe</span>
               </div>

               <div style={{ transform: "translateZ(60px)" }} className="space-y-2 relative z-10">
                 {skills.map((skill, index) => (
                   <SkillBar key={index} skill={skill.name} level={skill.level} index={index} />
                 ))}
               </div>
               
               {/* Scanline overlay for hacker feel */}
               <div style={{ transform: "translateZ(80px)" }} className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20 opacity-30 mix-blend-overlay"></div>
             </HolographicCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
