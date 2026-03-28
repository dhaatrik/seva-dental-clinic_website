import React, { useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';
import { useTranslation } from 'react-i18next';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const { t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl cursor-ew-resize select-none border border-gentle-green/10 group"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After treatment" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      
      {/* Before Image (Foreground with clip-path) */}
      <img 
        src={beforeImage} 
        alt="Before treatment" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        referrerPolicy="no-referrer"
      />

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-pure-white cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-75"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <Tooltip text={t('home.dragToCompare', { defaultValue: 'Drag to compare before and after' })} position="top">
          <div className={`w-12 h-12 bg-pure-white rounded-full flex items-center justify-center shadow-2xl border-2 border-gentle-green/20 transition-transform duration-300 ${isDragging ? 'scale-110 bg-gentle-green/5' : 'group-hover:scale-110'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A362D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Tooltip>
      </div>

      {/* Labels */}
      <div className={`absolute top-6 left-6 bg-black/40 backdrop-blur-md text-pure-white px-5 py-2 rounded-full text-sm font-heading font-bold tracking-widest uppercase shadow-lg transition-opacity duration-300 ${sliderPosition < 20 ? 'opacity-0' : 'opacity-100'}`}>
        {t('home.before', { defaultValue: 'Before' })}
      </div>
      <div className={`absolute top-6 right-6 bg-black/40 backdrop-blur-md text-pure-white px-5 py-2 rounded-full text-sm font-heading font-bold tracking-widest uppercase shadow-lg transition-opacity duration-300 ${sliderPosition > 80 ? 'opacity-0' : 'opacity-100'}`}>
        {t('home.after', { defaultValue: 'After' })}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
