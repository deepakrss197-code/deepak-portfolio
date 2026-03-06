import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity, useAnimationFrame } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ultra-Heavy 3D Physics Springs
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20, mass: 1.5 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20, mass: 1.5 });

  // Extreme tilt mapping
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  
  // Neon sweep background tracking
  const backgroundX = useTransform(mouseXSpring, [-0.5, 0.5], ["150%", "-50%"]);
  const backgroundY = useTransform(mouseYSpring, [-0.5, 0.5], ["150%", "-50%"]);

  // Dynamic entry speed based on scroll velocity
  const baseEntryDelay = index * 0.15;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: isMobile ? 50 : 150, rotateX: isMobile ? 0 : 45, scale: isMobile ? 1 : 0.8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
      transition={{ 
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: baseEntryDelay 
      }}
      style={isMobile ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full rounded-sm p-8 ${isMobile ? 'bg-[#050505]/95' : 'backdrop-blur-2xl bg-[#050505]/95'} border border-[#00ff9f]/20 hover:border-[#00ff9f]/80 transition-colors duration-500 overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:shadow-[0_0_80px_rgba(0,255,159,0.2)] glitch-corrupt`}
    >
      {/* Premium BG Mesh - animated and abstract for project thumbs */}
      <div className="absolute inset-0 z-0 bg-mesh-gradient opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none mix-blend-screen scale-110"></div>
      
      {/* Hologram Sweeping Shimmer Line */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff9f]/10 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite_ease-in-out]"></div>
      </div>

      {/* Dynamic Laser Glare effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-screen"
        style={{
          background: "radial-gradient(circle 350px at var(--x, 0) var(--y, 0), rgba(0,255,159,0.15), transparent 80%)",
          x: backgroundX,
          y: backgroundY
        }}
      />
      
      {/* Corner Brackets for Hologram aesthetic */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00ff9f] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00ff9f] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00ff9f] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00ff9f] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div 
        style={{ transform: "translateZ(30px)" }}
        className="absolute -bottom-24 -left-24 w-56 h-56 bg-gradient-to-tr from-[#00ff9f]/30 to-transparent blur-[80px] rounded-full group-hover:bg-[#00ff9f]/50 transition-all duration-700 pointer-events-none z-0"
      ></div>

      <div style={{ transform: "translateZ(100px)" }} className="flex justify-between items-center mb-10 relative z-10">
        <div className="p-3 bg-[#0a0a0a] border border-[#00ff9f]/40 rounded-sm group-hover:bg-[#00ff9f] transition-all duration-500 shadow-[0_0_15px_rgba(0,255,159,0.2)]">
          <Folder size={32} className="text-[#00ff9f] group-hover:text-[#0a0a0a]" strokeWidth={2} />
        </div>
        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#00ff9f] transition-all hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(0,255,159,1)] interactive bg-[#0a0a0a]/50 p-2 rounded-sm border border-transparent hover:border-[#00ff9f]/50">
              <Github size={24} strokeWidth={1.5} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#00ff9f] transition-all hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(0,255,159,1)] interactive bg-[#0a0a0a]/50 p-2 rounded-sm border border-transparent hover:border-[#00ff9f]/50">
              <ExternalLink size={24} strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>

      <h3 style={{ transform: "translateZ(80px)" }} className="text-2xl font-black text-white mb-4 group-hover:text-[#00ff9f] transition-colors duration-300 relative z-10 tracking-widest uppercase">
        {project.title}
      </h3>
      
      <p style={{ transform: "translateZ(60px)" }} className="text-gray-400 mb-8 flex-grow relative z-10 leading-relaxed font-mono text-xs md:text-sm group-hover:text-gray-200 transition-colors border-l border-[#00ff9f]/30 pl-4 bg-[#0a0a0a]/40 py-2">
        {project.description}
      </p>

      <ul style={{ transform: "translateZ(70px)" }} className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.tech.map((tech, i) => (
          <li 
            key={i} 
            className="bg-[#00ff9f]/10 border border-[#00ff9f]/20 px-3 py-1 text-[10px] font-bold text-[#00ff9f] group-hover:border-[#00ff9f] group-hover:bg-[#00ff9f]/20 group-hover:shadow-[0_0_10px_rgba(0,255,159,0.5)] transition-all duration-300 tracking-[0.2em] uppercase rounded-sm"
          >
            {tech}
          </li>
        ))}
      </ul>
      
      {/* Card Scanlines */}
      <div style={{ transform: "translateZ(120px)" }} className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,159,0.05)_1px,transparent_1px)] bg-[length:100%_4px] mix-blend-overlay opacity-50"></div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  
  // High-performance scroll tracking for parallax elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Deep Parallax Math
  const headerY = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const floorZ = useTransform(scrollYProgress, [0, 1], ["0px", "800px"]);
  const floorRotateX = useTransform(scrollYProgress, [0, 1], ["60deg", "80deg"]);

  const projects = [
    {
      title: "High-Concurrency Collaborative Code Editor",
      description: "Architected a real-time collaborative workspace supporting seamless multi-user editing with conflict resolution via optimized state synchronization. Designed the socket layer to minimize latency spikes handling concurrent broadcast payloads.",
      tech: ["Node.js", "React", "Socket.IO", "Redis"],
      github: "https://github.com/deepakrss197",
      live: "" // Add live link when available
    },
    {
      title: "Distributed E-Commerce Microservices API",
      description: "Built a highly scalable backend architecture utilizing decoupled microservices for inventory and order management. Integrated caching mechanisms and robust message brokers to ensure consistency and sub-50ms query response times under peak load.",
      tech: ["Python", "FastAPI", "PostgreSQL", "RabbitMQ"],
      github: "https://github.com/deepakrss197",
      live: "" // Add live link when available
    },
    {
      title: "Interactive Algorithm & Tree-State Visualizer",
      description: "Engineered a heavily optimized web application to visually trace complex graph traversals and dynamic programming paths. Leveraged custom hooks and RAF loops to guarantee fluid 60FPS rendering across thousands of massive state mutations.",
      tech: ["React", "JavaScript", "Algorithms", "Vite"],
      github: "https://github.com/deepakrss197",
      live: "" // Add live link when available
    },
    {
      title: "Automated Sandboxed Execution Engine",
      description: "Developed a secure isolated execution environment utilizing containerization to safely compile and benchmark untrusted user code. Implemented a resilient queuing system to process bulk concurrent executions without resource exhaustion.",
      tech: ["Docker", "Python", "Bash", "Linux API"],
      github: "https://github.com/deepakrss197",
      live: "" // Add live link when available
    }
  ];

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-[#020202]" ref={containerRef}>
      
      {/* 3D Parallax Cyber-Grid Floor */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center perspective-[2000px] z-0 overflow-hidden">
         <motion.div 
            style={isMobile ? { rotateX: "60deg" } : { 
               translateZ: floorZ,
               rotateX: floorRotateX,
               transformStyle: "preserve-3d"
            }}
            className="w-[200vw] h-[200vh] bg-grid opacity-30 origin-bottom"
         ></motion.div>
         {/* Fade to black gradient to hide grid edge */}
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020202] to-transparent z-10"></div>
      </div>

      <div className="container mx-auto relative z-20">
        <motion.div
          style={{ y: headerY }}
          className="mb-32 flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-[1px] bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"></div>
            <span className="text-[#00ff9f] font-mono tracking-[0.4em] text-sm font-bold uppercase">Database.Query</span>
            <div className="w-16 h-[1px] bg-[#00ff9f] shadow-[0_0_10px_#00ff9f]"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl">
            Featured <span className="text-gradient-liquid">Builds</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 perspective-1000 px-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <div className="mt-32 text-center relative z-20">
          <a 
            href="https://github.com/deepakrss197" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block px-12 py-5 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#00ff9f]/50 text-[#00ff9f] hover:bg-[#00ff9f] hover:text-[#0a0a0a] transition-all duration-500 tracking-[0.3em] font-bold text-sm uppercase rounded-sm shadow-[0_0_20px_rgba(0,255,159,0.2)] hover:shadow-[0_0_40px_rgba(0,255,159,0.8)] interactive"
          >
            Access_Full_Archive()
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
