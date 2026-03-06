import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

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
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#00ff9f]/20 py-4 shadow-[0_0_15px_rgba(0,255,159,0.1)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <Terminal size={24} className="text-[#00ff9f] group-hover:animate-pulse" />
          <span className="text-xl font-bold tracking-wider text-[#e5e5e5] group-hover:text-glow transition-all">
            Deepak<span className="text-[#00ff9f]">.exe</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {['About', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 hover:text-[#00ff9f] hover:-translate-y-1 transition-all duration-300 relative group"
            >
              &lt;{item} /&gt;
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ff9f] transition-all group-hover:w-full group-hover:box-glow"></span>
            </a>
          ))}
        </div>
        
        {/* Mobile basic menu button - keeping minimal for now */}
        <div className="md:hidden flex gap-4 text-[#00ff9f]">
           <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={20}/></a>
           <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={20}/></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
