import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { NotFoundPageIcon } from '../components/IconComponents';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-calm-blue/20 rounded-full blur-3xl -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <NotFoundPageIcon className="w-32 h-32 text-warm-coral mb-8 mx-auto drop-shadow-lg" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-8xl md:text-9xl font-heading font-bold text-gentle-green/20 mb-2 tracking-tighter"
      >
        404
      </motion.h1>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-5xl font-heading font-bold text-gentle-green mb-6 tracking-tight"
      >
        {t('notFound.title', { defaultValue: 'Oops! Page Not Found' })}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xl text-secondary-text max-w-lg mx-auto mb-12 font-body font-light leading-relaxed"
      >
        {t('notFound.subtitle', { defaultValue: 'It seems the page you\'re looking for on your "Smile Adventure" has taken a detour. Don\'t worry, we can get you back on track!' })}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Button to="/" variant="primary" size="large" className="shadow-xl hover:shadow-2xl px-10 py-4 text-lg" tooltip={t('notFound.returnHomeTooltip', { defaultValue: 'Go back to the homepage' })}>
          {t('notFound.returnHome', { defaultValue: 'Return to Home' })}
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
