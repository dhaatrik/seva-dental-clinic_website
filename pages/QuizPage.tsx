
import React, { useState, useEffect, useCallback } from 'react';
import { QUIZ_QUESTIONS, SMILE_SCORE_RANKS_CONFIG } from '../constants';
import { QuizQuestion, QuizResult, SmileExplorerRank } from '../types';
import Button from '../components/Button';
import { getPersonalizedTips } from '../services/geminiService';
import { SparkleIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, ExclamationTriangleIcon } from '../components/IconComponents';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

const Badge: React.FC<{ rank: SmileExplorerRank }> = ({ rank }) => {
    const rankColors: Record<SmileExplorerRank, { bg: string, text: string }> = {
        [SmileExplorerRank.NOVICE_NAVIGATOR]: { bg: 'bg-warm-coral/90', text: 'text-pure-white' },
        [SmileExplorerRank.ADEPT_ADVENTURER]: { bg: 'bg-gentle-green/90', text: 'text-pure-white' },
        [SmileExplorerRank.GUARDIAN_OF_THE_GUMS]: { bg: 'bg-gentle-green', text: 'text-warm-coral' },
    };
    const { bg, text } = rankColors[rank];
    const initials = rank.split(' ').map(n => n[0]).join('');

    return (
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.8 }}
          className={`w-40 h-40 mx-auto rounded-full border-8 border-pure-white p-2 flex items-center justify-center ${bg} shadow-2xl relative`}
        >
            <div className="absolute inset-0 rounded-full border border-pure-white/20 m-2"></div>
            <span className={`font-heading font-bold text-6xl ${text} drop-shadow-md tracking-tighter`}>{initials}</span>
        </motion.div>
    )
}

const QuizPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loadingTips, setLoadingTips] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = score;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 500); // Slightly longer delay for premium feel
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
     if (typeof answers[currentQuestionIndex] === 'number' && currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
       setCurrentQuestionIndex(currentQuestionIndex + 1);
     } else if (typeof answers[currentQuestionIndex] === 'number' && currentQuestionIndex === QUIZ_QUESTIONS.length - 1) {
       finishQuiz(answers);
     }
  };

  const getRank = useCallback((totalScore: number): SmileExplorerRank => {
    if (totalScore <= SMILE_SCORE_RANKS_CONFIG[SmileExplorerRank.NOVICE_NAVIGATOR].maxScore) return SmileExplorerRank.NOVICE_NAVIGATOR;
    if (totalScore <= SMILE_SCORE_RANKS_CONFIG[SmileExplorerRank.ADEPT_ADVENTURER].maxScore) return SmileExplorerRank.ADEPT_ADVENTURER;
    return SmileExplorerRank.GUARDIAN_OF_THE_GUMS;
  }, []);

  const getAnswerSummary = useCallback((currentAnswers: number[]): string[] => {
    const summary: string[] = [];
    currentAnswers.forEach((score, index) => {
      const question = QUIZ_QUESTIONS[index];
      const selectedOptionIndex = question.options.findIndex(opt => opt.score === score);
      const selectedOption = question.options[selectedOptionIndex];
      if (selectedOption && selectedOption.score < 2) { 
        const feedback = t(`quiz.questions.${question.id}.options.${selectedOptionIndex}.feedback`, { defaultValue: selectedOption.feedback });
        const questionText = t(`quiz.questions.${question.id}.text`, { defaultValue: question.text });
        summary.push(feedback || `Response to question: "${questionText.substring(0,30)}..." (score: ${selectedOption.score}) indicated room for improvement.`);
      }
    });
    return summary;
  }, [t]);

  const finishQuiz = useCallback(async (finalAnswers: number[]) => {
    if (finalAnswers.length < QUIZ_QUESTIONS.length) return;
    const totalScore = finalAnswers.reduce((sum, score) => sum + score, 0);
    const rank = getRank(totalScore);
    const rankConfig = SMILE_SCORE_RANKS_CONFIG[rank];
    
    const answerFeedback = QUIZ_QUESTIONS.map((question, index) => {
      const selectedScore = finalAnswers[index];
      const selectedOptionIndex = question.options.findIndex(opt => opt.score === selectedScore);
      const selectedOption = question.options[selectedOptionIndex];
      return {
        question: t(`quiz.questions.${question.id}.text`, { defaultValue: question.text }),
        feedback: selectedOption ? t(`quiz.questions.${question.id}.options.${selectedOptionIndex}.feedback`, { defaultValue: selectedOption.feedback }) : t('quiz.noFeedback', { defaultValue: "No specific feedback provided." }),
        score: selectedScore,
      };
    });

    setQuizCompleted(true);
    setLoadingTips(true);
    setError(null);

    const translatedGenericTips = rankConfig.genericTips.map((tip, index) => 
      t(`quiz.ranks.${rank}.genericTips.${index}`, { defaultValue: tip })
    );

    const initialResult: QuizResult = {
      score: totalScore,
      rank: rank,
      badgeUrl: rankConfig.badgeUrl,
      genericTips: translatedGenericTips,
      answerFeedback,
    };
    setResult(initialResult);

    try {
      const summary = getAnswerSummary(finalAnswers);
      const tips = await getPersonalizedTips(rank, totalScore, summary);
      setResult(prevResult => prevResult ? { ...prevResult, personalizedTips: tips || undefined } : null);
    } catch (e) {
      console.error("Quiz page Gemini error:", e);
      setError("Failed to load personalized tips.");
      setResult(prevResult => prevResult ? { ...prevResult, personalizedTips: t('quiz.errorLoadingTips', { defaultValue: "Could not load personalized tips due to an error." }) } : null);
    } finally {
      setLoadingTips(false);
    }
  }, [getRank, getAnswerSummary, t]); 

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizCompleted(false);
    setResult(null);
    setLoadingTips(false);
    setError(null);
  };

  useEffect(() => {
    if (quizCompleted && answers.length < QUIZ_QUESTIONS.length && !result) {
        if (answers.length === QUIZ_QUESTIONS.length && !loadingTips && !result) {
        }
    }
  }, [quizCompleted, answers, result, loadingTips, finishQuiz]);

  if (quizCompleted && result) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-12 md:py-20 bg-pure-white p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden max-w-5xl mx-auto border border-gentle-green/5 relative"
        role="main"
        aria-live="polite"
      >
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-calm-blue/30 to-transparent -z-10"></div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-16">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <SparkleIcon className="w-8 h-8 sm:w-12 sm:h-12 text-warm-coral" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gentle-green tracking-tight">{t('quiz.completedTitle', { defaultValue: 'Quiz Completed!' })}</h2>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-lg sm:text-xl text-secondary-text font-body font-light">{t('quiz.yourScore', { defaultValue: 'Your Smile Score:' })} <span className="font-semibold text-gentle-green text-xl sm:text-2xl">{result.score} / {QUIZ_QUESTIONS.length * 3}</span></p>
                <p className="text-2xl sm:text-3xl md:text-4xl text-warm-coral font-bold tracking-tight uppercase">{result.rank}</p>
              </div>
            </motion.div>
          </div>
          
          <div className="flex justify-center order-1 lg:order-2">
            <Badge rank={result.rank} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-left space-y-6 p-6 sm:p-8 bg-calm-blue/10 rounded-[1.5rem] sm:rounded-[2rem] border border-calm-blue/20 h-full"
          >
            <h3 className="text-xl sm:text-2xl font-heading font-semibold text-gentle-green tracking-tight flex items-center">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-gentle-green text-pure-white rounded-full flex flex-shrink-0 items-center justify-center text-xs sm:text-sm mr-3">01</span>
              {t('quiz.tipsTitle', { defaultValue: 'Tips for your adventure' })}
            </h3>
            <ul className="space-y-3 font-body text-secondary-text text-base sm:text-lg font-light">
              {result.genericTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-warm-coral mr-2 mt-1 sm:mt-1.5">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
            {loadingTips && (
               <div className="flex items-center space-x-3 sm:space-x-4 italic text-secondary-text mt-6 bg-pure-white/50 p-3 sm:p-4 rounded-xl">
                  <LoadingSpinner size="small" />
                  <span className="text-sm sm:text-base">{t('quiz.consultingGuide', { defaultValue: 'Consulting your Smile Guide...' })}</span>
              </div>
            )}
            {error && <p className="text-warm-coral mt-4 text-sm">{error}</p>}
            {result.personalizedTips && !loadingTips && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-6 pt-6 border-t border-gentle-green/10"
              >
                <h4 className="font-semibold text-gentle-green text-lg sm:text-xl mb-3 sm:mb-4 tracking-tight">{t('quiz.personalizedForYou', { defaultValue: 'Personalized for You:' })}</h4>
                <div className="markdown-body font-body text-secondary-text leading-relaxed text-sm sm:text-base font-light italic">
                  <Markdown>{result.personalizedTips}</Markdown>
                </div>
              </motion.div>
            )}
          </motion.div>

          {result.answerFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-left space-y-4 sm:space-y-6 h-full mt-4 lg:mt-0"
            >
              <h3 className="text-xl sm:text-2xl font-heading font-semibold text-gentle-green tracking-tight flex items-center px-1">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-warm-coral text-primary-text rounded-full flex flex-shrink-0 items-center justify-center text-xs sm:text-sm mr-3">02</span>
                {t('quiz.breakdownTitle', { defaultValue: 'Adventure Breakdown' })}
              </h3>
              <ul className="space-y-3 sm:space-y-4 font-body text-secondary-text">
                {result.answerFeedback.map((item, index) => (
                  <li key={index} className={`p-3 sm:p-4 flex items-start space-x-3 sm:space-x-4 rounded-xl sm:rounded-2xl border transition-all hover:shadow-sm ${item.score > 1 ? 'border-gentle-green/10 bg-gentle-green/5' : 'border-warm-coral/10 bg-warm-coral/5'}`}>
                    {item.score > 1 ? (
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gentle-green flex-shrink-0 mt-0.5 sm:mt-1" aria-label="Positive habit" />
                    ) : (
                      <ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-warm-coral flex-shrink-0 mt-0.5 sm:mt-1" aria-label="Area for improvement" />
                    )}
                    <div>
                      <p className="font-semibold text-primary-text text-sm sm:text-base leading-tight mb-1">{item.question}</p>
                      <p className="italic text-xs sm:text-sm font-light leading-snug">"{item.feedback}"</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gentle-green/10 text-center"
        >
            <p className="text-secondary-text mb-6 sm:mb-8 font-body text-lg sm:text-xl font-light italic px-2">{t('quiz.questAccepted', { defaultValue: '"Quest Accepted! Your Smile Adventure continues."' })}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button onClick={restartQuiz} variant="outline" size="large" className="w-full sm:w-auto px-10" tooltip={t('quiz.retakeTooltip', { defaultValue: 'Start the quiz from the beginning' })}>{t('quiz.retakeQuiz', { defaultValue: 'Retake Quiz' })}</Button>
                <Button to="/contact" variant="primary" size="large" className="w-full sm:w-auto px-10 shadow-xl hover:shadow-2xl" tooltip={t('quiz.bookTooltip', { defaultValue: 'Book your consultation based on your results' })}>{t('quiz.bookAppointment', { defaultValue: 'Book an Appointment' })}</Button>
            </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="py-16 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-gentle-green mb-4 md:mb-6 tracking-tight">{t('quiz.challengeTitle', { defaultValue: 'Smile Score Challenge' })}</h1>
        <p className="text-lg sm:text-xl text-secondary-text font-body font-light px-2">{t('quiz.challengeSubtitle', { defaultValue: 'Answer these questions to discover your Smile Explorer Rank!' })}</p>
      </div>
      
      <div className="bg-pure-white p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gentle-green/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-calm-blue/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="mb-8 md:mb-12 relative z-10">
            <div className="flex justify-between items-end mb-3 md:mb-4">
              <span className="text-xs sm:text-sm font-bold text-gentle-green uppercase tracking-widest">{t('quiz.progress', { defaultValue: 'Progress' })}</span>
              <span className="text-sm sm:text-base text-secondary-text font-body font-medium" aria-live="polite">{currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="w-full bg-calm-blue/30 rounded-full h-2 sm:h-3 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-warm-coral to-gentle-green h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    aria-valuenow={((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                    aria-label={`Quiz progress: question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}`}
                ></div>
            </div>
        </div>

        <div className="relative min-h-[400px] sm:min-h-[350px] z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 w-full"
            >
              <fieldset>
                  <legend className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-gentle-green mb-6 md:mb-10 sr-only">Quiz Question: {t(`quiz.questions.${currentQuestion.id}.text`, { defaultValue: currentQuestion.text })}</legend>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-gentle-green mb-6 md:mb-10 leading-tight tracking-tight px-1" aria-hidden="true">{t(`quiz.questions.${currentQuestion.id}.text`, { defaultValue: currentQuestion.text })}</p>
                  <div className="space-y-4 sm:space-y-5">
                  {currentQuestion.options.map((option, index) => (
                      <button
                      key={option.text}
                      onClick={() => handleAnswer(option.score)}
                      className={`w-full text-left p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] border-2 transition-all duration-300 font-body text-base sm:text-lg md:text-xl
                          ${answers[currentQuestionIndex] === option.score 
                          ? 'bg-gentle-green border-gentle-green text-pure-white shadow-xl transform scale-[1.02]' 
                          : 'bg-pure-white border-calm-blue/50 hover:border-gentle-green/50 hover:bg-calm-blue/10 text-primary-text focus:ring-4 focus:ring-gentle-green/20 focus:outline-none'}
                      `}
                      aria-pressed={answers[currentQuestionIndex] === option.score}
                      >
                      {t(`quiz.questions.${currentQuestion.id}.options.${index}.text`, { defaultValue: option.text })}
                      {answers[currentQuestionIndex] === option.score && <span className="sr-only">(Selected)</span>}
                      </button>
                  ))}
                  </div>
              </fieldset>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-12 sm:mt-16 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center relative z-10 pt-6 sm:pt-8 border-t border-calm-blue/30 gap-4 sm:gap-0">
            <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline" size="medium" className="border-gentle-green/20 hover:border-gentle-green/50 w-full sm:w-auto" tooltip={t('quiz.previousTooltip', { defaultValue: 'Go back to the previous question' })}>
                <ArrowLeftIcon className="w-5 h-5 mr-2 sm:mr-3 inline"/> {t('quiz.previous', { defaultValue: 'Previous' })}
            </Button>
            {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                <Button onClick={handleNext} disabled={typeof answers[currentQuestionIndex] === 'undefined'} variant="primary" size="medium" className="shadow-md hover:shadow-lg w-full sm:w-auto" tooltip={t('quiz.nextTooltip', { defaultValue: 'Proceed to the next question' })}>
                    {t('quiz.next', { defaultValue: 'Next' })} <ArrowRightIcon className="w-5 h-5 ml-2 sm:ml-3 inline"/>
                </Button>
            ) : (
                 <Button onClick={() => finishQuiz(answers)} disabled={typeof answers[currentQuestionIndex] === 'undefined'} variant="primary" size="medium" className="shadow-md hover:shadow-lg w-full sm:w-auto" tooltip={t('quiz.finishTooltip', { defaultValue: 'Calculate your smile score' })}>
                    {t('quiz.finishQuiz', { defaultValue: 'Finish Quiz' })} <SparkleIcon className="w-5 h-5 ml-2 sm:ml-3 inline"/>
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;