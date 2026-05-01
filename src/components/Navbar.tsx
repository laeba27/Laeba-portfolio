import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pointer-events-auto"
      >
        <a href="#" className="font-serif italic text-2xl tracking-tighter">Huncho.</a>
      </motion.div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 pointer-events-auto bg-white/40 backdrop-blur-md px-8 py-3 rounded-full border border-black/5">
        {NAV_ITEMS.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-[11px] uppercase tracking-[0.2em] font-bold font-sans hover:opacity-60 transition-opacity"
          >
            {item.label}
          </motion.a>
        ))}
      </div>

      {/* Mobile Toggle */}
      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden pointer-events-auto p-3 bg-white rounded-full border border-ink/5 shadow-sm"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 left-6 right-6 bg-white rounded-[32px] p-8 border border-black/5 shadow-xl md:hidden pointer-events-auto"
        >
          <div className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-serif italic border-b border-black/5 pb-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
