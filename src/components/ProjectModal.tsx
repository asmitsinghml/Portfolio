import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, Github, ExternalLink, Cpu, Terminal as TermIcon, Award } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="project-modal-mask">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          id="project-modal-backdrop"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl glass-panel-heavy rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
          id={`modal-${project.id}`}
        >
          {/* Cybernetic background grids */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-neon/10 filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-neon/10 filter blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors duration-200 z-20 cursor-pointer"
            aria-label="Close modal"
            id="close-modal-btn"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="relative pb-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
            <div>
              <span className="text-xs font-mono text-cyan-neon uppercase tracking-wider block mb-1">
                {project.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
            
            {/* Quick Links */}
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 border border-white/10 hover:border-cyan-neon/40 font-mono"
                id="modal-github-link"
              >
                <Github size={16} />
                <span>Source</span>
              </a>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-neon/80 to-purple-neon/80 hover:from-cyan-neon hover:to-purple-neon text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 font-mono shadow-lg shadow-cyan-neon/10"
                  id="modal-demo-link"
                >
                  <ExternalLink size={16} />
                  <span>Interactive</span>
                </a>
              )}
            </div>
          </div>

          {/* Modal Content Scrollbox */}
          <div className="flex-grow overflow-y-auto space-y-6 pt-6 pr-2 relative z-10" id="modal-content-scroller">
            {/* Stats Counter Row */}
            {project.stats && (
              <div className="grid grid-cols-3 gap-4 bg-white/5 rounded-xl p-4 border border-white/5">
                {project.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-center">
                    <span className="block text-xl md:text-2xl font-display font-bold text-cyan-neon text-glow-cyan">
                      {stat.value}
                    </span>
                    <span className="block text-[10px] md:text-xs font-mono text-zinc-400 uppercase mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Overview & Problem/Solution Dual columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-mono text-purple-neon flex items-center gap-2 uppercase tracking-wider mb-2">
                  <TermIcon size={14} />
                  <span>Overview</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  {project.overview}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono text-purple-neon flex items-center gap-2 uppercase tracking-wider mb-2">
                  <Cpu size={14} />
                  <span>The Problem</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  {project.problem}
                </p>
              </div>
            </div>

            {/* Clean Division */}
            <div className="border-t border-white/5 pt-4">
              <h3 className="text-sm font-mono text-cyan-neon flex items-center gap-2 uppercase tracking-wider mb-2">
                <Award size={14} />
                <span>The Engineered Solution</span>
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>

            {/* Micro Architecture diagram block */}
            <div className="border-t border-white/5 pt-4">
              <h3 className="text-sm font-mono text-purple-neon uppercase tracking-wider mb-3">
                System Architecture
              </h3>
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-2.5">
                {project.architecture.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="bg-cyan-neon/10 text-cyan-neon font-mono text-xs px-2 py-0.5 rounded border border-cyan-neon/20 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-zinc-300 text-sm font-sans">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Bubbles */}
            <div>
              <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Tech Stack Integration
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-1 rounded-full text-xs font-mono border border-white/5 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
              <div>
                <h3 className="text-sm font-mono text-rose-400 uppercase tracking-wider mb-2">
                  Engineering Challenges
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  {project.challenges}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-2">
                  Quantifiable Results
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  {project.results}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
