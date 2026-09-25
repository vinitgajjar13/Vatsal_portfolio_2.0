import React, { useState } from 'react';
import { motion } from 'motion/react';
import { skillCategories, autoCADFeatures } from '../data/portfolioData';
import { Zap, DraftingCompass, ShieldCheck, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { SectionHeader } from './animations/SectionHeader';

export const SkillsSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const categoryIcons: Record<string, React.ReactNode> = {
    'electrical-design': <Zap className="w-5 h-5 text-[#393E46]" />,
    'autocad': <DraftingCompass className="w-5 h-5 text-[#393E46]" />,
    'professional-skills': <ShieldCheck className="w-5 h-5 text-[#393E46]" />
  };

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#EEEEEE] border-b border-[#929AAB]/20 relative overflow-hidden"
    >
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid-dense opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          index="[ SECTION 03 // COMPETENCY MATRIX & STANDARDS ]"
          title="Skills & CAD Standards"
          subtitle="Structured core competencies across electrical engineering fundamentals, precision AutoCAD 2D Design, and disciplined technical documentation."
          className="mb-14 sm:mb-20"
        />

        {/* 1. Three Structured Competency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {skillCategories.map((categoryGroup, idx) => (
            <motion.div
              key={categoryGroup.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="bg-[#F7F7F7] border border-[#929AAB]/30 p-7 sm:p-8 flex flex-col justify-between shadow-2xs relative group hover:border-[#393E46] transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#929AAB]/20">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.15 }}
                    >
                      {categoryIcons[categoryGroup.id]}
                    </motion.div>
                    <span className="font-mono text-xs font-bold text-[#393E46] uppercase tracking-wider">
                      CAT 0{idx + 1}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#525866]">
                    [ 0{categoryGroup.skills.length} ITEMS ]
                  </span>
                </div>

                <h3 className="text-2xl font-normal text-[#393E46] font-serif mb-3">
                  {categoryGroup.category}
                </h3>

                <p className="text-xs sm:text-sm text-[#393E46]/75 leading-relaxed font-sans mb-6">
                  {categoryGroup.description}
                </p>

                {/* Skills Item List */}
                <div className="space-y-2.5">
                  {categoryGroup.skills.map((skill, sIdx) => (
                    <motion.div 
                      key={sIdx}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.1 }}
                      className="p-3 bg-[#EEEEEE] border border-[#929AAB]/20 space-y-1 hover:bg-[#EEEEEE]/90 hover:border-[#929AAB]/50 transition-all cursor-default"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#393E46]" />
                        <h4 className="font-mono text-xs font-bold text-[#393E46] uppercase tracking-tight">
                          {skill.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#393E46]/80 leading-normal pl-3.5">
                        {skill.details}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="mt-8 pt-4 border-t border-[#929AAB]/20 flex items-center justify-between text-[10px] font-mono text-[#525866]">
                <span>STANDARDIZED PRACTICE</span>
                <span className="text-[#393E46] font-semibold">VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Structured AutoCAD Drawing Workflow & Layer Standards Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#F7F7F7] border border-[#929AAB]/30 p-6 sm:p-10 shadow-xs"
        >
          {/* Header strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-8 border-b border-[#929AAB]/20">
            <div>
              <div className="font-mono text-xs font-bold text-[#393E46] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#393E46]" />
                <span>AUTOCAD DRAWING WORKFLOW & LAYER STANDARDIZATION</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-serif text-[#393E46] mt-1">
                Engineering Layer Disciplines & Revision Control
              </h4>
            </div>
            <span className="text-xs font-mono text-[#525866] self-start sm:self-auto">
              ISO 7200 / IEC 60617 ALIGNED
            </span>
          </div>

          {/* Interactive Feature Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {autoCADFeatures.map((feature, fIdx) => {
              const isSelected = activeFeature === fIdx;

              return (
                <div
                  key={fIdx}
                  onClick={() => setActiveFeature(fIdx)}
                  className={`p-5 border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#393E46] text-[#F7F7F7] border-[#393E46] shadow-xs'
                      : 'bg-[#EEEEEE] text-[#393E46] border-[#929AAB]/30 hover:border-[#393E46]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className={`font-bold ${isSelected ? 'text-[#F7F7F7]' : 'text-[#393E46]'}`}>
                      PHASE // {feature.number}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-mono ${
                      isSelected ? 'bg-[#F7F7F7]/20 text-[#F7F7F7]' : 'bg-[#F7F7F7] text-[#525866] border border-[#929AAB]/20'
                    }`}>
                      {feature.layerName}
                    </span>
                  </div>

                  <h5 className={`text-base font-semibold font-sans mb-2 ${isSelected ? 'text-white' : 'text-[#393E46]'}`}>
                    {feature.title}
                  </h5>

                  <p className={`text-xs leading-relaxed mb-4 ${isSelected ? 'text-[#F7F7F7]/85' : 'text-[#393E46]/80'}`}>
                    {feature.description}
                  </p>

                  <div className={`pt-3 border-t text-[10px] font-mono flex items-center justify-between ${
                    isSelected ? 'border-[#F7F7F7]/20 text-[#F7F7F7]/75' : 'border-[#929AAB]/20 text-[#525866]'
                  }`}>
                    <span>{feature.standard}</span>
                    <span className="font-semibold">{feature.workflowStep}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
