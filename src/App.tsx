import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ArrowRight, 
  Code, 
  Database, 
  Cpu, 
  Award, 
  BookOpen, 
  Send, 
  ChevronRight, 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  Terminal as TermIcon, 
  Eye,
  Info
} from 'lucide-react';

// Subcomponents
import ParticleNetwork from './components/ParticleNetwork';
import AIBrain3D from './components/AIBrain3D';
import Terminal from './components/Terminal';
import ProjectModal from './components/ProjectModal';
import JanMatVisualizer from './components/JanMatVisualizer';
import GlowCursor from './components/GlowCursor';
import AIAvatar from './components/AIAvatar';

// Static Data
import { projectsData, skillCategories, timelineData, achievementsData } from './data';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [typingRole, setTypingRole] = useState('Machine Learning Engineer');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSending, setFormSending] = useState(false);

  // Dynamic typing animation loop for hero role text
  useEffect(() => {
    const roles = [
      'Machine Learning Engineer',
      'AI Developer',
      'Data Scientist',
      'RAG Developer',
      'Python Developer'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let currentText = '';
    let typeSpeed = 100;

    const typeLoop = () => {
      const currentRole = roles[roleIdx];
      
      if (isDeleting) {
        currentText = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        currentText = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      setTypingRole(currentText);

      if (!isDeleting && charIdx === currentRole.length) {
        // Pause at full word
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    };

    const timeoutId = setTimeout(typeLoop, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Update scroll indicators
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Determine active section based on scroll offsets
      const sections = ['home', 'about', 'skills', 'projects', 'terminal', 'timeline', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Contact Submit with premium simulation feedback
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSending(true);
    // Simulate API submission
    setTimeout(() => {
      setFormSending(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Reset success notification after 5s
      setTimeout(() => setFormSubmitted(false), 6000);
    }, 1800);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-dark-bg font-sans text-white overflow-hidden selection:bg-cyan-neon/30 selection:text-white" id="main-portfolio-root">
      
      {/* Background Interactive Neural Canvas & 3D Sphere */}
      <ParticleNetwork />

      {/* Floating Cursor trailing glow element */}
      <GlowCursor />

      {/* FLOATING TOP PROGRESS BAR */}
      <div 
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-neon via-purple-neon to-cyan-neon z-50 transition-all duration-100 shadow-lg shadow-cyan-neon/40"
        id="navigation-scroll-progress"
      />

      {/* FLOATING GLOBAL NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-dark-bg/60 backdrop-blur-md border-b border-white/5" id="global-header-navbar">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with interactive breathing indicators */}
          <div 
            onClick={() => handleScrollTo('home')}
            className="flex items-center gap-2.5 cursor-pointer font-display font-bold text-lg tracking-wider hover:opacity-90 transition-opacity"
            id="brand-logo-btn"
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-cyan-neon to-purple-neon opacity-20 animate-pulse" />
              <div className="w-4.5 h-4.5 rounded bg-transparent border-2 border-cyan-neon flex items-center justify-center text-[10px] text-cyan-neon font-mono font-bold">
                A
              </div>
            </div>
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              ASMIT SINGH
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider text-zinc-400" id="desktop-main-navigation">
            {[
              { id: 'home', label: '01. HOME' },
              { id: 'about', label: '02. ABOUT' },
              { id: 'skills', label: '03. SKILLS' },
              { id: 'projects', label: '04. WORK' },
              { id: 'terminal', label: '05. SHELL' },
              { id: 'timeline', label: '06. TIMELINE' },
              { id: 'contact', label: '07. HELLO' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`transition-all duration-300 hover:text-cyan-neon relative py-1 cursor-pointer ${
                  activeSection === link.id ? 'text-cyan-neon' : ''
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-cyan-neon shadow-[0_0_8px_#00F5FF]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Direct CTA Hire Me */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-4 py-2 text-xs font-mono border border-cyan-neon/30 text-cyan-neon rounded-lg hover:bg-cyan-neon/10 transition-all duration-300 hover:border-cyan-neon hover:shadow-[0_0_12px_rgba(0,245,255,0.2)] cursor-pointer"
              id="cta-hire-me-top"
            >
              HIRE_ME //
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-24 md:space-y-36 pt-20" id="main-sections-holder">

        {/* ========================================================
            1. HERO / LANDING SECTION
            ======================================================== */}
        <section 
          id="home" 
          className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-between py-12 gap-8 relative"
        >
          {/* Cybernetic decorative accent specs */}
          <div className="absolute top-10 left-0 font-mono text-[10px] text-zinc-500 flex flex-col gap-1 pointer-events-none select-none">
            <span>CORE: ASMIT_LINK_STABLE</span>
            <span>GRID: LAT_35_LONG_82</span>
          </div>

          {/* Text and commands */}
          <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6 text-left relative z-10">
            
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full font-mono text-xs text-cyan-neon text-glow-cyan animate-pulse">
              <Sparkles size={12} />
              <span>ACTIVE_AI_ENGINEER // CHANNELS_OPEN</span>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs md:text-sm text-zinc-500 uppercase tracking-widest block">
                Hello, I'm
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                Asmit <span className="bg-gradient-to-r from-cyan-neon via-purple-neon to-white bg-clip-text text-transparent">Singh</span>
              </h1>
            </div>

            {/* Simulated interactive Typing module */}
            <div className="h-8 flex items-center font-mono text-base md:text-xl text-zinc-300">
              <span className="text-cyan-neon mr-2 font-bold">&gt;</span>
              <span className="text-zinc-200">{typingRole}</span>
              <span className="w-2 h-5 ml-1 bg-cyan-neon cursor-blink shadow-[0_0_6px_#00F5FF]" />
            </div>

            <p className="text-zinc-400 font-sans text-sm md:text-base max-w-lg leading-relaxed">
              Crafting state-of-the-art machine learning models, retrieval neural networks, 
              and data-driven predictive systems to convert high-entropy datasets into 
              structured predictive intelligence.
            </p>

            {/* Call to Actions (Interactive Buttons) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4">
              <button
                onClick={() => handleScrollTo('projects')}
                className="group relative px-6 py-3 bg-gradient-to-r from-cyan-neon/80 to-purple-neon/80 hover:from-cyan-neon hover:to-purple-neon text-white font-mono text-xs tracking-wider rounded-xl transition-all duration-500 shadow-xl shadow-cyan-neon/10 flex items-center justify-center gap-2 overflow-hidden cursor-pointer"
                id="hero-view-projects-btn"
              >
                <span>VIEW_PROJECTS</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => window.print()}
                className="group px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider rounded-xl transition-all duration-300 border border-white/10 hover:border-cyan-neon/30 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-download-resume-btn"
              >
                <Download size={14} className="text-zinc-400 group-hover:text-cyan-neon group-hover:scale-110 transition-colors" />
                <span>EXPORT_CV.pdf</span>
              </button>
            </div>

            {/* Social Gateways Block */}
            <div className="flex items-center gap-5 pt-6 font-mono text-xs text-zinc-500">
              <span className="uppercase tracking-widest">CONNECT_GATEWAYS:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/asmitsinghml"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-cyan-neon transition-colors duration-300 p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5"
                  title="GitHub Profile"
                  id="hero-social-github"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://linkedin.com/asmit-singh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-cyan-neon transition-colors duration-300 p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5"
                  title="LinkedIn Profile"
                  id="hero-social-linkedin"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="mailto:asmitsinghraj5@gmail.com"
                  className="text-zinc-400 hover:text-cyan-neon transition-colors duration-300 p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5"
                  title="Email Communication"
                  id="hero-social-email"
                >
                  <Mail size={16} />
                </a>
                <a
                  href="tel:+919693806763"
                  className="text-zinc-400 hover:text-cyan-neon transition-colors duration-300 p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5"
                  title="Phone Direct"
                  id="hero-social-phone"
                >
                  <Phone size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive rotating 3D Brain */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative" id="hero-3d-asset-container">
            <AIBrain3D />
          </div>
        </section>


        {/* ========================================================
            2. ABOUT SECTION
            ======================================================== */}
        <section id="about" className="py-12 relative">
          <div className="absolute top-0 right-0 font-mono text-[9px] text-zinc-600 pointer-events-none select-none">
            SYS_LOC: INTEL_ABOUT_INDEX
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Generative Face Scan Profile */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start" id="about-face-asset">
              <AIAvatar />
            </div>

            {/* Right Column: Profile Specs & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-cyan-neon uppercase tracking-wider block">
                  01. NEURAL_OVERVIEW
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                  About Asmit Singh
                </h2>
              </div>

              <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed">
                <p>
                  Highly motivated <strong className="text-white font-medium">Computer Science Engineering</strong> student 
                  at <span className="text-cyan-neon font-mono text-xs uppercase px-1.5 py-0.5 bg-cyan-neon/10 border border-cyan-neon/20 rounded">GIFT Autonomous, Bhubaneswar</span> with a 
                  sturdy academic standing of <strong className="text-cyan-neon">CGPA: 7.7 / 10.0</strong>, nearing graduation in 2027.
                </p>
                <p>
                  Specialized in designing robust Machine Learning pipelines, comprehensive data modeling routines, 
                  Retrieval-Augmented Generation (RAG) platforms, and state-of-the-art predictive classification frameworks.
                </p>
                <p>
                  My core passion lies in bridging pure theoretical computer science structures with high-efficiency, practical, 
                  and optimized deployment code. I enjoy transforming chaotic raw datasets into structured, highly 
                  valuable organizational insights.
                </p>
              </div>

              {/* Dynamic Animated Statistics Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4" id="about-stats-grid">
                {[
                  { value: '3+', label: 'PROD_PROJECTS', id: 'stat-projects' },
                  { value: '25+', label: 'SKILLS_INDEXED', id: 'stat-skills' },
                  { value: '3+', label: 'CERTIFICATIONS', id: 'stat-certs' },
                  { value: '7.7', label: 'ACADEMIC_CGPA', id: 'stat-cgpa' }
                ].map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl glass-panel border border-white/5 text-center transition-all duration-300 hover:border-cyan-neon/25 hover:shadow-[0_0_12px_rgba(0,245,255,0.05)]"
                    id={stat.id}
                  >
                    <span className="block text-2xl md:text-3xl font-display font-extrabold text-cyan-neon text-glow-cyan">
                      {stat.value}
                    </span>
                    <span className="block text-[9px] font-mono text-zinc-500 uppercase mt-1 tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            3. SKILLS SECTION
            ======================================================== */}
        <section id="skills" className="py-12 relative">
          <div className="absolute top-0 left-0 font-mono text-[9px] text-zinc-600 pointer-events-none select-none">
            SYS_LOC: SYS_COMPETENCY_MATRIX
          </div>

          <div className="space-y-12">
            
            {/* Header */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-purple-neon uppercase tracking-wider block">
                02. TECHNOLOGY_VECTOR
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                Technical Competency Matrix
              </h2>
              <p className="text-zinc-400 font-sans text-sm max-w-2xl leading-relaxed">
                A quantitative view of technical competencies catalogued by software layers, core statistical analysis, and deep learning libraries.
              </p>
            </div>

            {/* Skills Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="skills-catalog-grid">
              {skillCategories.map((cat, catIdx) => (
                <div 
                  key={catIdx} 
                  className="rounded-xl glass-panel border border-white/5 p-5 md:p-6 flex flex-col gap-5 transition-all duration-500 hover:border-purple-neon/25 hover:shadow-[0_0_15px_rgba(110,68,255,0.05)]"
                  id={`skill-category-${catIdx}`}
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="font-mono text-xs text-purple-neon uppercase tracking-widest font-semibold">
                      // {cat.title}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      SYS_SEC_0{catIdx + 1}
                    </span>
                  </div>

                  {/* Skills Progress items */}
                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => {
                      const barsCount = Math.round(skill.level / 10);
                      const barDisplay = '█'.repeat(barsCount) + '░'.repeat(10 - barsCount);

                      return (
                        <div key={sIdx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-200 font-medium font-sans">
                              {skill.name}
                            </span>
                            <span className="font-mono text-[11px] text-zinc-500">
                              {skill.level}%
                            </span>
                          </div>
                          
                          {/* Progress bar container */}
                          <div className="relative">
                            {/* Visual ASCII loading look */}
                            <div className="text-[11px] font-mono text-zinc-600 tracking-tighter overflow-hidden select-none">
                              {barDisplay}
                            </div>
                            {/* Background bar track */}
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1 relative">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-purple-neon to-cyan-neon shadow-[0_0_8px_#00F5FF]"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ========================================================
            4. PROJECTS SECTION
            ======================================================== */}
        <section id="projects" className="py-12 relative">
          <div className="absolute top-0 right-0 font-mono text-[9px] text-zinc-600 pointer-events-none select-none">
            SYS_LOC: WORK_REPOS_DEPLOYED
          </div>

          <div className="space-y-12">
            
            {/* Header */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyan-neon uppercase tracking-wider block">
                03. EXPERIMENTAL_SANDBOX
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                Featured Deployments
              </h2>
              <p className="text-zinc-400 font-sans text-sm max-w-2xl leading-relaxed">
                Production-ready projects encompassing machine learning pipelines, election analytics engines, and localized semantic search indexes.
              </p>
            </div>

            {/* Project Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-index-grid">
              {projectsData.map((project, idx) => (
                <div 
                  key={project.id}
                  className="rounded-xl glass-panel border border-white/5 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-500 hover:border-cyan-neon/30 hover:shadow-[0_0_20px_rgba(0,245,255,0.06)] group"
                  id={`project-card-${project.id}`}
                >
                  <div className="p-5 md:p-6 space-y-4">
                    {/* Header specs */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                      <span>VER: 0{idx + 1}.0</span>
                      <span className="text-cyan-neon text-glow-cyan uppercase tracking-wider">// {project.category}</span>
                    </div>

                    <h3 className="text-lg font-display font-semibold text-white tracking-tight group-hover:text-cyan-neon transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 font-sans text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Stats summary banner */}
                    {project.stats && (
                      <div className="grid grid-cols-3 gap-2 bg-black/35 rounded-lg p-2.5 border border-white/5">
                        {project.stats.map((st, stIdx) => (
                          <div key={stIdx} className="text-center">
                            <span className="block text-xs font-mono font-bold text-cyan-neon">
                              {st.value}
                            </span>
                            <span className="block text-[8px] text-zinc-500 font-sans uppercase">
                              {st.label.replace(' ', '_')}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="bg-white/5 border border-white/5 text-zinc-400 px-2 py-0.5 rounded text-[10px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="bg-white/5 border border-white/5 text-zinc-500 px-1.5 py-0.5 rounded text-[10px] font-mono">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-4 border-t border-white/5 bg-black/15 flex items-center justify-between">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors duration-200"
                      id={`project-github-link-${project.id}`}
                    >
                      <Github size={16} />
                    </a>
                    
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono text-cyan-neon hover:text-white flex items-center gap-1.5 transition-colors duration-200 uppercase cursor-pointer"
                      id={`project-details-btn-${project.id}`}
                    >
                      <Eye size={12} />
                      <span>EXAMINE_SPECS</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Feature: Interactive Live JanMat election simulator */}
            <div className="border border-white/5 rounded-2xl bg-black/25 overflow-hidden" id="featured-interactive-widget-box">
              <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
                <Info size={14} className="text-cyan-neon" />
                <span className="font-mono text-xs text-zinc-300 uppercase">
                  ACTIVE EMBED: JANMAT_AI ELECTION ENGINE FORECAST SIMULATOR
                </span>
              </div>
              <div className="p-6">
                <JanMatVisualizer />
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            5. INTERACTIVE TERMINAL SECTION
            ======================================================== */}
          <section id="terminal" className="py-12 relative">
            <div className="absolute top-0 left-0 font-mono text-[9px] text-zinc-600 pointer-events-none select-none">
              SYS_LOC: SHELL_INTRUSIVE_GATE
            </div>

            <div className="space-y-12">
              
              {/* Header */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-purple-neon uppercase tracking-wider block">
                  04. CLI_INTERFACE
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                  Asmit Neural Shell Terminal
                </h2>
                <p className="text-zinc-400 font-sans text-sm max-w-2xl leading-relaxed">
                  Bypass standard layout controls entirely. Query professional profiles, cataloged database skills, and educational transcripts directly using the simulated Linux terminal shell below.
                </p>
              </div>

              {/* Shell box */}
              <div className="max-w-4xl mx-auto" id="interactive-terminal-wrapper">
                <Terminal />
              </div>
            </div>
          </section>


        {/* ========================================================
            6. EDUCATION & TIMELINE SECTION
            ======================================================== */}
        <section id="timeline" className="py-12 relative">
          <div className="absolute top-0 right-0 font-mono text-[9px] text-zinc-600 pointer-events-none select-none">
            SYS_LOC: LEDGER_CHRONOLOGY
          </div>

          <div className="space-y-12">
            
            {/* Header */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyan-neon uppercase tracking-wider block">
                05. HISTORIC_MILESTONES
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                Academic Ledger & Internships
              </h2>
              <p className="text-zinc-400 font-sans text-sm max-w-2xl leading-relaxed">
                A vertical chronology mapping university benchmarks, foundational PCM schooling, and verified NPTEL certifications.
              </p>
            </div>

            {/* Vertical Timeline Tree */}
            <div className="relative max-w-3xl mx-auto pl-6 border-l border-white/5 space-y-8 py-2" id="vertical-ledger-timeline">
              
              {timelineData.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="relative group space-y-2"
                  id={`timeline-node-${item.id}`}
                >
                  {/* Glowing Node connector */}
                  <div className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:border-cyan-neon shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-cyan-neon group-hover:shadow-[0_0_8px_#00F5FF] transition-all" />
                  </div>

                  <div className="space-y-1">
                    {/* Date and Type tag */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span className="text-purple-neon uppercase text-[10px] tracking-wider">// {item.type}</span>
                    </div>

                    <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-neon transition-colors">
                      {item.title}
                    </h3>
                    
                    <span className="block font-mono text-xs text-cyan-neon">
                      {item.organization}
                    </span>

                    {item.grade && (
                      <span className="inline-block bg-white/5 border border-white/5 text-zinc-300 px-2 py-0.5 rounded text-[10px] font-mono mt-1">
                        {item.grade}
                      </span>
                    )}
                  </div>

                  {/* Bullet points detailing experience/education */}
                  <ul className="space-y-1 text-zinc-400 font-sans text-xs leading-relaxed pl-3 list-disc">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Achievements & Certifications grid */}
            <div className="space-y-6 pt-6">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block text-center">
                // HONORS & VERIFIED CREDENTIALS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="achievements-cards-grid">
                {achievementsData.map((ach) => (
                  <div 
                    key={ach.id}
                    className="p-5 rounded-xl glass-panel border border-white/5 space-y-3 transition-all duration-300 hover:border-cyan-neon/20 hover:shadow-[0_0_12px_rgba(0,245,255,0.04)]"
                    id={`achievement-card-${ach.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-8 rounded-lg bg-cyan-neon/10 border border-cyan-neon/25 flex items-center justify-center text-cyan-neon">
                        <Award size={18} />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-500">{ach.date}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono text-white font-bold">{ach.title}</h4>
                      <span className="block text-[10px] text-cyan-neon font-mono uppercase">{ach.issuer}</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-sans leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            7. CONTACT SECTION
            ======================================================== */}
        <section id="contact" className="py-12 relative">
          <div className="absolute top-0 left-0 font-mono text-[9px] text-zinc-600 pointer-events-none select-none">
            SYS_LOC: APERTURE_COMM_INLET
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Specs Information column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-cyan-neon uppercase tracking-wider block">
                  06. INGRESS_VALVES
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                  Initialize Contact
                </h2>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                  Have a challenging project, an internship opening, or want to discuss machine learning optimization? Fill out the portal or use verified communication channels directly.
                </p>
              </div>

              {/* Standard contact nodes list */}
              <div className="space-y-4 font-mono text-xs text-zinc-400" id="direct-contact-spec-nodes">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-300">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="block text-zinc-500 text-[10px] uppercase">EMAIL_GATEWAY</span>
                    <a href="mailto:asmitsinghraj5@gmail.com" className="text-zinc-200 hover:text-cyan-neon transition-colors">
                      asmitsinghraj5@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-300">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="block text-zinc-500 text-[10px] uppercase">TEL_DIRECT</span>
                    <a href="tel:+919693806763" className="text-zinc-200 hover:text-cyan-neon transition-colors">
                      +91 9693806763
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-300">
                    <Linkedin size={14} />
                  </div>
                  <div>
                    <span className="block text-zinc-500 text-[10px] uppercase">LINKEDIN_GATE</span>
                    <a href="https://linkedin.com/asmit-singh" target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-cyan-neon transition-colors">
                      linkedin.com/asmit-singh
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form panel */}
            <div className="lg:col-span-7" id="contact-form-portal">
              <div className="rounded-2xl glass-panel border border-white/5 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-bg opacity-20 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleContactSubmit}
                      className="space-y-4 font-mono text-xs relative z-10"
                      id="contact-form-element"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-zinc-400 uppercase">Your Name *</label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. Alan Turing"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-neon/40 focus:ring-1 focus:ring-cyan-neon/20 transition-all font-sans text-sm"
                            id="form-input-name"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-zinc-400 uppercase">Your Email *</label>
                          <input
                            required
                            type="email"
                            placeholder="e.g. alan@princeton.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-neon/40 focus:ring-1 focus:ring-cyan-neon/20 transition-all font-sans text-sm"
                            id="form-input-email"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-zinc-400 uppercase">Subject</label>
                        <input
                          type="text"
                          placeholder="e.g. Neural Net Pipeline Optimization"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-neon/40 focus:ring-1 focus:ring-cyan-neon/20 transition-all font-sans text-sm"
                          id="form-input-subject"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-zinc-400 uppercase">Transmit Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Write your system details here..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-neon/40 focus:ring-1 focus:ring-cyan-neon/20 transition-all font-sans text-sm resize-none"
                          id="form-input-message"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formSending}
                        className="w-full py-3 bg-gradient-to-r from-cyan-neon/80 to-purple-neon/80 hover:from-cyan-neon hover:to-purple-neon text-white uppercase tracking-wider rounded-xl font-bold font-mono transition-all duration-300 hover:shadow-lg hover:shadow-cyan-neon/15 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        id="form-submit-btn"
                      >
                        {formSending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>TRANSMITTING_PACKETS...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>TRANSMIT_PACKET //</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="submit-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-4 font-mono text-xs"
                      id="contact-form-success-box"
                    >
                      <div className="w-16 h-16 rounded-full bg-cyan-neon/10 border border-cyan-neon/40 flex items-center justify-center mx-auto text-cyan-neon text-glow-cyan animate-bounce">
                        <CheckCircle2 size={32} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base text-white font-bold">TRANSMISSION SECURED!</h3>
                        <p className="text-zinc-400 font-sans text-sm">
                          Packets successfully routed through Asmit's local ingress filters. A response will be dispatched shortly.
                        </p>
                      </div>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-4 py-2 border border-white/15 hover:border-cyan-neon/40 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                        id="reset-form-btn"
                      >
                        SEND_ANOTHER_PACKET
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================
          8. FOOTER
          ======================================================== */}
      <footer className="border-t border-white/5 bg-black/40 mt-24 relative z-10" id="global-footer-block">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2 font-display font-bold text-sm select-none">
            <div className="w-5 h-5 rounded bg-transparent border border-cyan-neon flex items-center justify-center text-[8px] text-cyan-neon font-mono">
              A
            </div>
            <span className="tracking-widest text-zinc-300">ASMIT SINGH</span>
          </div>

          {/* Copyrights */}
          <div className="font-mono text-[10px] text-zinc-500 text-center md:text-left select-none">
            © {new Date().getFullYear()} ASMIT SINGH. OPTIMIZED FOR COGNITIVE INFERENCE. ALL CHANNELS SECURED.
          </div>

          {/* Quick legal stats */}
          <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-500">
            <button onClick={() => handleScrollTo('home')} className="hover:text-cyan-neon transition-colors cursor-pointer">BACK_TO_TOP</button>
            <span>|</span>
            <a href="https://github.com/asmitsinghml" target="_blank" rel="noreferrer" className="hover:text-cyan-neon transition-colors">GITHUB</a>
            <span>|</span>
            <a href="https://linkedin.com/asmit-sync" target="_blank" rel="noreferrer" className="hover:text-cyan-neon transition-colors">LINKEDIN</a>
          </div>
        </div>
      </footer>

      {/* ========================================================
          PROJECT DETAILS PREVIEW MODAL GATEWAY
          ======================================================== */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

    </div>
  );
}
