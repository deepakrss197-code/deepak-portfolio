import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="glassmorphism p-6 md:p-8 rounded-xl relative group hover:-translate-y-2 transition-all duration-500 h-full flex flex-col"
  >
    {/* Hover Glow effect outline */}
    <div className="absolute inset-0 border border-[#00ff9f]/10 rounded-xl group-hover:border-[#00ff9f]/50 transition-colors duration-500 pointer-events-none"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#00ff9f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>

    <div className="flex justify-between items-center mb-8 relative z-10">
      <Folder size={40} className="text-[#00ff9f] group-hover:animate-pulse" />
      <div className="flex gap-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#00ff9f] transition-colors">
            <Github size={20} />
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#00ff9f] transition-colors">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>

    <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-4 group-hover:text-[#00ff9f] transition-colors relative z-10">
      {project.title}
    </h3>
    
    <p className="text-gray-400 mb-8 flex-grow relative z-10 leading-relaxed">
      {project.description}
    </p>

    <ul className="flex flex-wrap gap-3 font-mono text-xs text-[#00ff9f]/70 relative z-10">
      {project.tech.map((tech, i) => (
        <li key={i} className="bg-[#00ff9f]/10 px-2 py-1 rounded">
          {tech}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      title: "Neon E-Commerce Platform",
      description: "A high-performance e-commerce platform built with React, Node.js, and MongoDB. Features real-time inventory updates, secure payment gateways, and a sleek dark-mode UI.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
      github: "https://github.com/deepak",
      live: "https://example.com"
    },
    {
      title: "Algorithmic Trading Bot",
      description: "A Python-based trading algorithm that analyzes market sentiment using NLP and executes trades based on technical indicators. Includes a web dashboard for monitoring.",
      tech: ["Python", "Pandas", "Scikit-Learn", "FastAPI"],
      github: "https://github.com/deepak",
      live: "https://example.com"
    },
    {
      title: "Cyberpunk Chat App",
      description: "End-to-end encrypted real-time chat application featuring WebSockets, presence detection, and a terminal-inspired aesthetic.",
      tech: ["Socket.io", "React", "Redux", "Framer Motion"],
      github: "https://github.com/deepak",
      live: "https://example.com"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow flex items-center gap-4">
            <span className="text-[#0a0a0a] text-stroke">02.</span> 
            Featured_Builds
          </h2>
          <div className="w-24 h-1 bg-[#00ff9f]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://github.com/deepak" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block px-8 py-3 bg-transparent border-2 border-gray-700 text-gray-300 hover:border-[#00ff9f] hover:text-[#00ff9f] transition-all duration-300 tracking-wider font-mono text-sm"
          >
            Archive / More Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
