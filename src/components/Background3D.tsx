import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Floating blob component for 3D background
const FloatingBlob = ({ 
  size, 
  color, 
  initialX, 
  initialY, 
  duration,
  delay 
}: {
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 ${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, 120, 0],
        scale: [1, 1.2, 0.8, 1],
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

// Geometric shape component
const FloatingShape = ({ 
  shape, 
  size, 
  initialX, 
  initialY, 
  duration,
  delay 
}: {
  shape: 'circle' | 'square' | 'triangle';
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}) => {
  const getShapeClasses = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg rotate-45';
      case 'triangle':
        return 'rounded-sm';
      default:
        return 'rounded-full';
    }
  };

  return (
    <motion.div
      className={`absolute bg-primary/5 border border-primary/10 ${getShapeClasses()}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        opacity: [0.1, 0.3, 0.1],
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

export const Background3D = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-gradient-to-tl from-secondary/10 via-transparent to-primary/5" />
      
      {/* Floating blobs */}
      <FloatingBlob
        size={400}
        color="bg-primary/20"
        initialX={10}
        initialY={20}
        duration={20}
        delay={0}
      />
      <FloatingBlob
        size={300}
        color="bg-accent/15"
        initialX={70}
        initialY={60}
        duration={25}
        delay={5}
      />
      <FloatingBlob
        size={250}
        color="bg-secondary/10"
        initialX={40}
        initialY={80}
        duration={18}
        delay={10}
      />
      
      {/* Floating geometric shapes */}
      <FloatingShape
        shape="circle"
        size={60}
        initialX={20}
        initialY={40}
        duration={15}
        delay={2}
      />
      <FloatingShape
        shape="square"
        size={40}
        initialX={80}
        initialY={20}
        duration={12}
        delay={7}
      />
      <FloatingShape
        shape="circle"
        size={80}
        initialX={60}
        initialY={70}
        duration={18}
        delay={12}
      />
      <FloatingShape
        shape="square"
        size={30}
        initialX={90}
        initialY={80}
        duration={14}
        delay={15}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  );
};