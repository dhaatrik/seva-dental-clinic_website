
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, CLINIC_NAME } from '../constants';
import { LogoIcon, MenuIcon, XIcon, ChevronRightIcon, SparkleIcon } from './IconComponents';
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
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, lenis]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${isScrolled ? 'bg-pure-white/90 backdrop-blur-xl shadow-lg border-b border-primary-text/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Tooltip text="Go to homepage" position="right">
              <Link to="/" className="flex items-center space-x-3 text-xl font-heading font-bold text-gentle-green hover:opacity-80 transition-opacity duration-300 group" onClick={closeMobileMenu}>
                <div className="bg-gentle-green/5 p-2 rounded-xl group-hover:bg-gentle-green/10 transition-colors">
                  <LogoIcon className="w-7 h-7 text-warm-coral" />
                </div>
                <span className="tracking-tight">{CLINIC_NAME}</span>
              </Link>
            </Tooltip>

            <nav className="hidden md:flex space-x-8 items-center" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const linkName = t(`nav.${link.name.toLowerCase().replace(' ', '')}`, { defaultValue: link.name });
                const isSmileQuiz = link.name === 'Smile Quiz';
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) => {
                      if (isSmileQuiz) {
                        return `relative font-body font-bold text-[14px] transition-all py-1.5 px-5 rounded-full bg-yellow-400 text-yellow-900 shadow-md hover:bg-yellow-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 ${
                          isActive ? 'ring-2 ring-yellow-500 ring-offset-2' : ''
                        }`;
                      }
                      return `relative font-body font-medium text-[15px] transition-colors py-2 group ${
                        isActive ? 'text-gentle-green' : 'text-primary-text/70 hover:text-gentle-green'
                      }`;
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        {isSmileQuiz ? (
                          <>
                            <SparkleIcon className="w-4 h-4 text-yellow-700 animate-pulse" />
                            {linkName}
                          </>
                        ) : (
                          <>
                            {linkName}
                            <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100 bg-gentle-green' : 'scale-x-0 bg-gentle-green group-hover:scale-x-100 opacity-50'}`}></span>
                          </>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
              <div className="flex items-center space-x-5 pl-5 border-l border-primary-text/10">
                <button 
                  onClick={toggleLanguage}
                  className="font-body font-medium text-[13px] text-primary-text/70 hover:text-gentle-green transition-colors px-2 py-1 rounded bg-primary-text/5 hover:bg-gentle-green/10 flex items-center justify-center"
                  aria-label="Toggle Language"
                >
                  {getLangLabel()}
                </button>
                <Button to="/contact" variant="secondary" size="small" className="group shadow-sm hover:shadow-md font-body font-medium" tooltip="Schedule your dental consultation">
                  {t('header.bookConsultation', { defaultValue: 'Book Consultation' })}
                </Button>
              </div>
            </nav>

            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={toggleLanguage}
                className="font-body font-medium text-xs text-primary-text/70 hover:text-gentle-green transition-colors px-2 py-1 rounded bg-primary-text/5 flex items-center justify-center"
                aria-label="Toggle Language"
              >
                {getLangLabel()}
              </button>
              <Tooltip text={isMobileMenuOpen ? "Close Menu" : "Open Menu"} position="bottom">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-primary-text hover:text-gentle-green focus:outline-none p-2 rounded-full hover:bg-gentle-green/5 transition-colors"
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
              const isSmileQuiz = link.name === 'Smile Quiz';
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) => {
                    if (isSmileQuiz) {
                      return `flex items-center gap-2 w-full text-left py-3 px-4 font-body font-bold rounded-xl transition-all text-lg tracking-tight bg-yellow-400 text-yellow-900 shadow-sm ${
                        isActive ? 'ring-2 ring-yellow-500 ring-offset-2' : ''
                      }`;
                    }
                    return `block w-full text-left py-3 px-4 font-body font-medium rounded-xl transition-all text-lg tracking-tight ${
                      isActive ? 'text-gentle-green bg-gentle-green/5 font-semibold' : 'text-primary-text hover:bg-black/5'
                    }`;
                  }}
                >
                  {isSmileQuiz && <SparkleIcon className="w-5 h-5 text-yellow-700 animate-pulse" />}
                  {linkName}
                </NavLink>
              );
            })}
            <div className="pt-6 mt-2 border-t border-primary-text/10 space-y-4">
              <Button to="/contact" variant="secondary" size="medium" fullWidth onClick={closeMobileMenu} className="shadow-sm hover:shadow-md font-body font-medium">
                {t('header.bookConsultation', { defaultValue: 'Book Your Adventure' })}
              </Button>
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
