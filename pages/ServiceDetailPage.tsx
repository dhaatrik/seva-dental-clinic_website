
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA, CLINIC_NAME } from '../constants';
import NotFoundPage from './NotFoundPage';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import { ArrowLeftIcon, ChevronRightIcon } from '../components/IconComponents';
import { motion, Variants } from 'framer-motion';
import Tooltip from '../components/Tooltip';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
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
    <div className="py-20 max-w-6xl mx-auto px-6 space-y-16">
      <Helmet>
        <title>{service.name} | {CLINIC_NAME}</title>
        <meta name="description" content={service.metaDescription || service.shortDescription} />
        <meta name="keywords" content={service.keywords?.join(', ') || `${service.name}, dental service, ${CLINIC_NAME}, dentist, dental care, oral health`} />
      </Helmet>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="mb-12"
      >
        <Tooltip text="Go back to services list" position="right">
          <Link to="/services" className="inline-flex items-center text-gentle-green hover:text-green-700 font-semibold transition-colors group bg-calm-blue/20 px-6 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-calm-blue/30">
            <ArrowLeftIcon className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
            {t('common.backToAllServices', { defaultValue: 'Back to All Services' })}
          </Link>
        </Tooltip>
      </motion.div>

      <motion.article 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="bg-pure-white p-10 md:p-20 rounded-[3rem] shadow-2xl border border-gentle-green/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-calm-blue/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center mb-16 relative z-10">
          {IconComponent && (
            <Tooltip text={`${serviceName} Icon`} position="right">
              <div className="bg-gradient-to-br from-calm-blue/30 to-calm-blue/10 p-6 rounded-[2rem] mr-0 mb-8 md:mr-10 md:mb-0 shadow-inner border border-calm-blue/20">
                <IconComponent className="w-20 h-20 text-gentle-green" />
              </div>
            </Tooltip>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gentle-green leading-tight tracking-tight">{serviceName}</h1>
        </div>
        
        {service.image && (
          <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gentle-green/10 mb-16 relative z-10">
            <img 
              src={service.image} 
              alt={serviceName} 
              className="w-full h-auto max-h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="prose prose-xl max-w-none font-body text-secondary-text leading-relaxed relative z-10 font-light">
          <p className="text-3xl font-heading font-semibold text-primary-text mb-10 leading-snug tracking-tight">{shortDescription}</p>
          <div className="space-y-8 text-xl">
            {longDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {service.faqs && service.faqs.length > 0 && (
            <div className="mt-20 pt-16 border-t border-gentle-green/10">
              <h2 className="text-4xl font-heading font-bold text-gentle-green mb-10 tracking-tight">{t('common.frequentlyAskedQuestions', { defaultValue: 'Frequently Asked Questions' })}</h2>
              <div className="space-y-6">
                {service.faqs.map((faq, index) => (
                  <details key={index} className="p-8 bg-calm-blue/10 rounded-[2rem] group border border-gentle-green/5 hover:bg-calm-blue/20 transition-colors duration-300" name="faq">
                    <summary className="font-semibold text-primary-text cursor-pointer hover:text-gentle-green transition-colors flex justify-between items-center text-xl list-none">
                      {t(`services.${service.id}.faqs.${index}.question`, { defaultValue: faq.question })}
                      <span className="ml-6 flex-shrink-0 bg-pure-white p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                        <ChevronRightIcon className="w-6 h-6 text-gentle-green transition-transform duration-300 group-open:rotate-90" />
                      </span>
                    </summary>
                    <p className="mt-6 text-secondary-text pt-6 border-t border-gentle-green/10 leading-relaxed font-light">{t(`services.${service.id}.faqs.${index}.answer`, { defaultValue: faq.answer })}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-20 pt-16 border-t border-gentle-green/10 text-center md:text-left flex flex-col sm:flex-row items-center justify-between relative z-10">
          <p className="text-2xl font-heading font-semibold text-primary-text mb-8 sm:mb-0 tracking-tight">{t('common.readyToTransform', { defaultValue: 'Ready to transform your smile?' })}</p>
          <Button to="/contact" variant="primary" size="large" className="w-full sm:w-auto shadow-xl hover:shadow-2xl px-12 py-5 text-lg" tooltip={`Ask us about ${serviceName}`}>
            {t('common.inquireAbout', { defaultValue: 'Inquire about' })} {serviceName}
          </Button>
        </div>
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