
import React, { useState } from 'react';
import { CLINIC_NAME, PHONE_NUMBER, CLINIC_ADDRESS } from '../constants';
import { Link } from 'react-router-dom';
import { XBrandIcon, InstagramIcon, FacebookIcon, SendIcon, XIcon } from './IconComponents';
import Tooltip from './Tooltip';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '../contexts/AccessibilityContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reduceMotion, toggleReduceMotion } = useAccessibility();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <footer className="bg-gentle-green text-pure-white py-12 md:py-16 px-4 sm:px-6 border-t border-gentle-green/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-center md:text-left">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl md:text-2xl font-heading font-bold tracking-wide mb-2 md:mb-4">{CLINIC_NAME}</h3>
          <p className="text-sm font-body opacity-80 leading-relaxed px-4 md:px-0">{CLINIC_ADDRESS}</p>
          <p className="text-sm font-body opacity-80">
            Phone: <a href={`tel:${PHONE_NUMBER}`} className="hover:text-warm-coral transition-colors font-semibold">{PHONE_NUMBER}</a>
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-heading font-semibold mb-2 md:mb-4 uppercase tracking-widest opacity-90">{t('footer.quickLinks', { defaultValue: 'Quick Links' })}</h3>
          <ul className="space-y-2 md:space-y-3 text-sm font-body opacity-80">
            <li><Link to="/about" className="hover:text-warm-coral transition-colors inline-block py-1 md:py-0">{t('nav.about', { defaultValue: 'About Us' })}</Link></li>
            <li><Link to="/services" className="hover:text-warm-coral transition-colors inline-block py-1 md:py-0">{t('nav.services', { defaultValue: 'Services' })}</Link></li>
            <li><Link to="/contact" className="hover:text-warm-coral transition-colors inline-block py-1 md:py-0">{t('nav.contact', { defaultValue: 'Contact & Book' })}</Link></li>
            <li><Link to="/blog" className="hover:text-warm-coral transition-colors inline-block py-1 md:py-0">{t('nav.blog', { defaultValue: 'Blog' })}</Link></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-heading font-semibold mb-2 md:mb-4 uppercase tracking-widest opacity-90">{t('footer.yourSmileAdventure', { defaultValue: 'Your Smile Adventure' })}</h3>
          <p className="text-sm font-body opacity-80 leading-relaxed mb-4 md:mb-6 px-4 md:px-0">
            {t('footer.embarkJourney', { defaultValue: "Embark on a journey to lifelong oral health with us. We're dedicated to making your dental experience positive and reassuring." })}
          </p>
          <Button 
            to="/smile-quiz" 
            variant="primary" 
            size="small"
            className="w-full sm:w-auto"
            tooltip={t('footer.discoverSmileScore', { defaultValue: 'Discover your smile score now!' })}
          >
            {t('footer.takeSmileQuiz', { defaultValue: 'Take the Smile Score Quiz!' })}
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-heading font-semibold mb-2 md:mb-4 uppercase tracking-widest opacity-90">{t('footer.followUs', { defaultValue: 'Follow Us' })}</h3>
          <div className="flex justify-center md:justify-start space-x-4 mb-6 md:mb-8">
            <Tooltip text="Follow us on X">
              <a href="#" aria-label="Follow us on X" className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-pure-white/10 rounded-full text-pure-white transition-all duration-300 ease-out hover:scale-110 hover:bg-warm-coral hover:text-gentle-green shadow-md hover:shadow-xl">
                <XBrandIcon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </Tooltip>
            <Tooltip text="Follow us on Instagram">
              <a href="#" aria-label="Follow us on Instagram" className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-pure-white/10 rounded-full text-pure-white transition-all duration-300 ease-out hover:scale-110 hover:bg-warm-coral hover:text-gentle-green shadow-md hover:shadow-xl">
                <InstagramIcon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </Tooltip>
            <Tooltip text="Follow us on Facebook">
              <a href="#" aria-label="Follow us on Facebook" className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-pure-white/10 rounded-full text-pure-white transition-all duration-300 ease-out hover:scale-110 hover:bg-warm-coral hover:text-gentle-green shadow-md hover:shadow-xl">
                <FacebookIcon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </Tooltip>
          </div>
          
          <div className="pt-4 border-t border-pure-white/10">
            <h4 className="text-sm font-heading font-semibold mb-2 md:mb-4 uppercase tracking-widest opacity-90">{t('footer.joinAdventure', { defaultValue: 'Join the Adventure' })}</h4>
            <form onSubmit={handleSubmit} className="relative max-w-sm mx-auto md:max-w-none">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder', { defaultValue: 'Your email address' })} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-pure-white/10 border ${error ? 'border-red-400' : 'border-pure-white/20'} rounded-full py-3 px-5 sm:px-6 text-sm font-body focus:outline-none focus:ring-2 focus:ring-warm-coral/50 transition-all placeholder-pure-white/40`}
                aria-label={t('footer.emailPlaceholder', { defaultValue: 'Newsletter email' })}
                disabled={isSubmitting}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Tooltip text={t('footer.subscribe', { defaultValue: 'Subscribe' })} position="left">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="relative overflow-hidden group bg-warm-coral text-primary-text p-2 rounded-full hover:text-gentle-green transition-all duration-500 ease-out shadow-md hover:shadow-xl disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
                    aria-label={t('footer.subscribe', { defaultValue: 'Subscribe' })}
                  >
                    <div className="absolute inset-0 bg-pure-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10"></div>
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin relative z-10"></div>
                    ) : (
                      <SendIcon className="w-4 h-4 relative z-10" />
                    )}
                  </button>
                </Tooltip>
              </div>
            </form>
            {error && (
              <p className="text-xs text-red-300 mt-2 font-body px-4" role="alert" aria-live="assertive">{error}</p>
            )}
            {isSubmitted && (
              <div className="mt-3 p-3 sm:p-4 bg-pure-white/10 border border-warm-coral/30 rounded-[1.5rem] relative shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2" role="status" aria-live="polite">
                <p className="text-sm font-body text-pure-white font-medium pr-6">{t('footer.subscribeSuccess', { defaultValue: 'Thanks for joining our newsletter!' })}</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-pure-white/60 hover:text-warm-coral transition-colors p-1 bg-transparent border-none cursor-pointer"
                  aria-label="Dismiss success message"
                >
                  <XIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center text-sm mt-16 pt-8 border-t border-pure-white/10 font-body opacity-60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          &copy; {currentYear} {CLINIC_NAME}. {t('footer.rightsReserved', { defaultValue: 'All Rights Reserved.' })}
        </div>
        <button
          onClick={toggleReduceMotion}
          className="text-xs hover:text-warm-coral underline transition-colors"
        >
          {reduceMotion ? t('header.enableAnimations', { defaultValue: 'Enable Animations' }) : t('header.disableAnimations', { defaultValue: 'Disable Animations' })}
        </button>
      </div>
    </footer>
  );
};

export default Footer;