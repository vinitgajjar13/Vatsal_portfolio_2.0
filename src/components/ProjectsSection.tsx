import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsList } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { 
  ArrowUpRight, 
  ArrowRight, 
  DraftingCompass, 
  Layers, 
  FileText, 
  LayoutGrid, 
  List, 
  Check, 
  Building2,
  Factory,
  Home,
  Zap,
  Activity,
  Tag
} from 'lucide-react';
import { SectionHeader } from './animations/SectionHeader';

interface ProjectsSectionProps {
  onStartInquiry: (projectName: string) => void;
  onViewAllProjects: () => void;
}

// Category tabs configuration with icons
const FILTER_CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'Commercial & Infrastructure', label: 'Commercial', icon: Building2 },
  { id: 'Industrial Power Systems', label: 'Industrial', icon: Factory },
  { id: 'Residential Electrical Systems', label: 'Residential', icon: Home },
  { id: 'Substation & Infrastructure', label: 'Substations', icon: Zap },
  { id: 'Healthcare & Critical Facilities', label: 'Healthcare & Solar', icon: Activity },
];

interface ProjectCardProps {
  project: ProjectItem;
  idx: number;
  onSelect: (p: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, onSelect }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalized between -0.5 and 0.5 for subtle 2D parallax physics
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.45, 
        delay: idx * 0.05, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between bg-[#FFFFFF] border border-[#929AAB]/25 hover:border-[#393E46] transition-all duration-300 cursor-pointer overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* Subtle Technical Corner Crosshairs (+) */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-[#929AAB]/40 pointer-events-none select-none z-20 group-hover:text-[#393E46]/60 transition-colors">
        +
      </div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-[#929AAB]/40 pointer-events-none select-none z-20 group-hover:text-[#393E46]/60 transition-colors">
        +
      </div>

      <div>
        {/* Visual Drawing Frame with Parallax Image Container */}
        <div className="relative aspect-16/10 overflow-hidden bg-[#EEEEEE] border-b border-[#929AAB]/20">
          
          {/* Parallax Image Shift Container */}
          <motion.div
            className="w-full h-full"
            animate={{
              x: isHovered ? mouseOffset.x * -22 : 0,
              y: isHovered ? mouseOffset.y * -18 : 0,
              scale: isHovered ? 1.09 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 25,
            }}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-filter duration-500 will-change-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </motion.div>

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#393E46]/85 via-transparent to-transparent opacity-60 group-hover:opacity-45 transition-opacity pointer-events-none" />

          {/* Top Drawing Meta Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#F7F7F7] z-10 pointer-events-none">
            <span className="bg-[#393E46]/90 backdrop-blur-xs px-2 py-0.5 uppercase tracking-wider font-semibold border border-white/10">
              {project.drawingCode}
            </span>
            <span className="bg-[#393E46]/80 backdrop-blur-xs px-2 py-0.5 uppercase tracking-wider border border-white/10">
              SCALE {project.scale}
            </span>
          </div>

          {/* PARALLAX HOVER OVERLAY: Shows Project Category Label on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-20"
              >
                <div className="bg-[#393E46]/95 backdrop-blur-md px-4 py-2 border border-white/25 shadow-2xl text-[#F7F7F7] flex items-center gap-2.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Floating Stats */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#F7F7F7] z-10 pointer-events-none">
            <span className="bg-black/65 backdrop-blur-xs px-2.5 py-1 flex items-center gap-1.5 border border-white/10">
              <FileText className="w-3 h-3 text-[#929AAB]" />
              <span>{project.deliverables.length} Deliverable Sheets</span>
            </span>
            <span className="bg-black/65 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-wider border border-white/10">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-7 space-y-4">
          {/* Quiet Unboxed Metadata with Active Hover Category Highlight */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#525866]">
            <span className="font-semibold text-[#393E46]">PROJECT {project.number}</span>
            <span aria-hidden="true" className="text-[#929AAB]">·</span>
            <span className={`uppercase truncate transition-colors duration-200 ${isHovered ? 'text-black font-semibold' : ''}`}>
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#393E46] leading-snug group-hover:text-black transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Tagline / Brief Description */}
          <p className="text-xs sm:text-sm text-[#393E46]/80 leading-relaxed font-sans line-clamp-2">
            {project.tagline}
          </p>

          {/* Deliverables Snippet */}
          <div className="pt-2 border-t border-[#929AAB]/15">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#525866] mb-2 flex items-center gap-1.5">
              <DraftingCompass className="w-3 h-3 text-[#393E46]" />
              <span>Key Deliverables</span>
            </div>
            <ul className="space-y-1.5">
              {project.deliverables.slice(0, 2).map((item, dIdx) => (
                <li key={dIdx} className="text-xs text-[#393E46]/85 flex items-start gap-1.5 line-clamp-1">
                  <Check className="w-3 h-3 text-[#393E46] shrink-0 mt-0.5" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Bottom Action Bar */}
      <div className="px-6 sm:px-7 py-3.5 bg-[#EEEEEE]/50 border-t border-[#929AAB]/20 flex items-center justify-between font-mono text-xs text-[#393E46] group-hover:bg-[#EEEEEE] transition-colors">
        <span className="text-[11px] text-[#525866] group-hover:text-[#393E46] transition-colors">
          {project.tools.join(' · ')}
        </span>
        <div className="inline-flex items-center gap-1.5 font-semibold text-xs tracking-wider uppercase group-hover:text-black">
          <span>Inspect Specs</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </motion.article>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onStartInquiry, 
  onViewAllProjects 
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter projects based on active category
  const filteredProjects = projectsList.filter((project) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'Healthcare & Critical Facilities') {
      return (
        project.category === 'Healthcare & Critical Facilities' ||
        project.category === 'Renewable Energy Systems'
      );
    }
    return project.category === activeCategory;
  });

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F7F7F7] border-b border-[#929AAB]/20 relative overflow-hidden"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeader
            index="[ SECTION 02 // SELECTED PORTFOLIO ]"
            title="Featured Projects"
            subtitle="Curated AutoCAD electrical drawing packages, single line diagrams, and infrastructure schematics developed to strict engineering standards."
            className="mb-0 max-w-2xl"
          />

          {/* View Mode Switcher (Grid vs Technical Matrix) */}
          <div className="flex items-center gap-1.5 self-start md:self-end p-1 bg-[#EEEEEE] border border-[#929AAB]/30 rounded-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#393E46] text-[#F7F7F7] shadow-xs'
                  : 'text-[#393E46]/80 hover:text-[#393E46] hover:bg-black/5'
              }`}
              title="Showcase Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#393E46] text-[#F7F7F7] shadow-xs'
                  : 'text-[#393E46]/80 hover:text-[#393E46] hover:bg-black/5'
              }`}
              title="Technical Drawing Index View"
            >
              <List className="w-3.5 h-3.5" />
              <span>Spec Index</span>
            </button>
          </div>
        </div>

        {/* Filter Bar with Animated Slider Pill */}
        <div className="mb-10 sm:mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max border-b border-[#929AAB]/20 pb-4">
            {FILTER_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all'
                ? projectsList.length
                : cat.id === 'Healthcare & Critical Facilities'
                  ? projectsList.filter(p => p.category === 'Healthcare & Critical Facilities' || p.category === 'Renewable Energy Systems').length
                  : projectsList.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-3.5 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer z-10 ${
                    isActive ? 'text-[#F7F7F7] font-semibold' : 'text-[#393E46]/80 hover:text-[#393E46]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#393E46] rounded-xs -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F7F7F7]' : 'text-[#929AAB]'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ml-0.5 ${isActive ? 'text-[#EEEEEE]' : 'text-[#929AAB]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Display: Grid View vs Table View */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key="grid-view"
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </motion.div>
          ) : (
            /* Technical Spec Table View */
            <motion.div 
              key="table-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FFFFFF] border border-[#929AAB]/30 shadow-xs overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#EEEEEE] border-b border-[#929AAB]/30 text-[11px] font-mono text-[#525866] uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6 font-semibold">No. / DWG Code</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold">Project Title</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold hidden md:table-cell">Discipline / Category</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold hidden lg:table-cell">CAD Scale</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold hidden sm:table-cell">Sheets</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#929AAB]/15 font-sans text-sm text-[#393E46]">
                    {filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="group hover:bg-[#F7F7F7] cursor-pointer transition-colors duration-150"
                      >
                        <td className="py-4 px-4 sm:px-6 font-mono text-xs whitespace-nowrap">
                          <span className="font-bold text-[#393E46] mr-2">{project.number}</span>
                          <span className="text-[#929AAB]">{project.drawingCode}</span>
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          <div className="font-serif text-base text-[#393E46] group-hover:text-black font-medium transition-colors">
                            {project.title}
                          </div>
                          <div className="text-xs text-[#525866] font-mono mt-0.5 line-clamp-1">
                            {project.tagline}
                          </div>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-xs font-mono uppercase text-[#525866] hidden md:table-cell whitespace-nowrap">
                          {project.category}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-xs font-mono text-[#525866] hidden lg:table-cell whitespace-nowrap">
                          {project.scale}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-xs font-mono text-[#525866] hidden sm:table-cell whitespace-nowrap">
                          {project.deliverables.length} sheets
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEEEEE] hover:bg-[#393E46] text-[#393E46] hover:text-[#F7F7F7] border border-[#929AAB]/30 text-xs font-mono uppercase tracking-wider transition-colors duration-150 cursor-pointer"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Projects & Technical Archive Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 md:p-10 bg-[#EEEEEE] border border-[#929AAB]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden"
        >
          {/* Subtle background CAD grid accent */}
          <div className="absolute inset-0 bg-cad-grid-dense opacity-20 pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#393E46] flex items-center justify-center md:justify-start gap-2">
              <DraftingCompass className="w-4 h-4 text-[#393E46]" />
              <span>FULL TECHNICAL DRAWING REPOSITORY</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif text-[#393E46]">
              Looking for specific drawing sets or single line diagrams?
            </h4>
            <p className="text-xs sm:text-sm text-[#393E46]/75 font-sans max-w-xl">
              Access the complete archive of {projectsList.length} engineering projects, with ISO title blocks, riser diagrams, and load schedule documentation.
            </p>
          </div>

          <motion.button
            onClick={onViewAllProjects}
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="group relative z-10 inline-flex items-center gap-3 px-7 py-3.5 bg-[#393E46] text-[#F7F7F7] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-black transition-all duration-150 cursor-pointer shadow-xs border border-[#393E46] whitespace-nowrap"
          >
            <span>Browse Full Repository ({projectsList.length})</span>
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
