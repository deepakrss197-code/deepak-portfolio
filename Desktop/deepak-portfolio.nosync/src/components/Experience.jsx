import React, { useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

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
            hidden: { opacity: 0, y: 10, filter: isMobile ? "none" : "blur(4px)" },
            visible: { 
              opacity: 1, 
              y: 0, 
              filter: isMobile ? "none" : "blur(0px)",
              transition: { type: "spring", stiffness: 100, damping: 20 }
            }
          }}
          dangerouslySetInnerHTML={{ __html: word }}
        />
      ))}
    </motion.p>
  );
};

// Feature 14: 3D Hologram Tilt Container for Milestones
const HolographicCard = ({ children, className }) => {
  const ref = useRef(null);

  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

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

  const rotateY = `${((glarePosition.x - 50) / 50) * 10}deg`;
  const rotateX = `${-((glarePosition.y - 50) / 50) * 10}deg`;
  
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
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-screen rounded-none"
        style={{
          background: `radial-gradient(circle 250px at ${glareX} ${glareY}, rgba(0,255,159,0.3), transparent 80%)`
        }}
      />
      {children}
    </motion.div>
  );
};

const Milestone = ({ year, title, subtitle, description, isLeft, isMobile }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isMobile ? 0 : (isLeft ? -50 : 50), y: isMobile ? 30 : 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className={`relative flex items-center justify-between w-full mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      <div className="w-5/12 hidden md:block"></div>
      
      {/* Center glowing node */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0a0a0a] border-4 border-[#00ff9f] shadow-[0_0_15px_#00ff9f] z-20 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
      </div>

      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'} relative`}>
        {/* Connector line */}
        <div className={`hidden md:block absolute top-4 w-12 h-[2px] bg-[#00ff9f]/30 ${isLeft ? '-right-16' : '-left-16'} z-0`}></div>
        
        <HolographicCard className="p-8 backdrop-blur-2xl bg-[#050505]/95 border border-[#00ff9f]/20 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-[#00ff9f]/80 hover:shadow-[0_0_80px_rgba(0,255,159,0.2)] transition-all duration-500 overflow-hidden group">
          {/* Premium BG Mesh - animated and abstract for project thumbs */}
          <div className="absolute inset-0 z-0 bg-mesh-gradient opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-screen scale-110"></div>
          
          {/* Hologram Sweeping Shimmer Line */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff9f]/10 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite_ease-in-out]"></div>
          </div>

          <div className="relative z-20" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
            <span className="inline-block px-3 py-1 bg-[#00ff9f]/10 text-[#00ff9f] font-mono text-sm tracking-widest font-bold mb-4 border border-[#00ff9f]/30 group-hover:bg-[#00ff9f] group-hover:text-black transition-colors shadow-[0_0_15px_rgba(0,255,159,0.3)]">
              {year}
            </span>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{title}</h3>
            <h4 className="text-[#00ff9f]/90 font-mono text-sm mb-4 tracking-widest">{subtitle}</h4>
            <WordReveal 
              className="text-gray-300 leading-relaxed font-light text-sm md:text-base"
              text={description}
              isMobile={isMobile}
            />
          </div>
        </HolographicCard>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
    const experiences = [
      {
        year: "2024 - PRESENT",
        title: "B.Tech in Computer Science Engineering",
        subtitle: "Nalanda College of Engineering, Bihar",
        description: "Focusing on advanced algorithms, full-stack web development, and artificial intelligence. Actively participating in open-source programs and rigorous technical problem-solving.",
        isLeft: true
      },
      {
        year: "2024",
        title: "AI Hackathon Participant",
        subtitle: "Cognithon (Enyugma’26) by IIIT Bhagalpur",
        description: "Developed innovative AI-driven solutions under strict time constraints. Collaborated in a fast-paced environment to build scalable proof-of-concept applications.",
        isLeft: false
      },
      {
        year: "CURRENT",
        title: "Software Engineering Aspirant",
        subtitle: "Open Source & Personal Projects",
        description: "Preparing for Google Summer of Code (GSoC). Building complex personal projects including dynamic web applications and premium developer portfolios using React and modern JavaScript.",
        isLeft: true
      }
    ];

  return (
    <section id="experience" className="py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Background Matrix/Grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,159,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#00ff9f]"></div>
            <span className="text-[#00ff9f] font-mono tracking-[0.3em] text-xs font-bold uppercase">Chronology</span>
            <div className="w-12 h-[1px] bg-[#00ff9f]"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl">
            Experience <span className="text-gradient-liquid">&</span> Milestones
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Feature 8: Energy Overload Core Beam */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#00ff9f]/20 to-transparent hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-[#00ff9f]"
              animate={{
                opacity: [0.1, 0.8, 0.1],
                filter: ["blur(2px)", "blur(8px)", "blur(2px)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Moving highlight beam */}
          <motion.div 
            style={{ top: backgroundY, height: "15%" }}
            className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-[#fff] shadow-[0_0_20px_#00ff9f,0_0_40px_#00ff9f] hidden md:block z-10"
          ></motion.div>

          <div className="flex flex-col relative z-20 pl-8 md:pl-0 border-l-2 border-[#00ff9f]/20 md:border-none">
            {experiences.map((exp, index) => (
              <Milestone key={index} {...exp} isMobile={isMobile} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
