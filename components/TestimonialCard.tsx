
import React from 'react';
import { Testimonial } from '../types';
import Card from './Card';
import { StarIcon, QuoteIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { t } = useTranslation();
  return (
    <Card className="p-10 bg-pure-white h-full flex flex-col relative border border-gentle-green/10 shadow-md hover:shadow-xl transition-all duration-500 rounded-3xl group">
      <div className="absolute top-8 right-8 text-gentle-green/10 group-hover:text-gentle-green/20 transition-colors duration-500">
        <QuoteIcon className="w-16 h-16" />
      </div>
      <div className="flex items-center mb-8 space-x-1 relative z-10">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="w-5 h-5 fill-warm-coral text-warm-coral drop-shadow-sm" />
        ))}
      </div>
      <div className="flex-grow relative z-10">
        <p className="font-body text-primary-text italic mb-10 leading-relaxed text-xl font-medium">"{t(`testimonialsData.${testimonial.id}.quote`, { defaultValue: testimonial.quote })}"</p>
      </div>
      <div className="mt-auto flex items-center pt-8 border-t border-gentle-green/10 relative z-10">
        {testimonial.image ? (
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-16 h-16 rounded-full mr-5 object-cover shadow-md border-2 border-pure-white" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-16 h-16 rounded-full mr-5 bg-calm-blue/50 flex items-center justify-center text-gentle-green font-heading font-bold text-2xl shadow-inner">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-heading font-bold text-gentle-green text-xl tracking-wide">{t(`testimonialsData.${testimonial.id}.name`, { defaultValue: testimonial.name })}</p>
          {testimonial.age && <p className="text-sm text-secondary-text font-body uppercase tracking-wider mt-1">{t('testimonials.verifiedPatient', { defaultValue: 'Verified Patient' })}, {testimonial.age}</p>}
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;