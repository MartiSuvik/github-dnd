import React, { useState, useEffect, useRef } from 'react';

type Position = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  // Positioning
  x: number | string;
  y: number | string;
  offsetX?: number;
  offsetY?: number;
  position?: Position;
  autoAdjust?: boolean;
  
  // Content
  text: string;
  children?: React.ReactNode;
  
  // Styling
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  showArrow?: boolean;
  variant?: 'tooltip' | 'textbox';
  
  // Interaction
  triggerOnHover?: boolean;
  triggerOnClick?: boolean;
  initiallyVisible?: boolean;
  onClick?: () => void;
  onTextChange?: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  x,
  y,
  offsetX = 10,
  offsetY = 0,
  position = 'right',
  autoAdjust = true,
  text,
  children,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  showArrow = true,
  variant = 'tooltip',
  triggerOnHover = true,
  triggerOnClick = true,
  initiallyVisible = false,
  onClick,
  onTextChange,
  placeholder = 'Enter text...',
  maxLength,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState<Position>(position);
  const [visible, setVisible] = useState(initiallyVisible);
  const [inputText, setInputText] = useState(text);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle viewport overflow detection and position adjustment
  useEffect(() => {
    if (!visible || !autoAdjust || !tooltipRef.current || !triggerRef.current) return;

    const calculateOptimalPosition = () => {
      const tooltipRect = tooltipRef.current!.getBoundingClientRect();
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;
      
      if (position === 'top' && triggerRect.top - tooltipRect.height - Math.abs(offsetY) < 0) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height + Math.abs(offsetY) > viewportHeight) {
        newPosition = 'top';
      } else if (position === 'left' && triggerRect.left - tooltipRect.width - Math.abs(offsetX) < 0) {
        newPosition = 'right';
      } else if (position === 'right' && triggerRect.right + tooltipRect.width + Math.abs(offsetX) > viewportWidth) {
        newPosition = 'left';
      }

      if (newPosition !== tooltipPosition) {
        setTooltipPosition(newPosition);
      }
    };

    calculateOptimalPosition();
    window.addEventListener('resize', calculateOptimalPosition);
    return () => window.removeEventListener('resize', calculateOptimalPosition);
  }, [visible, autoAdjust, position, offsetX, offsetY, tooltipPosition]);

  // Auto-resize textarea height
  useEffect(() => {
    if (variant === 'textbox' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText, variant]);

const getTooltipContentStyles = (): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    minWidth: '150px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  };


    switch (tooltipPosition) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: `translateX(-50%) translateY(-${Math.abs(offsetY)}px)`,
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: '100%',
          left: '50%',
          transform: `translateX(-50%) translateY(${Math.abs(offsetY)}px)`,
        };
      case 'left':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: `translateY(-50%) translateX(-${Math.abs(offsetX)}px)`,
        };
      case 'right':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: `translateY(-50%) translateX(${Math.abs(offsetX)}px)`,
        };
      default:
        return baseStyles;
    }
  };

  const getArrowStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: variant === 'textbox' ? '#ffffff' : '#ECFDF5',
      boxShadow: variant === 'textbox' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
    };

    switch (tooltipPosition) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '-5px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: '-5px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        };
      case 'left':
        return {
          ...baseStyles,
          right: '-5px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
        };
      case 'right':
        return {
          ...baseStyles,
          left: '-5px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
        };
      default:
        return baseStyles;
    }
  };

  const formatCoordinate = (value: number | string) => {
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  const handleClick = () => {
    if (triggerOnClick) {
      setVisible(!visible);
    }
    if (onClick) {
      onClick();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (maxLength && newText.length > maxLength) return;
    
    setInputText(newText);
    if (onTextChange) {
      onTextChange(newText);
    }
  };

  const eventHandlers = {
    ...(triggerOnHover && {
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
    }),
    onClick: handleClick,
  };

  const defaultTrigger = (
    <div
      className={`
        group
        flex
        items-center
        justify-center
        w-7
        h-7
        sm:w-10
        sm:h-10
        rounded-full
        border
        border-green-300
        bg-white/20
        backdrop-blur-sm
        cursor-pointer
        hover:bg-white/30
        transition-all
        duration-500
        shadow-[0_0_10px_rgba(34,197,94,0.3)]
        hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]
        relative
        ${triggerClassName}
      `}
    >
      <div className="absolute inset-0 rounded-full animate-calmPulse border border-green-300/30" />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`absolute ${className}`}
      style={{
        top: formatCoordinate(y),
        left: formatCoordinate(x),
        transformOrigin: 'center center',
      }}
    >
      <div
        ref={triggerRef}
        className="relative cursor-pointer"
        {...eventHandlers}
      >
        {children || defaultTrigger}
      </div>
      
      <div
        ref={tooltipRef}
        className={`
          absolute
          ${visible ? 'z-50' : 'z-10'}
          ${variant === 'textbox' ? 'p-4' : 'p-3 sm:p-4'}
          ${variant === 'textbox' ? 'bg-white' : 'bg-green-50'}
          ${variant === 'textbox' ? 'text-gray-900' : 'text-green-700'}
          rounded-lg
          shadow-lg
          text-base
          transition-all
          ease-out
          duration-300
          ${visible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
          ${contentClassName}
        `}
        style={getTooltipContentStyles()}
      >
        {variant === 'textbox' ? (
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleTextChange}
            placeholder={placeholder}
            className="w-full min-h-[100px] resize-none bg-transparent border-0 focus:ring-0 p-0 text-base placeholder:text-gray-400"
            style={{
              outline: 'none',
              overflow: 'hidden',
            }}
          />
        ) : (
          text
        )}
        
        {showArrow && (
          <div
            className="absolute"
            style={getArrowStyles()}
          />
        )}
      </div>

      <style>{`
        @keyframes calmPulse {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
        }

        .animate-calmPulse {
          animation: calmPulse 3s ease-in-out infinite;
        }

        textarea::placeholder {
          color: #9CA3AF;
        }
      `}</style>
    </div>
  );
};

export default Tooltip;