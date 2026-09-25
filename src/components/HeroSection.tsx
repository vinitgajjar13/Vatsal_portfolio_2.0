import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, DraftingCompass, Layers, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';
import { BlurText } from './animations/BlurText';
import { TextType } from './animations/TextType';

interface HeroSectionProps {
  onViewWork: () => void;
  onGetInTouch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onGetInTouch }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Track subtle mouse movement for live technical coordinate display
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    }
  };

  const technicalRoles = [
    'AutoCAD 2D Specialist',
    'Single Line Diagrams (SLD)',
    'Power & Lighting Layouts',
    'Substation & Industrial Detailing',
    'Panel Schedules & Conduit Containment',
  ];

  return (
    <section 
      ref={containerRef}
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] lg:min-h-[96vh] flex flex-col justify-between pt-32 sm:pt-40 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 bg-[#F7F7F7] overflow-hidden border-b border-[#929AAB]/20"
    >
      {/* Subtle Background Architectural CAD Grid with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-cad-grid opacity-60 pointer-events-none will-change-transform" 
      />

      {/* Subtle Technical Floating Decorative Crosshair & Compass Ring */}
      <div className="absolute -top-16 -right-16 w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-[#929AAB]/15 pointer-events-none hidden md:block">
        <div className="absolute inset-4 rounded-full border border-dashed border-[#929AAB]/20 animate-[spin_120s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-[#929AAB]/10" />
      </div>

      {/* Top Left Engineering Coordinate Pill (Real-time micro interaction) */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex items-center justify-between pb-6 text-[10px] font-mono text-[#929AAB] select-none">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#EEEEEE]/80 border border-[#929AAB]/25 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#393E46] font-medium tracking-wide">STATUS: ACTIVE & AVAILABLE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#525866]">
          <span>COORD [X:{mousePos.x} Y:{mousePos.y}]</span>
          <span>SCALE [1:1]</span>
          <span>SYSTEM [IEC / IEEE]</span>
        </div>
      </div>

      {/* Main Centered Typography & Content Container */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="max-w-4xl mx-auto w-full relative z-10 my-auto text-center flex flex-col items-center will-change-transform"
      >
        
        {/* 1. Eyebrow with Symmetrical Expanding CAD Markers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center gap-3 mb-6"
        >
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="w-6 sm:w-10 h-[1.5px] bg-[#393E46] origin-right" 
          />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#393E46] uppercase">
            ELECTRICAL DESIGN ENGINEER
          </span>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="w-6 sm:w-10 h-[1.5px] bg-[#393E46] origin-left" 
          />
        </motion.div>

        {/* 2. Main Headline in Editorial Playfair Display with Blur Reveal */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-normal text-[#393E46] tracking-tight leading-[1.02] mb-5 font-serif">
          <BlurText text="Vatsal Sonigra" delay={0.05} />
        </h1>

        {/* 3. Supporting Headline with Typewriter Subheading Rotator */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-2xl md:text-3xl font-medium text-[#393E46] tracking-tight leading-snug mb-6 font-sans max-w-3xl flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-[#525866]">Specialized in</span>
          <TextType 
            words={technicalRoles} 
            typingSpeed={40} 
            deletingSpeed={20} 
            pauseDuration={1800}
            className="text-[#393E46] font-semibold underline decoration-[#929AAB]/60 decoration-2 underline-offset-4"
          />
        </motion.div>

        {/* 4. Supporting Editorial Copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg text-[#393E46]/85 leading-relaxed max-w-2xl mb-10 font-normal font-sans"
        >
          Bridging technical engineering standards with field-ready precision. Delivering clean 2D AutoCAD schematics, single line diagrams, and comprehensive electrical documentation.
        </motion.p>

        {/* 5. Clear, Prominent CTAs with Tactile Micro-Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={onViewWork}
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#393E46] text-[#F7F7F7] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-black transition-all duration-150 border border-[#393E46] cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#393E46]"
          >
            <span>Explore Selected Work</span>
            <ArrowDown className="w-4 h-4 text-[#F7F7F7] group-hover:translate-y-1 transition-transform duration-150" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={onGetInTouch}
            whileHover={{ scale: 1.025, y: -1, backgroundColor: '#EEEEEE' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-[#393E46] text-xs sm:text-sm font-semibold tracking-wider uppercase border border-[#929AAB] hover:border-[#393E46] transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#393E46]"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-4 h-4 text-[#393E46] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
          </motion.button>
        </motion.div>

      </motion.div>

      {/* Hero Bottom Technical Indicators Row */}
      <motion.div 
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto w-full relative z-10 pt-8 sm:pt-10 border-t border-[#929AAB]/25 mt-10 sm:mt-14"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono text-[#929AAB]">
          
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-start gap-3 p-3 bg-[#EEEEEE]/50 border border-[#929AAB]/20 group cursor-default"
          >
            <div className="w-8 h-8 rounded-xs bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
              <DraftingCompass className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            </div>
            <div>
              <div className="text-[10px] text-[#525866] uppercase font-semibold">SPECIALIZATION</div>
              <div className="font-bold text-[#393E46]">AutoCAD 2D Design</div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-start gap-3 p-3 bg-[#EEEEEE]/50 border border-[#929AAB]/20 group cursor-default"
          >
            <div className="w-8 h-8 rounded-xs bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 group-hover:translate-y-[-1px] transition-transform duration-200" />
            </div>
            <div>
              <div className="text-[10px] text-[#525866] uppercase font-semibold">DOCUMENTATION</div>
              <div className="font-bold text-[#393E46]">SLD & Panel Schedules</div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-start gap-3 p-3 bg-[#EEEEEE]/50 border border-[#929AAB]/20 group cursor-default"
          >
            <div className="w-8 h-8 rounded-xs bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div>
              <div className="text-[10px] text-[#525866] uppercase font-semibold">COMPLIANCE</div>
              <div className="font-bold text-[#393E46]">IEC / IEEE Standards</div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-start gap-3 p-3 bg-[#EEEEEE]/50 border border-[#929AAB]/20 group cursor-default"
          >
            <div className="w-8 h-8 rounded-xs bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
            </div>
            <div>
              <div className="text-[10px] text-[#525866] uppercase font-semibold">PRECISION</div>
              <div className="font-bold text-[#393E46]">150+ Drawings</div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};
