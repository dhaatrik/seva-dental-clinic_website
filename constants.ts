import { Service, Testimonial, BlogPost, QuizQuestion, SmileExplorerRank } from './types';
import { 
  ToothIcon, // Now HeartIconOutline
  CrownIcon, // Now ShieldCheckIconOutline
  SparkleIcon, // Now SparklesIconOutline
  ChildFriendlyIcon, // Now FaceSmileIconOutline
  DentureIcon // Now PuzzlePieceIconOutline
} from './components/IconComponents';

export const PHONE_NUMBER = "0000000000";
export const CLINIC_NAME = "Seva Dental Clinic";
export const CLINIC_ADDRESS = "8, Pulin Ave, Manikpur, Rajbari, Dum Dum, Kolkata, West Bengal 700079";
export const CLINIC_EMAIL = "contact@sevadental.com";
export const OPENING_HOURS = [
  "Monday - Friday: 9:00 AM - 6:00 PM",
  "Saturday: 10:00 AM - 4:00 PM",
  "Sunday: Closed"
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Smile Quiz', path: '/smile-quiz' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Blog', path: '/blog' },
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'dental-exams',
    name: 'Dental Exams',
    shortDescription: 'Comprehensive check-ups to maintain your oral health.',
    longDescription: 'Regular dental exams are crucial for preventing and detecting problems early. We conduct thorough examinations, including checks for cavities, gum disease, and other oral health issues, to keep your smile healthy.',
    icon: CrownIcon, // Using ShieldCheckIcon for its "check-up" feel
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Get a comprehensive dental exam at Seva Dental Clinic. We offer thorough check-ups for cavities, gum disease, and overall oral health in Kolkata.',
    keywords: ['dental exam', 'oral health check-up', 'dentist in Kolkata', 'preventive dentistry'],
    faqs: [
      { question: "How often should I get a dental exam?", answer: "For most people, a dental exam every six months is recommended to maintain optimal oral health." },
      { question: "What happens during a dental exam?", answer: "During an exam, we will clean your teeth and check for any signs of cavities, gum disease, oral cancer, and other potential issues." }
    ]
  },
  {
    id: 'fillings',
    name: 'Fillings',
    shortDescription: 'Durable fillings to restore teeth affected by decay.',
    longDescription: 'We use modern, tooth-colored composite materials to fill cavities, restoring the strength and appearance of your teeth. The procedure is quick, comfortable, and helps prevent further decay.',
    icon: ToothIcon, // Using HeartIcon for general tooth care
    image: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Restore your teeth with durable, tooth-colored fillings at Seva Dental Clinic. Safe and comfortable cavity treatment in Kolkata.',
    keywords: ['dental fillings', 'cavity treatment', 'tooth-colored fillings', 'restorative dentistry'],
  },
  {
    id: 'crownings',
    name: 'Crownings',
    shortDescription: 'Custom crowns to protect and restore damaged teeth.',
    longDescription: 'A dental crown is a cap placed over a damaged tooth to restore its shape, size, strength, and appearance. We offer high-quality crowns that look and feel natural, protecting your tooth for years to come.',
    icon: CrownIcon, // ShieldCheckIcon is a good fit for protection
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Protect and restore damaged teeth with high-quality dental crowns at Seva Dental Clinic. Natural-looking results for a stronger smile.',
    keywords: ['dental crowns', 'tooth restoration', 'dental caps', 'Kolkata dentist'],
  },
    {
    id: 'bridges',
    name: 'Bridges',
    shortDescription: 'Dental bridges to replace one or more missing teeth.',
    longDescription: 'A dental bridge "bridges" the gap created by one or more missing teeth. It consists of two or more crowns for the teeth on either side of the gap and a false tooth/teeth in between, restoring both function and aesthetics.',
    icon: DentureIcon, // PuzzlePieceIcon works well for fitting pieces together
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Replace missing teeth with custom dental bridges at Seva Dental Clinic. Restore your smile\'s function and aesthetics effectively.',
    keywords: ['dental bridges', 'missing teeth replacement', 'restorative dentistry Kolkata'],
  },
  {
    id: 'anterior-root-canals',
    name: 'Anterior Root Canals',
    shortDescription: 'Specialized root canal treatment for front teeth.',
    longDescription: 'We perform gentle and effective root canal therapy on anterior (front) teeth to save them from infection or decay. Our focus is on relieving pain and preserving your natural smile.',
    icon: ToothIcon, // HeartIcon is appropriate for saving a tooth
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Expert anterior root canal treatment at Seva Dental Clinic. Save your front teeth with gentle, effective therapy in Kolkata.',
    keywords: ['anterior root canal', 'root canal therapy', 'save natural tooth', 'Kolkata endodontics'],
    faqs: [
      { question: "Is a root canal painful?", answer: "With modern techniques and anesthesia, the procedure is typically comfortable and relieves the pain of an infected tooth." },
      { question: "Why save the tooth?", answer: "Saving your natural tooth is always the best option, preventing issues like shifting teeth and bone loss." }
    ]
  },
  {
    id: 'tooth-extraction',
    name: 'Tooth Extraction',
    shortDescription: 'Safe and comfortable tooth removal when necessary.',
    longDescription: 'While we always aim to save natural teeth, sometimes an extraction is necessary for your overall oral health. We ensure the procedure is as comfortable and stress-free as possible.',
    icon: CrownIcon, // Using ShieldCheckIcon to imply a safe, professional procedure.
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Safe and stress-free tooth extraction at Seva Dental Clinic. Professional removal for your overall oral health in Kolkata.',
    keywords: ['tooth extraction', 'dental surgery', 'safe tooth removal', 'Kolkata dentist'],
  },
  {
    id: 'oral-implants',
    name: 'Oral Implants',
    shortDescription: 'A permanent solution for replacing missing teeth.',
    longDescription: 'Oral implants are the gold standard for replacing missing teeth. They provide a strong foundation for fixed or removable replacement teeth that are made to match your natural teeth, ensuring durability and a natural look.',
    icon: CrownIcon,
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Permanent solution for missing teeth with oral implants at Seva Dental Clinic. Durable, natural-looking implants in Kolkata.',
    keywords: ['oral implants', 'dental implants', 'permanent tooth replacement', 'implant dentistry Kolkata'],
    faqs: [
        { question: "How long do implants last?", answer: "With proper care and good oral hygiene, dental implants can last a lifetime." },
        { question: "Am I a candidate for implants?", answer: "Most people in good general and oral health are excellent candidates for dental implants." }
    ]
  },
  {
    id: 'scaling',
    name: 'Scaling',
    shortDescription: 'Professional deep cleaning to remove plaque and tartar.',
    longDescription: 'Scaling is a deep cleaning procedure that goes below the gumline to remove built-up plaque and tartar. It\'s a key treatment for preventing and managing gum disease and keeping your gums healthy.',
    icon: SparkleIcon,
    image: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Professional dental scaling at Seva Dental Clinic. Deep cleaning to remove plaque and tartar for healthy gums and teeth.',
    keywords: ['dental scaling', 'teeth cleaning', 'plaque removal', 'gum health Kolkata'],
  },
  {
    id: 'dentures',
    name: 'Denture',
    shortDescription: 'Custom-made dentures to restore your smile and function.',
    longDescription: 'We provide comfortable, natural-looking full and partial dentures to replace missing teeth, helping you to eat, speak, and smile with confidence again.',
    icon: DentureIcon,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Custom-made full and partial dentures at Seva Dental Clinic. Restore your smile and confidence with natural-looking dentures.',
    keywords: ['dentures', 'partial dentures', 'full dentures', 'tooth replacement Kolkata'],
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'priya-s',
    name: 'Priya S.',
    age: 32,
    quote: "I used to be so anxious about dental visits, but Seva Dental Clinic changed that for me. The team is so gentle and understanding. My 'Smile Adventure' has truly begun!",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'amit-k',
    name: 'Amit K.',
    age: 40,
    quote: "As a busy professional, I appreciate the efficiency and clarity at Seva Dental. Booking was easy, and Dr. Bhattacharya explained everything about my implant procedure clearly. Highly recommend!",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'sunita-m',
    name: 'Sunita M.',
    age: 38,
    quote: "Finding a family dentist we trust was important. Seva Dental is fantastic with my kids. They actually look forward to their check-ups now!",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'mr-bose',
    name: 'Mr. Bose',
    age: 68,
    quote: "The information on dentures was very clear on their website, and the staff were very helpful in person. My new dentures fit perfectly. Thank you, Seva Dental Clinic.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'root-canals-myths',
    title: 'Root Canal Treatment: 5 Common Myths Debunked by Experts',
    author: 'Seva Dental Team',
    date: 'October 26, 2023',
    excerpt: 'Root canals have a scary reputation, but modern dentistry has made them a much more comfortable experience. Learn the truth about root canal therapy in Kolkata.',
    metaDescription: 'Debunking 5 common root canal myths. Learn why root canal treatment is a safe, effective, and comfortable way to save your natural teeth.',
    keywords: ['root canal myths', 'painless root canal', 'endodontics Kolkata', 'dental health tips'],
    content: 'Myth 1: Root canals are extremely painful. Reality: With modern anesthesia and techniques, root canals are generally no more uncomfortable than getting a filling. The procedure actually relieves pain caused by infection. \n\nMyth 2: It’s better to pull a tooth than get a root canal. Reality: Saving your natural tooth is almost always the best option. Root canals preserve your tooth and prevent issues that can arise from missing teeth, like shifting of adjacent teeth or bone loss. \n\nMyth 3: Root canals cause illness. Reality: This is a debunked theory. There is no scientific evidence linking root canals to diseases elsewhere in the body. \n\nMyth 4: The benefits of a root canal are temporary. Reality: A successfully treated and restored tooth can last a lifetime with good oral hygiene. \n\nMyth 5: You only need a root canal if you have pain. Reality: Sometimes, an infected tooth may not cause pain, especially in the early stages. \n\n**The Procedure Explained:** \nYour "Root Canal Adventure" begins with thorough numbing of the area. We then create a small opening to access the infected pulp, clean the canals meticulously using specialized tools, and seal them with a biocompatible material. Finally, a crown is usually placed to restore the tooth\'s strength. \n\n**Post-Treatment Care:** \nAfter your treatment, avoid chewing on the treated tooth until it\'s fully restored with a crown. You might experience some mild sensitivity for a few days, which can be managed with over-the-counter pain relief. Stick to soft foods like yogurt, mashed potatoes, or soup for the first 24 hours to ensure a smooth recovery.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'childs-first-visit',
    title: 'Your Child\'s First Dental Visit: A Stress-Free Guide for Parents',
    author: 'Seva Dental Team',
    date: 'November 5, 2023',
    excerpt: 'A child\'s first dental visit is an important milestone. Discover how to make pediatric dentistry a positive experience for your little one.',
    metaDescription: 'A comprehensive guide for parents on their child\'s first dental visit. Tips for a stress-free and positive pediatric dentistry experience.',
    keywords: ['pediatric dentistry', 'first dental visit', 'kids dentist Kolkata', 'parenting tips'],
    content: 'When to go: The American Academy of Pediatric Dentistry recommends the first visit by age 1 or within six months of the first tooth erupting. \n\nWhat to expect: The first visit is often short and informal. It’s mainly for your child to meet the dentist and get comfortable in the dental environment. The dentist might check your child’s existing teeth for decay, look at their bite, and check for any potential problems with the gums, jaw, and oral tissues. \n\n**Tips for a Fun "Smile Adventure":** \n1. **Role-Play at Home:** Use a stuffed animal to "play dentist." Let your child be the dentist and "count" the animal\'s teeth. \n2. **The "Tooth Fairy" Connection:** Frame the visit as a way to keep their teeth strong for the Tooth Fairy\'s collection! \n3. **Counting Teeth:** During the visit, we\'ll "count" their teeth together. It\'s a simple way to engage them without any pressure. \n4. **Small Rewards:** A sticker or a "bravery badge" after the visit can go a long way in creating a positive association. \n5. **Keep it Positive:** Avoid using words like "pain," "needle," or "drill." Instead, talk about "sparkly teeth" and "friendly tooth-helpers."',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'choosing-toothbrush',
    title: 'Choosing the Best Toothbrush: Manual vs. Electric – Which is Better?',
    author: 'Seva Dental Team',
    date: 'November 15, 2023',
    excerpt: 'With so many options, how do you pick the best toothbrush for your oral hygiene? We compare manual and electric toothbrushes to help you decide.',
    metaDescription: 'Manual vs. electric toothbrushes: which is better for you? A detailed comparison to help you choose the best tool for your oral hygiene.',
    keywords: ['manual vs electric toothbrush', 'best toothbrush', 'oral hygiene tools', 'dental care tips'],
    content: 'Choosing the right tool for your "Smile Adventure" is essential. Here\'s a breakdown of the two main contenders: \n\n**Manual Toothbrushes:** \n*   **Pros:** Inexpensive, highly portable, and widely available. You have complete control over the pressure. \n*   **Cons:** Requires more manual dexterity and effort to clean effectively. It\'s easy to brush too hard or not long enough. \n\n**Electric Toothbrushes:** \n*   **Pros:** Often feature built-in timers to ensure you brush for the full two minutes. Many have pressure sensors that alert you if you\'re pressing too hard. The oscillating or sonic vibrations do much of the work for you, often leading to better plaque removal. \n*   **Cons:** More expensive upfront, requires charging or batteries, and can be bulkier for travel. \n\n**Our Recommendation:** \nBoth can be effective if used correctly. However, if you struggle with brushing for the full two minutes or tend to brush too aggressively, an electric toothbrush might be your best ally. Look for the ADA Seal of Acceptance on whichever you choose!',
    image: 'https://images.unsplash.com/photo-1559591937-05555815615f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'importance-of-scaling',
    title: 'Why Professional Dental Scaling is Essential for Healthy Gums',
    author: 'Seva Dental Team',
    date: 'December 1, 2023',
    excerpt: 'Professional scaling and cleaning remove stubborn tartar that regular brushing can\'t reach. Learn why it\'s vital for preventing gum disease.',
    metaDescription: 'Why professional dental scaling is crucial for preventing gum disease and maintaining overall health. Learn about the benefits of deep cleaning.',
    keywords: ['dental scaling', 'gum disease prevention', 'oral hygiene', 'Kolkata dental clinic'],
    content: 'Scaling is like a "deep clean" for your teeth\'s foundation. Even with perfect brushing, plaque can harden into tartar (calculus), which only a dental professional can remove. \n\n**The Long-Term Consequences of Neglect:** \nIgnoring the need for scaling can lead to gingivitis (inflamed gums) and eventually periodontitis. This isn\'t just about your mouth; untreated gum disease has serious long-term consequences: \n1. **Bone Loss:** Chronic infection can destroy the bone that supports your teeth, leading to tooth loss. \n2. **Systemic Health Links:** Research has linked gum disease to more serious conditions like heart disease, diabetes, and even respiratory issues. \n3. **Gum Recession:** As the infection progresses, your gums may pull away from your teeth, exposing sensitive roots. \n\n**The Solution:** \nRegular scaling every six months prevents these issues by removing the bacteria-laden tartar before it can cause lasting damage. It\'s a simple investment in your overall health!',
    image: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'dental-implants-benefits',
    title: 'Benefits of Dental Implants: The Permanent Solution for Missing Teeth',
    author: 'Seva Dental Team',
    date: 'December 10, 2023',
    excerpt: 'Missing a tooth? Dental implants offer a natural-looking, durable, and permanent replacement. Discover the advantages of oral implants.',
    metaDescription: 'Discover the life-changing benefits of dental implants. A permanent, natural-looking solution for missing teeth that improves quality of life.',
    keywords: ['dental implants benefits', 'missing teeth solution', 'implant dentistry', 'Kolkata dentist'],
    content: 'Dental implants are the "gold standard" for tooth replacement. They are small titanium posts that act as artificial tooth roots, providing a stable foundation for a custom-made crown. \n\n**Why Choose Implants?** \n1. **Natural Look and Feel:** They are designed to match your natural teeth perfectly, so you can smile with confidence. \n2. **Improved Quality of Life:** Unlike dentures, implants don\'t slip or click. You can eat your favorite foods—like crunchy apples or corn on the cob—without worry. \n3. **Preserves Facial Structure:** Implants stimulate the jawbone, preventing the "sunken" look that can occur after tooth loss. \n4. **Durability:** With proper care, implants can last a lifetime, making them a cost-effective long-term solution. \n\n**The Process:** \nIt\'s a multi-step journey that involves placing the implant, allowing it to fuse with the bone (osseointegration), and finally attaching the custom crown. While it takes time, the results are truly life-changing!',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'teeth-whitening-tips',
    title: '10 Simple Tips for a Brighter, Whiter Smile at Home',
    author: 'Seva Dental Team',
    date: 'December 20, 2023',
    excerpt: 'Want a sparkling smile? Follow these easy oral hygiene tips and lifestyle changes to maintain white teeth and prevent staining.',
    metaDescription: '10 simple and effective tips for a brighter, whiter smile at home. Learn how to maintain your teeth\'s natural whiteness.',
    keywords: ['teeth whitening tips', 'brighter smile', 'home dental care', 'Seva Dental Clinic'],
    content: 'Maintaining a bright smile is a daily adventure! Here are 10 practical tips: \n\n1. **Brush Twice Daily:** Use fluoride toothpaste and brush for at least two minutes. Set a timer! \n2. **Floss Daily:** Plaque between teeth can make your smile look dull. \n3. **Limit Staining Foods:** Be mindful of coffee, tea, red wine, and dark berries. \n4. **Drink Through a Straw:** This helps bypass your front teeth when drinking staining liquids. \n5. **Quit Smoking:** Tobacco is a major cause of deep yellow staining. \n6. **Rinse After Eating:** A quick water rinse after meals helps wash away pigments. \n7. **Eat Crunchy Fruits and Veggies:** Apples, carrots, and celery act as natural "scrubbers." \n8. **Use Whitening Toothpaste:** These can help remove surface-level stains. \n9. **Stay Hydrated:** Water stimulates saliva, which naturally cleanses your mouth. \n10. **Regular Check-ups:** Professional cleanings at Seva Dental Clinic are the ultimate way to keep your smile truly sparkling! We can remove deep-set stains that home care can\'t reach.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "How often do you typically brush your teeth?",
    options: [
      { text: "Twice a day, or more!", score: 3, feedback: "Excellent habit!" },
      { text: "Once a day", score: 1, feedback: "Good start, aiming for twice is even better!" },
      { text: "Less than once a day", score: 0, feedback: "Brushing regularly is key to a healthy smile." }
    ]
  },
  {
    id: 2,
    text: "How often do you floss?",
    options: [
      { text: "Daily", score: 3, feedback: "Fantastic! Flossing is crucial." },
      { text: "A few times a week", score: 2, feedback: "Great effort! Daily flossing makes a big difference." },
      { text: "Rarely or never", score: 0, feedback: "Flossing helps prevent cavities and gum disease. We can show you easy ways!" }
    ]
  },
  {
    id: 3,
    text: "What's your go-to drink during the day (besides water)?",
    options: [
      { text: "Mainly water, sometimes unsweetened tea/coffee", score: 3, feedback: "Smart choices for your teeth!" },
      { text: "Juices or milk", score: 2, feedback: "These can have natural sugars; moderation is good." },
      { text: "Sugary sodas, energy drinks, or sweetened coffee/tea", score: 0, feedback: "Frequent sugary drinks can increase cavity risk." }
    ]
  },
  {
    id: 4,
    text: "Do your gums ever bleed when you brush or floss?",
    options: [
      { text: "Never", score: 3, feedback: "Healthy gums are happy gums!" },
      { text: "Sometimes", score: 1, feedback: "Occasional bleeding can be a sign to check in with us." },
      { text: "Often", score: 0, feedback: "Frequent bleeding is a sign your gums need attention. We can help!" }
    ]
  },
  {
    id: 5,
    text: "How long has it been since your last dental check-up?",
    options: [
      { text: "Within the last 6-12 months", score: 3, feedback: "Great job staying on top of your check-ups!" },
      { text: "More than a year ago", score: 1, feedback: "Regular check-ups are important. It might be time to book!" },
      { text: "I can't remember / It's been several years", score: 0, feedback: "It's never too late to start your smile adventure! We're here to help." }
    ]
  }
];

export const SMILE_SCORE_RANKS_CONFIG = {
  [SmileExplorerRank.NOVICE_NAVIGATOR]: {
    minScore: 0,
    maxScore: 5,
    badgeUrl: '/badges/novice_navigator_badge.png', // Placeholder
    genericTips: [
      "Great start on your adventure! Every step counts.",
      "Focusing a bit more on daily flossing can make a huge difference. We can show you the easiest way!",
      "Try to brush for a full two minutes, twice a day.",
      "Consider swapping one sugary drink a day for water."
    ]
  },
  [SmileExplorerRank.ADEPT_ADVENTURER]: {
    minScore: 6,
    maxScore: 10,
    badgeUrl: '/badges/adept_adventurer_badge.png', // Placeholder
    genericTips: [
      "You're well on your way to a super smile!",
      "Keep up the good work with brushing and flossing.",
      "Remember regular check-ups to maintain your great progress.",
      "Explore sugar-free alternatives for snacks and drinks."
    ]
  },
  [SmileExplorerRank.GUARDIAN_OF_THE_GUMS]: {
    minScore: 11,
    maxScore: 15, // Max possible score for 5 questions, 3 points each
    badgeUrl: '/badges/guardian_of_gums_badge.png', // Placeholder
    genericTips: [
      "You're a true Guardian of the Gums! Fantastic work!",
      "Your habits are setting you up for lifelong oral health.",
      "For your next challenge, consider a professional polish to make your smile truly sparkle.",
      "Share your smile secrets with friends and family!"
    ]
  }
};