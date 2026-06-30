import React, { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 32 : 0,
      x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
      scale: direction === 'scale' ? 0.92 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
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

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  center = true,
  light = false,
}) => (
  <Reveal>
    <div className={center ? 'text-center mb-14' : 'mb-12'}>
      {subtitle && (
        <p
          className="text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-3"
          style={{ color: light ? '#34d399' : '#10b981' }}
        >
          {subtitle}
        </p>
      )}
      <h2
        className="text-3xl lg:text-4xl font-heading font-bold leading-tight"
        style={{ color: light ? '#ffffff' : '#0f1f4d' }}
      >
        {title}
      </h2>
      <div
        className={`h-1 rounded-full mt-4 transition-all duration-700 ${center ? 'mx-auto' : ''}`}
        style={{
          width: '3.5rem',
          background: light
            ? 'linear-gradient(90deg, #10b981, #34d399)'
            : 'linear-gradient(90deg, #10b981, #34d399)',
          boxShadow: '0 2px 8px rgba(16,185,129,0.4)',
        }}
      />
    </div>
  </Reveal>
);
