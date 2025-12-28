
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Layout } from './components/Layout';
import { GeminiChat } from './components/GeminiChat';
import { PERSONAL_INFO, EDUCATION, HACKATHONS, CERTIFICATIONS, SKILLS, RESEARCH_CONTENT, BLOG_POSTS } from './constants';
import { ArrowRight, ArrowUpRight, BrainCircuit, Terminal, Cpu, Layers, CheckCircle2, FlaskConical, Globe, Zap, Database, Network, Terminal as TerminalIcon, Activity } from 'lucide-react';

// --- INTERACTIVE COMPONENTS ---

const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-30 mix-blend-soft-light lg:block hidden"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(79, 70, 229, 0.15), transparent 80%)`
        ),
      }}
    />
  );
};

const NeuralGrid = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

const FadeIn = ({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0 
    },
    visible: { opacity: 1, y: 0, x: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const SkillStream = () => {
  const duplicatedSkills = useMemo(() => [...SKILLS, ...SKILLS], []);
  
  return (
    <div className="relative w-full overflow-hidden py-16">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center"
        >
          {duplicatedSkills.map((skill, i) => (
            <span key={i} className="text-4xl md:text-7xl font-serif italic font-light opacity-10 dark:opacity-20 hover:opacity-100 hover:text-accent transition-all cursor-default text-ink dark:text-white">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-paper dark:from-paper-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-paper dark:from-paper-dark to-transparent z-10" />
    </div>
  );
};

const SystemWatermark = ({ text, top, right }: any) => (
  <div className="absolute pointer-events-none select-none -z-10" style={{ top, right }}>
    <span className="text-[12rem] lg:text-[18rem] font-serif font-black opacity-[0.02] dark:opacity-[0.01] leading-none whitespace-nowrap">
      {text}
    </span>
  </div>
);

// --- SECTIONS ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, -80]);
  const springYText = useSpring(yText, { stiffness: 100, damping: 30 });

  return (
    <section id="about" className="relative flex flex-col justify-center min-h-[90vh] py-16 lg:py-24 border-b border-magazine overflow-hidden scroll-mt-24">
      <NeuralGrid />
      <MouseGlow />
      
      <div className="max-w-6xl relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8 space-y-12 lg:space-y-16">
            <FadeIn direction="up">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-12 h-12 border border-magazine rounded-full flex items-center justify-center bg-paper dark:bg-paper-dark">
                   <Globe size={18} className="text-accent animate-pulse" />
                </div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-accent">NEURAL ARCHITECT // PROTOCOL_V3</p>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-ink dark:text-white leading-[1.05] tracking-tighter text-balanced">
                I am an <span className="text-accent italic">architect of autonomous systems</span>. 
                I build <span className="underline decoration-accent/10 decoration-2 underline-offset-8">frontier models</span> and specialized agents designed to thrive at the intersection of <span className="italic font-normal text-accent">intelligence and scale</span>.
              </h2>
            </FadeIn>

            <div className="relative pt-8 lg:pt-12">
              <SystemWatermark text="AGENTIC" top="-50%" right="10%" />
              <motion.h1 
                style={{ y: springYText }}
                className="font-serif text-6xl md:text-8xl lg:text-[11rem] font-black leading-[0.75] tracking-tighter text-ink dark:text-white"
              >
                Frontier<br/>
                <span className="italic font-normal text-zinc-300 dark:text-zinc-700 underline decoration-accent/10 decoration-4 underline-offset-8">Intelligence.</span>
              </motion.h1>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-10 lg:space-y-12">
            <FadeIn delay={0.2} direction="right">
              <div className="space-y-8 bg-zinc-50 dark:bg-zinc-900/40 p-8 lg:p-10 border border-magazine rounded-sm relative group overflow-hidden shadow-sm">
                 <p className="text-xs font-mono font-bold uppercase tracking-widest opacity-40">Core Philosophy</p>
                 <p className="text-xl font-serif italic opacity-80 leading-relaxed text-ink dark:text-white">
                   "Solving frontier problems with high-bandwidth intelligence and decentralized agency."
                 </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="right">
              <div className="space-y-8 lg:space-y-10">
                <div className="p-8 border border-magazine bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-sm">
                   <div className="flex items-center gap-4 mb-6 opacity-40">
                      <Terminal size={14} />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Active Objectives</span>
                   </div>
                   <ul className="space-y-4 text-sm font-serif italic text-ink/70 dark:text-white/70">
                     <li>Multimodal Synthesis</li>
                     <li>Quantum Reasoning Engines</li>
                     <li>Agentic Security Layers</li>
                   </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResearchSection = () => {
  return (
    <section id="research" className="py-24 lg:py-48 border-b border-magazine relative overflow-hidden scroll-mt-24">
      <SystemWatermark text="NEXT_WAVE" top="10%" right="-5%" />
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up">
          <div className="mb-24 space-y-4">
            <h2 className="text-[11px] font-mono font-bold uppercase tracking-[0.8em] opacity-40 text-ink dark:text-white">MODULE_02 // Research Archive</h2>
            <p className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-ink dark:text-white leading-none">The Future Interface</p>
          </div>
        </FadeIn>
          
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8 space-y-12">
            <FadeIn delay={0.2} direction="up">
              <p className="text-2xl lg:text-4xl font-serif italic text-ink/80 dark:text-white/80 leading-snug">
                "{RESEARCH_CONTENT.focus}"
              </p>
            </FadeIn>
            <FadeIn delay={0.3} direction="up">
              <p className="text-lg lg:text-xl font-serif text-ink/60 dark:text-white/60 leading-relaxed border-l-2 border-accent pl-8 py-4">
                {RESEARCH_CONTENT.vision}
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              {RESEARCH_CONTENT.topics.map((topic, i) => (
                <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="up">
                  <div className="space-y-4 p-8 h-full border border-magazine bg-zinc-50 dark:bg-zinc-900/40 rounded-sm hover:border-accent transition-colors group shadow-sm">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent group-hover:scale-105 transition-transform origin-left">{topic.title}</h4>
                    <p className="text-sm font-serif italic opacity-70 text-ink dark:text-white">{topic.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4 flex flex-col justify-center">
            <FadeIn delay={0.5} direction="left">
              <div className="p-10 bg-accent text-white rounded-sm shadow-2xl space-y-6 relative overflow-hidden group">
                <BrainCircuit size={48} className="relative z-10" />
                <h3 className="text-2xl font-serif font-bold relative z-10">Agentic Era</h3>
                <p className="text-sm opacity-90 leading-relaxed relative z-10">
                  Moving past simple media generation toward persistent agents that verify intent and perform complex sequences of actions autonomously.
                </p>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <Cpu size={120} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 lg:py-48 border-b border-magazine relative overflow-hidden scroll-mt-24">
      <SystemWatermark text="RECORDS" top="5%" right="-5%" />
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up">
          <div className="mb-24 lg:mb-32 space-y-4">
            <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.6em] text-accent">MODULE_03 // Competitive Arena</h2>
            <p className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-ink dark:text-white leading-none">Project Logbook</p>
          </div>
        </FadeIn>

        <div className="space-y-48 lg:space-y-64">
          {HACKATHONS.map((project, idx) => (
            <div key={project.id} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                <div className="lg:col-span-7 relative">
                  <FadeIn direction={idx % 2 === 0 ? "right" : "left"}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm transition-all duration-1000 shadow-lg border border-magazine bg-zinc-100 dark:bg-zinc-800">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.1]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-6 lg:bottom-10 left-6 lg:left-10 flex flex-wrap gap-2 lg:gap-3 z-10">
                          {project.stack.map(s => (
                            <span key={s} className="px-3 py-1 bg-white/95 dark:bg-zinc-900/95 text-ink dark:text-white text-[8px] lg:text-[10px] font-mono font-bold uppercase tracking-widest rounded-full border border-magazine shadow-sm">{s}</span>
                          ))}
                        </div>
                    </div>
                  </FadeIn>
                </div>
                
                <div className="lg:col-span-5 pt-4 lg:pt-8 space-y-8">
                  <FadeIn delay={0.2} direction={idx % 2 === 0 ? "left" : "right"}>
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-accent">{project.achievement}</span>
                      <span className="w-12 h-[1px] bg-magazine"></span>
                      <span className="text-[10px] lg:text-[11px] font-mono uppercase tracking-[0.2em] opacity-40 text-ink dark:text-white">{project.year}</span>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.3} direction={idx % 2 === 0 ? "left" : "right"}>
                    <h3 className="font-serif text-4xl lg:text-6xl font-bold tracking-tighter text-ink dark:text-white leading-[0.9] group-hover:italic transition-all duration-700">
                      {project.title}
                    </h3>
                  </FadeIn>
                  <FadeIn delay={0.4} direction={idx % 2 === 0 ? "left" : "right"}>
                    <p className="text-lg lg:text-xl text-ink/80 dark:text-white/80 font-serif leading-relaxed text-balanced">
                      {project.description}
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.5} direction={idx % 2 === 0 ? "left" : "right"}>
                    <div className="pt-8 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                      <Database size={14} /> <span>{project.organization} Recorded Result</span>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 lg:py-48 border-b border-magazine bg-zinc-50 dark:bg-zinc-900/20 scroll-mt-24 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-24 gap-8">
            <div className="space-y-4">
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.8em] opacity-40 text-ink dark:text-white">MODULE_04 // Thought Engine</h2>
              <p className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-ink dark:text-white leading-none">Journal & Deep Dives</p>
            </div>
            <div className="flex items-center gap-8 border-l border-magazine pl-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-30 block text-accent">Status: Active Thinking</span>
                <div className="flex gap-4">
                  <TerminalIcon size={18} className="text-accent" />
                  <Cpu size={18} className="text-accent" />
                  <Globe size={18} className="text-accent" />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {BLOG_POSTS.map((post, i) => (
            <FadeIn key={i} delay={i * 0.15} direction="up">
              <motion.div 
                whileHover={{ y: -10 }}
                className="group h-full flex flex-col bg-white dark:bg-zinc-900 border border-magazine rounded-sm shadow-sm transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-t-sm border-b border-magazine">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                </div>
                <div className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase px-3 py-1 bg-accent/10 text-accent rounded-sm">{post.category}</span>
                    <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold tracking-tighter text-ink dark:text-white group-hover:italic transition-all">
                    {post.title}
                  </h3>
                  <p className="text-sm font-serif italic text-ink/60 dark:text-white/60 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest group/btn border-t border-magazine pt-6">
                    Read Transmission <ArrowRight size={14} className="group-hover/btn:translate-x-4 transition-transform text-accent" />
                  </button>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      
      <ResearchSection />

      <ProjectsSection />

      {/* Added GeminiChat section to provide the intended AI liaison feature */}
      <GeminiChat />
      
      <section id="skills" className="py-24 border-b border-magazine scroll-mt-24">
        <FadeIn direction="up">
           <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.8em] opacity-40 mb-16 text-center lg:text-left text-ink dark:text-white">Technical Arsenal</h2>
           <SkillStream />
        </FadeIn>
      </section>
      
      <BlogSection />

      <section id="credentials" className="py-48 relative scroll-mt-24">
        <SystemWatermark text="ATTESTATIONS" top="10%" right="-5%" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
             <div className="lg:col-span-7">
               <FadeIn direction="up">
                 <div className="mb-24 space-y-4">
                    <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.8em] opacity-40 text-ink dark:text-white">MODULE_05 // Academic Core</h2>
                    <p className="text-4xl md:text-6xl font-serif font-black tracking-tighter text-ink dark:text-white leading-none">Institutional Records</p>
                  </div>
                 <div className="space-y-20 lg:space-y-32">
                   {EDUCATION.map((edu, i) => (
                     <div key={i} className="pb-16 lg:pb-24 border-b border-magazine last:border-0 group">
                       <FadeIn delay={i * 0.1} direction="up">
                         <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                           <div className="md:col-span-3 text-[10px] font-mono opacity-30 text-ink dark:text-white uppercase tracking-[0.4em]">{edu.period}</div>
                           <div className="md:col-span-9 space-y-6">
                              <h4 className="font-serif text-3xl lg:text-6xl font-bold tracking-tighter text-ink dark:text-white group-hover:italic transition-all duration-700 leading-none">{edu.degree}</h4>
                              <p className="font-serif italic opacity-60 text-xl lg:text-2xl text-ink dark:text-white">{edu.institution}</p>
                              <div className="inline-flex px-8 py-3 bg-zinc-100 dark:bg-zinc-900 border border-magazine text-[11px] font-mono font-bold text-accent uppercase tracking-[0.5em]">{edu.score}</div>
                           </div>
                         </div>
                       </FadeIn>
                     </div>
                   ))}
                 </div>
               </FadeIn>
             </div>
             
             <div className="lg:col-span-5 space-y-24 mt-20 lg:mt-0">
               <div>
                 <FadeIn direction="left">
                   <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.8em] opacity-40 mb-16 text-ink dark:text-white">VERIFIED CREDENTIALS</h2>
                 </FadeIn>
                 <div className="space-y-px bg-magazine border border-magazine overflow-hidden rounded-sm transition-colors duration-500 shadow-2xl">
                   {CERTIFICATIONS.map((cert, i) => (
                     <FadeIn key={i} delay={i * 0.1} direction="left">
                       <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block p-10 bg-paper dark:bg-paper-dark hover:bg-ink hover:text-paper dark:hover:bg-white dark:hover:text-ink transition-all duration-700 group">
                         <div className="flex justify-between items-start mb-8">
                           <h5 className="font-serif text-2xl lg:text-3xl font-bold tracking-tighter group-hover:italic transition-all">{cert.title}</h5>
                           <ArrowUpRight size={18} className="opacity-20 group-hover:opacity-100 transition-all" />
                         </div>
                         <div className="flex flex-wrap gap-4 mb-4">
                           {cert.details.map((d, di) => (
                             <span key={di} className="text-[9px] font-mono opacity-50 uppercase tracking-widest">• {d}</span>
                           ))}
                         </div>
                         <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-20 group-hover:opacity-100 transition-all">{cert.issuer} // {cert.date || 'Active'}</p>
                       </a>
                     </FadeIn>
                   ))}
                 </div>
               </div>
               
               <FadeIn delay={0.3} direction="left">
                <div className="p-12 lg:p-16 border border-magazine bg-paper dark:bg-paper-dark transition-colors duration-700 relative overflow-hidden group shadow-lg">
                    <div className="flex items-center gap-6 mb-10">
                      <FlaskConical size={24} className="text-accent" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.6em] opacity-40">Knowledge Garden</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["Analog Synthesis", "Cyber-Security", "Linux Mastery", "GPU Infographics", "Silicon Valley Tech", "Nvidia Ecosystem", "OpenAI API"].map(tag => (
                        <span key={tag} className="text-[9px] font-mono border border-magazine px-4 py-2 rounded-full opacity-50 hover:opacity-100 hover:border-accent hover:text-accent transition-all cursor-default text-ink dark:text-white uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                </div>
               </FadeIn>
             </div>
          </div>
        </div>
      </section>

      <footer className="pt-32 pb-16 border-t border-magazine relative overflow-hidden">
         <div className="mb-24 lg:mb-48 text-center lg:text-left">
           <FadeIn direction="up">
             <p className="text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.5em] opacity-10 mb-16 lg:mb-20 text-ink dark:text-white">STATION_ID // FRONTIER</p>
             <h2 className="font-serif text-5xl md:text-7xl lg:text-[11rem] font-black tracking-tighter leading-[0.75] mb-20 lg:mb-24 text-ink dark:text-white transition-colors duration-1000">
               Initiate<br/>
               <span className="italic font-normal">Synthesis.</span>
             </h2>
             <a href={`mailto:${PERSONAL_INFO.email}`} className="text-2xl md:text-4xl lg:text-6xl font-serif italic border-b-4 border-accent/20 hover:border-accent transition-all duration-1000 text-ink dark:text-white pb-4 inline-block group relative">
               <span className="relative z-10">{PERSONAL_INFO.email}</span>
               <motion.div className="absolute inset-x-0 bottom-0 h-1 bg-accent/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
             </a>
           </FadeIn>
         </div>
         <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-magazine opacity-40 text-ink dark:text-white">
           <p className="text-[9px] lg:text-10px] font-mono uppercase tracking-[0.5em]">© 2025 {PERSONAL_INFO.name} // Built for the Agentic Era</p>
           <div className="flex gap-12 lg:gap-20 font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.6em]">
             <a href={PERSONAL_INFO.linkedin} className="hover:text-accent transition-colors">LinkedIn</a>
             <a href={PERSONAL_INFO.github} className="hover:text-accent transition-colors">GitHub</a>
           </div>
         </div>
      </footer>
    </Layout>
  );
};

export default App;
