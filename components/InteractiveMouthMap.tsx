import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '../constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from './IconComponents';

type MapArea = 'anterior' | 'posterior' | 'gums' | 'full';

const areas = [
  { id: 'anterior', label: 'Front Teeth (Anterior)' },
  { id: 'posterior', label: 'Back Teeth (Molars)' },
  { id: 'gums', label: 'Gums & Root' },
  { id: 'full', label: 'Whole Mouth' }
] as const;

export const InteractiveMouthMap: React.FC = () => {
  const { t } = useTranslation();
  const [selectedArea, setSelectedArea] = useState<MapArea | null>(null);

  const getServicesForArea = (area: MapArea) => {
    switch (area) {
      case 'anterior':
        return SERVICES_DATA.filter(s => ['anterior-root-canals', 'crownings', 'fillings'].includes(s.id));
      case 'posterior':
        return SERVICES_DATA.filter(s => ['fillings', 'bridges', 'tooth-extraction', 'oral-implants'].includes(s.id));
      case 'gums':
        return SERVICES_DATA.filter(s => ['scaling'].includes(s.id));
      case 'full':
        return SERVICES_DATA.filter(s => ['dental-exams', 'dentures'].includes(s.id));
      default:
        return [];
    }
  };

  return (
    <div className="bg-pure-white rounded-3xl p-8 shadow-xl border border-gentle-green/10 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <h3 className="text-2xl font-heading font-bold mb-4">{t('common.interactiveMap', { defaultValue: 'Interactive Mouth Map' })}</h3>
        <p className="text-secondary-text mb-8">{t('common.interactiveMapDesc', { defaultValue: 'Click on a tooth or area to explore related treatments.' })}</p>
        
        {/* Abstract Mouth Representation */}
        <div className="relative w-full aspect-[4/3] bg-calm-blue/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setSelectedArea('gums')}
              className={`w-full max-w-[200px] h-12 rounded-full border-2 transition-all ${selectedArea === 'gums' ? 'bg-warm-coral border-warm-coral text-white scale-105' : 'bg-red-50 border-red-200 hover:bg-red-100 text-red-500'}`}
            >
              Upper Gums
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedArea('posterior')}
                className={`w-16 h-20 rounded-xl rounded-tl-sm transition-all border-2 ${selectedArea === 'posterior' ? 'bg-gentle-green border-gentle-green text-white scale-110' : 'bg-pure-white border-gentle-green/20 hover:bg-calm-blue/10'}`}
              />
              <button
                onClick={() => setSelectedArea('anterior')}
                className={`w-24 h-24 rounded-2xl rounded-t-sm transition-all border-2 ${selectedArea === 'anterior' ? 'bg-gentle-green border-gentle-green text-white scale-110' : 'bg-pure-white border-gentle-green/20 hover:bg-calm-blue/10'}`}
              />
              <button
                onClick={() => setSelectedArea('posterior')}
                className={`w-16 h-20 rounded-xl rounded-tr-sm transition-all border-2 ${selectedArea === 'posterior' ? 'bg-gentle-green border-gentle-green text-white scale-110' : 'bg-pure-white border-gentle-green/20 hover:bg-calm-blue/10'}`}
              />
            </div>
          </div>
          
          <button
              onClick={() => setSelectedArea('full')}
              className={`w-full max-w-[280px] h-12 rounded-full border-2 transition-all mt-4 font-bold ${selectedArea === 'full' ? 'bg-calm-blue border-calm-blue text-white scale-105' : 'bg-pure-white border-calm-blue/30 text-calm-blue hover:bg-calm-blue/10'}`}
            >
              Whole Mouth
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6 justify-center">
          {areas.map(a => (
            <button
              key={a.id}
              onClick={() => setSelectedArea(a.id)}
              className={`px-4 py-2 rounded-full text-xs font-heading transition-colors ${selectedArea === a.id ? 'bg-primary-text text-pure-white' : 'bg-gray-100 text-secondary-text hover:bg-gray-200'}`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full lg:max-w-[400px]">
        <div className="bg-calm-blue/5 h-full rounded-2xl p-6 border border-calm-blue/20 flex flex-col">
          <h4 className="text-xl font-heading tracking-wide mb-6">
            {selectedArea ? areas.find(a => a.id === selectedArea)?.label : 'Select an area'}
          </h4>
          
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {selectedArea ? (
                <motion.div
                  key={selectedArea}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {getServicesForArea(selectedArea).map(service => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="block bg-pure-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gentle-green/10 group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-heading font-medium text-gentle-green group-hover:text-warm-coral">
                            {t(`services.${service.id}.name`, { defaultValue: service.name })}
                          </h5>
                          <p className="text-xs text-secondary-text mt-1 line-clamp-1">
                            {t(`services.${service.id}.shortDescription`, { defaultValue: service.shortDescription })}
                          </p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gentle-green/40 group-hover:text-warm-coral group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-secondary-text/50 text-center font-body text-sm">
                  Click on the interactive map to see recommended treatments.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
