import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  currentView?: 'home' | 'all-projects';
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, currentView = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    // Immediately unlock body scroll & close drawer
    document.body.style.overflow = '';
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#F7F7F7]/95 backdrop-blur-md border-b border-[#929AAB]/20 py-3 shadow-xs' 
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#393E46]"
          aria-label="Vatsal Sonigra - Home"
        >
          <div className="w-8 h-8 border border-[#393E46] flex items-center justify-center bg-[#EEEEEE] text-[#393E46] font-mono text-xs font-semibold group-hover:bg-[#393E46] group-hover:text-[#F7F7F7] transition-colors duration-150 shrink-0">
            VS
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-[0.08em] uppercase text-[#393E46] leading-none font-sans group-hover:text-black transition-colors duration-150">
              VATSAL SONIGRA
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#929AAB] uppercase mt-1">
              Electrical Design Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-xs font-medium tracking-wider uppercase">
          {navLinks.map((link) => {
            const isActive = currentView === 'all-projects' 
              ? link.id === 'projects'
              : activeSection === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#393E46] ${
                  isActive ? 'text-[#393E46] font-semibold' : 'text-[#929AAB] hover:text-[#393E46]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#393E46]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden md:flex items-center">
          <motion.button
            onClick={() => handleLinkClick('contact')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="group inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase border border-[#393E46] text-[#393E46] hover:bg-[#393E46] hover:text-[#F7F7F7] transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#393E46]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2.5 text-[#393E46] hover:text-[#393E46] hover:bg-[#EEEEEE] border border-[#929AAB]/30 transition-colors focus:outline-none cursor-pointer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#F7F7F7] border-b border-[#929AAB]/30 px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-2 font-sans text-xs tracking-wider uppercase">
              {navLinks.map((link) => {
                const isActive = currentView === 'all-projects'
                  ? link.id === 'projects'
                  : activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left py-3 px-3 rounded-xs border-b border-[#EEEEEE] flex items-center justify-between transition-colors active:bg-[#EEEEEE] cursor-pointer ${
                      isActive ? 'text-[#393E46] font-bold bg-[#EEEEEE]/70' : 'text-[#929AAB] hover:text-[#393E46]'
                    }`}
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#393E46]" />}
                  </button>
                );
              })}

              <button
                onClick={() => handleLinkClick('contact')}
                className="mt-3 w-full py-3.5 bg-[#393E46] text-[#F7F7F7] font-semibold text-center uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs active:bg-[#393E46]/90"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
