import { useEffect, useRef, useState } from 'react';

export default function AIAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const size = 320;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Structure resembling human neural profile silhouette
    interface AvatarNode {
      x: number;
      y: number;
      ox: number;
      oy: number;
      color: string;
      radius: number;
      connections: number[];
    }

    const nodes: AvatarNode[] = [];
    
    // Generate nodes outlining a futuristic face and neural brain cluster
    const pointsData = [
      // Brain cluster (top/back of head)
      { x: 140, y: 80, isBrain: true },
      { x: 180, y: 70, isBrain: true },
      { x: 220, y: 90, isBrain: true },
      { x: 230, y: 130, isBrain: true },
      { x: 200, y: 150, isBrain: true },
      { x: 160, y: 120, isBrain: true },
      { x: 130, y: 150, isBrain: true },
      { x: 180, y: 190, isBrain: true },
      { x: 220, y: 190, isBrain: true },
      { x: 240, y: 165, isBrain: true },
      // Forehead
      { x: 110, y: 100, isBrain: false },
      // Nose
      { x: 90, y: 145, isBrain: false },
      { x: 108, y: 155, isBrain: false },
      // Lips & Chin
      { x: 100, y: 180, isBrain: false },
      { x: 106, y: 195, isBrain: false },
      { x: 115, y: 220, isBrain: false },
      // Jawline
      { x: 150, y: 235, isBrain: false },
      { x: 190, y: 220, isBrain: false },
      // Neck
      { x: 175, y: 260, isBrain: false },
      { x: 140, y: 265, isBrain: false },
      // Inner face grids
      { x: 140, y: 160, isBrain: false },
      { x: 160, y: 180, isBrain: false },
      { x: 135, y: 195, isBrain: false },
    ];

    pointsData.forEach((pt, idx) => {
      nodes.push({
        x: pt.x,
        y: pt.y,
        ox: pt.x,
        oy: pt.y,
        color: pt.isBrain ? '#6E44FF' : '#00F5FF',
        radius: pt.isBrain ? Math.random() * 2.8 + 1.8 : Math.random() * 1.8 + 1.2,
        connections: [],
      });
    });

    // Establish connections within distances to outline shape
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].ox - nodes[j].ox;
        const dy = nodes[i].oy - nodes[j].oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Distance constraint for natural face structure connections
        if (dist < 60) {
          nodes[i].connections.push(j);
        }
      }
    }

    let sweepY = 0;
    let sweepDir = 1;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      const time = Date.now() * 0.0015;

      // Draw background outer futuristic rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 130, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = isHovered ? 'rgba(0, 245, 255, 0.08)' : 'rgba(110, 68, 255, 0.04)';
      ctx.setLineDash([5, 15]);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 140, time * 0.2, time * 0.2 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Scanner sweep line
      sweepY += sweepDir * (isHovered ? 1.4 : 0.6);
      if (sweepY > 280 || sweepY < 40) {
        sweepDir *= -1;
      }

      // Render scanner gradient glow
      const scanGrad = ctx.createLinearGradient(0, sweepY - 15, 0, sweepY + 15);
      scanGrad.addColorStop(0, 'rgba(0, 245, 255, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 245, 255, 0.12)');
      scanGrad.addColorStop(1, 'rgba(0, 245, 255, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(35, sweepY - 15, 250, 30);

      // Draw sweep horizontal guide line
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.25)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(40, sweepY);
      ctx.lineTo(280, sweepY);
      ctx.stroke();

      // Update node positions with organic floating offset
      nodes.forEach((node, idx) => {
        const floatX = Math.sin(time + idx * 0.5) * (isHovered ? 4.5 : 2.0);
        const floatY = Math.cos(time + idx * 0.7) * (isHovered ? 4.5 : 2.0);
        node.x = node.ox + floatX;
        node.y = node.oy + floatY;
      });

      // Draw lines
      ctx.lineWidth = 0.6;
      nodes.forEach((node, idx) => {
        node.connections.forEach((connIdx) => {
          const target = nodes[connIdx];
          
          // Decide gradient
          const grad = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
          const alpha = isHovered ? 0.35 : 0.18;
          grad.addColorStop(0, node.color === '#00F5FF' ? `rgba(0, 245, 255, ${alpha})` : `rgba(110, 68, 255, ${alpha})`);
          grad.addColorStop(1, target.color === '#00F5FF' ? `rgba(0, 245, 255, ${alpha})` : `rgba(110, 68, 255, ${alpha})`);
          
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Highlight when scanning line passes over node
        const distToScan = Math.abs(node.y - sweepY);
        let currentRadius = node.radius;
        let isActivated = false;

        if (distToScan < 25) {
          currentRadius *= 1.8;
          isActivated = true;
        }

        ctx.fillStyle = isActivated ? '#00F5FF' : node.color;
        
        if (isActivated || (isHovered && Math.random() > 0.85)) {
          ctx.shadowColor = '#00F5FF';
          ctx.shadowBlur = 10;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Overlay tech label specs
      ctx.fillStyle = '#00F5FF';
      ctx.font = '9px monospace';
      ctx.fillText('SYS_AVATAR: ASMIT_SINGH_v2.0', 45, 275);
      
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText(`STATUS: ${isHovered ? 'STOCHASTIC_MAX' : 'OPTIMIZED'}`, 45, 287);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center cursor-pointer"
      id="custom-generative-avatar-wrapper"
    >
      {/* Background shadow glow */}
      <div className={`absolute w-64 h-64 rounded-full filter blur-3xl transition-all duration-700 ${
        isHovered ? 'bg-cyan-neon/15 scale-105' : 'bg-purple-neon/5 scale-95'
      }`} />
      
      <canvas
        ref={canvasRef}
        className="w-80 h-80 relative z-10 border border-white/5 rounded-2xl glass-panel shadow-2xl transition-all duration-500 hover:border-cyan-neon/20"
        id="generative-face-canvas"
      />
    </div>
  );
}
