import React, { useState } from 'react';
import { motion } from 'motion/react';
import { projectsList } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, DraftingCompass, ArrowRight, Layers, FileText } from 'lucide-react';
import { SectionHeader } from './animations/SectionHeader';

interface ProjectsSectionProps {
  onStartInquiry: (projectName: string) => void;
  onViewAllProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onStartInquiry, 
  onViewAllProjects 
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Show top 3 featured projects on the homepage
  const featuredProjects = projectsList.slice(0, 3);

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F7F7F7] border-b border-[#929AAB]/20 relative overflow-hidden"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          index="[ SECTION 02 // SELECTED PORTFOLIO ]"
          title="Featured Projects"
          subtitle="Curated AutoCAD electrical drawing packages, single line diagrams, and infrastructure schematics developed to strict engineering standards."
          className="mb-14 sm:mb-20"
        />

        {/* Project Gallery - Modern Editorial Showcase */}
        <div className="space-y-16 sm:space-y-24">
          {featuredProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
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

                {/* Main Card Grid: Image & Content */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Image Column */}
                  <div className={`lg:col-span-7 relative overflow-hidden bg-[#393E46]/10 min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] ${
                    isReversed ? 'lg:order-2 lg:border-l border-[#929AAB]/30' : 'lg:order-1 lg:border-r border-[#929AAB]/30'
                  }`}>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for Text Readability & Mood */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#393E46]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Technical Badges */}
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
                      {/* Category & Client Info */}
                      {project.client && (
                        <div className="text-[11px] font-mono text-[#525866] uppercase tracking-wider mb-2">
                          Client: <span className="font-semibold text-[#393E46]">{project.client}</span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#393E46] leading-tight font-serif mb-4 group-hover:text-black transition-colors">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-sm sm:text-base text-[#393E46]/85 leading-relaxed font-sans mb-6">
                        {project.tagline}
                      </p>

                      {/* Tools & CAD Discipline */}
                      <div className="p-3.5 bg-[#F7F7F7] border border-[#929AAB]/30 mb-5">
                        <div className="font-mono text-[10px] font-bold text-[#525866] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <DraftingCompass className="w-3 h-3 text-[#393E46]" />
                          <span>CAD TOOLS & METHODOLOGY</span>
                        </div>
                        <div className="font-mono text-xs text-[#393E46] font-semibold">
                          {project.tools.join(' • ')}
                        </div>
                      </div>

                      {/* Skills Badges */}
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

                    {/* Bottom Action Strip */}
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
        </div>

        {/* View All Projects Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-24 p-8 sm:p-10 bg-[#EEEEEE] border border-[#929AAB]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#393E46] flex items-center justify-center md:justify-start gap-2">
              <Layers className="w-4 h-4 text-[#393E46]" />
              <span>COMPLETE ENGINEERING DRAWING ARCHIVE</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif text-[#393E46]">
              Explore all {projectsList.length} documented engineering projects
            </h4>
            <p className="text-xs sm:text-sm text-[#393E46]/75 font-sans max-w-xl">
              Including 33kV substation schematics, healthcare isolated power systems (IPS), commercial solar PV grid tie-in, and residential riser packages.
            </p>
          </div>

          <motion.button
            onClick={onViewAllProjects}
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#393E46] text-[#F7F7F7] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-black transition-all duration-150 cursor-pointer shadow-xs border border-[#393E46] whitespace-nowrap"
          >
            <span>View All Projects ({projectsList.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
          </motion.button>
        </motion.div>

      </div>

      {/* Complete Specification Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(projectName) => {
          setSelectedProject(null);
          onStartInquiry(projectName);
        }}
      />
    </section>
  );
};
