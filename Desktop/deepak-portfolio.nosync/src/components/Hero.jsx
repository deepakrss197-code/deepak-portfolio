import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, stagger } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import Background3D from './Background3D';
import ProfileFrame from './ProfileFrame';

const MagneticWrapper = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isMobile = useIsMobile();
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!ref.current || isMobile) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.5); // Magnetic pull strength multiplier
    y.set(middleY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// Premium Hacker Glitch Text
const GlitchText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [complete, setComplete] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:"<>?~`-=[];,./';
  
  useEffect(() => {
    let iteration = 0;
    let interval = null;
    
    // Delay start for dramatic effect
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(text.split('').map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));
        
        if (iteration >= text.length) {
          clearInterval(interval);
          setComplete(true);
        }
        
        iteration += 1 / 3; // Slower reveal
      }, 30);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text]);

  return (
    <span className={`inline-block tracking-tight ${complete ? 'text-white text-glow-premium' : 'text-[#00ff9f]'}`}>
      {displayText}
    </span>
  );
};

// Premium Staggered Text Reveal
const StaggeredText = ({ text, className, isMobile }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.84 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: isMobile ? "none" : "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: isMobile ? 20 : 40,
      rotateX: isMobile ? 0 : -45,
      scale: isMobile ? 1 : 0.9,
      filter: isMobile ? "none" : "blur(8px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Lightweight Interactive Constellation/Particle System
const CustomParticles = () => {
  const [particles] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 3 + 1,
      velocity: { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 },
      duration: Math.random() * 10 + 10
    }))
  );
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none mix-blend-screen opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [0, p.velocity.x * 200, 0],
            y: [0, p.velocity.y * 200, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [time, setTime] = useState('');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`);
    };
    const timer = setInterval(updateTime, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      
      {/* 3D Background always runs in background */}
      <Background3D />
      
      {/* 2D Interactive Particle Layer */}
      {!isMobile && <CustomParticles />}

      <motion.div
        key="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full z-10"
      >
            {/* Live Terminal HUD - Edges */}
            <div className="absolute top-8 left-8 text-[#00ff9f] font-mono text-xs opacity-50 tracking-widest hidden md:block z-10">
              SYS.TIME(SYS_ACC_01) :: {time}
            </div>
            <div className="absolute top-8 right-8 text-[#00ff9f] font-mono text-xs opacity-50 tracking-widest hidden md:block text-right z-10">
              MEM_ALLOC :: [||||||||||--] 82%<br/>
              CPU_LOAD  :: [|||||-------] 45%
            </div>
            <div className="absolute bottom-8 left-8 text-[#00ff9f] font-mono text-xs opacity-30 tracking-widest hidden md:block z-10">
              LOC: /ROOT/CORE/HERO_V3
            </div>

            {/* Decorative moving orbs */}
            {!isMobile && (
              <>
                <motion.div 
                  animate={{ 
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.2, 0.8, 1]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00ff9f]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen z-0"
                />
                <motion.div 
                  animate={{ 
                    x: [0, -150, 100, 0],
                    y: [0, 150, -100, 0],
                    scale: [1, 1.5, 0.9, 1]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
                  className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00ff9f]/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0"
                />
              </>
            )}

            <div className="z-10 container mx-auto px-4 mt-20 md:mt-0 pb-12 pointer-events-none h-full flex items-center">
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">
                
                {/* Left Text Column - Wrapped in Premium Glass Container */}
                <div className="w-full lg:w-3/5 relative z-20 pointer-events-auto">
                  <div className="glassmorphism p-8 md:p-12 rounded-2xl relative overflow-hidden backdrop-blur-2xl">
                    {/* Glassmorphism internal shine */}
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                    
                    {/* Pulsating Radar Badge */}
                    <div className="relative inline-block mb-10">
                      <motion.div 
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-[#00ff9f]"
                      ></motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative px-6 py-2 rounded-full border border-[#00ff9f]/60 bg-[#00ff9f]/10 text-[#00ff9f] text-xs md:text-sm font-bold tracking-[0.4em] shadow-[0_0_30px_rgba(0,255,159,0.4)] backdrop-blur-md uppercase"
                      >
                        SYSTEM.INIT() // V3.0
                      </motion.div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,159,0.2)]">
                      <span className="block mb-2"><GlitchText text="Hi, I'm Deepak" /></span>
                      <StaggeredText isMobile={isMobile} text="CSE Student & Software Engineer" className="text-xl md:text-3xl lg:text-4xl text-gray-300 font-light tracking-wide mt-6 block" />
                    </h1>
                    
                    <motion.p 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed font-light bg-black/40 p-6 rounded-xl border-l-[3px] border-[#00ff9f] shadow-[inset_0_0_20px_rgba(0,255,159,0.05)]"
                    >
                      Building premium 3D cybernetic experiences & robust software architecture. 
                      Currently executing core development protocols.
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="flex flex-col sm:flex-row items-center justify-start gap-6 w-full max-w-md sm:max-w-none"
                    >
                      <MagneticWrapper className="w-full sm:w-auto">
                        <a 
                          href="#projects" 
                          className="block px-8 py-5 bg-[#050505]/80 backdrop-blur-xl border border-[#00ff9f]/50 text-[#00ff9f] hover:bg-[#00ff9f] hover:text-[#0a0a0a] transition-all duration-500 w-full md:w-[240px] text-center rounded-[4px] font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,159,0.2)] hover:shadow-[0_0_50px_rgba(0,255,159,0.8)] uppercase interactive group relative overflow-hidden"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12"></span>
                          <span className="relative z-10 text-lg">Initialize_Work</span>
                        </a>
                      </MagneticWrapper>
                      
                      <MagneticWrapper className="w-full sm:w-auto">
                        <a 
                          href="#contact" 
                          className="block px-8 py-5 bg-gradient-to-r from-[#00ff9f] to-[#00cc88] text-[#0a0a0a] hover:brightness-125 transition-all duration-300 w-full md:w-[240px] text-center rounded-[4px] font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,159,0.5)] hover:shadow-[0_0_50px_rgba(0,255,159,1)] uppercase interactive group relative overflow-hidden"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12"></span>
                          <span className="relative z-10 text-lg">Transmissions</span>
                        </a>
                      </MagneticWrapper>
                    </motion.div>
                  </div>
                </div>

                {/* Right Profile Frame Column */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
                  className="w-full lg:w-2/5 flex justify-center lg:justify-end relative z-20 perspective-1000"
                >
                  <motion.div
                    animate={{ y: [-15, 15, -15], rotateZ: [-1, 1, -1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full flex justify-center lg:justify-end"
                  >
                     <ProfileFrame />
                  </motion.div>
                </motion.div>

              </div>
            </div>

            {/* Hero Overlay Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.03)_1px,transparent_1px)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none z-0"></div>

            {/* Premium Scroll Down Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
            >
              <span className="text-[#00ff9f] text-xs font-bold tracking-[0.3em] uppercase">Scroll</span>
              <div className="w-[30px] h-[50px] rounded-full border-2 border-[#00ff9f]/50 flex justify-center p-1 shadow-[0_0_15px_rgba(0,255,159,0.3)] backdrop-blur-sm">
                <motion.div 
                  animate={{ y: [0, 24, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[4px] h-[8px] rounded-full bg-[#00ff9f] shadow-[0_0_8px_rgba(0,255,159,1)]"
                />
              </div>
            </motion.div>

            {/* Decorative corner accents */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute top-24 left-6 md:left-12 w-12 h-12 border-t-4 border-l-4 border-[#00ff9f]/40 hidden lg:block drop-shadow-[0_0_15px_rgba(0,255,159,0.6)]"></motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute top-24 right-6 md:right-12 w-12 h-12 border-t-4 border-r-4 border-[#00ff9f]/40 hidden lg:block drop-shadow-[0_0_15px_rgba(0,255,159,0.6)]"></motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-12 left-6 md:left-12 w-12 h-12 border-b-4 border-l-4 border-[#00ff9f]/40 hidden lg:block drop-shadow-[0_0_15px_rgba(0,255,159,0.6)]"></motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-12 right-6 md:right-12 w-12 h-12 border-b-4 border-r-4 border-[#00ff9f]/40 hidden lg:block drop-shadow-[0_0_15px_rgba(0,255,159,0.6)]"></motion.div>
          </motion.div>
      
    </section>
  );
};

export default Hero;
