
import React, { useState } from 'react';
import Button from './Button';
import { CheckCircleIcon, ExclamationTriangleIcon } from './IconComponents';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from 'react-i18next';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateField = (field: 'name' | 'email' | 'message', value: string) => {
    let errorMsg = '';
    switch (field) {
      case 'name':
        if (!value) errorMsg = t('contact.form.nameRequired', { defaultValue: 'Name is required.' });
        break;
      case 'email':
        if (!value) {
          errorMsg = t('contact.form.emailRequired', { defaultValue: 'Email is required.' });
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = t('contact.form.emailInvalid', { defaultValue: 'Email address is invalid.' });
        }
        break;
      case 'message':
        if (!value) errorMsg = t('contact.form.messageRequired', { defaultValue: 'Message is required.' });
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log({ name, email, message });

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setIsSubmitting(false);

    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <div
        className="p-12 bg-gentle-green/5 rounded-3xl text-center flex flex-col items-center justify-center border border-gentle-green/20 shadow-inner"
        role="alert"
        aria-live="polite"
      >
        <div className="bg-pure-white p-4 rounded-full shadow-md mb-6">
          <CheckCircleIcon className="w-12 h-12 text-gentle-green" />
        </div>
        <h3 className="text-3xl font-heading font-semibold text-gentle-green mb-4">{t('contact.form.thankYou', { defaultValue: 'Thank You!' })}</h3>
        <p className="text-secondary-text font-body text-lg">{t('contact.form.successMessage', { defaultValue: "Your message has been sent. We'll get back to you shortly." })}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-primary-text font-heading mb-2 tracking-wide uppercase">{t('contact.form.fullName', { defaultValue: 'Full Name' })}</label>
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
          className={`block w-full px-4 py-3 bg-calm-blue/10 border rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:bg-pure-white sm:text-base font-body transition-all duration-300 ${errors.name ? 'border-warm-coral focus:ring-warm-coral/20 focus:border-warm-coral bg-warm-coral/5' : 'border-gentle-green/20 focus:ring-gentle-green/20 focus:border-gentle-green hover:border-gentle-green/50'}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
        {errors.name && <p id="name-error" className="mt-2 text-sm text-warm-coral flex items-center font-body"><ExclamationTriangleIcon className="w-4 h-4 mr-1" />{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-primary-text font-heading mb-2 tracking-wide uppercase">{t('contact.form.emailAddress', { defaultValue: 'Email Address' })}</label>
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
          className={`block w-full px-4 py-3 bg-calm-blue/10 border rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:bg-pure-white sm:text-base font-body transition-all duration-300 ${errors.email ? 'border-warm-coral focus:ring-warm-coral/20 focus:border-warm-coral bg-warm-coral/5' : 'border-gentle-green/20 focus:ring-gentle-green/20 focus:border-gentle-green hover:border-gentle-green/50'}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && <p id="email-error" className="mt-2 text-sm text-warm-coral flex items-center font-body"><ExclamationTriangleIcon className="w-4 h-4 mr-1" />{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-primary-text font-heading mb-2 tracking-wide uppercase">{t('contact.form.messageLabel', { defaultValue: 'Message' })}</label>
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
          className={`block w-full px-4 py-3 bg-calm-blue/10 border rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:bg-pure-white sm:text-base font-body transition-all duration-300 resize-none ${errors.message ? 'border-warm-coral focus:ring-warm-coral/20 focus:border-warm-coral bg-warm-coral/5' : 'border-gentle-green/20 focus:ring-gentle-green/20 focus:border-gentle-green hover:border-gentle-green/50'}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
        />
        {errors.message && <p id="message-error" className="mt-2 text-sm text-warm-coral flex items-center font-body"><ExclamationTriangleIcon className="w-4 h-4 mr-1" />{errors.message}</p>}
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