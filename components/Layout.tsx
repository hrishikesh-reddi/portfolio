
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CONTACT_LINKS } from '../constants';
import { ArrowUpRight, Sun, Moon, MapPin, Mail, Linkedin, Github, Phone, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Research', id: 'research' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Blog', id: 'blog' },
    { label: 'Credentials', id: 'credentials' }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-paper dark:bg-paper-dark transition-colors duration-500 overflow-x-hidden">
      {/* Mobile Header (Fixed) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-paper/80 dark:bg-paper-dark/80 backdrop-blur-md border-b border-magazine z-[110] px-6 flex items-center justify-between">
        <div className="font-serif font-black text-xl tracking-tighter text-ink dark:text-white">
          H. Reddy<span className="text-accent">.</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-ink dark:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[120]"
        style={{ scaleX }}
      />

      {/* Sidebar - Dossier Style */}
      <aside className={`
        lg:sticky lg:top-0 lg:h-screen w-full lg:w-[380px] xl:w-[420px] 
        flex flex-col p-10 lg:p-16 border-r border-magazine z-[105] 
        bg-paper dark:bg-paper-dark transition-all duration-500
        ${isMobileMenuOpen ? 'fixed inset-0 pt-24 translate-y-0' : 'hidden lg:flex'}
      `}>
        <div className="flex-1">
          {/* Top Dossier Header */}
          <div className="flex items-center gap-3 mb-10 text-[10px] font-mono uppercase tracking-[0.4em] text-ink/40 dark:text-white/40">
            <span>VOL. 2025</span>
            <span className="w-10 h-[1px] bg-accent/30"></span>
            <span>DOSSIER</span>
          </div>

          {/* Identity */}
          <div className="mb-16 lg:mb-24">
            <h1 className="font-serif font-black text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-[0.85] mb-8 text-ink dark:text-white">
              Hrishikesh<br/><span className="italic font-normal">Reddy.</span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-ink/40 dark:text-white/40">
              <MapPin size={12} className="text-accent/60" />
              <span>Hyderabad, IN</span>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-16">
            <div className="space-y-8">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-ink/30 dark:text-white/30 block">Sections</span>
              <ul className="space-y-5">
                {navItems.map((item, idx) => (
                  <li key={item.id} className="group overflow-hidden">
                    <a 
                      href={`#${item.id}`} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-serif flex items-center gap-6 group-hover:italic group-hover:translate-x-2 transition-all duration-300 text-ink dark:text-white"
                    >
                      <span className="text-[9px] font-mono opacity-30 group-hover:opacity-100 transition-opacity">
                        0{idx + 1}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Network / Socials */}
            <div className="space-y-8">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-ink/30 dark:text-white/30 block">Network</span>
              <div className="flex flex-wrap gap-3">
                {CONTACT_LINKS.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full border border-magazine hover:border-accent hover:text-accent transition-all duration-500 text-ink dark:text-white bg-white/5 dark:bg-white/5"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* System Footer & Mode Toggle */}
        <div className="mt-auto pt-10 border-t border-magazine flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-ink/40 dark:text-white/40">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-accent uppercase tracking-widest">Core_Nominal</span>
            </div>
          </div>
          <button 
            onClick={toggleDarkMode} 
            className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-magazine hover:scale-110 hover:border-accent transition-all duration-500 text-ink dark:text-white"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto lg:h-screen no-scrollbar pt-16 lg:pt-0">
        <div className="w-full max-w-6xl px-6 md:px-12 lg:px-20 py-12 lg:py-32 transition-all duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};
