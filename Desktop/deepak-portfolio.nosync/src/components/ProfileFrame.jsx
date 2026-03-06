import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const ProfileFrame = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Heavier physics for ultra-premium feel
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Parallax inner elements
  const innerX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
  const innerY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]);

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
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mt-12 lg:mt-0 xl:mr-12 perspective-[2000px] group"
    >
      {/* Dynamic 3D Outer Glow Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-10px] rounded-full border border-[#00ff9f]/20 border-t-[#00ff9f] border-b-[#00ff9f]/50 opacity-40 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(0,255,159,0.3)]"
        style={{ transform: "translateZ(-20px)" }}
      ></motion.div>
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-20px] rounded-full border border-dashed border-[#00ff9f]/30 opacity-20 group-hover:opacity-60 transition-opacity duration-500"
        style={{ transform: "translateZ(-40px)" }}
      ></motion.div>

      {/* Glass Container Base */}
      <div 
         className={`absolute inset-0 rounded-full overflow-hidden ${isMobile ? 'bg-[#0a0a0a]/90' : 'backdrop-blur-xl bg-gradient-to-tr from-[#0a0a0a]/90 to-transparent'} border-2 border-[#00ff9f]/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] ${isMobile ? '' : 'group-hover:border-[#00ff9f]/60 group-hover:shadow-[0_0_80px_rgba(0,255,159,0.4)]'} transition-all duration-700 interactive`}
         style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* Deep Parallax Image Container */}
        <motion.div 
            style={{ x: innerX, y: innerY, transform: "translateZ(30px)" }}
            className="w-[110%] h-[110%] absolute top-[-5%] left-[-5%] p-3"
        >
           <div className="w-full h-full rounded-full bg-[#020202] overflow-hidden relative border border-[#00ff9f]/10 group-hover:border-[#00ff9f]/40 transition-colors shadow-2xl">
             <img 
               src="/profile.png?v=2" 
               alt="User Profile" 
               className={`w-full h-full object-cover opacity-70 ${isMobile ? '' : 'group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal filter contrast-125'}`}
               onError={(e) => {
                 e.target.onerror = null; 
                 // Premium Fallback Hologram
                 e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='%2300ff9f' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
               }}
             />
             
             {/* Holographic Laser Scanner Overlay */}
             <motion.div 
               animate={{ y: ["-100%", "200%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 left-0 w-full h-[5px] bg-[#00ff9f] shadow-[0_0_20px_rgba(0,255,159,1)] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
             ></motion.div>
             
             {/* Dynamic Scanlines Overlay */}
             {!isMobile && (
               <>
                 <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] mix-blend-overlay z-10 pointer-events-none opacity-50"></div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff9f]/30 to-transparent mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
               </>
             )}
           </div>
        </motion.div>
      </div>

      {/* Floating 3D Data Packets (Cyber HUD Elements) */}
      <motion.div 
         style={{ transform: "translateZ(80px)" }} 
         className="absolute -top-6 -right-6 bg-[#0a0a0a]/90 border border-[#00ff9f] px-3 py-1 text-[#00ff9f] font-mono text-[10px] font-black tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,159,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[#00ff9f] animate-pulse"></span>
        ENTITY.ACTIVE
      </motion.div>

      <motion.div 
         style={{ transform: "translateZ(60px)" }} 
         className="absolute -bottom-4 -left-8 bg-[#0a0a0a]/90 border border-[#00ff9f]/50 px-2 py-1 text-gray-400 font-mono text-[9px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 backdrop-blur-sm"
      >
        [PORT: 8080]
      </motion.div>

      {/* Heavy Cybernetic Corner Brackets */}
      <div style={{ transform: "translateZ(40px)" }} className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[#00ff9f]/80 pointer-events-none group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 rounded-tl-sm"></div>
      <div style={{ transform: "translateZ(40px)" }} className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-[#00ff9f]/80 pointer-events-none group-hover:scale-110 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 rounded-br-sm"></div>
      
    </motion.div>
  );
};

export default ProfileFrame;
