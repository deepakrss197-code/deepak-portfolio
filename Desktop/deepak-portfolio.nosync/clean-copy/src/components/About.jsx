import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const SkillBar = ({ skill, level }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-300">{skill}</span>
      <span className="text-sm font-medium text-[#00ff9f]">{level}%</span>
    </div>
    <div className="w-full bg-[#1a1a1a] rounded-full h-2">
      <motion.div
        className="bg-[#00ff9f] h-2 rounded-full relative"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-2 bg-white blur-[2px]"></div>
      </motion.div>
    </div>
  </div>
);

const About = () => {
  const skills = [
    { name: "C / C++", level: 90 },
    { name: "Python", level: 85 },
    { name: "Data Structures & Algorithms", level: 80 },
    { name: "React / Modern Web Dev", level: 95 },
    { name: "Backend APIs", level: 75 }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow flex items-center gap-4">
            <span className="text-[#0a0a0a] text-stroke">01.</span> 
            About_Me
          </h2>
          <div className="w-24 h-1 bg-[#00ff9f]"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-gray-400 text-lg leading-relaxed"
          >
            <p>
              Hello world. I'm Deepak, a passionate Computer Science Engineering student obsessed with building 
              high-performance digital experiences. My journey began with hacking together simple scripts, 
              which quickly evolved into engineering robust full-stack applications.
            </p>
            <p>
              I specialize in bridging the gap between sleek frontend interfaces and 
              efficient backend systems. When I'm not studying core CS concepts like OS and networking, 
              you'll find me optimizing algorithms or exploring the latest web technologies.
            </p>
            <div className="flex items-center gap-4 text-[#00ff9f] mt-8 p-4 border border-[#00ff9f]/20 bg-[#00ff9f]/5 rounded">
              <Terminal size={24} />
              <span className="font-mono text-sm tracking-wider">STATUS: SEEKING INTERNSHIP & OPPORTUNITIES</span>
            </div>
          </motion.div>

          {/* Hacker UI Skills Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glassmorphism p-8 rounded-xl relative overflow-hidden group hover:box-glow transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff9f] to-transparent opacity-50"></div>
            
            <div className="flex items-center gap-2 mb-8 border-b border-gray-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs text-gray-500 font-mono tracking-widest">~/skills.sh</span>
            </div>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <SkillBar key={index} skill={skill.name} level={skill.level} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
