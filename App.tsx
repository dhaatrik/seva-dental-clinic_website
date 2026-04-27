
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useAccessibility } from './contexts/AccessibilityContext';

// Standard static imports instead of lazy loading
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import QuizPage from './pages/QuizPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import TransformationsPage from './pages/TransformationsPage';

const App: React.FC = () => {
  const location = useLocation();
  const { reduceMotion } = useAccessibility();

  const content = (
    <div className={`flex flex-col min-h-screen bg-trustworthy-white selection:bg-gentle-green/30 selection:text-gentle-green relative ${!reduceMotion ? 'cursor-none' : ''}`}>
      <NoiseOverlay />
      {!reduceMotion && <CustomCursor />}
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <ScrollToTop />
      <main className="flex-grow pt-24 pb-12">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
              <Route path="/services/:serviceId" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
              <Route path="/transformations" element={<PageTransition><TransformationsPage /></PageTransition>} />
              <Route path="/smile-quiz" element={<PageTransition><QuizPage /></PageTransition>} />
              <Route path="/testimonials" element={<PageTransition><TestimonialsPage /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
            </Routes>
          </div>
        </AnimatePresence>
      </main>
      <ChatBot />
      <Footer />
    </div>
  );

  return reduceMotion ? content : (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
};

export default App;
