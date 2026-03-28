
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
  const [showShareToast, setShowShareToast] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    return BLOG_POSTS_DATA.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
    <div className="py-20 max-w-7xl mx-auto px-6 space-y-24">
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
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-4"
          >
            <div className="bg-gentle-green text-pure-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 backdrop-blur-md border border-white/20">
              <CheckCircleIcon className="w-6 h-6" />
              <span className="font-heading font-semibold text-lg">{t('blog.shareSuccess', { defaultValue: 'Sharing initiated successfully!' })}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="text-center max-w-5xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gentle-green mb-8 tracking-tight">{t('blog.title', { defaultValue: "The Explorer's Guide" })}</h1>
        <p className="text-xl md:text-3xl text-secondary-text font-body font-light max-w-3xl mx-auto leading-relaxed">
          {t('blog.subtitle', { defaultValue: 'Navigate your path to optimal oral health with insights, tips, and articles from our dental experts.' })}
        </p>
      </motion.section>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="max-w-3xl mx-auto relative z-20"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gentle-green/20 to-calm-blue/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <label htmlFor="search-blog" className="sr-only">{t('blog.searchPlaceholder', { defaultValue: 'Search articles...' })}</label>
          <input
            type="search"
            id="search-blog"
            placeholder={t('blog.searchPlaceholder', { defaultValue: 'Search articles...' })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative w-full px-8 py-5 bg-pure-white/80 backdrop-blur-md border border-gentle-green/20 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gentle-green/50 focus:border-transparent transition-all font-body text-xl text-primary-text placeholder-secondary-text/50"
          />
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <svg className="w-6 h-6 text-gentle-green/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
              <motion.p variants={fadeUpVariant} className="text-center text-secondary-text text-xl font-body font-light md:col-span-2 lg:col-span-3 py-20">{t('blog.noArticlesFound', { defaultValue: 'No articles found matching your search.' })}</motion.p>
            )
          )}
        </div>
      </motion.section>

      {selectedPost && (
        <Modal isOpen={!!selectedPost} onClose={closeModal} title={selectedPost.title} size="3xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="order-2 md:order-1">
              <p className="text-sm text-secondary-text mb-8 font-body uppercase tracking-widest font-medium">{t('blog.by', { defaultValue: 'By' })} {selectedPost.author || 'Seva Dental Team'} <span className="mx-3 text-gentle-green/30">•</span> {selectedPost.date}</p>
              <div className="prose prose-lg max-w-none font-body text-secondary-text leading-relaxed font-light prose-headings:font-heading prose-headings:text-gentle-green prose-a:text-warm-coral prose-strong:font-semibold prose-strong:text-primary-text">
                <Markdown>{t(`blogPostsData.${selectedPost.id}.content`, { defaultValue: selectedPost.content })}</Markdown>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gentle-green/10">
                <p className="text-sm font-heading font-semibold text-primary-text mb-4 uppercase tracking-widest">{t('blog.shareThisAdventure', { defaultValue: 'Share this adventure' })}</p>
                <div className="flex space-x-4">
                  <Tooltip text={t('blog.shareOnX', { defaultValue: 'Share on X' })}>
                    <button onClick={() => shareOnX(selectedPost)} className="bg-pure-white border border-gentle-green/20 p-3 rounded-full text-primary-text hover:bg-warm-coral hover:text-pure-white transition-all shadow-sm" aria-label={t('blog.shareOnX', { defaultValue: 'Share on X' })}>
                      <XBrandIcon className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip text={t('blog.shareOnFacebook', { defaultValue: 'Share on Facebook' })}>
                    <button onClick={() => shareOnFacebook(selectedPost)} className="bg-pure-white border border-gentle-green/20 p-3 rounded-full text-primary-text hover:bg-warm-coral hover:text-pure-white transition-all shadow-sm" aria-label={t('blog.shareOnFacebook', { defaultValue: 'Share on Facebook' })}>
                      <FacebookIcon className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip text={t('blog.shareOnLinkedIn', { defaultValue: 'Share on LinkedIn' })}>
                    <button onClick={() => shareOnLinkedIn(selectedPost)} className="bg-pure-white border border-gentle-green/20 p-3 rounded-full text-primary-text hover:bg-warm-coral hover:text-pure-white transition-all shadow-sm" aria-label={t('blog.shareOnLinkedIn', { defaultValue: 'Share on LinkedIn' })}>
                      <LinkedinIcon className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="mt-12 text-right">
                <Tooltip text={t('blog.closeArticleTooltip', { defaultValue: 'Close article' })} position="left">
                  <button 
                    onClick={closeModal}
                    className="px-10 py-4 bg-gentle-green text-pure-white rounded-full hover:bg-green-700 transition-colors font-heading font-semibold shadow-lg hover:shadow-xl text-lg"
                  >
                    {t('blog.closeArticle', { defaultValue: 'Close Article' })}
                  </button>
                </Tooltip>
              </div>
            </div>
            {selectedPost.image && (
              <div className="order-1 md:order-2 rounded-[2rem] overflow-hidden shadow-2xl border border-gentle-green/10">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto max-h-[600px] object-cover" referrerPolicy="no-referrer"/>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogPage;