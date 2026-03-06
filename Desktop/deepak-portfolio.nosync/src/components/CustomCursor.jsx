import React, { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clickRings, setClickRings] = useState([]);
  const [trail, setTrail] = useState(Array(40).fill({ x: -100, y: -100 }));
  const requestRef = useRef();
  
  // Track primary cursor absolute position
  const mousePos = useRef({ x: -100, y: -100 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const updateMousePos = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Generate a shockwave ring
      const newRing = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClickRings((prev) => [...prev, newRing]);
      setTimeout(() => {
        setClickRings((prev) => prev.filter((r) => r.id !== newRing.id));
      }, 500); // Remove after animation
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePos);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePos);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  // RAF loop for buttery smooth physics trail computation
  useEffect(() => {
    if (isMobile) return;
    const animateTrail = () => {
      setTrail((prevTrail) => {
        const newTrail = [...prevTrail];
        
        // Head follows mouse instantly
        newTrail[0] = mousePos.current;
        
        // Tail follows the link ahead of it with spring tension
        for (let i = 1; i < newTrail.length; i++) {
          const distX = newTrail[i - 1].x - newTrail[i].x;
          const distY = newTrail[i - 1].y - newTrail[i].y;
          
          newTrail[i] = {
            x: newTrail[i].x + distX * 0.45,
            y: newTrail[i].y + distY * 0.45
          };
        }
        return newTrail;
      });
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isMobile]);

  // Primary spring for the main reticle
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(useMotionValue(-100), springConfig);
  const smoothY = useSpring(useMotionValue(-100), springConfig);
  
  // Secondary spring for the trailing dot
  const dotSpringConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const dotX = useSpring(useMotionValue(-100), dotSpringConfig);
  const dotY = useSpring(useMotionValue(-100), dotSpringConfig);

  // Update springs only for the lead reticle to keep it heavy but precise
  useEffect(() => {
    smoothX.set(mousePos.current.x);
    smoothY.set(mousePos.current.y);
    dotX.set(mousePos.current.x);
    dotY.set(mousePos.current.y);
  }, [trail[0], smoothX, smoothY, dotX, dotY]);

  if (isMobile) return null;

  return (
    <>
      {/* V4 Laser Trail Math */}
      <svg className="fixed inset-0 pointer-events-none z-[9998] hidden md:block w-full h-full">
        <defs>
          <filter id="laserGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {trail.map((point, i) => (
          <circle 
            key={i} 
            cx={point.x} 
            cy={point.y} 
            r={isHovering ? Math.max(0, 15 - i * 0.4) : Math.max(0, 5 - i * 0.15)} 
            fill={isClicking ? '#ffffff' : '#00ff9f'} 
            opacity={1 - (i / trail.length)}
            filter="url(#laserGlow)"
            style={{ mixBlendMode: 'screen' }}
          />
        ))}
      </svg>

      {/* Click Shockwaves */}
      <AnimatePresence>
        {clickRings.map((ring) => (
          <motion.div
            key={ring.id}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed rounded-full border border-[#00ff9f] pointer-events-none z-[9999] mix-blend-screen"
            style={{
              left: ring.x,
              top: ring.y,
              x: "-50%",
              y: "-50%",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Heavy Reticle -> Updated to Difference Blending for premium contrast */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center border-[1.5px] border-white mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovering ? 60 : 30,
          height: isHovering ? 60 : 30,
          scale: isClicking ? 0.8 : 1,
          rotate: isHovering ? 45 : 0,
          backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "transparent"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Reticle crosshairs on hover */}
        {isHovering && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white opacity-50"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white opacity-50"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Trailing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#00ff9f] shadow-[0_0_10px_#00ff9f] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isClicking ? 0.5 : (isHovering ? 1.5 : 1)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
