import { useEffect, useRef } from 'react';

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class for neural network
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glow: boolean;
    }

    const nodes: Node[] = [];
    const nodeCount = Math.min(75, Math.floor((width * height) / 25000)); // Adaptive count

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00F5FF' : '#6E44FF',
        glow: Math.random() > 0.8,
      });
    }

    // 3D Sphere Particles (separate array)
    interface SphereNode {
      x3d: number;
      y3d: number;
      z3d: number;
      px: number;
      py: number;
      size: number;
      color: string;
    }

    const sphereNodes: SphereNode[] = [];
    const sphereNodeCount = 120;
    const sphereRadius = Math.min(220, width * 0.22);
    const sphereCenter = { x: width * 0.75, y: height * 0.5 }; // Positioned behind display elements

    for (let i = 0; i < sphereNodeCount; i++) {
      // Golden spiral distribution on a sphere
      const theta = Math.acos(-1 + (2 * i) / sphereNodeCount);
      const phi = Math.sqrt(sphereNodeCount * Math.PI) * theta;

      sphereNodes.push({
        x3d: Math.sin(theta) * Math.cos(phi),
        y3d: Math.sin(theta) * Math.sin(phi),
        z3d: Math.cos(theta),
        px: 0,
        py: 0,
        size: Math.random() * 1.5 + 1.2,
        color: Math.random() > 0.45 ? '#00F5FF' : '#6E44FF',
      });
    }

    let angleX = 0.0012;
    let angleY = 0.0018;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      sphereCenter.x = width * 0.75;
      sphereCenter.y = height * 0.5;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // Draw background dark matrix gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a0d24');
      bgGrad.addColorStop(0.5, '#050816');
      bgGrad.addColorStop(1, '#02030a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient radial lighting under mouse
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 250
        );
        mouseGlow.addColorStop(0, 'rgba(0, 245, 255, 0.05)');
        mouseGlow.addColorStop(0.5, 'rgba(110, 68, 255, 0.025)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw 3D Rotating Sphere
      sphereCenter.x = width > 768 ? width * 0.72 : width * 0.5;
      sphereCenter.y = width > 768 ? height * 0.48 : height * 0.72;
      const sphereActualRadius = width > 768 ? Math.min(230, width * 0.22) : Math.min(150, width * 0.35);

      // Rotate sphere nodes
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      sphereNodes.forEach((node) => {
        // Rotate Y
        let x1 = node.x3d * cosY - node.z3d * sinY;
        let z1 = node.z3d * cosY + node.x3d * sinY;

        // Rotate X
        let y2 = node.y3d * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y3d * sinX;

        node.x3d = x1;
        node.y3d = y2;
        node.z3d = z2;

        // Perspective projection
        const depth = 2.2;
        const perspective = depth / (depth - z2);
        node.px = sphereCenter.x + x1 * sphereActualRadius * perspective;
        node.py = sphereCenter.y + y2 * sphereActualRadius * perspective;

        // Add small parallax based on mouse
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = (mouse.x - width / 2) * 0.04;
          const dy = (mouse.y - height / 2) * 0.04;
          node.px += dx * z2;
          node.py += dy * z2;
        }

        // Depth cueing (opacity and size based on Z depth)
        const alpha = Math.max(0.12, (z2 + 1) / 2);
        ctx.fillStyle = node.color === '#00F5FF' 
          ? `rgba(0, 245, 255, ${alpha * 0.7})` 
          : `rgba(110, 68, 255, ${alpha * 0.7})`;

        ctx.beginPath();
        ctx.arc(node.px, node.py, node.size * Math.max(0.5, alpha), 0, Math.PI * 2);
        ctx.fill();

        // Glow effect for some front-facing particles
        if (z2 > 0.6 && node.size > 2.2) {
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Draw lines between nearby sphere nodes for structured wireframe look
      ctx.lineWidth = 0.5;
      for (let i = 0; i < sphereNodes.length; i++) {
        for (let j = i + 1; j < sphereNodes.length; j++) {
          const nodeA = sphereNodes[i];
          const nodeB = sphereNodes[j];
          const dx = nodeA.px - nodeB.px;
          const dy = nodeA.py - nodeB.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if they are within sphere shell neighborhood and have similar depth
          if (dist < sphereActualRadius * 0.38) {
            const meanZ = (nodeA.z3d + nodeB.z3d) / 2;
            const alpha = Math.max(0, (meanZ + 0.9) / 2.2) * (1 - dist / (sphereActualRadius * 0.38));
            if (alpha > 0.04) {
              ctx.strokeStyle = `rgba(0, 245, 255, ${alpha * 0.16})`;
              ctx.beginPath();
              ctx.moveTo(nodeA.px, nodeA.py);
              ctx.lineTo(nodeB.px, nodeB.py);
              ctx.stroke();
            }
          }
        }
      }

      // Draw Neural Network nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce boundaries with padding
        const pad = 10;
        if (node.x < pad || node.x > width - pad) node.vx *= -1;
        if (node.y < pad || node.y > height - pad) node.vy *= -1;

        // Parallax offset towards mouse
        let displayX = node.x;
        let displayY = node.y;
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 300) {
            const pull = (300 - distToMouse) * 0.035;
            displayX += (dx / distToMouse) * pull;
            displayY += (dy / distToMouse) * pull;
          }
        }

        // Render nodes
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(displayX, displayY, node.radius, 0, Math.PI * 2);
        ctx.fill();

        if (node.glow) {
          ctx.save();
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(displayX, displayY, node.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
          ctx.restore();
        }
      });

      // Draw connections (synapses)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          // Calculate interactive display positions
          let ax = nodeA.x, ay = nodeA.y;
          let bx = nodeB.x, by = nodeB.y;

          if (mouse.x > 0 && mouse.y > 0) {
            const dax = mouse.x - nodeA.x, day = mouse.y - nodeA.y;
            const distA = Math.sqrt(dax * dax + day * day);
            if (distA < 300) {
              const pull = (300 - distA) * 0.035;
              ax += (dax / distA) * pull;
              ay += (day / distA) * pull;
            }

            const dbx = mouse.x - nodeB.x, dby = mouse.y - nodeB.y;
            const distB = Math.sqrt(dbx * dbx + dby * dby);
            if (distB < 300) {
              const pull = (300 - distB) * 0.035;
              bx += (dbx / distB) * pull;
              by += (dby / distB) * pull;
            }
          }

          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.28;
            const grad = ctx.createLinearGradient(ax, ay, bx, by);
            grad.addColorStop(0, nodeA.color === '#00F5FF' ? `rgba(0, 245, 255, ${alpha})` : `rgba(110, 68, 255, ${alpha})`);
            grad.addColorStop(1, nodeB.color === '#00F5FF' ? `rgba(0, 245, 255, ${alpha})` : `rgba(110, 68, 255, ${alpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // Draw synapses targeting the mouse node
      if (mouse.x > 0 && mouse.y > 0) {
        nodes.forEach((node) => {
          let nx = node.x, ny = node.y;
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            // Parallax display pull
            const pull = (300 - dist) * 0.035;
            nx += (dx / dist) * pull;
            ny += (dy / dist) * pull;

            const alpha = (1 - dist / 200) * 0.35;
            ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      id="neural-network-canvas"
    />
  );
}
