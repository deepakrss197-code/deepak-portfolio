import React, { useState, useEffect, Suspense, lazy } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import useIsMobile from './hooks/useIsMobile';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';

// Lazy load heavy components below the fold for faster mobile loading
const About = lazy(() => import('./components/About'));
const Ambition = lazy(() => import('./components/Ambition'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));
const Contact = lazy(() => import('./components/Contact'));

// Temporary Error Boundary to catch deep React crashes
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#500', color: 'white', fontFamily: 'monospace', minHeight: '100vh', zIndex: 999999, position: 'relative' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Click for error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

const GlobalSpotlight = ({ isMobile }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 159, 0.03), transparent 80%)`
      }}
    />
  );
};

// Premium Boot Sequence Component
const bootLogs = [
  "BIOS Check........... OK",
  "Initializing Kernel.. OK",
  "Mounting VFS......... OK",
  "Loading Drivers...... [104 modules loaded]",
  "Starting Network..... ONLINE",
  "Bypassing Security... SUCCESS",
  "Injecting Assets..... [####################] 100%",
  "Decrypting Profile... OK",
  "System Ready.",
  "Executing DEEPAK.EXE..."
];

const BootSequence = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    
    // Rapid-fire log typing
    const interval = setInterval(() => {
      if (currentIndex < bootLogs.length) {
        const currentLog = bootLogs[currentIndex];
        setLogs(prev => [...prev, currentLog]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 300); // Small pause before snapping in
      }
    }, 50); // Aggressively fast

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col justify-end p-8 font-mono text-sm md:text-base pointer-events-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none"></div>
      <div className="max-w-3xl w-full mx-auto relative z-10 space-y-2">
        {logs.map((log, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`
              ${log.includes("SUCCESS") || log.includes("OK") || log.includes("ONLINE") ? "text-[#00ff9f]" : "text-gray-400"}
              ${index === bootLogs.length - 1 ? "text-white font-bold tracking-widest text-lg drop-shadow-[0_0_10px_#fff]" : ""}
            `}
          >
            <span className="text-gray-600 mr-4">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span>
            {log}
          </motion.div>
        ))}
        {logs.length < bootLogs.length && (
          <motion.div 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-3 h-5 bg-[#00ff9f] mt-2 shadow-[0_0_10px_#00ff9f]"
          />
        )}
      </div>
    </motion.div>
  );
};

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#00ff9f] origin-left z-[50] shadow-[0_0_15px_#00ff9f]"
      style={{ scaleX }}
    />
  );
};

// Feature 12: Floating Parallax Data Hexagons
const FloatingHexagons = () => {
  const [hexagons] = useState(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.random() * 100 + 50,
      height: Math.random() * 110 + 60,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      yDest: Math.random() * -200 - 100,
      rotateDest: Math.random() * 180 * (Math.random() > 0.5 ? 1 : -1),
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20 hidden md:block">
      {hexagons.map((hex) => (
        <motion.div
           key={hex.id}
           className="absolute border border-[#00ff9f]/30"
           style={{
             width: hex.width,
             height: hex.height,
             clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
             left: hex.left,
             top: hex.top
           }}
           animate={{
             y: [0, hex.yDest],
             rotateZ: [0, hex.rotateDest],
             opacity: [0, 0.5, 0]
           }}
           transition={{
             duration: hex.duration,
             repeat: Infinity,
             ease: "linear",
             delay: hex.delay
           }}
        />
      ))}
    </div>
  );
};

// Feature 7: Interactive Laser Gates
const LaserGate = ({ isMobile }) => (
  <div className="w-full h-[2px] bg-[#00ff9f]/10 my-20 relative overflow-hidden flex items-center justify-center">
    {isMobile ? (
       <div className="absolute w-[300px] h-full bg-gradient-to-r from-transparent via-[#00ff9f]/50 to-transparent"></div>
    ) : (
       <div className="absolute w-[300px] h-full bg-gradient-to-r from-transparent via-[#00ff9f] to-transparent animate-[shimmer_3s_infinite_linear]"></div>
    )}
    <div className="w-2 h-2 rounded-full bg-[#00ff9f] shadow-[0_0_10px_#00ff9f] absolute"></div>
  </div>
);

function App() {
  const [booting, setBooting] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-mono selection:bg-[#00ff9f] selection:text-black relative">
      {/* V4 Phase 1 Global Overlays - Desktop Only to prevent massive phone repaints */}
      {!isMobile && (
        <>
           <div className="crt-overlay hidden md:block"></div>
           <div className="analog-noise hidden md:block"></div>
        </>
      )}
      
      {/* V4 Phase 2 Global Physics elements */}
      {!isMobile && <FloatingHexagons />}

      {!isMobile && <CustomCursor />}
      
      <GlobalSpotlight isMobile={isMobile} />
      <ScrollProgressBar />
      
      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booting ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10"
      >
        <Navbar />
        <main className="px-6 md:px-12 lg:px-24">
          {/* Feature 4: Component Mount Glitch-In wrapper for main content */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -20, filter: isMobile ? "none" : "blur(10px) hue-rotate(90deg)" }}
            whileInView={{ opacity: 1, x: 0, filter: isMobile ? "none" : "blur(0px) hue-rotate(0deg)" }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          >
            <Hero />
          </motion.div>
          
          <LaserGate isMobile={isMobile} />
          
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 20, filter: isMobile ? "none" : "blur(10px) hue-rotate(-90deg)" }}
            whileInView={{ opacity: 1, x: 0, filter: isMobile ? "none" : "blur(0px) hue-rotate(0deg)" }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.6 }}
          >
            <About />
          </motion.div>
          
          <LaserGate isMobile={isMobile} />
          
          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 1 : 0.95, filter: isMobile ? "none" : "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: isMobile ? "none" : "blur(0px)" }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            <Ambition />
          </motion.div>

          <LaserGate isMobile={isMobile} />
          
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 50, scale: isMobile ? 1 : 0.95, filter: isMobile ? "none" : "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: isMobile ? "none" : "blur(0px)" }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          >
            <Experience />
          </motion.div>

          <LaserGate isMobile={isMobile} />

          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 50, rotateX: isMobile ? 0 : -15, filter: isMobile ? "none" : "contrast(200%) grayscale(100%)" }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: isMobile ? "none" : "contrast(100%) grayscale(0%)" }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          >
            <Projects />
          </motion.div>

          <LaserGate isMobile={isMobile} />

          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 1 : 1.1, filter: isMobile ? "none" : "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: isMobile ? "none" : "blur(0px)" }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
            transition={{ duration: 0.9 }}
          >
            <Contact />
          </motion.div>
        </main>
        <AIAssistant />
      </motion.div>
    </div>
  );
}

const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;
