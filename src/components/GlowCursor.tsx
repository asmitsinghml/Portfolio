import { useEffect, useState, useRef } from 'react';

export default function GlowCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef({ x: -100, y: -100, tx: -100, ty: -100 });

  useEffect(() => {
    // Check if device supports standard cursor interaction
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.tx = e.clientX;
      cursorRef.current.ty = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button';
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let animationId: number;
    const updateCursor = () => {
      const cur = cursorRef.current;
      // Smooth interpolation (lerp)
      cur.x += (cur.tx - cur.x) * 0.12;
      cur.y += (cur.ty - cur.y) * 0.12;
      setPosition({ x: cur.x, y: cur.y });
      animationId = requestAnimationFrame(updateCursor);
    };
    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core pointer */}
      <div
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-neon pointer-events-none z-50 transition-transform duration-100 ease-out`}
        id="precision-cursor-core"
      />
      {/* Outer Glow Ring trail */}
      <div
        style={{
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${isHovered ? 1.6 : 1.0})`,
        }}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-neon/40 pointer-events-none z-50 transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered ? 'bg-cyan-neon/10 border-cyan-neon shadow-lg shadow-cyan-neon/20' : 'bg-transparent'
        }`}
        id="precision-cursor-trail"
      />
    </>
  );
}
