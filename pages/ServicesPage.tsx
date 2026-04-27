
import React, { useState, useMemo } from 'react';
import ServiceCard from '../components/ServiceCard';
import { SERVICES_DATA, PHONE_NUMBER, CLINIC_NAME } from '../constants';
import Button from '../components/Button';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(SERVICES_DATA.map(s => s.category).filter(Boolean) as string[]);
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') return SERVICES_DATA;
    return SERVICES_DATA.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-24 md:space-y-32">
      <Helmet>
        <title>Our Dental Services | {CLINIC_NAME} - Comprehensive Oral Care</title>
        <meta name="description" content="Explore our wide range of dental services at Seva Dental, including scaling, fillings, crowns, bridges, root canals, and implants. Professional care for every smile." />
        <meta name="keywords" content="dental services, teeth cleaning, dental crowns, root canal treatment, dental implants, Seva Dental Clinic services" />
      </Helmet>
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="text-center max-w-5xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">{t('servicesPage.title', { defaultValue: 'Our Dental Services' })}</h1>
        <p className="text-lg sm:text-xl md:text-3xl text-secondary-text font-body font-light max-w-3xl mx-auto leading-relaxed px-2">
          {t('servicesPage.subtitle', { defaultValue: 'Explore our comprehensive range of dental services designed to meet all your oral health needs on your "Smile Adventure".' })}
        </p>
      </motion.section>
      
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="space-y-8 md:space-y-12"
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-heading font-medium transition-all text-sm sm:text-base ${
                selectedCategory === category 
                  ? 'bg-gentle-green text-pure-white shadow-md scale-105' 
                  : 'bg-pure-white text-secondary-text hover:bg-calm-blue/10 border border-gentle-green/10'
              }`}
            >
              {category === 'All' ? t('common.allCategories', { defaultValue: 'All Categories' }) : category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="relative overflow-hidden"
      >
        <div className="py-16 md:py-20 px-6 sm:px-10 md:px-24 bg-gradient-to-br from-warm-coral/10 via-pure-white to-calm-blue/20 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center border border-gentle-green/5">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-warm-coral/10 rounded-full blur-3xl -mr-10 -mt-10 sm:-mr-20 sm:-mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-calm-blue/10 rounded-full blur-3xl -ml-10 -mb-10 sm:-ml-20 sm:-mb-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">{t('servicesPage.readyTitle', { defaultValue: 'Ready to Start Your Adventure?' })}</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-secondary-text mb-8 md:mb-12 font-body font-light max-w-3xl mx-auto leading-relaxed px-2">
              {t('servicesPage.readySubtitle', { defaultValue: 'Whether you need a routine check-up, cosmetic enhancement, or restorative care, our team is here to provide expert and compassionate service.' })}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Button 
                to={`tel:${PHONE_NUMBER}`} 
                variant="outline" 
                size="large" 
                className="w-full sm:w-auto border-gentle-green/30 hover:border-gentle-green bg-pure-white/50 backdrop-blur-sm px-8 sm:px-12 py-3 sm:py-4"
                tooltip={t('servicesPage.callUsTooltip', { defaultValue: 'Call our clinic directly' })}
              >
                {t('servicesPage.callUs', { defaultValue: 'Call Us' })}: {PHONE_NUMBER}
              </Button>
              <Button 
                to="/contact" 
                variant="primary" 
                size="large" 
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 shadow-lg hover:shadow-xl"
                tooltip={t('servicesPage.bookAppointmentTooltip', { defaultValue: 'Schedule your visit online' })}
              >
                {t('servicesPage.bookAppointment', { defaultValue: 'Book Appointment' })}
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;
