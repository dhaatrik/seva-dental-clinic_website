
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { SERVICES_DATA, TESTIMONIALS_DATA, CLINIC_NAME } from '../constants';
import { SparkleIcon } from '../components/IconComponents';
import { motion, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const fadeInUp: Variants = {
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

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const featuredServices = SERVICES_DATA.slice(0, 3);
  const featuredTestimonials = TESTIMONIALS_DATA.slice(0, 2);

  return (
    <div className="space-y-24 md:space-y-32 pb-24 md:pb-32">
      <Helmet>
        <title>{CLINIC_NAME} | Your Smile Adventure Begins Here - Best Dentist in Kolkata</title>
        <meta name="description" content="Welcome to Seva Dental in Kolkata. Experience world-class dental care, from routine check-ups to advanced implants and root canals, in a serene environment." />
        <meta name="keywords" content="dentist Kolkata, dental clinic Kolkata, Seva Dental, smile makeover, root canal Kolkata, dental implants Kolkata, pediatric dentistry" />
      </Helmet>
      <Hero />

      {/* Intro Section - Bento Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="md:col-span-2 bg-calm-blue/20 p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-center relative overflow-hidden group border border-gentle-green/5 shadow-sm hover:shadow-md transition-shadow duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-warm-coral/10 rounded-full blur-3xl -mr-10 -mt-10 sm:-mr-20 sm:-mt-20 transition-transform duration-1000 group-hover:scale-110"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-6 md:mb-8 leading-[1.15] relative z-10 tracking-tight">
              {t('home.heroTitle', { defaultValue: `Welcome to Your Smile Adventure at ${CLINIC_NAME}` })}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-secondary-text mb-8 md:mb-10 font-body leading-relaxed max-w-2xl relative z-10 opacity-90">
              {t('home.heroSubtitle', { defaultValue: `At ${CLINIC_NAME}, we transform dental care into a positive, empowering journey. Our patient-first philosophy goes beyond clinical excellence—we partner with you to achieve lasting oral health through compassionate care and expert guidance.` })}
            </p>
            <div className="relative z-10">
              <Button to="/about" variant="outline" size="large" className="w-full sm:w-auto border-gentle-green/30 hover:border-gentle-green bg-pure-white/50 backdrop-blur-sm" tooltip="Discover our mission and team">
                {t('home.exploreServices', { defaultValue: 'Learn More About Us' })}
              </Button>
            </div>
          </div>
          
          <div className="group relative h-full w-full rounded-[2rem] md:rounded-[3rem] [perspective:1000px] flex-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3631] to-gentle-green rounded-[2rem] md:rounded-[3rem] shadow-xl transition-all duration-700 ease-out group-hover:[transform:rotateX(2deg)_rotateY(-5deg)_scale(1.02)] group-hover:shadow-[20px_30px_50px_rgba(34,197,94,0.25)] [transform-style:preserve-3d] overflow-hidden">
              
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606214174585-f56401ac8c11?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay opacity-20 group-hover:opacity-50 transition-all duration-1000 group-hover:scale-110"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-gentle-green via-gentle-green/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gentle-green/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-warm-coral/30 rounded-full blur-[80px] -mr-20 -mb-20 transition-transform duration-1000 group-hover:scale-150 group-hover:bg-warm-coral/40"></div>
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-pure-white/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-soft-light"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between p-8 sm:p-10 md:p-16 text-pure-white [transform:translateZ(50px)]">
                <div className="bg-pure-white/10 p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] inline-block mb-6 sm:mb-8 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] self-start transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] group-hover:border-white/30">
                  <SparkleIcon className="w-8 h-8 sm:w-12 sm:h-12 text-warm-coral drop-shadow-[0_0_15px_rgba(250,128,114,0.6)]" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-4 sm:mb-6 tracking-wide drop-shadow-md transition-transform duration-500 group-hover:-translate-y-1">
                    {t('home.stateOfArtTitle', { defaultValue: 'State-of-the-Art Technology' })}
                  </h3>
                  <p className="font-body text-pure-white/90 leading-relaxed text-base sm:text-lg font-light drop-shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                    {t('home.stateOfArtSubtitle', { defaultValue: 'We utilize advanced 3D scanning and precision technologies, mapping your unique dental structure for comfortable, world-class treatments.' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Services Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="px-4 sm:px-6 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-20 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-4 sm:mb-6 tracking-tight">{t('home.servicesTitle', { defaultValue: 'Our Signature Treatments' })}</h2>
          <p className="text-lg sm:text-xl text-secondary-text max-w-2xl mx-auto font-body font-light leading-relaxed opacity-90">
            {t('home.servicesSubtitle', { defaultValue: 'Discover bespoke dental solutions crafted to restore function, enhance aesthetics, and safeguard your smile for years to come.' })}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {featuredServices.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeInUp} className="text-center mt-12 md:mt-16">
          <Button to="/services" variant="primary" size="large" className="w-full sm:w-auto px-8 sm:px-12 py-4 shadow-lg hover:shadow-xl" tooltip="View all our signature treatments">
            {t('home.viewAllServices', { defaultValue: 'Explore All Services' })}
          </Button>
        </motion.div>
      </motion.section>

      {/* Before & After Gallery */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12 md:mb-20 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-4 sm:mb-6 tracking-tight">{t('home.transformationsTitle', { defaultValue: 'Transformations' })}</h2>
          <p className="text-lg sm:text-xl text-secondary-text max-w-2xl mx-auto font-body font-light">{t('home.transformationsSubtitle', { defaultValue: 'See the difference our expert care can make.' })}</p>
        </div>
        <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-gentle-green/10">
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=2070&auto=format&fit=crop" 
            afterImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop" 
          />
        </div>
      </motion.section>

      {/* Smile Quiz CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 max-w-7xl mx-auto"
      >
        <div className="py-16 sm:py-24 px-6 md:px-20 bg-gradient-to-br from-gentle-green to-gentle-green/90 text-pure-white rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center relative overflow-hidden border border-gentle-green/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-warm-coral/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 bg-calm-blue/20 rounded-full blur-3xl"></div>
          
          <div className="bg-pure-white/10 p-4 sm:p-6 rounded-full inline-block mb-8 sm:mb-10 backdrop-blur-sm relative z-10 shadow-inner">
            <SparkleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-warm-coral" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 sm:mb-8 relative z-10 tracking-tight drop-shadow-md">{t('home.discoverSmileScore', { defaultValue: 'Discover Your Smile Score!' })}</h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 max-w-3xl mx-auto font-body font-light text-pure-white/90 relative z-10 leading-relaxed drop-shadow-sm px-2">
            {t('home.smileScoreSubtitle', { defaultValue: 'Embark on our interactive "Smile Score Challenge" to uncover insights into your oral health habits and receive personalized guidance for your unique smile journey.' })}
          </p>
          <div className="relative z-10">
            <Button to="/smile-quiz" variant="primary" size="large" className="w-full sm:w-auto bg-warm-coral text-primary-text hover:bg-pure-white hover:text-gentle-green px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300" tooltip={t('home.takeQuizTooltip', { defaultValue: 'Start your smile score challenge' })}>
              {t('home.takeQuizNow', { defaultValue: 'Take the Quiz Now' })}
            </Button>
          </div>
        </div>
      </motion.section>
      
      {/* Featured Testimonials Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="px-4 sm:px-6 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-20 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-4 sm:mb-6 tracking-tight">{t('home.testimonialsTitle', { defaultValue: 'Patient Stories' })}</h2>
          <p className="text-lg sm:text-xl text-secondary-text max-w-2xl mx-auto font-body font-light">{t('home.testimonialsSubtitle', { defaultValue: "Don't just take our word for it." })}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {featuredTestimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeInUp}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeInUp} className="text-center mt-12 md:mt-16">
          <Button to="/testimonials" variant="outline" size="large" className="w-full sm:w-auto border-gentle-green/30 hover:border-gentle-green px-10" tooltip={t('home.readMoreStoriesTooltip', { defaultValue: 'Read more real patient stories' })}>
            {t('home.readMoreStories', { defaultValue: 'Read More Stories' })}
          </Button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HomePage;