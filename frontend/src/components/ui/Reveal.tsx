import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0 },
    visible: { opacity: 1, y: 0, x: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, center = true, light = false }) => (
  <Reveal>
    <div className={center ? 'text-center mb-12' : 'mb-12'}>
      {subtitle && (
        <p className={`text-sm font-heading font-medium uppercase tracking-widest mb-3 ${light ? 'text-teal-300' : 'text-primary'}`}>{subtitle}</p>
      )}
      <h2 className={`text-3xl lg:text-4xl font-heading font-semibold ${light ? 'text-white' : 'text-secondary'}`}>{title}</h2>
      <div className={`h-1 w-14 rounded-full mt-4 ${center ? 'mx-auto' : ''} ${light ? 'bg-accent' : 'bg-primary'}`} />
    </div>
  </Reveal>
);
