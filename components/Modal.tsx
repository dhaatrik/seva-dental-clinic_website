
import React, { useEffect, useRef } from 'react';
import { XIcon } from './IconComponents';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';
import { useLenis } from 'lenis/react';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  titleId?: string;
  descriptionId?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  titleId = 'modal-title',
  descriptionId = 'modal-description'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { t } = useTranslation();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
      lenis?.stop();
      modalRef.current?.focus(); 
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isOpen, onClose, lenis]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={descriptionId}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gentle-green/40 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`bg-pure-white rounded-[2rem] shadow-2xl relative w-full ${sizeClasses[size]} z-10 overflow-hidden border border-gentle-green/10 flex flex-col max-h-[90vh]`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-calm-blue/30 to-transparent pointer-events-none"></div>
            
            <div className="absolute top-6 right-6 z-20">
              <Tooltip text={t('common.closeModal', { defaultValue: 'Close modal' })} position="bottom">
                <button
                  onClick={onClose}
                  className="text-secondary-text hover:text-warm-coral transition-colors p-2 rounded-full hover:bg-calm-blue/20 focus:outline-none focus:ring-2 focus:ring-warm-coral/50 bg-pure-white/50 backdrop-blur-sm"
                  aria-label={t('common.closeModal', { defaultValue: 'Close modal' })}
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </Tooltip>
            </div>
            
            <div 
              className="p-8 sm:p-10 flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-gentle-green/20 scrollbar-track-transparent relative z-10"
              data-lenis-prevent="true"
            >
              {title && <h2 id={titleId} className="text-3xl font-heading font-bold text-gentle-green mb-6 pr-12 tracking-tight">{title}</h2>}
              <div id={descriptionId} className="font-body text-secondary-text">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;