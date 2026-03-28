
import React from 'react';
import ContactForm from '../components/ContactForm';
import { CLINIC_ADDRESS, CLINIC_EMAIL, OPENING_HOURS, PHONE_NUMBER, CLINIC_NAME } from '../constants';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '../components/IconComponents';
import { motion, Variants } from 'framer-motion';
import Tooltip from '../components/Tooltip';
import { useTranslation } from 'react-i18next';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const formattedAddressQuery = encodeURIComponent(CLINIC_ADDRESS);
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || ""; 

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 space-y-32">
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="text-center max-w-5xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gentle-green mb-8 tracking-tight">{t('contact.title', { defaultValue: 'Contact Us & Book Your Adventure' })}</h1>
        <p className="text-xl md:text-3xl text-secondary-text font-body font-light max-w-3xl mx-auto leading-relaxed">
          {t('contact.subtitle', { defaultValue: "We're here to help you on your journey to a healthier smile. Reach out to us with any questions or to schedule your appointment." })}
        </p>
      </motion.section>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Contact Information Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="bg-pure-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gentle-green/5 space-y-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-calm-blue/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h2 className="text-4xl font-heading font-bold text-gentle-green mb-8 relative z-10 tracking-tight">
            {t('contact.getInTouch', { defaultValue: 'Get in Touch' })}
          </h2>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-start space-x-6 group">
              <Tooltip text={t('contact.visitClinic', { defaultValue: 'Visit our clinic' })} position="right">
                <div className="bg-calm-blue/20 p-4 rounded-2xl group-hover:bg-warm-coral/10 transition-colors duration-300">
                  <MapPinIcon className="w-8 h-8 text-gentle-green" />
                </div>
              </Tooltip>
              <div>
                <h3 className="text-xl font-semibold text-primary-text font-heading mb-2">{t('contact.clinicAddress', { defaultValue: 'Clinic Address:' })}</h3>
                <p className="text-secondary-text font-body leading-relaxed text-lg">{CLINIC_ADDRESS}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6 group">
              <Tooltip text={t('contact.callUsTooltip', { defaultValue: 'Call us' })} position="right">
                <div className="bg-calm-blue/20 p-4 rounded-2xl group-hover:bg-warm-coral/10 transition-colors duration-300">
                  <PhoneIcon className="w-8 h-8 text-gentle-green" />
                </div>
              </Tooltip>
              <div>
                <h3 className="text-xl font-semibold text-primary-text font-heading mb-2">{t('contact.phone', { defaultValue: 'Phone:' })}</h3>
                <a href={`tel:${PHONE_NUMBER}`} className="text-warm-coral hover:text-gentle-green transition-colors font-body text-xl font-medium">
                  {PHONE_NUMBER}
                </a>
                <p className="text-sm text-secondary-text mt-2 font-light">{t('contact.clickableMobile', { defaultValue: '(Clickable on mobile devices)' })}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6 group">
              <Tooltip text={t('contact.emailUsTooltip', { defaultValue: 'Email us' })} position="right">
                <div className="bg-calm-blue/20 p-4 rounded-2xl group-hover:bg-warm-coral/10 transition-colors duration-300">
                  <EnvelopeIcon className="w-8 h-8 text-gentle-green" />
                </div>
              </Tooltip>
              <div>
                <h3 className="text-xl font-semibold text-primary-text font-heading mb-2">{t('contact.email', { defaultValue: 'Email:' })}</h3>
                <a href={`mailto:${CLINIC_EMAIL}`} className="text-warm-coral hover:text-gentle-green transition-colors font-body text-xl font-medium">
                  {CLINIC_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gentle-green/10 relative z-10">
            <h3 className="text-2xl font-semibold text-gentle-green font-heading mb-6">{t('contact.openingHours', { defaultValue: 'Clinic Opening Hours:' })}</h3>
            <ul className="space-y-3 text-secondary-text font-body text-lg">
              {OPENING_HOURS.map(line => (
                <li key={line} className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-warm-coral"></span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="bg-pure-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gentle-green/5 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-warm-coral/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
          <h2 className="text-4xl font-heading font-bold text-gentle-green mb-10 text-center md:text-left relative z-10 tracking-tight">{t('contact.sendMessage', { defaultValue: 'Send Us a Message' })}</h2>
          <div className="relative z-10">
            <ContactForm />
          </div>
        </motion.section>
      </div>

      {/* Embedded Google Map Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="mt-20"
      >
        <h2 className="text-4xl font-heading font-bold text-gentle-green mb-10 text-center tracking-tight">{t('contact.findUs', { defaultValue: 'Find Us Here' })}</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-[3rem] shadow-2xl overflow-hidden border border-gentle-green/10">
          {googleMapsApiKey ? (
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${formattedAddressQuery}`}
              width="100%"
              height="100%"
              style={{ border:0, minHeight: '600px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${CLINIC_NAME}`}
            ></iframe>
          ) : (
            <div className="w-full h-[600px] flex items-center justify-center bg-calm-blue/10">
              <p className="text-secondary-text text-center p-10 font-body text-xl leading-relaxed">
                {t('contact.mapError', { defaultValue: 'Google Maps cannot be displayed.' })} <br/>
                {t('contact.mapApiKeyMissing', { defaultValue: '(API key may be missing or invalid).' })}<br/><br/>
                <span className="font-semibold text-gentle-green text-2xl block mt-4 mb-2">{t('contact.ourAddressIs', { defaultValue: 'Our address is:' })}</span>
                {CLINIC_ADDRESS}
              </p>
            </div>
          )}
        </div>
        {!googleMapsApiKey && (
            <p className="text-center text-sm text-warm-coral mt-6 font-body">{t('contact.mapNote', { defaultValue: 'Note: Map functionality requires a Google Maps API Key to be configured.' })}</p>
        )}
      </motion.section>
    </div>
  );
};

export default ContactPage;