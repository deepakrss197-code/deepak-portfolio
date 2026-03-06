import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, Github, Linkedin } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

// Feature 13: Magnetic Button Physics
const MagneticLink = ({ children, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouse = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  if (isMobile) {
    return (
      <a href={href} className="text-gray-400 hover:text-white transition-colors duration-300 relative px-4 py-2 block">
        <span className="relative z-10 text-sm font-bold tracking-widest uppercase">{children}</span>
      </a>
    );
  }

  return (
    <div className="magnetic-bounds" onMouseMove={handleMouse} onMouseLeave={reset} ref={ref}>
      <motion.a
        href={href}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="magnetic-content text-gray-400 hover:text-white transition-colors duration-300 relative group px-6 py-3 rounded-full hover:bg-[#00ff9f]/5 interactive block"
      >
        <span className="relative z-10 text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#00ff9f]/0 rounded-full group-hover:bg-[#00ff9f] shadow-[0_0_10px_#00ff9f] transition-all"></div>
          {children}
        </span>
        <span className="absolute inset-0 rounded-full border border-[#00ff9f]/0 group-hover:border-[#00ff9f]/50 transition-all duration-300 scale-90 group-hover:scale-100 group-hover:shadow-[0_0_15px_rgba(0,255,159,0.3)]"></span>
      </motion.a>
    </div>
  );
};

const VisualizerBar = () => {
  const [duration] = useState(() => Math.random() * 0.5 + 0.5);
  const [delay] = useState(() => Math.random() * 0.5);

  return (
    <motion.div
      className="w-1 bg-[#00ff9f]"
      animate={{
        height: ["20%", "100%", "40%", "80%", "30%"],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 flex justify-center pointer-events-none ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div 
        className={`pointer-events-auto transition-all duration-700 flex items-center justify-between overflow-hidden relative ${
          scrolled
            ? 'w-[90%] md:w-[65%] lg:w-[50%] bg-[#050505]/70 backdrop-blur-3xl border border-white/20 rounded-full py-2.5 px-6 shadow-[0_30px_60px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,159,0.1)]'
            : 'w-full md:w-[90%] lg:w-[85%] bg-transparent border-transparent py-4 px-6'
        }`}
      >
        <a href="#home" className="flex items-center gap-3 group interactive">
          <div className="w-10 h-10 rounded-full bg-[#00ff9f]/10 border border-[#00ff9f]/30 flex items-center justify-center group-hover:blur-[2px] transition-all absolute"></div>
          <Terminal size={22} className="text-[#00ff9f] relative z-10 drop-shadow-[0_0_8px_rgba(0,255,159,0.8)]" />
          <span className="text-xl font-bold tracking-wider text-white relative z-10 hidden sm:block">
            DEEPAK<span className="text-gradient-liquid opacity-0 group-hover:opacity-100 transition-opacity">.EXE</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-2">
          <MagneticLink href="#about">About</MagneticLink>
          <MagneticLink href="#projects">Work</MagneticLink>
          <MagneticLink href="#contact">Contact</MagneticLink>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Feature 6: Simulated Audio Visualizer Bars */}
          <div className="hidden lg:flex items-end gap-[2px] h-6 px-4 border-r border-white/10">
            {[...Array(5)].map((_, i) => (
              <VisualizerBar key={i} />
            ))}
          </div>

          <div className="flex gap-4 text-[#00ff9f]/70">
             <a href="https://github.com/deepakrss197" target="_blank" rel="noreferrer" className="hover:text-[#00ff9f] transition-colors interactive hover:drop-shadow-[0_0_8px_rgba(0,255,159,0.8)]"><Github size={20}/></a>
             <a href="https://linkedin.com/in/deepakrss197" target="_blank" rel="noreferrer" className="hover:text-[#00ff9f] transition-colors interactive hover:drop-shadow-[0_0_8px_rgba(0,255,159,0.8)]"><Linkedin size={20}/></a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
