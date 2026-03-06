import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

// Feature 14: 3D Hologram Tilt Container
const HolographicCard = ({ children, className }) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 15, mass: 2 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 15, mass: 2 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["200%", "-100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["200%", "-100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
      style={isMobile ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-screen rounded-2xl"
        style={{
          background: "radial-gradient(circle 300px at var(--x, 0) var(--y, 0), rgba(0,255,159,0.3), transparent 80%)",
          x: glareX,
          y: glareY
        }}
      />
      {children}
    </motion.div>
  );
};

// Feature 13: Magnetic Button Physics
const MagneticLink = ({ children, href, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <div className="magnetic-bounds inline-block p-4 -m-4" onMouseMove={handleMouse} onMouseLeave={reset} ref={ref}>
      <motion.a
        href={href}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={`magnetic-content inline-flex ${className}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </motion.a>
    </div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Terminal State
  const [terminalStep, setTerminalStep] = useState(0);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);
  
  const containerRef = useRef(null);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const newHistory = [...terminalHistory, { type: 'input', text: terminalInput }];
    setTerminalHistory(newHistory);

    if (terminalStep === 0) {
      setFormState(prev => ({ ...prev, name: terminalInput }));
      setTerminalHistory(prev => [...prev, { type: 'system', text: `[System] Identification accepted: ${terminalInput}` }]);
      setTerminalStep(1);
    } else if (terminalStep === 1) {
      setFormState(prev => ({ ...prev, email: terminalInput }));
      setTerminalHistory(prev => [...prev, { type: 'system', text: `[System] Return address logged: ${terminalInput}` }]);
      setTerminalStep(2);
    } else if (terminalStep === 2) {
      setFormState(prev => ({ ...prev, message: terminalInput }));
      setTerminalHistory(prev => [...prev, { type: 'system', text: '[System] Payload received. Encrypting transmission...' }]);
      
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setTerminalHistory(prev => [...prev, { type: 'system', text: `[System] SUCCESS: Payload delivered to Root Operator.` }]);
        setTimeout(() => {
            setSubmitted(false);
            setTerminalStep(0);
            setTerminalHistory([]);
            setFormState({ name: '', email: '', message: '' });
        }, 5000);
      }, 2000);
    }
    
    setTerminalInput('');
  };

  const infoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * 0.15, ease: "easeOut", duration: 0.6 }
    })
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-glow-intense flex items-center justify-center gap-4">
            <span className="text-[#0a0a0a] text-stroke opacity-50">03.</span> 
            Initiate_Connection
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#00ff9f] to-transparent mx-auto"></div>
          <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            My inbox is always open. Whether you have a question, a project proposal, or just want to say hi, 
            I'll prioritize getting back to you.
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto perspective-[2000px] relative"
        >
          {/* Ambient Glow behind container */}
          <div className="absolute inset-0 bg-[#00ff9f]/5 blur-[120px] rounded-full pointer-events-none -z-10 w-full h-full"></div>

          {/* Contact Info Panel - 3D Holographic Parallax */}
          <div className="flex-1 space-y-8 perspective-[1500px]">
            <HolographicCard className="glassmorphism p-10 rounded-2xl h-full border border-white/10 hover:border-[#00ff9f]/40 transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
               {/* Internal sweep effect */}
               <div style={{ transform: "translateZ(10px)" }} className="absolute inset-0 bg-gradient-to-tr from-[#00ff9f]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

               <h3 style={{ transform: "translateZ(40px)" }} className="text-3xl font-bold mb-10 text-white tracking-wide border-b border-white/10 pb-4 inline-block relative z-10">Comms_Array</h3>
               
               <div style={{ transform: "translateZ(60px)" }} className="space-y-8 relative z-10">
                 {['EMAIL', 'PHONE', 'LOCATION'].map((type, i) => (
                   <motion.div 
                     key={i}
                     custom={i}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     variants={infoVariants}
                     className="flex items-start gap-6 group/item"
                   >
                     <div className="p-4 bg-[#0a0a0a]/80 border border-[#00ff9f]/20 rounded-xl text-[#00ff9f] group-hover/item:bg-[#00ff9f] group-hover/item:text-[#0a0a0a] group-hover/item:shadow-[0_0_20px_rgba(0,255,159,0.5)] transition-all duration-300">
                       {i === 0 && <Mail size={26} strokeWidth={1.5} />}
                       {i === 1 && <Phone size={26} strokeWidth={1.5} />}
                       {i === 2 && <MapPin size={26} strokeWidth={1.5} />}
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 font-mono tracking-widest mb-2">{type}</p>
                       {i === 0 && (
                         <MagneticLink href="mailto:deepakrss197@email.com" className="text-xl font-medium text-gray-200 hover:text-[#00ff9f] transition-colors text-glow interactive">
                             deepakrss197@email.com
                         </MagneticLink>
                       )}
                       {i === 1 && <p className="text-xl font-medium text-gray-200">+91 7717705056</p>}
                       {i === 2 && <p className="text-xl font-medium text-gray-200">Patna Bihar, India</p>}
                     </div>
                   </motion.div>
                 ))}
               </div>
            </HolographicCard>
          </div>

          {/* Form Panel -> Now a Hacker Terminal inside 3D Hologram */}
          <div className="flex-1 perspective-[1500px]">
            <HolographicCard className="glassmorphism rounded-2xl border border-[#00ff9f]/30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden h-[450px] flex flex-col font-mono">
              
              {/* Terminal Header */}
              <div style={{ transform: "translateZ(20px)" }} className="bg-[#00ff9f]/20 border-b border-[#00ff9f]/40 px-4 py-3 flex items-center justify-between relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_#22c55e]"></div>
                </div>
                <div className="text-[#00ff9f] text-xs font-bold tracking-widest opacity-80">
                  ROOT@DEEPAK-OS:~
                </div>
                <div className="w-4 h-4"></div>
              </div>

              {/* Terminal Body */}
              <div 
                style={{ transform: "translateZ(50px)" }}
                className="flex-1 p-6 overflow-y-auto text-sm text-[#00ff9f] relative scroll-smooth cyber-scrollbar z-10"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.05)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none z-10" style={{ transform: "translateZ(30px)" }}></div>
                
                <div className="space-y-4 relative z-20">
                  <div className="text-gray-400 font-bold mb-6">
                    [System] Encrypted comms channel opened. <br/>
                    [System] Awaiting input parameters...
                  </div>

                  {/* Previous History */}
                  {terminalHistory.map((line, i) => (
                    <div key={i} className={line.type === 'system' ? 'text-gray-400' : 'text-white'}>
                      {line.type === 'input' && <span className="text-[#00ff9f] mr-2">➜</span>}
                      {line.text}
                    </div>
                  ))}

                  {/* Active Input Line */}
                  {!submitted && (
                    <form onSubmit={handleTerminalSubmit} className="flex items-start">
                      <span className="text-[#00ff9f] mr-2">➜</span>
                      {isSubmitting ? (
                        <div className="animate-pulse text-yellow-400">
                          Encrypting payload... <span className="inline-block w-2 h-4 bg-yellow-400 ml-1"></span>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col">
                          <span className="text-gray-500 mb-1 text-xs">{terminalStep === 0 ? "Enter Identification (Name):" : terminalStep === 1 ? "Enter Return Address (Email):" : "Enter Payload (Message):"}</span>
                          <div className="flex items-center">
                            <input
                              ref={inputRef}
                              type="text"
                              value={terminalInput}
                              onChange={(e) => setTerminalInput(e.target.value)}
                              className="w-full bg-transparent border-none outline-none text-white caret-transparent"
                              autoFocus
                            />
                            {/* Fake block cursor */}
                            <motion.div 
                              animate={{ opacity: [1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="w-2.5 h-4 bg-[#00ff9f] -ml-[100%] absolute"
                              style={{ left: `calc(${terminalInput.length}ch + 1.5rem)` }}
                            />
                          </div>
                        </div>
                      )}
                    </form>
                  )}

                  {/* Success State */}
                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-8 p-4 border border-[#00ff9f] bg-[#00ff9f]/10 rounded shadow-[0_0_20px_rgba(0,255,159,0.2)] text-center text-white"
                    >
                      <Send size={40} className="mx-auto mb-4 text-[#00ff9f] drop-shadow-[0_0_15px_#00ff9f]" />
                      <p className="font-bold tracking-widest uppercase mb-1">Payload Sent Successfully</p>
                      <p className="text-xs text-gray-400">Connection terminating in 5s...</p>
                    </motion.div>
                  )}
                  
                  <div ref={historyEndRef} />
                </div>
              </div>
            </HolographicCard>
          </div>

        </div>
        
        <footer className="mt-32 text-center pb-12 relative z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff9f]/30 to-transparent mb-8"></div>
          <p className="text-sm text-gray-500 font-mono tracking-widest">
             ENGINEERED BY <span className="text-[#e5e5e5] font-bold">DEEPAK</span> <br/><br/>
            <span className="text-[#00ff9f] opacity-60 text-xs border border-[#00ff9f]/30 px-4 py-2 rounded-full shadow-[0_0_10px_rgba(0,255,159,0.1)]">&copy; {new Date().getFullYear()} // ALL SYSTEMS NOMINAL</span>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
