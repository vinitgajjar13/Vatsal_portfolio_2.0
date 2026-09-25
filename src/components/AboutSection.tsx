import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, DraftingCompass, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import vatsalImage from '../assets/vatsal_image.png';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.04, 1.06]);

  const competencies = [
    {
      title: 'Single Line Diagrams (SLD)',
      desc: 'Hierarchical HT/LT power distribution, breaker trip settings, and transformer interlocks.',
      icon: Zap
    },
    {
      title: '2D Layouts & Conduit Routing',
      desc: 'Precision floor power, lighting loops, and clash-free cable tray containment paths.',
      icon: Layers
    },
    {
      title: 'Panel Schedules & Load Balancing',
      desc: 'Connected load calculations, phase balancing matrices, and feeder sizing verification.',
      icon: Cpu
    },
    {
      title: 'Standards & Quality Assurance',
      desc: 'Meticulous layer management adhering strictly to IEC, IEEE, and ISO title block formats.',
      icon: ShieldCheck
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="bg-[#EEEEEE] border-b border-[#929AAB]/20 relative overflow-hidden"
    >
      {/* Background CAD grid hint on the content side */}
      <div className="absolute inset-0 bg-cad-grid-dense opacity-25 pointer-events-none" />

      {/* Full Left-Side Page Arrangement — No Frame, No Container */}
      <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[720px] lg:min-h-[820px] relative z-10">
        
        {/* FULL BLEED LEFT SIDE: Edge-to-edge portrait image without any container or card box */}
        <div className="w-full lg:w-[45%] xl:w-[42%] relative shrink-0 min-h-[460px] sm:min-h-[560px] lg:min-h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {/* Subtle floating animation wrapper using Framer Motion */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotate: [-0.3, 0.3, -0.3],
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="w-full h-full"
            >
              <motion.img
                style={{ y: imageY, scale: imageScale }}
                src={vatsalImage}
                alt="Vatsal Sonigra - Electrical Design Engineer"
                className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-out will-change-transform scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Subtle Gradient Overlays for Depth and Seamless Blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#393E46]/85 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/20 lg:via-transparent lg:to-[#EEEEEE]/40 pointer-events-none" />

            {/* Minimalist CAD Overlay Tag (Clean corner badge directly on image with gentle floating pulse) */}
            <div className="absolute bottom-6 left-6 sm:left-10 z-10">
              <motion.div 
                animate={{
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#393E46]/90 backdrop-blur-md px-4 py-3 border-l-2 border-white text-[#F7F7F7] shadow-lg max-w-xs"
              >
                <div className="text-[10px] font-mono text-[#929AAB] uppercase tracking-widest flex items-center gap-1.5 mb-0.5">
                  <DraftingCompass className="w-3 h-3 text-white" />
                  <span>CAD DISCIPLINE // VERIFIED</span>
                </div>
                <div className="font-serif text-base text-white font-medium">
                  {personalInfo.name}
                </div>
                <div className="text-[11px] font-mono text-white/80 mt-0.5">
                  Electrical Design & Technical Documentation
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: EDITORIAL & TECHNICAL CONTENT WITH EXPANSIVE PADDING */}
        <div className="flex-1 py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col justify-center">
          <div className="max-w-3xl">

            {/* Section Index Marker with Expanding Axis */}
            <div className="flex items-center gap-3 mb-6">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs font-semibold tracking-[0.2em] text-[#393E46] uppercase shrink-0"
              >
                [ SECTION 01 // OVERVIEW & PHILOSOPHY ]
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] bg-[#929AAB]/35 origin-left flex-1"
              />
            </div>

            {/* Main Editorial Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#393E46] tracking-tight leading-[1.15] mb-6"
            >
              Precision electrical design engineered for flawless field execution.
            </motion.h2>

            {/* Editorial Biography */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 text-sm sm:text-base text-[#393E46]/85 leading-relaxed font-sans mb-10"
            >
              <p>
                I am an <strong>Electrical Design Engineer</strong> specializing in AutoCAD-based electrical schematics, single line diagrams, and complete engineering drawing packages. My mission is to bridge theoretical electrical concepts with practical, buildable site documentation.
              </p>
              <p>
                Whether drafting multi-tier cable trench cross-sections for 33kV substations, balancing connected loads across main distribution boards, or sizing vertical risers for high-density buildings, I ensure zero ambiguity between design schematics and contractor installation.
              </p>
            </motion.div>

            {/* Key Engineering Metric Indicators (Clean unboxed statistics) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-[#929AAB]/25 mb-10 font-mono"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-[#393E46] font-normal">150+</div>
                <div className="text-[11px] text-[#525866] uppercase tracking-wider mt-1">
                  Technical Drawings Delivered
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-[#393E46] font-normal">0%</div>
                <div className="text-[11px] text-[#525866] uppercase tracking-wider mt-1">
                  Discrepancy Tolerance
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-serif text-[#393E46] font-normal">IEC / IEEE</div>
                <div className="text-[11px] text-[#525866] uppercase tracking-wider mt-1">
                  Design Standards Compliant
                </div>
              </div>
            </motion.div>

            {/* Core Competencies Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
            >
              {competencies.map((comp, idx) => {
                const Icon = comp.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="p-4 bg-[#F7F7F7] border border-[#929AAB]/25 hover:border-[#393E46] transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon className="w-4 h-4 text-[#393E46] group-hover:scale-110 transition-transform duration-200" />
                      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#393E46]">
                        {comp.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#525866] font-sans leading-relaxed">
                      {comp.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action CTA & Quick Inquire Trigger */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onContactClick}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#393E46] text-[#F7F7F7] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-black transition-all duration-150 cursor-pointer shadow-xs border border-[#393E46]"
              >
                <span>Discuss Engineering Scope</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </button>

              <div className="font-mono text-xs text-[#525866] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for technical projects & consulting</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
