import React from 'react';
import {
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Smile,
  Puzzle,
  Heart,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  MessageCircle,
  Send,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Share2
} from 'lucide-react';

// Brand/Logo Icon
export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Smile {...props as any} />;

// Outline Icons for general use
export const ToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Heart {...props as any} />;
export const CrownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <ShieldCheck {...props as any} />;
export const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Sparkles {...props as any} />;
export const ChildFriendlyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Smile {...props as any} />;
export const DentureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Puzzle {...props as any} />;

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Menu {...props as any} />;
export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <X {...props as any} />;
export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <ChevronRight {...props as any} />;
export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <ArrowLeft {...props as any} />;
export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <ArrowRight {...props as any} />;

// Specific context icons
export const AboutPageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GraduationCap {...props as any} />;
export const ContactPageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <MessageSquare {...props as any} />;
export const NotFoundPageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <AlertTriangle {...props as any} />;
export const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <MapPin {...props as any} />;
export const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Phone {...props as any} />;
export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Mail {...props as any} />;
export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <CheckCircle2 {...props as any} />;
export const ExclamationTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <AlertTriangle {...props as any} />;
export const ChatBotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <MessageCircle {...props as any} />;
export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Send {...props as any} />;
export const ChatHeaderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Sparkles {...props as any} />;

// Social Icons
export const XBrandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);
export const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Twitter {...props as any} />;
export const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Instagram {...props as any} />;
export const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Facebook {...props as any} />;
export const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Linkedin {...props as any} />;
export const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Share2 {...props as any} />;
