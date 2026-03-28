
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
    <div className="space-y-32 pb-32">
      <Helmet>
        <title>{CLINIC_NAME} | Your Smile Adventure Begins Here - Best Dentist in Kolkata</title>
        <meta name="description" content="Welcome to Seva Dental Clinic in Kolkata. Experience world-class dental care, from routine check-ups to advanced implants and root canals, in a serene environment." />
        <meta name="keywords" content="dentist Kolkata, dental clinic Kolkata, Seva Dental, smile makeover, root canal Kolkata, dental implants Kolkata, pediatric dentistry" />
      </Helmet>
      <Hero />

      {/* Intro Section - Bento Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-calm-blue/20 p-12 md:p-16 rounded-[3rem] flex flex-col justify-center relative overflow-hidden group border border-gentle-green/5 shadow-sm hover:shadow-md transition-shadow duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-warm-coral/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-1000 group-hover:scale-110"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-8 leading-[1.15] relative z-10 tracking-tight">
              {t('home.heroTitle', { defaultValue: `Welcome to Your Smile Adventure at ${CLINIC_NAME}` })}
            </h2>
            <p className="text-lg md:text-xl text-secondary-text mb-10 font-body leading-relaxed max-w-2xl relative z-10 opacity-90">
              {t('home.heroSubtitle', { defaultValue: `At ${CLINIC_NAME}, we transform dental care into a positive, empowering journey. Our patient-first philosophy goes beyond clinical excellence—we partner with you to achieve lasting oral health through compassionate care and expert guidance.` })}
            </p>
            <div className="relative z-10">
              <Button to="/about" variant="outline" size="large" className="border-gentle-green/30 hover:border-gentle-green bg-pure-white/50 backdrop-blur-sm" tooltip="Discover our mission and team">
                {t('home.exploreServices', { defaultValue: 'Learn More About Us' })}
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gentle-green to-gentle-green/90 p-12 md:p-16 rounded-[3rem] text-pure-white flex flex-col justify-between relative overflow-hidden shadow-lg group">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-warm-coral/20 rounded-full blur-3xl -mr-10 -mb-10 transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="bg-pure-white/10 p-4 rounded-2xl inline-block mb-8 backdrop-blur-sm">
                <SparkleIcon className="w-10 h-10 text-warm-coral" />
              </div>
              <h3 className="text-3xl font-heading font-bold mb-6 tracking-wide">{t('home.stateOfArtTitle', { defaultValue: 'State-of-the-Art Technology' })}</h3>
              <p className="font-body text-pure-white/90 leading-relaxed text-lg font-light">
                {t('home.stateOfArtSubtitle', { defaultValue: 'We utilize the latest in dental technology to ensure your treatments are precise, comfortable, and efficient.' })}
              </p>
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
        className="px-6 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-6 tracking-tight">{t('home.servicesTitle', { defaultValue: 'Our Signature Treatments' })}</h2>
          <p className="text-xl text-secondary-text max-w-2xl mx-auto font-body font-light leading-relaxed opacity-90">
            {t('home.servicesSubtitle', { defaultValue: 'Discover bespoke dental solutions crafted to restore function, enhance aesthetics, and safeguard your smile for years to come.' })}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredServices.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeInUp} className="text-center mt-16">
          <Button to="/services" variant="primary" size="large" className="px-12 py-4 shadow-lg hover:shadow-xl" tooltip="View all our signature treatments">
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
        className="px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-6 tracking-tight">{t('home.transformationsTitle', { defaultValue: 'Transformations' })}</h2>
          <p className="text-xl text-secondary-text max-w-2xl mx-auto font-body font-light">{t('home.transformationsSubtitle', { defaultValue: 'See the difference our expert care can make.' })}</p>
        </div>
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-gentle-green/10">
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
        className="px-6 max-w-7xl mx-auto"
      >
        <div className="py-24 px-8 md:px-20 bg-gradient-to-br from-gentle-green to-gentle-green/90 text-pure-white rounded-[3rem] shadow-2xl text-center relative overflow-hidden border border-gentle-green/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-warm-coral/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-calm-blue/20 rounded-full blur-3xl"></div>
          
          <div className="bg-pure-white/10 p-6 rounded-full inline-block mb-10 backdrop-blur-sm relative z-10 shadow-inner">
            <SparkleIcon className="w-16 h-16 text-warm-coral" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-8 relative z-10 tracking-tight drop-shadow-md">{t('home.discoverSmileScore', { defaultValue: 'Discover Your Smile Score!' })}</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-body font-light text-pure-white/90 relative z-10 leading-relaxed drop-shadow-sm">
            {t('home.smileScoreSubtitle', { defaultValue: 'Embark on our interactive "Smile Score Challenge" to uncover insights into your oral health habits and receive personalized guidance for your unique smile journey.' })}
          </p>
          <div className="relative z-10">
            <Button to="/smile-quiz" variant="primary" size="large" className="bg-warm-coral text-primary-text hover:bg-pure-white hover:text-gentle-green px-12 py-5 text-xl shadow-xl hover:shadow-2xl transition-all duration-300" tooltip={t('home.takeQuizTooltip', { defaultValue: 'Start your smile score challenge' })}>
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
        className="px-6 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gentle-green mb-6 tracking-tight">{t('home.testimonialsTitle', { defaultValue: 'Patient Stories' })}</h2>
          <p className="text-xl text-secondary-text max-w-2xl mx-auto font-body font-light">{t('home.testimonialsSubtitle', { defaultValue: "Don't just take our word for it." })}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10">
          {featuredTestimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeInUp}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeInUp} className="text-center mt-16">
          <Button to="/testimonials" variant="outline" size="large" className="border-gentle-green/30 hover:border-gentle-green px-10" tooltip={t('home.readMoreStoriesTooltip', { defaultValue: 'Read more real patient stories' })}>
            {t('home.readMoreStories', { defaultValue: 'Read More Stories' })}
          </Button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HomePage;