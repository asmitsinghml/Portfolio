import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { projectsData, skillCategories } from '../data';

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'accent' | 'matrix';
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'Initializing Asmit Neural Shell [Version 4.2.1-prod]...', type: 'output' },
    { text: 'Loading core machine learning modules...', type: 'output' },
    { text: 'Connection secured with DeepMind API gateway.', type: 'success' },
    { text: 'Type "help" to view list of active terminal commands.', type: 'accent' },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { text: `asmit@deepmind:~$ ${cmdStr}`, type: 'input' as const }];
    let outputs: LogLine[] = [];

    // Save to command log
    setCommandHistory((prev) => [cmdStr, ...prev]);
    setHistoryIndex(-1);

    switch (trimmed) {
      case 'help':
        outputs = [
          { text: 'Available commands:', type: 'accent' },
          { text: '  about      - View professional profile summary', type: 'output' },
          { text: '  projects   - Display premium ML & AI engineering projects', type: 'output' },
          { text: '  skills     - Render ASCII chart of technical competencies', type: 'output' },
          { text: '  resume     - Detail academic milestones & certifications', type: 'output' },
          { text: '  contact    - Retrieve verified communication channels', type: 'output' },
          { text: '  matrix     - Activate falling code subsystem stream', type: 'matrix' },
          { text: '  clear      - Wipe terminal scroll history', type: 'output' },
        ];
        break;
      case 'about':
        outputs = [
          { text: '=== ASMIT SINGH - AI & ML ENGINEER ===', type: 'accent' },
          { text: 'Highly motivated Computer Science Engineering student passionate about Machine Learning, Artificial Intelligence, and Data Science.', type: 'output' },
          { text: 'Experienced in designing ML pipelines, predictive models, Retrieval-Augmented Generation (RAG) systems, and AI-powered applications.', type: 'output' },
          { text: 'I enjoy transforming raw data into intelligent solutions that solve real-world problems.', type: 'output' },
        ];
        break;
      case 'projects':
        outputs = [
          { text: '=== VERIFIED ML & AI DEPLOYMENTS ===', type: 'accent' },
          ...projectsData.map((p) => ({
            text: `• [${p.category}] ${p.title}\n  - ${p.description}\n  - Stack: ${p.techStack.join(', ')}`,
            type: 'success' as const,
          })),
        ];
        break;
      case 'skills':
        outputs = [
          { text: '=== CORE SYSTEM COMPETENCY INDEX ===', type: 'accent' },
          ...skillCategories.flatMap((cat) => [
            { text: `[${cat.title}]`, type: 'accent' as const },
            ...cat.skills.map((s) => {
              const barsCount = Math.round(s.level / 10);
              const progress = '█'.repeat(barsCount) + '░'.repeat(10 - barsCount);
              return {
                text: `  ${s.name.padEnd(28)} ${progress} ${s.level}%`,
                type: 'output' as const,
              };
            }),
          ]),
        ];
        break;
      case 'resume':
        outputs = [
          { text: '=== EDUCATION & MILESTONES ===', type: 'accent' },
          { text: '• B.Tech in Computer Science Engineering (2023 - 2027)\n  GIFT Autonomous, Bhubaneswar | CGPA: 7.7', type: 'output' },
          { text: '• Intermediate PCM (2022) | Lok Mahavidyalaya, Bihar\n  Score: 67.0%', type: 'output' },
          { text: '• Matriculation CBSE (2020) | DAV Public School, Bihar\n  Score: 82.5%', type: 'output' },
          { text: '• Certifications:\n  - NPTEL Cloud Computing (Passed)\n  - NPTEL Elite IoT 4.0\n  - Machine Learning & AI Industrial Intern (45 Days)', type: 'success' },
        ];
        break;
      case 'contact':
        outputs = [
          { text: '=== COMM GATEWAYS SECURED ===', type: 'accent' },
          { text: '• Phone:    +919693806763', type: 'output' },
          { text: '• Email:    asmitsinghraj5@gmail.com', type: 'success' },
          { text: '• GitHub:   https://github.com/asmitsinghml', type: 'success' },
          { text: '• LinkedIn: https://linkedin.com/asmit-singh', type: 'success' },
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'matrix':
        outputs = [
          { text: '0101010101010101010101010101010101010101010101', type: 'matrix' },
          { text: 'SYSTEM OVERRIDE: MATRIX STREAMING INIT...', type: 'matrix' },
          { text: 'NEURAL_LINK_ESTABLISHED: AGENT_ASMIT_SINGH', type: 'matrix' },
          { text: '1010101010101010101010101010101010101010101010', type: 'matrix' },
        ];
        break;
      default:
        outputs = [
          { text: `bash: command not found: ${trimmed}. Type "help" for instructions.`, type: 'error' },
        ];
    }

    setHistory([...newHistory, ...outputs]);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full h-[400px] rounded-lg border border-white/10 bg-black/85 font-mono text-sm shadow-2xl p-4 flex flex-col cursor-text overflow-hidden relative"
      id="linux-terminal-shell-box"
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-neon/5 via-transparent to-transparent pointer-events-none" />

      {/* OS Mac Terminal styled circles */}
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/5 select-none relative z-10">
        <div className="w-3 h-3 rounded-full bg-rose-500/85 shadow-lg shadow-rose-500/25" />
        <div className="w-3 h-3 rounded-full bg-amber-500/85 shadow-lg shadow-amber-500/25" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/85 shadow-lg shadow-emerald-500/25" />
        <div className="ml-3 text-xs text-zinc-500 flex-grow text-center pr-12 select-none">
          asmit@deepmind: ~
        </div>
      </div>

      {/* Terminal Content Scrollbox */}
      <div className="flex-grow overflow-y-auto space-y-1.5 pr-2 relative z-10" id="terminal-scroll-container">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-wrap transition-all duration-300 ${
              line.type === 'input' ? 'text-zinc-200 font-bold' :
              line.type === 'error' ? 'text-rose-400' :
              line.type === 'success' ? 'text-cyan-neon font-medium text-glow-cyan' :
              line.type === 'accent' ? 'text-purple-neon text-glow-purple font-semibold' :
              line.type === 'matrix' ? 'text-emerald-400 text-xs animate-pulse font-bold' :
              'text-zinc-300'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Input line */}
      <div className="flex items-center pt-2 border-t border-white/5 mt-2 relative z-10 select-none">
        <span className="text-purple-neon font-bold mr-2 text-glow-purple">asmit@deepmind:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none outline-none text-cyan-neon font-mono text-sm caret-cyan-neon focus:ring-0 p-0"
          placeholder="type help..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          id="terminal-cli-input"
        />
      </div>
    </div>
  );
}
