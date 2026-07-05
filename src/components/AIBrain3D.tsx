import { useEffect, useRef, useState } from 'react';

export default function AIBrain3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rotationRef = useRef({ x: 0.3, y: 0.4, vx: 0.005, vy: 0.008 });
  const mousePosRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let size = canvas.getBoundingClientRect().width || 380;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    interface BrainNode {
      x3d: number;
      y3d: number;
      z3d: number;
      lobe: 'frontal' | 'parietal' | 'occipital' | 'temporal' | 'cerebellum' | 'stem';
      pulsePhase: number;
      pulseSpeed: number;
    }

    const brainNodes: BrainNode[] = [];
    const nodeCount = 280;

    // Generate clusters that mimic real brain structure
    for (let i = 0; i < nodeCount; i++) {
      let x = 0, y = 0, z = 0;
      let lobe: BrainNode['lobe'] = 'frontal';

      // Pick cluster based on index distribution
      const rand = Math.random();
      if (rand < 0.25) {
        // Frontal Lobe (large, top-front)
        lobe = 'frontal';
        const theta = Math.random() * Math.PI * 1.2 - Math.PI * 0.6;
        const phi = Math.random() * Math.PI - Math.PI / 2;
        x = Math.cos(phi) * Math.sin(theta) * 0.9;
        y = Math.sin(phi) * 0.7 - 0.2;
        z = Math.cos(phi) * Math.cos(theta) * 0.7 + 0.3;
      } else if (rand < 0.5) {
        // Parietal & Occipital Lobe (top-back)
        lobe = 'parietal';
        const theta = Math.random() * Math.PI * 1.2 + Math.PI * 0.4;
        const phi = Math.random() * Math.PI * 0.8 - Math.PI * 0.4;
        x = Math.cos(phi) * Math.sin(theta) * 0.85;
        y = Math.sin(phi) * 0.6 - 0.25;
        z = Math.cos(phi) * Math.cos(theta) * 0.85;
      } else if (rand < 0.7) {
        // Temporal Lobe (sides, lower middle)
        lobe = 'temporal';
        const side = Math.random() > 0.5 ? 1 : -1;
        x = side * (0.8 + Math.random() * 0.2);
        y = Math.random() * 0.4 - 0.1;
        z = Math.random() * 0.6 - 0.2;
      } else if (rand < 0.85) {
        // Cerebellum (back-bottom)
        lobe = 'cerebellum';
        const theta = Math.random() * Math.PI * 0.8 + Math.PI * 0.6;
        x = Math.sin(theta) * 0.6;
        y = 0.5 + Math.random() * 0.25;
        z = Math.cos(theta) * 0.6 - 0.2;
      } else {
        // Brain Stem (bottom center going down)
        lobe = 'stem';
        x = (Math.random() - 0.5) * 0.18;
        y = 0.4 + Math.random() * 0.55;
        z = (Math.random() - 0.5) * 0.18;
      }

      // Add symmetric noise and shape scaling to look organic
      brainNodes.push({
        x3d: x * 1.1,
        y3d: y * 0.9,
        z3d: z * 1.1,
        lobe,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.04
      });
    }

    // Floating outer neural network halo dust particles
    interface DustParticle {
      x3d: number;
      y3d: number;
      z3d: number;
      radius: number;
      color: string;
      speed: number;
    }
    const dustParticles: DustParticle[] = [];
    for (let i = 0; i < 40; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.3 + Math.random() * 0.5; // surrounding envelope
      dustParticles.push({
        x3d: r * Math.sin(phi) * Math.cos(theta),
        y3d: r * Math.sin(phi) * Math.sin(theta),
        z3d: r * Math.cos(phi),
        radius: Math.random() * 1.5 + 0.8,
        color: Math.random() > 0.6 ? '#00F5FF' : '#6E44FF',
        speed: 0.01 + Math.random() * 0.02
      });
    }

    let scale = size * 0.38;
    const center = { x: size / 2, y: size / 2 };

    const handleResize = () => {
      if (!canvas) return;
      size = canvas.getBoundingClientRect().width || 380;
      canvas.width = size * window.devicePixelRatio;
      canvas.height = size * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      scale = size * 0.38;
      center.x = size / 2;
      center.y = size / 2;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      // Smooth hover velocities
      const rot = rotationRef.current;
      const targetVx = isHovered ? 0.015 : 0.003;
      const targetVy = isHovered ? 0.022 : 0.005;
      rot.vx += (targetVx - rot.vx) * 0.08;
      rot.vy += (targetVy - rot.vy) * 0.08;

      rot.x += rot.vx;
      rot.y += rot.vy;

      // Outer boundary sphere ring (subtle, cybernetic grid lines)
      ctx.strokeStyle = isHovered ? 'rgba(0, 245, 255, 0.06)' : 'rgba(110, 68, 255, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center.x, center.y, scale * 1.4, 0, Math.PI * 2);
      ctx.stroke();

      // Project and draw dust particles
      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);

      dustParticles.forEach((p) => {
        // Orbit rotation
        let x1 = p.x3d * Math.cos(p.speed) - p.z3d * Math.sin(p.speed);
        let z1 = p.z3d * Math.cos(p.speed) + p.x3d * Math.sin(p.speed);
        p.x3d = x1;
        p.z3d = z1;

        // Apply camera matrix
        let rx1 = p.x3d * cosY - p.z3d * sinY;
        let rz1 = p.z3d * cosY + p.x3d * sinY;
        let ry2 = p.y3d * cosX - rz1 * sinX;
        let rz2 = rz1 * cosX + p.y3d * sinX;

        const perspective = 2.0 / (2.0 - rz2);
        const px = center.x + rx1 * scale * perspective;
        const py = center.y + ry2 * scale * perspective;

        const alpha = Math.max(0.1, (rz2 + 1) / 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isHovered ? 8 : 2;
        ctx.beginPath();
        ctx.arc(px, py, p.radius * Math.max(0.6, alpha), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0; // reset

      // Projected node coordinates for synapses
      const projectedNodes: { px: number; py: number; depth: number; color: string; pulse: number; node: BrainNode }[] = [];

      brainNodes.forEach((node) => {
        // Rotate lobe phase
        node.pulsePhase += isHovered ? node.pulseSpeed * 2.2 : node.pulseSpeed;

        // Apply camera matrices
        let rx1 = node.x3d * cosY - node.z3d * sinY;
        let rz1 = node.z3d * cosY + node.x3d * sinY;
        let ry2 = node.y3d * cosX - rz1 * sinX;
        let rz2 = rz1 * cosX + node.y3d * sinX;

        const perspective = 2.5 / (2.5 - rz2);
        const px = center.x + rx1 * scale * perspective;
        const py = center.y + ry2 * scale * perspective;

        const depth = rz2; // ranges -1.5 to 1.5 approx

        // Decide color based on hemisphere side and lobe
        let color = '#6E44FF'; // default purple
        if (node.x3d > 0) {
          color = '#00F5FF'; // cyan
        }

        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;

        projectedNodes.push({ px, py, depth, color, pulse, node });
      });

      // Draw synapses (connections) - cluster specific to make it look like brain fibers!
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedNodes.length; i++) {
        const nodeA = projectedNodes[i];
        let maxConnections = isHovered ? 4 : 2;
        let connections = 0;

        for (let j = i + 1; j < projectedNodes.length; j++) {
          if (connections >= maxConnections) break;

          const nodeB = projectedNodes[j];
          
          // Connect mostly within same lobe to retain structure shapes
          if (nodeA.node.lobe !== nodeB.node.lobe && Math.random() > 0.08) continue;

          const dx = nodeA.px - nodeB.px;
          const dy = nodeA.py - nodeB.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < scale * 0.28) {
            connections++;
            const meanDepth = (nodeA.depth + nodeB.depth) / 2;
            const alpha = Math.max(0.02, (meanDepth + 1.2) / 2.5) * (1 - dist / (scale * 0.28));
            
            // Neon pulse wave flowing through fibers
            const pulseIntensity = (nodeA.pulse + nodeB.pulse) / 2;
            const strokeColor = nodeA.color === '#00F5FF'
              ? `rgba(0, 245, 255, ${alpha * (0.15 + pulseIntensity * 0.45)})`
              : `rgba(110, 68, 255, ${alpha * (0.15 + pulseIntensity * 0.45)})`;

            ctx.strokeStyle = strokeColor;
            ctx.beginPath();
            ctx.moveTo(nodeA.px, nodeA.py);
            ctx.lineTo(nodeB.px, nodeB.py);
            ctx.stroke();
          }
        }
      }

      // Draw brain nodes
      projectedNodes.forEach((node) => {
        const alpha = Math.max(0.15, (node.depth + 1.2) / 2.5);
        const radius = (isHovered ? 2.5 : 1.8) * Math.max(0.6, alpha);

        // Highlight node color with its organic pulse
        const nodeGlow = node.pulse;
        ctx.fillStyle = node.color === '#00F5FF'
          ? `rgba(0, 245, 255, ${alpha * (0.6 + nodeGlow * 0.4)})`
          : `rgba(110, 68, 255, ${alpha * (0.6 + nodeGlow * 0.4)})`;

        ctx.beginPath();
        ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Hover glows
        if (isHovered && node.pulse > 0.85) {
          ctx.save();
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 12;
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.px, node.py, radius * 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Central core pulsing sphere
      ctx.save();
      const coreGrad = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, scale * 0.6
      );
      const corePulse = Math.sin(Date.now() * 0.0018) * 0.15 + 0.3;
      coreGrad.addColorStop(0, `rgba(110, 68, 255, ${corePulse * 0.3})`);
      coreGrad.addColorStop(0.5, `rgba(0, 245, 255, ${corePulse * 0.12})`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, scale * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  return (
    <div 
      className="relative flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="3d-brain-interaction-container"
    >
      {/* Background glow shadow */}
      <div className={`absolute w-72 h-72 rounded-full filter blur-3xl transition-all duration-1000 ${
        isHovered ? 'bg-cyan-neon/15 scale-110' : 'bg-purple-neon/5 scale-95'
      }`} />
      
      <canvas
        ref={canvasRef}
        className="w-[320px] h-[320px] md:w-[385px] md:h-[385px] relative z-10 transition-transform duration-500 ease-out"
        id="3d-brain-canvas"
      />

      {/* Futuristic scanner visual overlay */}
      <div className="absolute top-0 left-0 w-full h-full border border-white/5 pointer-events-none rounded-xl flex flex-col justify-between p-3 z-0 font-mono text-[9px] text-zinc-500">
        <div className="flex justify-between">
          <span className="text-cyan-neon animate-pulse">● COGNITIVE_CORE_SYS</span>
          <span>VAL: {isHovered ? 'SYNAPSE_FREQ_MAX' : 'SYNAPSE_IDLE'}</span>
        </div>
        <div className="flex justify-between items-end">
          <span>MODEL: DEEP_INTELLIGENCE_V3</span>
          <span className="text-purple-neon">SCAN_ACTIVE: 60FPS</span>
        </div>
      </div>
    </div>
  );
}
