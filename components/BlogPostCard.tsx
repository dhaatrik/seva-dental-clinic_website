
import React, { useState, useRef, useEffect } from 'react';
import { BlogPost } from '../types';
import Button from './Button';
import { XBrandIcon, FacebookIcon, LinkedinIcon, CheckCircleIcon, ShareIcon } from './IconComponents';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';
import { useTranslation } from 'react-i18next';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onReadMore }) => {
  const { t } = useTranslation();
  const [showShareToast, setShowShareToast] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const shareUrl = `${window.location.origin}/blog?post=${post.id}`;
  const shareTitle = post.title;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShareFeedback = () => {
    setShowShareToast(true);
    setShowShareMenu(false);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const shareOnX = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    handleShareFeedback();
  };

  const shareOnFacebook = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    handleShareFeedback();
  };

  const shareOnLinkedIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    handleShareFeedback();
  };

  return (
    <div className="bg-pure-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gentle-green/10 flex flex-col h-full group transform hover:-translate-y-3 relative">
      {/* Share Feedback Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: '-50%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: '-50%', x: '-50%' }}
            className="absolute top-1/2 left-1/2 z-[60] px-4 pointer-events-none"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="bg-gentle-green text-pure-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md border border-white/20 whitespace-nowrap">
              <CheckCircleIcon className="w-5 h-5" />
              <span className="font-heading font-semibold text-sm">{t('blog.shareInitiated', { defaultValue: 'Sharing initiated!' })}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {post.image && (
        <div className="relative h-72 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-6 left-8 bg-warm-coral px-5 py-2 rounded-full text-xs font-bold text-primary-text uppercase tracking-widest shadow-lg">
            {post.date}
          </div>
        </div>
      )}
      <div className="p-10 flex-grow flex flex-col bg-pure-white relative z-10">
        <h3 className="text-3xl font-heading font-bold text-primary-text mb-6 group-hover:text-gentle-green transition-colors leading-[1.2] tracking-tight">
          {t(`blogPostsData.${post.id}.title`, { defaultValue: post.title })}
        </h3>
        <p className="text-secondary-text text-lg mb-10 font-body leading-relaxed flex-grow font-light">
          {t(`blogPostsData.${post.id}.excerpt`, { defaultValue: post.excerpt })}
        </p>
        <div className="mt-auto pt-10 border-t border-gentle-green/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gentle-green to-calm-blue flex items-center justify-center text-pure-white font-heading font-bold text-xl shadow-inner border border-white/20">
                {(post.author || 'S')[0]}
             </div>
             <div className="flex flex-col">
               <span className="text-xs text-secondary-text font-body uppercase tracking-widest opacity-60 font-bold">{t('blog.author', { defaultValue: 'Author' })}</span>
               <span className="text-base text-primary-text font-body font-semibold">{post.author || 'Seva Dental Team'}</span>
             </div>
          </div>
          
          <div className="flex space-x-4 w-full sm:w-auto relative" ref={menuRef}>
            <Tooltip text="Share Article" position="top">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowShareMenu(!showShareMenu); }}
                className="p-3 rounded-full border border-gentle-green/20 text-gentle-green hover:bg-calm-blue hover:border-calm-blue hover:text-pure-white transition-colors duration-300 shadow-sm"
                aria-label="Share"
              >
                <ShareIcon className="w-5 h-5" />
              </button>
            </Tooltip>
            
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full right-0 mb-3 bg-pure-white border border-gentle-green/10 shadow-2xl rounded-2xl p-2 flex space-x-2 z-50"
                  style={{ transformOrigin: 'bottom right' }}
                >
                  <Tooltip text={t('blog.shareOnX', { defaultValue: 'Share on X' })} position="top">
                    <button 
                      onClick={shareOnX} 
                      className="p-2 rounded-full text-blue-400 hover:bg-blue-50 hover:text-blue-500 hover:scale-110 transition-all duration-300"
                    >
                      <XBrandIcon className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip text={t('blog.shareOnFacebook', { defaultValue: 'Share on Facebook' })} position="top">
                    <button 
                      onClick={shareOnFacebook} 
                      className="p-2 rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:scale-110 transition-all duration-300"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip text={t('blog.shareOnLinkedIn', { defaultValue: 'Share on LinkedIn' })} position="top">
                    <button 
                      onClick={shareOnLinkedIn} 
                      className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:scale-110 transition-all duration-300"
                    >
                      <LinkedinIcon className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              onClick={() => onReadMore(post)} 
              variant="primary" 
              size="medium" 
              className="w-full sm:w-auto shadow-xl hover:shadow-2xl px-10"
            >
              {t('blog.readArticle', { defaultValue: 'Read Article' })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
