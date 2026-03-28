
import React from 'react';
import { ChevronRightIcon } from './IconComponents';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={index}
          className="group bg-pure-white rounded-2xl border border-gentle-green/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none focus:outline-none focus:ring-2 focus:ring-gentle-green/20">
            <h3 className="text-lg font-heading font-semibold text-primary-text group-open:text-gentle-green transition-colors">
              {item.question}
            </h3>
            <Tooltip text={t('common.toggleAnswer', { defaultValue: 'Toggle answer' })} position="left">
              <div className="p-2 rounded-full hover:bg-calm-blue/10 transition-colors">
                <ChevronRightIcon className="w-5 h-5 text-gentle-green transition-transform duration-300 group-open:rotate-90" />
              </div>
            </Tooltip>
          </summary>
          <div className="px-6 pb-6 pt-0">
            <div className="h-px bg-gentle-green/10 mb-6" />
            <p className="text-secondary-text font-body leading-relaxed">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default FAQAccordion;
