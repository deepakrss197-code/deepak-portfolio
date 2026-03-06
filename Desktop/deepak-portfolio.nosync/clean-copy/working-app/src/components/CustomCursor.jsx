import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(0, 255, 159, 0.4) 0%, rgba(0, 255, 159, 0) 70%)',
      }}
      animate={{
        x: mousePosition.x - 16, // Center the cursor (32px width / 2)
        y: mousePosition.y - 16,
      }}
      transition={{
        type: 'tween',
        ease: 'backOut',
        duration: 0.15, // slight delay for smooth trailing effect
      }}
    />
  );
};

export default CustomCursor;
