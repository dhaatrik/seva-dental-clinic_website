import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { CLINIC_NAME, SERVICES_DATA } from '../constants';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const TRANSFORMATIONS_DATA = [
  {
    id: 1,
    categoryId: 'crownings',
    title: 'Dental Crown Restoration',
    description: 'A damaged tooth was restored to its natural look and strength using a custom porcelain crown.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=800&auto=format&fit=crop', // Placeholder
    afterImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop', // Placeholder
  },
  {
    id: 2,
    categoryId: 'oral-implants',
    title: 'Full Arch Implant',
    description: 'Complete smile transformation using state-of-the-art dental implants.',
    beforeImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    categoryId: 'scaling',
    title: 'Deep Cleaning & Whitening',
    description: 'Removal of tough stains and plaque for a brighter, healthier smile.',
    beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop',
  }
];

const TransformationsPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(TRANSFORMATIONS_DATA.map(t => t.categoryId));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredTransformations = useMemo(() => {
    if (selectedCategory === 'All') return TRANSFORMATIONS_DATA;
    return TRANSFORMATIONS_DATA.filter(t => t.categoryId === selectedCategory);
  }, [selectedCategory]);

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'All') return t('common.allCategories', { defaultValue: 'All Categories' });
    const service = SERVICES_DATA.find(s => s.id === categoryId);
    return service ? t(`services.${service.id}.name`, { defaultValue: service.name }) : categoryId;
  };

  return (
    <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-20">
      <Helmet>
        <title>Smile Transformations | {CLINIC_NAME}</title>
        <meta name="description" content="View our gallery of before and after dental treatments, showcasing the life-changing results achieved at Seva Dental." />
      </Helmet>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto px-2"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">
          Smile Transformations
        </h1>
        <p className="text-lg sm:text-xl text-secondary-text font-body font-light leading-relaxed">
          See the life-changing results our team has achieved. Drag the slider on each image to compare the before and after.
        </p>
      </motion.section>

      <section className="space-y-10 md:space-y-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-heading font-medium transition-all text-sm sm:text-base ${
                selectedCategory === category 
                  ? 'bg-warm-coral text-pure-white shadow-md scale-105' 
                  : 'bg-pure-white text-secondary-text hover:bg-calm-blue/10 border border-gentle-green/10'
              }`}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="space-y-10 md:space-y-20">
          {filteredTransformations.map((transform, index) => (
            <motion.div 
              key={transform.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-pure-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-xl border border-gentle-green/10"
            >
              <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10 px-2">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gentle-green mb-3 md:mb-4">{transform.title}</h3>
                <p className="text-secondary-text font-body text-base sm:text-lg">{transform.description}</p>
              </div>
              
              <BeforeAfterSlider 
                beforeImage={transform.beforeImage}
                afterImage={transform.afterImage}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TransformationsPage;
