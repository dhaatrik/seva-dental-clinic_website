
import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import { TESTIMONIALS_DATA } from '../constants';
import Button from '../components/Button';
import SkeletonCard from '../components/SkeletonCard';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const TestimonialsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 space-y-32">
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="text-center max-w-5xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gentle-green mb-8 tracking-tight">{t('testimonials.title', { defaultValue: 'Patient Stories' })}</h1>
        <p className="text-xl md:text-3xl text-secondary-text font-body font-light max-w-3xl mx-auto leading-relaxed">
          {t('testimonials.subtitle', { defaultValue: 'Hear from fellow explorers on their "Smile Adventure" with Seva Dental Clinic.' })}
        </p>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} type="testimonial" />)
          ) : (
            TESTIMONIALS_DATA.map((testimonial) => (
              <motion.div key={testimonial.id} variants={fadeUpVariant}>
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))
          )}
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="relative overflow-hidden"
      >
        <div className="py-20 px-10 md:px-24 bg-gradient-to-br from-calm-blue/20 via-pure-white to-warm-coral/10 rounded-[3rem] shadow-2xl text-center border border-gentle-green/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-warm-coral/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-calm-blue/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-8 tracking-tight">{t('testimonials.shareTitle', { defaultValue: 'Share Your Story!' })}</h2>
            <p className="text-xl md:text-2xl text-secondary-text mb-12 font-body font-light max-w-3xl mx-auto leading-relaxed">
              {t('testimonials.shareSubtitle', { defaultValue: "Had a great experience with us? We'd love to hear about your smile adventure! Your story can inspire others." })}
            </p>
            <Button to="/contact" variant="primary" size="large" className="px-12 py-4 shadow-lg hover:shadow-xl" tooltip={t('testimonials.shareTooltip', { defaultValue: 'Tell us about your smile adventure' })}>
              {t('testimonials.contactToShare', { defaultValue: 'Contact Us to Share' })}
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TestimonialsPage;