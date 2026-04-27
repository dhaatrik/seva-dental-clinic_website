
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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(TESTIMONIALS_DATA.length / ITEMS_PER_PAGE);
  const displayedTestimonials = TESTIMONIALS_DATA.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-24 md:space-y-32">
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="text-center max-w-5xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">{t('testimonials.title', { defaultValue: 'Patient Stories' })}</h1>
        <p className="text-lg sm:text-xl md:text-3xl text-secondary-text font-body font-light max-w-3xl mx-auto leading-relaxed px-2">
          {t('testimonials.subtitle', { defaultValue: 'Hear from fellow explorers on their "Smile Adventure" with Seva Dental.' })}
        </p>
      </motion.section>

      <motion.section
        key={currentPage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 auto-rows-fr">
          {isLoading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => <SkeletonCard key={index} type="testimonial" />)
          ) : (
            displayedTestimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))
          )}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 md:mt-16 space-x-3 sm:space-x-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-6 sm:px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base ${
                currentPage === 1 
                  ? 'bg-gentle-green/5 text-gentle-green/40 shadow-none cursor-not-allowed' 
                  : 'bg-pure-white text-gentle-green hover:bg-gentle-green hover:text-pure-white border border-gentle-green/20 hover:scale-105 hover:-translate-y-0.5'
              }`}
            >
              {t('common.previous', { defaultValue: 'Previous page' })}
            </button>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === idx + 1 
                      ? 'bg-warm-coral scale-125' 
                      : 'bg-gentle-green/20 hover:bg-gentle-green/40'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-6 sm:px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base ${
                currentPage === totalPages 
                  ? 'bg-gentle-green/5 text-gentle-green/40 shadow-none cursor-not-allowed' 
                  : 'bg-pure-white text-gentle-green hover:bg-gentle-green hover:text-pure-white border border-gentle-green/20 hover:scale-105 hover:-translate-y-0.5'
              }`}
            >
              {t('common.next', { defaultValue: 'Next page' })}
            </button>
          </div>
        )}
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="relative overflow-hidden"
      >
        <div className="py-16 md:py-20 px-6 sm:px-10 md:px-24 bg-gradient-to-br from-calm-blue/20 via-pure-white to-warm-coral/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center border border-gentle-green/5">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-warm-coral/10 rounded-full blur-3xl -mr-10 -mt-10 sm:-mr-20 sm:-mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-calm-blue/10 rounded-full blur-3xl -ml-10 -mb-10 sm:-ml-20 sm:-mb-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">{t('testimonials.shareTitle', { defaultValue: 'Share Your Story!' })}</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-secondary-text mb-8 md:mb-12 font-body font-light max-w-3xl mx-auto leading-relaxed px-2">
              {t('testimonials.shareSubtitle', { defaultValue: "Had a great experience with us? We'd love to hear about your smile adventure! Your story can inspire others." })}
            </p>
            <Button to="/contact" variant="primary" size="large" className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 shadow-lg hover:shadow-xl" tooltip={t('testimonials.shareTooltip', { defaultValue: 'Tell us about your smile adventure' })}>
              {t('testimonials.contactToShare', { defaultValue: 'Contact Us to Share' })}
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TestimonialsPage;