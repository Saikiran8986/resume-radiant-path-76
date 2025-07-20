import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from './ui/card';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0,
  hover = true 
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      className={className}
    >
      <Card className={`
        backdrop-blur-card 
        transition-all 
        duration-300 
        hover:shadow-[0_20px_40px_hsl(var(--card-hover-shadow))]
        hover:border-primary/20
        group
        ${className}
      `}>
        {children}
      </Card>
    </motion.div>
  );
};