import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsList } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { SectionHeader } from './animations/SectionHeader';
import { ArrowLeft, ArrowUpRight, DraftingCompass, Filter, FileText } from 'lucide-react';

interface AllProjectsPageProps {
  onBackToHome: (targetSection?: string) => void;
  onContactClick: () => void;
}

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ onBackToHome, onContactClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Scroll to top immediately on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = ['All', ...Array.from(new Set(projectsList.map((p) => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#F7F7F7] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16 relative"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 mb-10 border-b border-[#929AAB]/20">
          <motion.button
            onClick={() => onBackToHome('projects')}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#EEEEEE] hover:bg-[#393E46] text-[#393E46] hover:text-[#F7F7F7] border border-[#929AAB]/30 text-xs font-mono uppercase tracking-wider transition-colors duration-150 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Overview</span>
          </motion.button>

          <div className="text-xs font-mono text-[#525866] hidden sm:block">
            SHOWING {filteredProjects.length} OF {projectsList.length} TOTAL DRAWING PACKAGES
          </div>
        </div>

        {/* Section Header */}
        <SectionHeader
          index="[ COMPLETE ARCHIVE // ALL TECHNICAL PROJECTS ]"
          title="All Electrical Projects"
          subtitle="Explore the complete engineering repository of AutoCAD 2D Design packages, single line diagrams, load distribution matrices, and critical facility schematics."
          className="mb-10 sm:mb-14"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-14 pb-5 border-b border-[#929AAB]/20">
          <div className="flex items-center gap-2 mr-2 text-xs font-mono text-[#525866]">
            <Filter className="w-3.5 h-3.5 text-[#393E46]" />
            <span className="uppercase font-semibold">Filter Category:</span>
          </div>

          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const count = category === 'All' 
              ? projectsList.length 
              : projectsList.filter((p) => p.category === category).length;

            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-150 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#393E46] text-[#F7F7F7] border-[#393E46] shadow-xs font-semibold'
                    : 'bg-[#EEEEEE] text-[#393E46] border-[#929AAB]/30 hover:border-[#393E46]'
                }`}
              >
                <span>{category}</span>
                <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-[#EEEEEE]' : 'text-[#929AAB]'}`}>
                  ({count})
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Gallery */}
        <div className="space-y-14 sm:space-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isReversed = idx % 2 === 1;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-[#EEEEEE] border border-[#929AAB]/30 hover:border-[#393E46] transition-all duration-300 cursor-pointer overflow-hidden shadow-xs hover:shadow-md"
                >
                  {/* Top Technical Metadata Bar */}
                  <div className="px-6 sm:px-8 py-3.5 bg-[#EEEEEE] border-b border-[#929AAB]/20 flex items-center justify-between font-mono text-xs text-[#929AAB]">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#393E46] text-sm">
                        PROJECT // {project.number}
                      </span>
                      <span className="h-3 w-[1px] bg-[#929AAB]/40" />
                      <span className="uppercase text-[11px] text-[#393E46] font-medium tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] hidden sm:flex">
                      <span>YEAR: {project.year}</span>
                      <span className="h-3 w-[1px] bg-[#929AAB]/40" />
                      <span className="text-[#393E46] font-semibold">{project.drawingCode}</span>
                    </div>
                  </div>

                  {/* Main Card Grid */}
                  <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Visual Image Column */}
                    <div className={`lg:col-span-7 relative overflow-hidden bg-[#393E46]/10 min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] ${
                      isReversed ? 'lg:order-2 lg:border-l border-[#929AAB]/30' : 'lg:order-1 lg:border-r border-[#929AAB]/30'
                    }`}>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#393E46]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-[#393E46]/90 backdrop-blur-xs text-[#F7F7F7] text-[10px] font-mono tracking-wider">
                          SCALE {project.scale}
                        </span>
                        <span className="px-2.5 py-1 bg-[#F7F7F7]/95 backdrop-blur-xs text-[#393E46] text-[10px] font-mono tracking-wider font-semibold border border-[#929AAB]/30">
                          {project.sheetSize}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F7F7F7] text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 bg-[#393E46]/80 px-2.5 py-1 backdrop-blur-xs">
                          <FileText className="w-3.5 h-3.5 text-[#929AAB]" />
                          <span>{project.deliverables.length} Deliverable Sheets</span>
                        </div>
                        <span className="bg-[#393E46]/80 px-2.5 py-1 backdrop-blur-xs hidden sm:inline">
                          STATUS: ISSUED FOR CONSTRUCTION
                        </span>
                      </div>
                    </div>

                    {/* Editorial Details Column */}
                    <div className={`lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}>
                      <div>
                        {project.client && (
                          <div className="text-[11px] font-mono text-[#525866] uppercase tracking-wider mb-2">
                            Client: <span className="font-semibold text-[#393E46]">{project.client}</span>
                          </div>
                        )}

                        <h3 className="text-2xl sm:text-3xl font-normal text-[#393E46] leading-tight font-serif mb-4 group-hover:text-black transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm sm:text-base text-[#393E46]/85 leading-relaxed font-sans mb-6">
                          {project.description}
                        </p>

                        <div className="p-3.5 bg-[#F7F7F7] border border-[#929AAB]/30 mb-5">
                          <div className="font-mono text-[10px] font-bold text-[#525866] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <DraftingCompass className="w-3 h-3 text-[#393E46]" />
                            <span>CAD TOOLS & METHODOLOGY</span>
                          </div>
                          <div className="font-mono text-xs text-[#393E46] font-semibold">
                            {project.tools.join(' • ')}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx}
                              className="px-2.5 py-1 bg-[#F7F7F7] border border-[#929AAB]/25 text-[11px] font-mono text-[#393E46] group-hover:border-[#929AAB]/60 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-[#929AAB]/25 flex items-center justify-between">
                        <span className="text-xs font-mono text-[#525866] group-hover:text-[#393E46] transition-colors">
                          Click to view full drawings & specs
                        </span>

                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#393E46] group-hover:underline">
                          <span>View Specifications</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-20 p-8 sm:p-10 bg-[#EEEEEE] border border-[#929AAB]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-normal text-[#393E46] font-serif">
              Require custom AutoCAD drawings or project schematics?
            </h4>
            <p className="text-xs sm:text-sm text-[#393E46]/80 font-sans max-w-xl">
              Available for remote and on-site engineering consultations, SLD development, and complete architectural CAD packages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              onClick={() => onBackToHome('contact')}
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="px-6 py-3.5 bg-[#393E46] text-[#F7F7F7] text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              Get In Touch
            </motion.button>

            <motion.button
              onClick={() => onBackToHome('projects')}
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="px-6 py-3.5 bg-[#F7F7F7] border border-[#929AAB]/40 text-[#393E46] text-xs font-semibold uppercase tracking-wider hover:bg-[#EEEEEE] transition-all cursor-pointer whitespace-nowrap"
            >
              Back to Home
            </motion.button>
          </div>
        </div>

      </div>

      {/* Project Specification Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(_projectName) => {
          setSelectedProject(null);
          onContactClick();
        }}
      />
    </motion.div>
  );
};
