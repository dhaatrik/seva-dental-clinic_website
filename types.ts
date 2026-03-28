import React from 'react';

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  faqs?: { question: string; answer: string }[];
  image?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  age?: number; // Optional, for personas
  quote: string;
  image?: string; // Placeholder for patient photo
}

export interface BlogPost {
  id: string;
  title: string;
  author?: string;
  date: string;
  excerpt: string;
  content: string; // Can be simple text or basic HTML markup
  image?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    feedback?: string; // Specific feedback for choosing this option
  }[];
}

export interface QuizResult {
  score: number;
  rank: SmileExplorerRank;
  badgeUrl?: string; // URL or path to a badge image
  genericTips: string[];
  personalizedTips?: string; // From Gemini
  answerFeedback?: { question: string; feedback: string; score: number }[];
}

export enum SmileExplorerRank {
  NOVICE_NAVIGATOR = "Novice Navigator",
  ADEPT_ADVENTURER = "Adept Adventurer",
  GUARDIAN_OF_THE_GUMS = "Guardian of the Gums",
}