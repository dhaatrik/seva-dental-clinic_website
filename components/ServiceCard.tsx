
import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import Card from './Card';
import Button from './Button';
import { ChevronRightIcon } from './IconComponents';
import Tooltip from './Tooltip';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { t } = useTranslation();
  const IconComponent = service.icon;
  const serviceName = t(`services.${service.id}.name`, { defaultValue: service.name });
  const shortDescription = t(`services.${service.id}.shortDescription`, { defaultValue: service.shortDescription });

  return (
    <Card className="flex flex-col h-full group bg-pure-white border border-gentle-green/10 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-3xl relative" hoverEffect={false}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-50">
        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out"></div>
      </div>
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gentle-green/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
        <img 
          src={service.image} 
          alt={serviceName} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {IconComponent && (
          <div className="absolute top-4 right-4 z-20">
            <Tooltip text={`${serviceName} Icon`} position="left">
              <div className="bg-pure-white/90 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                <IconComponent className="w-6 h-6 text-gentle-green shrink-0" />
              </div>
            </Tooltip>
          </div>
        )}
        <div className="absolute bottom-4 left-6 z-20">
          <h3 className="text-2xl font-heading font-bold text-pure-white drop-shadow-md">{serviceName}</h3>
        </div>
      </div>
      <div className="p-8 flex-grow flex flex-col bg-pure-white relative z-30">
        <p className="text-secondary-text text-base mb-8 font-body leading-relaxed flex-grow">{shortDescription}</p>
        <Button to={`/services/${service.id}`} variant="outline" size="medium" className="w-full group/btn border-gentle-green/30 text-gentle-green hover:bg-gentle-green hover:text-pure-white rounded-xl font-heading tracking-wide" tooltip={`Learn more about ${serviceName}`}>
          {t('common.exploreTreatment', { defaultValue: 'Explore Treatment' })} <ChevronRightIcon className="w-5 h-5 ml-2 inline group-hover/btn:translate-x-2 transition-transform duration-300"/>
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;