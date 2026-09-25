import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { CustomCursor } from './components/animations/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AllProjectsPage } from './components/AllProjectsPage';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  // View state: 'home' or 'all-projects'
  const [currentView, setCurrentView] = useState<'home' | 'all-projects'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#all-projects' ? 'all-projects' : 'home';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [contactSubject, setContactSubject] = useState('');
  const [pendingScrollSection, setPendingScrollSection] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 28,
    restDelta: 0.001
  });

  // Cross-device, bulletproof scroll executor
  const performSmoothScroll = useCallback((rawId: string) => {
    // 1. Guarantee no scroll lock remains
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const sectionId = 
      rawId === 'portfolio' || rawId === 'work' ? 'projects' 
      : rawId === 'home' ? 'hero' 
      : rawId;

    const executeScroll = () => {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
      }

      const el = document.getElementById(sectionId);
      if (!el) return false;

      const rect = el.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      // Fixed navbar height: 64px on mobile, 80px on desktop
      const navbarHeight = window.innerWidth < 768 ? 64 : 80;
      const targetY = Math.max(0, rect.top + currentScrollY - navbarHeight);

      if (Math.abs(currentScrollY - targetY) < 4) {
        return true;
      }

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
      return true;
    };

    // Immediate execution via requestAnimationFrame
    requestAnimationFrame(() => {
      executeScroll();
    });

    // Secondary settle for mobile
    setTimeout(() => {
      executeScroll();
    }, 120);
  }, []);

  // On initial mount, handle any URL hash directly without intro delay
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== 'all-projects') {
        const timer = setTimeout(() => {
          performSmoothScroll(hash);
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [performSmoothScroll]);

  // Primary navigation handler
  const handleNavigate = useCallback((rawSectionId: string) => {
    const sectionId = 
      rawSectionId === 'portfolio' || rawSectionId === 'work' ? 'projects' 
      : rawSectionId === 'home' ? 'hero' 
      : rawSectionId;

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    // 1. If in 'all-projects' view and user clicked a home section
    if (currentView !== 'home') {
      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
      setPendingScrollSection(sectionId);
      setCurrentView('home');
      return;
    }

    // 2. If already in home view
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    performSmoothScroll(sectionId);
  }, [currentView, performSmoothScroll]);

  // Navigate to All Projects page
  const handleViewAllProjects = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    if (window.location.hash !== '#all-projects') {
      window.history.pushState(null, '', '#all-projects');
    }
    setCurrentView('all-projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Back to home view handler
  const handleBackToHome = useCallback((targetSection = 'projects') => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const sectionId = 
      targetSection === 'portfolio' || targetSection === 'work' ? 'projects' 
      : targetSection === 'home' ? 'hero' 
      : targetSection;

    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    setPendingScrollSection(sectionId);
    setCurrentView('home');
  }, []);

  // Execute queued scroll target once Home view is mounted in DOM
  useEffect(() => {
    if (currentView === 'home' && pendingScrollSection) {
      const target = pendingScrollSection;
      setPendingScrollSection(null);
      const timer = setTimeout(() => {
        performSmoothScroll(target);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [currentView, pendingScrollSection, performSmoothScroll]);

  const handleInquireFromProject = useCallback((projectTitle: string) => {
    setContactSubject(`Inquiry regarding: ${projectTitle}`);
    handleNavigate('contact');
  }, [handleNavigate]);

  // Synchronize browser history / URL hash changes (Back & Forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'all-projects') {
        setCurrentView('all-projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        if (currentView !== 'home') {
          setPendingScrollSection(hash || 'hero');
          setCurrentView('home');
        } else if (hash) {
          performSmoothScroll(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [currentView, performSmoothScroll]);

  // Active section observer on scroll
  useEffect(() => {
    if (currentView !== 'home') {
      setActiveSection('projects');
      return;
    }

    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  return (
    <>
      {/* Precision CAD Custom Cursor for Desktop */}
      <CustomCursor />

      <div className="min-h-screen bg-[#F7F7F7] text-[#393E46] selection:bg-[#393E46] selection:text-[#F7F7F7] font-sans antialiased">
        {/* Top Precision Scroll Progress Line */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#393E46] origin-left z-50 pointer-events-none"
          style={{ scaleX }}
        />

        {/* Navigation Bar */}
        <Navbar 
          activeSection={activeSection}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        {/* Views Container */}
        {currentView === 'home' ? (
          <main key="home-view" className="w-full">
            {/* 1. Hero Section */}
            <HeroSection 
              onViewWork={() => handleNavigate('projects')}
              onGetInTouch={() => handleNavigate('contact')}
            />

            {/* 2. About Section */}
            <AboutSection 
              onContactClick={() => handleNavigate('contact')}
            />

            {/* 3. Selected Work / Projects Section */}
            <ProjectsSection 
              onStartInquiry={handleInquireFromProject}
              onViewAllProjects={handleViewAllProjects}
            />

            {/* 4. Skills & Expertise */}
            <SkillsSection />

            {/* 5. Contact Section */}
            <ContactSection 
              initialSubject={contactSubject}
            />
          </main>
        ) : (
          <main key="all-projects-view" className="w-full">
            <AllProjectsPage 
              onBackToHome={handleBackToHome}
              onContactClick={() => handleNavigate('contact')}
            />
          </main>
        )}

        {/* 6. Footer */}
        <Footer 
          onNavigate={handleNavigate}
        />
      </div>
    </>
  );
}
