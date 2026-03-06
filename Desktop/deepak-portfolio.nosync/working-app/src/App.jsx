import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import AIAssistant from './components/AIAssistant';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial booting sequence/terminal loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-[#00ff9f] font-mono text-xl">
        <div className="animate-pulse">Loading System Environment_</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-mono selection:bg-[#00ff9f] selection:text-black">
      <CustomCursor />
      <Navbar />
      
      <main className="px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <AIAssistant />
    </div>
  );
}

export default App;
