import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">
            <span className="text-[#0a0a0a] text-stroke">03.</span> 
            Initiate_Connection
          </h2>
          <div className="w-24 h-1 bg-[#00ff9f] mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            My inbox is always open. Whether you have a question or just want to say hi, 
            I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <div className="glassmorphism p-8 rounded-xl h-full border-l-4 border-l-[#00ff9f]">
               <h3 className="text-2xl font-bold mb-8 text-[#e5e5e5]">Contact Information</h3>
               
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-[#0a0a0a] rounded text-[#00ff9f]">
                     <Mail size={24} />
                   </div>
                   <div>
                     <p className="text-sm text-gray-400 font-mono mb-1">EMAIL</p>
                     <a href="mailto:hello@example.com" className="text-lg hover:text-[#00ff9f] transition-colors">hello@deepak.dev</a>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-[#0a0a0a] rounded text-[#00ff9f]">
                     <Phone size={24} />
                   </div>
                   <div>
                     <p className="text-sm text-gray-400 font-mono mb-1">PHONE</p>
                     <p className="text-lg">+91 98765 43210</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-[#0a0a0a] rounded text-[#00ff9f]">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <p className="text-sm text-gray-400 font-mono mb-1">LOCATION</p>
                     <p className="text-lg">India</p>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-xl space-y-6">
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-mono text-[#00ff9f]">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-[#00ff9f] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-mono text-[#00ff9f]">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-[#00ff9f] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-mono text-[#00ff9f]">Message</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-[#00ff9f] transition-colors resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-[#0a0a0a] font-bold tracking-widest uppercase transition-all duration-300 flex justify-center items-center gap-2
                  ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : submitted ? 'bg-green-500' : 'bg-[#00ff9f] hover:-translate-y-1 hover:box-glow'}
                `}
              >
                {isSubmitting ? 'Transmitting...' : submitted ? 'Message Sent' : 'Send Message'}
                {!isSubmitting && !submitted && <Send size={18} />}
              </button>
            </form>
          </motion.div>

        </div>
        
        <footer className="mt-24 text-center pb-8">
          <p className="text-sm text-gray-500 font-mono">
             Designed & Built by Deepak <br/>
            <span className="text-[#00ff9f] opacity-50">&copy; {new Date().getFullYear()} // ALL SYSTEMS NOMINAL</span>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
