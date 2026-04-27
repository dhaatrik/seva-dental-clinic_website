
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
    <Card className="p-8 sm:p-10 bg-pure-white h-full flex flex-col relative border-0 shadow-[0_4px_20px_rgba(34,197,94,0.05)] hover:shadow-[0_20px_40px_rgba(34,197,94,0.12)] transition-all duration-500 rounded-[2rem] group overflow-hidden [transform-style:preserve-3d] [perspective:1000px] hover:[transform:rotateX(2deg)_rotateY(-2deg)_scale(1.02)]">
      <div className="absolute inset-0 bg-gradient-to-br from-calm-blue/5 via-pure-white to-warm-coral/10 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>
      
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-gentle-green/5 group-hover:text-gentle-green/10 transition-all duration-700 transform group-hover:scale-125 group-hover:-rotate-6 origin-top-right">
        <QuoteIcon className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1.5} />
      </div>
      
      <div className="flex items-center mb-6 sm:mb-8 space-x-1 relative z-10 transition-transform duration-500 group-hover:translate-x-2">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className="w-4 h-4 sm:w-5 sm:h-5 fill-warm-coral text-warm-coral drop-shadow-[0_2px_4px_rgba(250,128,114,0.3)] transition-all duration-300 hover:scale-125" 
            style={{ transitionDelay: `${i * 30}ms` }} 
          />
        ))}
      </div>
      
      <div className="flex-grow relative z-10 [transform:translateZ(20px)]">
        <p className="font-body text-secondary-text group-hover:text-primary-text italic mb-8 sm:mb-10 leading-relaxed text-lg sm:text-xl font-light transition-colors duration-500">
          "{t(`testimonialsData.${testimonial.id}.quote`, { defaultValue: testimonial.quote })}"
        </p>
      </div>
      
      <div className="mt-auto flex items-center pt-6 sm:pt-8 border-t border-gentle-green/5 group-hover:border-gentle-green/15 relative z-10 transition-all duration-500 group-hover:-translate-y-1 [transform:translateZ(30px)]">
        {testimonial.image ? (
          <div className="relative mr-4 sm:mr-5">
             <div className="absolute inset-0 rounded-full bg-gentle-green/30 blur-md group-hover:bg-warm-coral/40 transition-colors duration-500 group-hover:scale-110"></div>
             <img 
               src={testimonial.image} 
               alt={testimonial.name} 
               className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm border-2 border-pure-white transition-transform duration-500 group-hover:scale-105" 
               referrerPolicy="no-referrer"
               loading="lazy"
             />
          </div>
        ) : (
          <div className="relative mr-4 sm:mr-5">
             <div className="absolute inset-0 rounded-full bg-gentle-green/30 blur-md group-hover:bg-warm-coral/40 transition-colors duration-500 group-hover:scale-110"></div>
             <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-calm-blue/50 to-calm-blue flex items-center justify-center text-gentle-green font-heading font-bold text-2xl shadow-inner border-2 border-pure-white transition-transform duration-500 group-hover:scale-105">
               {testimonial.name.charAt(0)}
             </div>
          </div>
        )}
        <div className="transition-transform duration-500 group-hover:translate-x-1">
          <p className="font-heading font-bold text-gentle-green text-lg sm:text-xl tracking-wide group-hover:text-[#1B3631] transition-colors duration-500">
            {t(`testimonialsData.${testimonial.id}.name`, { defaultValue: testimonial.name })}
          </p>
          {testimonial.age && (
            <p className="text-xs sm:text-sm text-secondary-text/80 font-body uppercase tracking-wider mt-0.5 sm:mt-1 font-medium flex items-center">
              <span className="w-1 h-1 bg-warm-coral rounded-full mr-2 opacity-50"></span>
              {t('testimonials.verifiedPatient', { defaultValue: 'Verified Patient' })}, {testimonial.age}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;