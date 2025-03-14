import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div
  ref={elementRef as React.RefObject<HTMLDivElement>}
  className={`transform transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
  } ${className}`}
  style={{
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? 'auto' : 'transform, opacity'
  }}
>
  {children}
</div>
  );
};

export default AnimatedSection;