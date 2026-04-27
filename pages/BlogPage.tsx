
import React, { useState, useEffect, useMemo } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { BLOG_POSTS_DATA, CLINIC_NAME } from '../constants';
import { BlogPost } from '../types';
import Modal from '../components/Modal';
import SkeletonCard from '../components/SkeletonCard';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { XBrandIcon, FacebookIcon, LinkedinIcon, CheckCircleIcon } from '../components/IconComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import Tooltip from '../components/Tooltip';
import Markdown from 'react-markdown';
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

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showShareToast, setShowShareToast] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract unique categories from blog posts
  const categories = useMemo(() => {
    const cats = BLOG_POSTS_DATA.map(post => post.category).filter(Boolean) as string[];
    return ['All', ...new Set(cats)];
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Check for post ID in query params
      const params = new URLSearchParams(location.search);
      const postId = params.get('post');
      if (postId) {
        const post = BLOG_POSTS_DATA.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
        }
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [location.search]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const openModalWithPost = (post: BlogPost) => {
    setSelectedPost(post);
    navigate(`/blog?post=${post.id}`, { replace: true });
  };

  const closeModal = () => {
    setSelectedPost(null);
    navigate('/blog', { replace: true });
  };

  const handleShareFeedback = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const getShareUrl = (post: BlogPost) => `${window.location.origin}/blog?post=${post.id}`;
  
  const shareOnX = (post: BlogPost) => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(getShareUrl(post))}`, '_blank');
    handleShareFeedback();
  };

  const shareOnFacebook = (post: BlogPost) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl(post))}`, '_blank');
    handleShareFeedback();
  };

  const shareOnLinkedIn = (post: BlogPost) => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl(post))}`, '_blank');
    handleShareFeedback();
  };

  return (
    <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-24">
      <Helmet>
        <title>{selectedPost ? `${selectedPost.title} | ${CLINIC_NAME}` : `The Explorer's Guide | ${CLINIC_NAME} - Dental Health Blog`}</title>
        <meta name="description" content={selectedPost?.metaDescription || "Read our latest dental health tips, guides, and articles from the Seva Dental Team. Your path to a healthier smile starts here."} />
        <meta name="keywords" content={selectedPost?.keywords?.join(', ') || "dental blog, oral health tips, Seva Dental, Kolkata dentist, root canal myths, pediatric dentistry, dental implants"} />
      </Helmet>

      {/* Global Share Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-sm sm:max-w-md"
          >
            <div className="bg-gentle-green text-pure-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 sm:gap-4 backdrop-blur-md border border-white/20">
              <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span className="font-heading font-semibold text-sm sm:text-lg text-center">{t('blog.shareSuccess', { defaultValue: 'Sharing initiated successfully!' })}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="text-center max-w-5xl mx-auto px-2"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gentle-green mb-6 md:mb-8 tracking-tight">{t('blog.title', { defaultValue: "The Explorer's Guide" })}</h1>
        <p className="text-lg sm:text-xl md:text-3xl text-secondary-text font-body font-light max-w-3xl mx-auto leading-relaxed">
          {t('blog.subtitle', { defaultValue: 'Navigate your path to optimal oral health with insights, tips, and articles from our dental experts.' })}
        </p>
      </motion.section>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="max-w-4xl mx-auto relative z-20 space-y-6 md:space-y-8"
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-heading font-medium text-xs sm:text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gentle-green text-pure-white shadow-md'
                  : 'bg-pure-white/80 border border-gentle-green/20 text-secondary-text hover:bg-gentle-green/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative group mx-2 sm:mx-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-gentle-green/20 to-calm-blue/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <label htmlFor="search-blog" className="sr-only">{t('blog.searchPlaceholder', { defaultValue: 'Search articles...' })}</label>
          <input
            type="search"
            id="search-blog"
            placeholder={t('blog.searchPlaceholder', { defaultValue: 'Search articles...' })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative w-full px-6 py-4 sm:px-8 sm:py-5 bg-pure-white/80 backdrop-blur-md border border-gentle-green/20 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gentle-green/50 focus:border-transparent transition-all font-body text-base sm:text-xl text-primary-text placeholder-secondary-text/50"
          />
          <div className="absolute right-6 sm:right-8 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gentle-green/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} type="blog" />)
          ) : (
            filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.div key={post.id} variants={fadeUpVariant}>
                  <BlogPostCard post={post} onReadMore={openModalWithPost} />
                </motion.div>
              ))
            ) : (
              <motion.p variants={fadeUpVariant} className="text-center text-secondary-text text-lg sm:text-xl font-body font-light md:col-span-2 lg:col-span-3 py-10 sm:py-20">{t('blog.noArticlesFound', { defaultValue: 'No articles found matching your search.' })}</motion.p>
            )
          )}
        </div>
      </motion.section>

      {selectedPost && (
        <Modal isOpen={!!selectedPost} onClose={closeModal} title={selectedPost.title} size="3xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
            <div className="order-2 md:order-1">
              <p className="inline-block px-3 py-1 mb-4 sm:mb-6 bg-gentle-green/10 text-gentle-green text-xs sm:text-sm rounded-full font-heading font-semibold uppercase tracking-widest">
                {selectedPost.category}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gentle-green mb-4 leading-tight tracking-tight">
                {selectedPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-text mb-8 md:mb-10 font-body uppercase tracking-widest font-medium border-l-2 border-warm-coral pl-3">{t('blog.by', { defaultValue: 'By' })} <span className="text-primary-text">{selectedPost.author || 'Seva Dental Team'}</span> <span className="mx-2 sm:mx-3 text-gentle-green/30">•</span> {selectedPost.date}</p>
              
              <div className="prose prose-base sm:prose-lg md:prose-xl max-w-none font-body text-secondary-text leading-relaxed font-light prose-headings:font-heading prose-headings:text-[#1B3631] prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl sm:prose-h3:text-2xl prose-a:text-warm-coral hover:prose-a:text-gentle-green prose-a:transition-colors prose-strong:font-medium prose-strong:text-primary-text prose-blockquote:border-l-4 prose-blockquote:border-warm-coral prose-blockquote:bg-calm-blue/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:text-gentle-green prose-img:rounded-[1.5rem] prose-img:shadow-lg">
                <Markdown>{t(`blogPostsData.${selectedPost.id}.content`, { defaultValue: selectedPost.content })}</Markdown>
              </div>
              
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gentle-green/10">
                <p className="text-xs sm:text-sm font-heading font-semibold text-primary-text mb-3 md:mb-4 uppercase tracking-widest">{t('blog.shareThisAdventure', { defaultValue: 'Share this adventure' })}</p>
                <div className="flex space-x-3 sm:space-x-4">
                  <Tooltip text={t('blog.shareOnX', { defaultValue: 'Share on X' })}>
                    <button onClick={() => shareOnX(selectedPost)} className="group bg-pure-white border border-gentle-green/10 p-2 sm:p-3 rounded-full text-primary-text hover:bg-[#1DA1F2] hover:text-pure-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1" aria-label={t('blog.shareOnX', { defaultValue: 'Share on X' })}>
                      <XBrandIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                    </button>
                  </Tooltip>
                  <Tooltip text={t('blog.shareOnFacebook', { defaultValue: 'Share on Facebook' })}>
                    <button onClick={() => shareOnFacebook(selectedPost)} className="group bg-pure-white border border-gentle-green/10 p-2 sm:p-3 rounded-full text-primary-text hover:bg-[#4267B2] hover:text-pure-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1" aria-label={t('blog.shareOnFacebook', { defaultValue: 'Share on Facebook' })}>
                      <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                    </button>
                  </Tooltip>
                  <Tooltip text={t('blog.shareOnLinkedIn', { defaultValue: 'Share on LinkedIn' })}>
                    <button onClick={() => shareOnLinkedIn(selectedPost)} className="group bg-pure-white border border-gentle-green/10 p-2 sm:p-3 rounded-full text-primary-text hover:bg-[#0077B5] hover:text-pure-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1" aria-label={t('blog.shareOnLinkedIn', { defaultValue: 'Share on LinkedIn' })}>
                      <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="mt-8 md:mt-12 text-center md:text-left mb-6 md:mb-0">
                <Tooltip text={t('blog.closeArticleTooltip', { defaultValue: 'Close article' })} position="top">
                  <button 
                    onClick={closeModal}
                    className="w-full md:w-auto px-8 sm:px-10 py-3 sm:py-4 relative overflow-hidden bg-gentle-green text-pure-white rounded-full hover:bg-[#1B3631] transition-colors duration-500 font-heading font-semibold shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_12px_25px_rgba(27,54,49,0.4)] text-base sm:text-lg group"
                  >
                    <div className="absolute inset-0 bg-pure-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                    <span className="relative z-10">{t('blog.closeArticle', { defaultValue: 'Close Article' })}</span>
                  </button>
                </Tooltip>
              </div>
            </div>
            {selectedPost.image && (
              <div className="order-1 md:order-2 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(34,197,94,0.15)] border border-gentle-green/5 sticky top-8 group transform transition-transform duration-700 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-tr from-warm-coral/10 to-transparent mix-blend-overlay z-10"></div>
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto max-h-[400px] md:max-h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer"/>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogPage;