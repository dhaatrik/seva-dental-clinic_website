
import React, { useState } from 'react';
import Button from './Button';
import { CheckCircleIcon, ExclamationTriangleIcon } from './IconComponents';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from 'react-i18next';
import Tooltip from './Tooltip';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateField = (field: 'name' | 'email' | 'message', value: string) => {
    let errorMsg = '';
    switch (field) {
      case 'name':
        if (!value.trim()) errorMsg = t('contact.form.nameRequired', { defaultValue: 'Name is required.' });
        break;
      case 'email':
        if (!value.trim()) {
          errorMsg = t('contact.form.emailRequired', { defaultValue: 'Email is required.' });
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = t('contact.form.emailInvalid', { defaultValue: 'Email address is invalid.' });
        }
        break;
      case 'message':
        if (!value.trim()) errorMsg = t('contact.form.messageRequired', { defaultValue: 'Message is required.' });
        break;
    }
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isMessageValid = validateField('message', message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate a random error occasionally (1 in 5 chance)
          // In real implementation this would fetch from a backend API
          if (Math.random() < 0.2) {
            reject(new Error('Network error'));
          } else {
            resolve('Success');
          }
        }, 1500);
      });
      
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div 
        className="p-12 bg-gentle-green/5 rounded-3xl text-center flex flex-col items-center justify-center border border-gentle-green/20 shadow-inner animate-in fade-in"
        role="alert"
        aria-live="polite"
      >
        <div className="bg-pure-white p-4 rounded-full shadow-md mb-6">
          <CheckCircleIcon className="w-12 h-12 text-gentle-green" />
        </div>
        <h3 className="text-3xl font-heading font-semibold text-gentle-green mb-4">{t('contact.form.thankYou', { defaultValue: 'Thank You!' })}</h3>
        <p className="text-secondary-text font-body text-lg">{t('contact.form.successMessage', { defaultValue: "Your message has been sent. We'll get back to you shortly." })}</p>
        <Button onClick={() => setSubmitStatus('idle')} variant="outline" className="mt-8 border-gentle-green/30 text-gentle-green hover:bg-gentle-green/10" aria-label="Send another message">
          {t('contact.form.sendAnother', { defaultValue: 'Send Another Message' })}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submitStatus === 'error' && (
        <div className="p-4 bg-warm-coral/10 border border-warm-coral/30 rounded-xl flex items-start gap-3" role="alert" aria-live="assertive">
          <ExclamationTriangleIcon className="w-5 h-5 text-warm-coral shrink-0 mt-0.5" />
          <p className="text-sm font-body text-warm-coral/90">
            {t('contact.form.errorMessage', { defaultValue: 'There was a problem sending your message. Please try again later.' })}
          </p>
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-primary-text font-heading mb-2 tracking-wide uppercase">{t('contact.form.fullName', { defaultValue: 'Full Name' })}</label>
        <Tooltip text={errors.name ? errors.name : t('contact.form.nameTooltip', { defaultValue: 'Enter your full proper name' })} position="top" fullWidth>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField('name', e.target.value);
            }}
            required
            autoComplete="name"
            className={`block w-full px-4 py-3 bg-calm-blue/10 border rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:bg-pure-white sm:text-base font-body transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${errors.name ? 'border-warm-coral focus:ring-warm-coral/20 focus:border-warm-coral bg-warm-coral/5' : 'border-gentle-green/20 focus:ring-gentle-green/20 focus:border-gentle-green hover:border-gentle-green/50'}`}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Tooltip>
        {errors.name && <p id="name-error" className="mt-2 text-sm text-warm-coral flex items-center font-body" aria-live="polite"><ExclamationTriangleIcon className="w-4 h-4 mr-1"/>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-primary-text font-heading mb-2 tracking-wide uppercase">{t('contact.form.emailAddress', { defaultValue: 'Email Address' })}</label>
        <Tooltip text={errors.email ? errors.email : t('contact.form.emailTooltip', { defaultValue: 'We will never share your email' })} position="top" fullWidth>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
            required
            autoComplete="email"
            className={`block w-full px-4 py-3 bg-calm-blue/10 border rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:bg-pure-white sm:text-base font-body transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? 'border-warm-coral focus:ring-warm-coral/20 focus:border-warm-coral bg-warm-coral/5' : 'border-gentle-green/20 focus:ring-gentle-green/20 focus:border-gentle-green hover:border-gentle-green/50'}`}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Tooltip>
        {errors.email && <p id="email-error" className="mt-2 text-sm text-warm-coral flex items-center font-body" aria-live="polite"><ExclamationTriangleIcon className="w-4 h-4 mr-1"/>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-primary-text font-heading mb-2 tracking-wide uppercase">{t('contact.form.messageLabel', { defaultValue: 'Message' })}</label>
        <Tooltip text={errors.message ? errors.message : t('contact.form.messageTooltip', { defaultValue: 'How can we help you today?' })} position="top" fullWidth>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              validateField('message', e.target.value);
            }}
            required
            className={`block w-full px-4 py-3 bg-calm-blue/10 border rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:bg-pure-white sm:text-base font-body transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${errors.message ? 'border-warm-coral focus:ring-warm-coral/20 focus:border-warm-coral bg-warm-coral/5' : 'border-gentle-green/20 focus:ring-gentle-green/20 focus:border-gentle-green hover:border-gentle-green/50'}`}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        </Tooltip>
        {errors.message && <p id="message-error" className="mt-2 text-sm text-warm-coral flex items-center font-body" aria-live="polite"><ExclamationTriangleIcon className="w-4 h-4 mr-1"/>{errors.message}</p>}
      </div>
      <div className="pt-4">
        <Button type="submit" variant="primary" fullWidth size="large" disabled={isSubmitting} className="shadow-lg hover:shadow-xl" tooltip={t('contact.form.submitTooltip', { defaultValue: 'Send your message to our team' })}>
          {isSubmitting ? <LoadingSpinner size="small" /> : t('contact.form.submitButton', { defaultValue: 'Send Message' })}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;