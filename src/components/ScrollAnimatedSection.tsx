import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animation?: 'fade' | 'slide' | 'scale';
  delay?: number;
  stagger?: boolean;
}

const animations = {
  fade: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  },
  slide: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const ScrollAnimatedSection = ({ 
  children, 
  className = "", 
  id,
  animation = 'fade',
  delay = 0,
  stagger = false
}: ScrollAnimatedSectionProps) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        margin: "-100px",
        amount: 0.1
      }}
      variants={stagger ? staggerContainer : animations[animation]}
      transition={{ delay }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export const ScrollAnimatedDiv = ({ 
  children, 
  className = "", 
  animation = 'fade',
  delay = 0
}: Omit<ScrollAnimatedSectionProps, 'id'>) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        margin: "-50px",
        amount: 0.2
      }}
      variants={animations[animation]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};