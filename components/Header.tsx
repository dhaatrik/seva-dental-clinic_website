
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, CLINIC_NAME, PHONE_NUMBER } from '../constants';
import { LogoIcon, MenuIcon, XIcon, ChevronRightIcon } from './IconComponents';
import Button from './Button';
import Tooltip from './Tooltip';
import { useLenis } from 'lenis/react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuId = "mobile-menu-panel";
  const lenis = useLenis();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    if (currentLang.startsWith('en')) i18n.changeLanguage('hi');
    else if (currentLang.startsWith('hi')) i18n.changeLanguage('bn');
    else i18n.changeLanguage('en');
  };

  const getLangLabel = () => {
    const currentLang = i18n.language;
    if (currentLang.startsWith('hi')) return 'HI';
    if (currentLang.startsWith('bn')) return 'BN';
    return 'EN';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${isScrolled ? 'bg-pure-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-gentle-green/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Tooltip text="Go to homepage" position="right">
              <Link to="/" className="flex items-center space-x-3 text-2xl font-heading font-bold text-gentle-green hover:text-opacity-80 transition-all duration-300 group" onClick={closeMobileMenu}>
                <div className="bg-gentle-green/5 p-2 rounded-xl group-hover:bg-gentle-green/10 transition-colors">
                  <LogoIcon className="w-8 h-8 text-warm-coral" />
                </div>
                <span className="tracking-wide">{CLINIC_NAME}</span>
              </Link>
            </Tooltip>

            <nav className="hidden md:flex space-x-8 items-center">
              {NAV_LINKS.map((link) => {
                const linkName = t(`nav.${link.name.toLowerCase().replace(' ', '')}`, { defaultValue: link.name });
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative font-heading font-semibold text-sm uppercase tracking-widest transition-colors hover:text-warm-coral py-2 ${
                        isActive ? 'text-warm-coral' : 'text-primary-text'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {linkName}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-warm-coral rounded-full transform origin-left transition-transform duration-300"></span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
              <div className="flex items-center space-x-4 pl-4 border-l border-gentle-green/20">
                <button 
                  onClick={toggleLanguage}
                  className="font-heading font-bold text-sm text-gentle-green hover:text-warm-coral transition-colors px-2 py-1 border border-gentle-green/20 rounded-md"
                  aria-label="Toggle Language"
                >
                  {getLangLabel()}
                </button>
                <Button to="/contact" variant="primary" size="medium" className="group shadow-md hover:shadow-lg" tooltip="Schedule your dental consultation">
                  {t('header.bookConsultation', { defaultValue: 'Book Consultation' })}
                  <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </nav>

            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={toggleLanguage}
                className="font-heading font-bold text-sm text-gentle-green hover:text-warm-coral transition-colors px-2 py-1 border border-gentle-green/20 rounded-md"
                aria-label="Toggle Language"
              >
                {getLangLabel()}
              </button>
              <Tooltip text={isMobileMenuOpen ? "Close Menu" : "Open Menu"} position="bottom">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-primary-text hover:text-warm-coral focus:outline-none p-2 rounded-full hover:bg-gentle-green/5 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls={mobileMenuId}
                >
                  {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          id={mobileMenuId}
          className={`absolute w-full left-0 top-full bg-pure-white shadow-xl transition-all duration-300 ease-in-out md:hidden border-t border-gentle-green/10 overflow-y-auto max-h-[calc(100vh-80px)] ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
          role="region"
          aria-label="Mobile navigation"
          data-lenis-prevent="true"
        >
          <nav className="flex flex-col p-6 space-y-4">
            {NAV_LINKS.map((link) => {
              const linkName = t(`nav.${link.name.toLowerCase().replace(' ', '')}`, { defaultValue: link.name });
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block w-full text-left py-3 px-4 font-heading font-semibold uppercase tracking-widest rounded-xl transition-all text-lg ${
                      isActive ? 'text-warm-coral bg-warm-coral/5' : 'text-primary-text hover:bg-gentle-green/5'
                    }`
                  }
                >
                  {linkName}
                </NavLink>
              );
            })}
            <div className="pt-6 mt-2 border-t border-gentle-green/10 space-y-4">
              <Button to="/contact" variant="primary" size="large" fullWidth onClick={closeMobileMenu} className="shadow-md">
                {t('header.bookConsultation', { defaultValue: 'Book Your Adventure' })}
              </Button>
              <a href={`tel:${PHONE_NUMBER}`} className="block text-center text-secondary-text hover:text-warm-coral py-3 font-body font-medium transition-colors">{t('header.call', { defaultValue: 'Call' })}: {PHONE_NUMBER}</a>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gentle-green/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Header;
