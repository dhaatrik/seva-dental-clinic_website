
import React, { useRef } from 'react';
import Button from './Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section 
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center rounded-3xl shadow-2xl overflow-hidden mx-4 mt-24 border border-gentle-green/10" 
    >
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1600&auto=format&fit=crop&fm=webp')",
          y,
          scale
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 container mx-auto px-6 text-center bg-pure-white/10 backdrop-blur-2xl border border-pure-white/20 p-12 md:p-20 rounded-[3rem] max-w-5xl shadow-2xl"
      >
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-pure-white mb-8 tracking-tight leading-[1.1]"
          >
            {t('hero.titleLine1', { defaultValue: 'Your Smile Adventure' })} <br className="hidden md:block" />
            <span className="text-warm-coral italic font-light drop-shadow-lg">{t('hero.titleLine2', { defaultValue: 'Begins Here.' })}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-pure-white/90 mb-12 font-body font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md"
          >
            {t('hero.subtitle', { defaultValue: 'Welcome to Seva Dental Clinic. Experience world-class dental care in a serene, spa-like environment designed for your comfort and confidence.' })}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center"
          >
            <Button to="/contact" variant="primary" size="large" className="px-12 py-5 text-lg shadow-xl hover:shadow-2xl" tooltip={t('hero.bookConsultationTooltip', { defaultValue: 'Book your consultation today' })}>
              {t('hero.bookConsultation', { defaultValue: 'Book Consultation' })}
            </Button>
            <Button to="/smile-quiz" variant="outline" size="large" className="px-12 py-5 text-lg border-2 border-pure-white/50 text-pure-white hover:bg-pure-white hover:text-gentle-green shadow-lg hover:shadow-xl backdrop-blur-sm" tooltip={t('hero.takeQuizTooltip', { defaultValue: 'Discover your smile score' })}>
              {t('hero.takeQuiz', { defaultValue: 'Take the Smile Quiz' })}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
