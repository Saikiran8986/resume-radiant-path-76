import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Interactive floating blob that responds to mouse movement
const InteractiveBlob = ({ 
  size, 
  color, 
  initialX, 
  initialY, 
  duration,
  delay,
  mouseX,
  mouseY,
  scrollY
}: {
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  mouseX: any;
  mouseY: any;
  scrollY: any;
}) => {
  const x = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const y = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const scrollTransform = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <motion.div
      className={`absolute rounded-full blur-2xl opacity-20 ${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${initialX}%`,
        top: `${initialY}%`,
        x,
        y: scrollTransform,
      }}
      animate={{
        scale: [1, 1.2, 0.8, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Floating geometric shape that responds to interactions
const InteractiveShape = ({ 
  shape, 
  size, 
  initialX, 
  initialY, 
  duration,
  delay,
  mouseX,
  mouseY
}: {
  shape: 'circle' | 'square' | 'triangle';
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  mouseX: any;
  mouseY: any;
}) => {
  const x = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);
  const y = useTransform(mouseY, [0, window.innerHeight], [-10, 10]);

  const getShapeClasses = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg';
      case 'triangle':
        return 'rounded-sm';
      default:
        return 'rounded-full';
    }
  };

  return (
    <motion.div
      className={`absolute bg-primary/8 border border-primary/20 backdrop-blur-sm ${getShapeClasses()}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${initialX}%`,
        top: `${initialY}%`,
        x,
        y,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: shape === 'square' ? [45, 225, 405] : [0, 360],
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: 1.2,
        opacity: 0.3,
        transition: { duration: 0.3 }
      }}
    />
  );
};

// Particle system for additional movement
const FloatingParticle = ({ 
  mouseX, 
  mouseY, 
  scrollY, 
  index 
}: { 
  mouseX: any; 
  mouseY: any; 
  scrollY: any; 
  index: number 
}) => {
  const x = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const y = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);
  const scrollTransform = useTransform(scrollY, [0, 2000], [0, -200]);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/30 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        x,
        y: scrollTransform,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: index * 0.1,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export const InteractiveBackground3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    setIsVisible(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('resize', handleResize);
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, mouseX, mouseY, scrollY]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 performance-optimized"
    >
      {/* Subtle gradient background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
      <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 via-transparent to-primary/3" />
      
      {/* Interactive floating blobs */}
      <InteractiveBlob
        size={isMobile ? 200 : 350}
        color="bg-primary/10"
        initialX={15}
        initialY={25}
        duration={25}
        delay={0}
        mouseX={mouseX}
        mouseY={mouseY}
        scrollY={scrollY}
      />
      <InteractiveBlob
        size={isMobile ? 150 : 280}
        color="bg-accent/8"
        initialX={75}
        initialY={65}
        duration={30}
        delay={5}
        mouseX={mouseX}
        mouseY={mouseY}
        scrollY={scrollY}
      />
      <InteractiveBlob
        size={isMobile ? 120 : 220}
        color="bg-secondary/6"
        initialX={45}
        initialY={85}
        duration={20}
        delay={10}
        mouseX={mouseX}
        mouseY={mouseY}
        scrollY={scrollY}
      />
      
      {/* Interactive geometric shapes */}
      <InteractiveShape
        shape="circle"
        size={isMobile ? 40 : 60}
        initialX={25}
        initialY={45}
        duration={18}
        delay={2}
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <InteractiveShape
        shape="square"
        size={isMobile ? 30 : 45}
        initialX={85}
        initialY={25}
        duration={15}
        delay={7}
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <InteractiveShape
        shape="circle"
        size={isMobile ? 50 : 70}
        initialX={65}
        initialY={75}
        duration={22}
        delay={12}
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <InteractiveShape
        shape="square"
        size={isMobile ? 25 : 35}
        initialX={90}
        initialY={85}
        duration={16}
        delay={15}
        mouseX={mouseX}
        mouseY={mouseY}
      />

      {/* Floating particles for desktop only (performance) */}
      {!isMobile && (
        <>
          {Array.from({ length: 12 }).map((_, index) => (
            <FloatingParticle
              key={index}
              mouseX={mouseX}
              mouseY={mouseY}
              scrollY={scrollY}
              index={index}
            />
          ))}
        </>
      )}
      
      {/* Subtle animated waves */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, hsl(var(--accent)) 0%, transparent 50%)`
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0%, transparent 50%),
             radial-gradient(circle at 70% 30%, hsl(var(--accent)) 0%, transparent 50%)`,
            `radial-gradient(circle at 35% 75%, hsl(var(--primary)) 0%, transparent 50%),
             radial-gradient(circle at 65% 25%, hsl(var(--accent)) 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0%, transparent 50%),
             radial-gradient(circle at 70% 30%, hsl(var(--accent)) 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};