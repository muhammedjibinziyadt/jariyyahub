'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './NeonCursor.css';

const NeonCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion values for smooth physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for the trailing ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch =
        typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);
      setIsMobile(isTouch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('data-hover') === 'true'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <div className="neon-cursor-container">
      {/* Main Dot - Follows cursor exactly */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1, // Disappear on hover to let the ring take over or interact
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Trailing Ring - Follows with spring physics */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          scale: isClicking ? 0.8 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          borderWidth: isHovering ? 0 : '1.5px', // optional: remove border on hover for a filled spotlight look
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.3
        }}
      />
    </div>
  );
};

export default NeonCursor;
