
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA, CLINIC_NAME } from '../constants';
import NotFoundPage from './NotFoundPage';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import { ArrowLeftIcon, ChevronRightIcon, SendIcon } from '../components/IconComponents';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Tooltip from '../components/Tooltip';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const LeadMagnet: React.FC<{ category?: string }> = ({ category }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  let title = "Get More Information";
  let desc = "Enter your email to receive our comprehensive guide.";

  if (category === 'Restorative Care') {
    title = "The Ultimate Guide to a Brighter & Stronger Smile";
    desc = "Learn everything you need to know about restorative options, timelines, and how to maintain your new smile.";
  } else if (category === 'Oral Surgery') {
    title = "The Essential Post-Care Checklist";
    desc = "Avoid complications and speed up your recovery with our step-by-step post-care manual.";
  } else if (category === 'Preventive Care') {
    title = "The Oral Hygiene Daily Checklist";
    desc = "Keep your smile pristine and plaque-free between visits with this simple daily routine.";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="mt-12 md:mt-20 p-6 sm:p-8 md:p-12 bg-gentle-green text-pure-white rounded-[2rem] shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-warm-coral/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 justify-between text-center md:text-left">
        <div className="max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4">{title}</h3>
          <p className="text-pure-white/80 font-light text-base sm:text-lg">{desc}</p>
        </div>
        
        <div className="w-full md:w-auto min-w-0 md:min-w-[300px]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="flex items-center space-x-2 bg-pure-white/10 p-2 rounded-full border border-pure-white/20"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-grow bg-transparent border-none text-pure-white placeholder:text-pure-white/50 px-4 focus:outline-none w-full text-sm sm:text-base"
                />
                <button type="submit" className="w-10 h-10 bg-warm-coral hover:bg-warm-coral/90 text-pure-white rounded-full flex flex-shrink-0 items-center justify-center transition-colors">
                  <SendIcon className="w-4 h-4 ml-1" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
                className="text-center p-4 bg-pure-white/10 rounded-[1.5rem] border border-pure-white/20"
              >
                <p className="font-heading font-semibold text-lg sm:text-xl mb-1">Check your inbox!</p>
                <p className="text-sm text-pure-white/80">Your guide is on the way.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ServiceDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES_DATA.find(s => s.id === serviceId);

  if (!service) {
    return <NotFoundPage />;
  }

  const relatedServices = SERVICES_DATA.filter(s => s.id !== service.id).slice(0, 3);
  const IconComponent = service.icon;
  const serviceName = t(`services.${service.id}.name`, { defaultValue: service.name });
  const shortDescription = t(`services.${service.id}.shortDescription`, { defaultValue: service.shortDescription });
  const longDescription = t(`services.${service.id}.longDescription`, { defaultValue: service.longDescription });

  return (
    <div className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 space-y-12 md:space-y-16">
      <Helmet>
        <title>{service.name} | {CLINIC_NAME}</title>
        <meta name="description" content={service.metaDescription || service.shortDescription} />
        <meta name="keywords" content={service.keywords?.join(', ') || `${service.name}, dental service, ${CLINIC_NAME}, dentist, dental care, oral health`} />
      </Helmet>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="mb-8 md:mb-12"
      >
        <Tooltip text="Go back to services list" position="right">
          <Link to="/services" className="inline-flex items-center text-gentle-green hover:text-green-700 font-semibold transition-colors group bg-calm-blue/20 px-5 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm tracking-widest uppercase hover:bg-calm-blue/30">
            <ArrowLeftIcon className="w-4 h-4 mr-2 sm:mr-3 group-hover:-translate-x-1 transition-transform" />
            {t('common.backToAllServices', { defaultValue: 'Back to All Services' })}
          </Link>
        </Tooltip>
      </motion.div>

      <motion.article 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="bg-pure-white p-6 sm:p-10 md:p-20 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gentle-green/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-calm-blue/10 rounded-full blur-3xl -mr-10 -mt-10 sm:-mr-20 sm:-mt-20"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start mb-10 md:mb-16 relative z-10 text-center md:text-left">
          {IconComponent && (
            <Tooltip text={`${serviceName} Icon`} position="right">
              <div className="bg-gradient-to-br from-calm-blue/30 to-calm-blue/10 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] mr-0 mb-6 md:mr-8 md:mb-0 shadow-inner border border-calm-blue/20">
                <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 text-gentle-green" />
              </div>
            </Tooltip>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gentle-green leading-tight tracking-tight">{serviceName}</h1>
        </div>
        
        {service.image && (
          <div className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl border border-gentle-green/10 mb-10 md:mb-16 relative z-10 w-full aspect-video md:aspect-[2/1] lg:aspect-[2.5/1]">
            <img 
              src={service.image} 
              alt={serviceName} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="prose prose-lg md:prose-xl max-w-none font-body text-secondary-text leading-relaxed relative z-10 font-light">
          <p className="text-2xl sm:text-3xl font-heading font-semibold text-primary-text mb-6 md:mb-10 leading-snug tracking-tight px-1">{shortDescription}</p>
          <div className="space-y-6 md:space-y-8 text-lg md:text-xl px-1">
            {longDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {service.faqs && service.faqs.length > 0 && (
            <div className="mt-12 md:mt-20 pt-10 md:pt-16 border-t border-gentle-green/10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gentle-green mb-8 md:mb-10 tracking-tight text-center md:text-left px-1">{t('common.frequentlyAskedQuestions', { defaultValue: 'Frequently Asked Questions' })}</h2>
              <div className="space-y-4 sm:space-y-6">
                {service.faqs.map((faq, index) => (
                  <details key={index} className="p-5 sm:p-6 md:p-8 bg-calm-blue/10 rounded-[1.5rem] md:rounded-[2rem] group border border-gentle-green/5 hover:bg-calm-blue/20 transition-colors duration-300" name="faq">
                    <summary className="font-semibold text-primary-text cursor-pointer hover:text-gentle-green transition-colors flex justify-between items-center text-lg md:text-xl list-none">
                      <span className="pr-4">{t(`services.${service.id}.faqs.${index}.question`, { defaultValue: faq.question })}</span>
                      <span className="ml-2 sm:ml-6 flex-shrink-0 bg-pure-white p-2 sm:p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                        <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gentle-green transition-transform duration-300 group-open:rotate-90" />
                      </span>
                    </summary>
                    <p className="mt-4 sm:mt-6 text-secondary-text pt-4 sm:pt-6 border-t border-gentle-green/10 leading-relaxed font-light text-base sm:text-lg">{t(`services.${service.id}.faqs.${index}.answer`, { defaultValue: faq.answer })}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 md:mt-20 pt-10 md:pt-16 border-t border-gentle-green/10 text-center flex flex-col sm:flex-row items-center justify-between relative z-10 gap-6 sm:gap-0">
          <p className="text-xl sm:text-2xl font-heading font-semibold text-primary-text tracking-tight px-2">{t('common.readyToTransform', { defaultValue: 'Ready to transform your smile?' })}</p>
          <Button to="/contact" variant="primary" size="large" className="w-full sm:w-auto shadow-xl hover:shadow-2xl px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg" tooltip={`Ask us about ${serviceName}`}>
            {t('common.inquireAbout', { defaultValue: 'Inquire about' })} {serviceName}
          </Button>
        </div>

        <LeadMagnet category={service.category} />
      </motion.article>

      {relatedServices.length > 0 && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="pt-10"
        >
          <h2 className="text-4xl font-heading font-bold text-gentle-green mb-10 tracking-tight text-center">{t('common.relatedServices', { defaultValue: 'Related Services' })}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedServices.map(related => (
              <ServiceCard key={related.id} service={related} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default ServiceDetailPage;