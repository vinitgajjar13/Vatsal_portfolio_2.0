import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, DraftingCompass } from 'lucide-react';
import { SectionHeader } from './animations/SectionHeader';
import vatsalImage from '../assets/vatsal_image.png';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02]);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#EEEEEE] border-b border-[#929AAB]/20 relative overflow-hidden"
    >
      {/* Background CAD grid hint */}
      <div className="absolute inset-0 bg-cad-grid-dense opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader 
          index="[ SECTION 01 // OVERVIEW ]"
          title="About Me"
          subtitle="Engineering background, technical CAD discipline, and single line diagram documentation standards."
          className="mb-12 sm:mb-16"
        />

        {/* Desktop: Two-Column Composition (Large Image Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: LARGE PROMINENT PROFILE IMAGE (NO CARD/CONTAINER BOX) */}
          <motion.div 
            ref={imageRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Direct, clean large image presentation — not inside a small card or boxed container */}
            <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[660px] overflow-hidden bg-[#393E46]/10 shadow-lg">
              <motion.img
                style={{ y: imageY, scale: imageScale }}
                src={vatsalImage}
                alt="Vatsal Sonigra - Electrical Design Engineer"
                className="w-full h-full object-cover object-top grayscale contrast-110 hover:grayscale-0 transition-all duration-500 ease-out will-change-transform"
                referrerPolicy="no-referrer"
              />

              {/* Minimal Clean Engineering Overlay at Bottom Corner */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-[#393E46]/90 via-[#393E46]/40 to-transparent text-[#F7F7F7] flex items-end justify-between backdrop-blur-2xs">
                <div>
                  <span className="font-mono text-[10px] text-[#929AAB] tracking-widest uppercase block mb-0.5">
                    TECHNICAL PROFILE
                  </span>
                  <span className="font-sans font-semibold text-sm sm:text-base tracking-wide text-white">
                    {personalInfo.name}
                  </span>
                </div>
                <div className="text-right font-mono text-[11px] text-[#F7F7F7]/90">
                  <span className="block font-bold">{personalInfo.drawingsCount}</span>
                  <span className="text-[9px] text-[#929AAB]">AUTOCAD PRACTICE</span>
                </div>
              </div>
            </div>

            {/* Subtle Minimalist Drawing Indicator below image */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#525866] px-1">
              <div className="flex items-center gap-1.5">
                <DraftingCompass className="w-3.5 h-3.5 text-[#393E46]" />
                <span>DWG REF // ELEC-PROFILE-2026</span>
              </div>
              <span className="uppercase text-[#393E46] font-semibold">VERIFIED CAD DISCIPLINE</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: EDITORIAL CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              {/* Role Title with Clean Horizontal Accent */}
              <div className="text-xl sm:text-2xl font-normal text-[#393E46] tracking-tight mb-6 flex items-center gap-3 font-serif">
                <span>Electrical Design Engineer</span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="w-16 h-[1.5px] bg-[#393E46] origin-left" 
                />
              </div>

              {/* Editorial Biography Paragraphs */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ staggerChildren: 0.08 }}
                className="space-y-4 text-sm sm:text-base text-[#393E46]/85 leading-relaxed font-sans mb-8 max-w-2xl"
              >
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  I am an <strong>Electrical Design Engineer</strong> focused on <strong>AutoCAD-based electrical design, single line diagrams, and complete technical documentation</strong>. I specialize in turning complex architectural and industrial engineering concepts into clean, buildable, and standards-compliant 2D CAD packages.
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  From primary power distribution drawings and substation equipment layouts to vertical riser diagrams, branch circuiting, and switchboard load matrices, my work emphasizes <strong>geometric precision, strict layer standards, and zero discrepancy between schematics and physical plans</strong>.
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  By strictly adhering to IEC, IEEE, and local building codes, I ensure drawings serve as clear, reliable roadmaps for electrical contractors, municipal plan checkers, and field installation teams.
                </motion.p>
              </motion.div>

              {/* Technical Specifications Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 bg-[#F7F7F7] border border-[#929AAB]/30 mb-8 divide-y divide-[#929AAB]/20 shadow-2xs"
              >
                {/* ROLE */}
                <div className="pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="font-mono text-[11px] font-bold text-[#525866] uppercase tracking-wider">
                    ROLE
                  </span>
                  <span className="font-sans text-sm font-semibold text-[#393E46]">
                    Electrical Design Engineer
                  </span>
                </div>

                {/* SPECIALIZATION */}
                <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="font-mono text-[11px] font-bold text-[#525866] uppercase tracking-wider">
                    SPECIALIZATION
                  </span>
                  <span className="font-sans text-sm font-semibold text-[#393E46]">
                    AutoCAD-Based Electrical Design & Technical Documentation
                  </span>
                </div>

                {/* CORE FOCUS */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="font-mono text-[11px] font-bold text-[#525866] uppercase tracking-wider">
                    CORE FOCUS
                  </span>
                  <span className="font-sans text-sm font-semibold text-[#393E46]">
                    Single Line Diagrams • Lighting & Power Layouts • Cable Schedules
                  </span>
                </div>
              </motion.div>

              {/* Key Competencies Checklist */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ staggerChildren: 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#393E46] mb-10"
              >
                {[
                  'Single Line Diagrams (SLD)',
                  '2D Power & Lighting Layouts',
                  'Cable Tray & Trench Containment',
                  'IEC / IEEE Drawing Standards',
                  'Panel Schedules & Load Balancing',
                  'Substation & Critical Care Schematics'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="flex items-center gap-2.5 p-2 bg-[#F7F7F7]/60 border border-[#929AAB]/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#393E46] shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Direct Contact Action Link */}
            <div>
              <motion.button
                onClick={onContactClick}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#393E46] group cursor-pointer pb-1.5 border-b-2 border-[#393E46]"
              >
                <span>Discuss a Project or Technical Scope</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150" />
              </motion.button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
