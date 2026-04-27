import React from 'react';
import { CLINIC_NAME } from '../constants';
import { AboutPageIcon } from '../components/IconComponents'; 
import { motion, Variants } from 'framer-motion';
import Tooltip from '../components/Tooltip';
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

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-24 md:space-y-32 py-16 md:py-20">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="text-center max-w-5xl mx-auto px-4 sm:px-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">{t('about.title', { defaultValue: `About ${CLINIC_NAME}` })}</h1>
        <p className="text-lg sm:text-xl md:text-3xl text-secondary-text font-body font-light leading-relaxed max-w-3xl mx-auto px-2">
          {t('about.subtitle', { defaultValue: `"Your Smile Adventure Begins Here." This is more than a tagline for us; it's our guiding philosophy.` })}
        </p>
      </motion.section>

      {/* Doctor Profile Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-pure-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-gentle-green/10">
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="p-8 sm:p-10 md:p-20 flex flex-col justify-center relative order-2 md:order-1">
              <div className="absolute top-0 left-0 w-64 h-64 bg-calm-blue/20 rounded-full blur-3xl -ml-20 -mt-20"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gentle-green mb-6 md:mb-8 relative z-10 tracking-tight">{t('about.doctorTitle', { defaultValue: 'Meet Dr. K Bhattacharya' })}</h2>
              <div className="space-y-6 md:space-y-8 font-body text-secondary-text text-base md:text-lg leading-relaxed relative z-10">
                <p>
                  {t('about.doctorP1', { defaultValue: "Dr. K Bhattacharya is a dedicated and compassionate dentist with a passion for creating beautiful, healthy smiles. With years of experience in various dental disciplines, Dr. K Bhattacharya believes in a patient-centric approach, taking the time to understand each individual's needs and concerns." })}
                </p>
                <p>
                  {t('about.doctorP2', { defaultValue: "His qualifications include [Placeholder for Qualifications, e.g., BDS, MDS in a specialty]. He is committed to continuous learning and stays updated with the latest advancements in dental technology and techniques to provide the best possible care." })}
                </p>
                <p>
                  {t('about.doctorP3', { defaultValue: "Dr. K Bhattacharya's patient care philosophy revolves around trust, comfort, and education. He strives to demystify dental procedures, alleviate anxiety, and empower patients to take an active role in their oral health journey. He is particularly skilled in [Placeholder for skills, e.g., cosmetic dentistry, pediatric care, painless procedures]." })}
                </p>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] md:h-auto order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop" 
                alt="Dr. K Bhattacharya" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-gentle-green/40 to-transparent mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Clinic Environment Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 variants={fadeUpVariant} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">{t('about.clinicTitle', { defaultValue: 'Our Clinic Environment' })}</motion.h2>
          <motion.p variants={fadeUpVariant} className="font-body text-secondary-text text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed font-light opacity-90 px-2">
            {t('about.clinicSubtitle', { defaultValue: 'Experience a sanctuary of dental wellness. Our clinic is a thoughtfully designed, serene space where your comfort is our priority. Combining a calming atmosphere with cutting-edge technology, we ensure every visit is relaxing, efficient, and focused on delivering the highest standard of care.' })}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item} 
              variants={fadeUpVariant}
              className="group rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-gentle-green/10"
            >
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                <img 
                  src={item === 1 ? "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop" : item === 2 ? "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1504280968418-ce9121852b4c?q=80&w=600&auto=format&fit=crop"} 
                  alt={`Clinic Interior ${item}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gentle-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.p variants={fadeUpVariant} className="font-body text-secondary-text text-center mt-12 md:mt-16 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed font-light px-4">
          {t('about.clinicFooter', { defaultValue: 'From our reception area to our treatment rooms, every detail is considered to make your visit pleasant. We adhere to the highest standards of hygiene and safety.' })}
        </motion.p>
      </motion.section>

      {/* Core Purpose Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 md:pb-20"
      >
        <div className="bg-gradient-to-br from-gentle-green to-gentle-green/90 text-pure-white p-10 sm:p-16 md:p-24 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center relative overflow-hidden border border-gentle-green/20">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-warm-coral/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-calm-blue/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8 md:mb-10">
              <Tooltip text={t('about.purposeTooltip', { defaultValue: 'Our core purpose' })}>
                <div className="bg-pure-white/10 p-5 md:p-6 rounded-full backdrop-blur-sm shadow-inner border border-pure-white/10">
                  <AboutPageIcon className="w-12 h-12 md:w-16 md:h-16 text-warm-coral" />
                </div>
              </Tooltip>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 md:mb-8 tracking-tight drop-shadow-md">{t('about.purposeTitle', { defaultValue: 'Our Core Purpose' })}</h2>
            <p className="font-body text-lg sm:text-xl md:text-2xl leading-relaxed opacity-90 font-light drop-shadow-sm">
              {t('about.purposeText', { defaultValue: `To establish ${CLINIC_NAME} as the most trusted and patient-centric dental practice in the Dum Dum, Kolkata area. Our website serves as the primary digital touchpoint, designed not just to inform, but to build relationships, alleviate dental anxiety, and make the process of seeking dental care a reassuring and positive experience for everyone.` })}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
