
import React, { useState } from 'react';
import { BlogPost } from '../types';
import Button from './Button';
import { XBrandIcon, FacebookIcon, LinkedinIcon, CheckCircleIcon } from './IconComponents';
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
  const shareUrl = `${window.location.origin}/blog?post=${post.id}`;
  const shareTitle = post.title;

  const handleShareFeedback = () => {
    setShowShareToast(true);
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
    <div className="bg-pure-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gentle-green/10 flex flex-col h-full group transform hover:-translate-y-3">
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
          
          {/* Social Share Overlay */}
          <div className="absolute top-6 right-6 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-6 group-hover:translate-x-0">
            <Tooltip text={t('blog.shareOnX', { defaultValue: 'Share on X' })} position="left">
              <button 
                onClick={shareOnX} 
                className="bg-pure-white/90 p-3 rounded-full text-primary-text hover:bg-warm-coral hover:text-pure-white hover:scale-110 transition-all shadow-xl backdrop-blur-sm" 
                aria-label={t('blog.shareOnX', { defaultValue: 'Share on X' })}
              >
                <XBrandIcon className="w-5 h-5" />
              </button>
            </Tooltip>
            <Tooltip text={t('blog.shareOnFacebook', { defaultValue: 'Share on Facebook' })} position="left">
              <button 
                onClick={shareOnFacebook} 
                className="bg-pure-white/90 p-3 rounded-full text-primary-text hover:bg-warm-coral hover:text-pure-white hover:scale-110 transition-all shadow-xl backdrop-blur-sm" 
                aria-label={t('blog.shareOnFacebook', { defaultValue: 'Share on Facebook' })}
              >
                <FacebookIcon className="w-5 h-5" />
              </button>
            </Tooltip>
            <Tooltip text={t('blog.shareOnLinkedIn', { defaultValue: 'Share on LinkedIn' })} position="left">
              <button 
                onClick={shareOnLinkedIn} 
                className="bg-pure-white/90 p-3 rounded-full text-primary-text hover:bg-warm-coral hover:text-pure-white hover:scale-110 transition-all shadow-xl backdrop-blur-sm" 
                aria-label={t('blog.shareOnLinkedIn', { defaultValue: 'Share on LinkedIn' })}
              >
                <LinkedinIcon className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>

          {/* Share Feedback Toast */}
          <AnimatePresence>
            {showShareToast && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-50 px-4"
              >
                <div className="bg-gentle-green text-pure-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md border border-white/20">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="font-heading font-semibold text-sm">{t('blog.shareInitiated', { defaultValue: 'Sharing initiated!' })}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
  );
};

export default BlogPostCard;
