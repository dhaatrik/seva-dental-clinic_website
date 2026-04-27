import { Service, Testimonial, BlogPost, QuizQuestion, SmileExplorerRank } from './types';
import { 
  ToothIcon, // Now HeartIconOutline
  CrownIcon, // Now ShieldCheckIconOutline
  SparkleIcon, // Now SparklesIconOutline
  ChildFriendlyIcon, // Now FaceSmileIconOutline
  DentureIcon // Now PuzzlePieceIconOutline
} from './components/IconComponents';

export const PHONE_NUMBER = "0000000000";
export const CLINIC_NAME = "Seva Dental";
export const CLINIC_ADDRESS = "00, XXX XXXXX, XXXXX-00000";
export const CLINIC_EMAIL = "contact@sevadental.com";
export const OPENING_HOURS = [
  "Monday - Friday: 9:00 AM - 6:00 PM",
  "Saturday: 10:00 AM - 4:00 PM",
  "Sunday: Closed"
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Transformations', path: '/transformations' },
  { name: 'Smile Quiz', path: '/smile-quiz' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Blog', path: '/blog' },
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'dental-exams',
    category: 'Preventive Care',
    name: 'Dental Exams',
    shortDescription: 'Comprehensive check-ups to maintain your oral health.',
    longDescription: 'Regular dental exams are crucial for preventing and detecting problems early. We conduct thorough examinations, including checks for cavities, gum disease, and other oral health issues, to keep your smile healthy.',
    icon: CrownIcon, // Using ShieldCheckIcon for its "check-up" feel
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Get a comprehensive dental exam at Seva Dental. We offer thorough check-ups for cavities, gum disease, and overall oral health in Kolkata.',
    keywords: ['dental exam', 'oral health check-up', 'dentist in Kolkata', 'preventive dentistry'],
    faqs: [
      { question: "How often should I get a dental exam?", answer: "For most people, a dental exam every six months is recommended to maintain optimal oral health and catch any issues early." },
      { question: "What happens during a dental exam?", answer: "During an exam, we gently clean your teeth, check for any signs of cavities or gum disease, and ensure your overall oral health is in great shape." },
      { question: "Will the dental exam hurt?", answer: "Not at all! Dental exams are completely painless and designed to make you feel comfortable while we assess your smile." }
    ]
  },
  {
    id: 'fillings',
    category: 'Restorative Care',
    name: 'Fillings',
    shortDescription: 'Durable fillings to restore teeth affected by decay.',
    longDescription: 'We use modern, tooth-colored composite materials to fill cavities, restoring the strength and appearance of your teeth. The procedure is quick, comfortable, and helps prevent further decay.',
    icon: ToothIcon, // Using HeartIcon for general tooth care
    image: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Restore your teeth with durable, tooth-colored fillings at Seva Dental. Safe and comfortable cavity treatment in Kolkata.',
    keywords: ['dental fillings', 'cavity treatment', 'tooth-colored fillings', 'restorative dentistry'],
    faqs: [
      { question: "How long do fillings last?", answer: "Tooth-colored composite fillings can last anywhere from 5 to 15 years depending on your oral hygiene and eating habits." },
      { question: "Is getting a filling painful?", answer: "Not at all. We use local anesthesia to ensure you are completely numb and comfortable during the entire procedure." }
    ]
  },
  {
    id: 'crownings',
    category: 'Restorative Care',
    name: 'Crownings',
    shortDescription: 'Custom crowns to protect and restore damaged teeth.',
    longDescription: 'A dental crown is a cap placed over a damaged tooth to restore its shape, size, strength, and appearance. We offer high-quality crowns that look and feel natural, protecting your tooth for years to come.',
    icon: CrownIcon, // ShieldCheckIcon is a good fit for protection
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Protect and restore damaged teeth with high-quality dental crowns at Seva Dental. Natural-looking results for a stronger smile.',
    keywords: ['dental crowns', 'tooth restoration', 'dental caps', 'Kolkata dentist'],
    faqs: [
      { question: "What are your crowns made of?", answer: "We offer several options, including porcelain, ceramic, and zirconia crowns, which provide a natural look and excellent durability." },
      { question: "Does getting a crown hurt?", answer: "No, we use local anesthesia to numb the area, ensuring the procedure is as comfortable as a routine filling." }
    ]
  },
  {
    id: 'bridges',
    category: 'Restorative Care',
    name: 'Bridges',
    shortDescription: 'Dental bridges to replace one or more missing teeth.',
    longDescription: 'A dental bridge "bridges" the gap created by one or more missing teeth. It consists of two or more crowns for the teeth on either side of the gap and a false tooth/teeth in between, restoring both function and aesthetics.',
    icon: DentureIcon, // PuzzlePieceIcon works well for fitting pieces together
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Replace missing teeth with custom dental bridges at Seva Dental. Restore your smile\'s function and aesthetics effectively.',
    keywords: ['dental bridges', 'missing teeth replacement', 'restorative dentistry Kolkata'],
    faqs: [
      { question: "How long does a dental bridge last?", answer: "With good oral hygiene and regular dental visits, a dental bridge can last up to 10-15 years or even longer." },
      { question: "Is it hard to clean a dental bridge?", answer: "We will show you exactly how to care for your bridge using specialized floss threaders or interdental brushes to keep it clean and healthy." }
    ]
  },
  {
    id: 'anterior-root-canals',
    category: 'Oral Surgery',
    name: 'Anterior Root Canals',
    shortDescription: 'Specialized root canal treatment for front teeth.',
    longDescription: 'We perform gentle and effective root canal therapy on anterior (front) teeth to save them from infection or decay. Our focus is on relieving pain and preserving your natural smile.',
    icon: ToothIcon, // HeartIcon is appropriate for saving a tooth
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Expert anterior root canal treatment at Seva Dental. Save your front teeth with gentle, effective therapy in Kolkata.',
    keywords: ['anterior root canal', 'root canal therapy', 'save natural tooth', 'Kolkata endodontics'],
    faqs: [
      { question: "Is an anterior root canal painful?", answer: "With modern techniques and gentle anesthesia, the procedure is completely comfortable and actually relieves the pain of an infected front tooth." },
      { question: "Why save the tooth instead of removing it?", answer: "Saving your natural tooth is always the best option. It maintains your natural smile and prevents issues like shifting teeth and bone loss." },
      { question: "How long does the root canal take?", answer: "Treating a front tooth is usually quite fast! Most anterior root canals are completed in just one comfortable visit." }
    ]
  },
  {
    id: 'tooth-extraction',
    category: 'Oral Surgery',
    name: 'Tooth Extraction',
    shortDescription: 'Safe and comfortable tooth removal when necessary.',
    longDescription: 'While we always aim to save natural teeth, sometimes an extraction is necessary for your overall oral health. We ensure the procedure is as comfortable and stress-free as possible.',
    icon: CrownIcon, // Using ShieldCheckIcon to imply a safe, professional procedure.
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Safe and stress-free tooth extraction at Seva Dental. Professional removal for your overall oral health in Kolkata.',
    keywords: ['tooth extraction', 'dental surgery', 'safe tooth removal', 'Kolkata dentist'],
    faqs: [
      { question: "What is the recovery time after a tooth extraction?", answer: "Most patients recover quickly within a few days. We provide detailed aftercare instructions to ensure a smooth, comfortable healing process." },
      { question: "Do you offer options for replacing the missing tooth?", answer: "Yes, we offer dental implants, bridges, and dentures as excellent replacement options once you have fully healed." }
    ]
  },
  {
    id: 'oral-implants',
    category: 'Oral Surgery',
    name: 'Oral Implants',
    shortDescription: 'A permanent solution for replacing missing teeth.',
    longDescription: 'Oral implants are the gold standard for replacing missing teeth. They provide a strong foundation for fixed or removable replacement teeth that are made to match your natural teeth, ensuring durability and a natural look.',
    icon: CrownIcon,
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Permanent solution for missing teeth with oral implants at Seva Dental. Durable, natural-looking implants in Kolkata.',
    keywords: ['oral implants', 'dental implants', 'permanent tooth replacement', 'implant dentistry Kolkata'],
    faqs: [
        { question: "How long do implants last?", answer: "With proper care and good oral hygiene, dental implants can last a lifetime." },
        { question: "Am I a candidate for implants?", answer: "Most people in good general and oral health are excellent candidates for dental implants." }
    ]
  },
  {
    id: 'scaling',
    category: 'Preventive Care',
    name: 'Scaling',
    shortDescription: 'Professional deep cleaning to remove plaque and tartar.',
    longDescription: 'Scaling is a deep cleaning procedure that goes below the gumline to remove built-up plaque and tartar. It\'s a key treatment for preventing and managing gum disease and keeping your gums healthy.',
    icon: SparkleIcon,
    image: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Professional dental scaling at Seva Dental. Deep cleaning to remove plaque and tartar for healthy gums and teeth.',
    keywords: ['dental scaling', 'teeth cleaning', 'plaque removal', 'gum health Kolkata'],
    faqs: [
      { question: "Is dental scaling necessary?", answer: "Yes, regular professional scaling removes hardened plaque (tartar) that regular brushing and flossing simply cannot remove." },
      { question: "Will scaling make my teeth sensitive?", answer: "You may experience slight sensitivity for a day or two after deep cleaning, but scaling ultimately improves your gum health and prevents long-term teeth sensitivity." }
    ]
  },
  {
    id: 'dentures',
    category: 'Restorative Care',
    name: 'Dentures',
    shortDescription: 'Custom-made dentures to restore your smile and function.',
    longDescription: 'We provide comfortable, natural-looking full and partial dentures to replace missing teeth, helping you to eat, speak, and smile with confidence again.',
    icon: DentureIcon,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop',
    metaDescription: 'Custom-made full and partial dentures at Seva Dental. Restore your smile and confidence with natural-looking dentures.',
    keywords: ['dentures', 'partial dentures', 'full dentures', 'tooth replacement Kolkata'],
    faqs: [
      { question: "Are dentures comfortable to wear?", answer: "Modern dentures are custom-fitted to your mouth, making them much more comfortable and natural-looking than before." },
      { question: "How should I clean my dentures?", answer: "We recommend brushing your dentures daily with a soft-bristled brush and soaking them in a gentle denture cleaner overnight." }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'priya-s',
    name: 'Priya S.',
    age: 32,
    quote: "I used to be so anxious about dental visits, but Seva Dental changed that for me. The team is so gentle and understanding. My 'Smile Adventure' has truly begun!",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'amit-k',
    name: 'Amit K.',
    age: 40,
    quote: "As a busy professional, I appreciate the efficiency and clarity at Seva Dental. Booking was easy, and Dr. K Bhattacharya explained everything about my implant procedure clearly. Highly recommend!",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'sunita-m',
    name: 'Sunita M.',
    age: 38,
    quote: "Finding a family dentist we trust was important. Seva Dental is fantastic with my kids. They actually look forward to their check-ups now!",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'mr-bose',
    name: 'Mr. Bose',
    age: 68,
    quote: "The information on dentures was very clear on their website, and the staff were very helpful in person. My new dentures fit perfectly. Thank you, Seva Dental.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'ranjit-d',
    name: 'Ranjit D.',
    age: 55,
    quote: "Best dental care in Kolkata! The doctors are highly skilled and the environment is very relaxing. My root canal was completely painless.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'ananya-c',
    name: 'Ananya C.',
    age: 26,
    quote: "I underwent a teeth whitening session here before my wedding. The results were phenomenal and the process was so quick and comfortable. Thank you!",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'sourav-g',
    name: 'Sourav G.',
    age: 45,
    quote: "Professional, clean, and patient-friendly. I've been bringing my whole family here for the past three years. We wouldn't go anywhere else.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'kritika-n',
    name: 'Kritika N.',
    age: 30,
    quote: "I was dreading getting a filling, but the dentist was exceptionally careful and kind. They numbed the area perfectly. I highly recommend Seva Dental.",
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'rahul-s',
    name: 'Rahul S.',
    age: 28,
    quote: "I had an emergency and Seva Dental accommodated me right away. Their prompt response and professional care saved my tooth. I'll forever be grateful to Dr. Bhattacharya and his team.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'meena-v',
    name: 'Meena V.',
    age: 51,
    quote: "Getting an implant was a daunting thought, but the detailed consultation put me entirely at ease. The procedure went wonderfully, and I now eat without any discomfort at all.",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'kabir-h',
    name: 'Kabir H.',
    age: 35,
    quote: "A modern clinic with highly sophisticated equipment. Every step of my alignment treatment using clear aligners was tracked meticulously. My smile has never looked better.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'sneha-p',
    name: 'Sneha P.',
    age: 24,
    quote: "The team is incredibly warm and friendly. They carefully explained the brushing and flossing techniques during my scaling, which really showed their dedication to preventive care.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'ankit-b',
    name: 'Ankit B.',
    age: 41,
    quote: "Seamless, hygienic, and thoroughly professional. Even a simple scale and polish was done with absolute precision. The ambience is incredibly soothing and welcoming.",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'radhika-j',
    name: 'Radhika J.',
    age: 33,
    quote: "My son used to cry at the very mention of a dentist, but the pediatric team here is phenomenal. He walked out smiling with a balloon and couldn't wait for his next visit.",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'deepak-c',
    name: 'Deepak C.',
    age: 62,
    quote: "I required extensive restorative work and the personalized care plan they made for me was exactly what I needed. They guided me at every step without any rush.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'tanya-r',
    name: 'Tanya R.',
    age: 29,
    quote: "The smile transformation was life-changing for me. The veneers look incredibly natural, and the doctor made sure everything was absolutely perfect before finishing.",
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'vikram-m',
    name: 'Vikram M.',
    age: 38,
    quote: "As someone who has traveled a lot, I can confidently say Seva Dental matches international standards. Their emphasis on sanitation and patient comfort is unparalleled.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'kavya-d',
    name: 'Kavya D.',
    age: 27,
    quote: "I appreciated how the dentist listened to my concerns regarding teeth sensitivity and customized the teeth whitening process for me. It was a completely painless adventure.",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'rohan-k',
    name: 'Rohan K.',
    age: 44,
    quote: "A wisdom tooth extraction sounded terrifying, but it was over before I even realized it. The post-op care instructions were clear and helpful. Fantastic team all around.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80'
  },
  {
    id: 'pallavi-s',
    name: 'Pallavi S.',
    age: 34,
    quote: "From the front desk staff to the doctors, every single person at Seva Dental makes you feel valued. The attention to detail during my bridge placement was brilliant.",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'root-canals-myths',
    title: 'Root Canal Treatment: 5 Common Myths Debunked by Experts',
    author: 'Seva Dental Team',
    date: 'October 26, 2023',
    category: 'Restorative Care',
    excerpt: 'Root canals have a scary reputation, but modern dentistry has made them a much more comfortable experience. Learn the truth about root canal therapy in Kolkata.',
    metaDescription: 'Myth vs. Reality: Discover the truth about root canal treatments. Learn why modern endodontics is a painless and safe way to save your natural teeth.',
    keywords: ['root canal myths', 'painless root canal', 'endodontics Kolkata', 'safe dental treatment', 'dental health tips', 'save natural tooth'],
    content: 'Myth 1: Root canals are extremely painful. Reality: With modern anesthesia and techniques, root canals are generally no more uncomfortable than getting a filling. The procedure actually relieves pain caused by infection. \n\nMyth 2: It’s better to pull a tooth than get a root canal. Reality: Saving your natural tooth is almost always the best option. Root canals preserve your tooth and prevent issues that can arise from missing teeth, like shifting of adjacent teeth or bone loss. \n\nMyth 3: Root canals cause illness. Reality: This is a debunked theory. There is no scientific evidence linking root canals to diseases elsewhere in the body. \n\nMyth 4: The benefits of a root canal are temporary. Reality: A successfully treated and restored tooth can last a lifetime with good oral hygiene. \n\nMyth 5: You only need a root canal if you have pain. Reality: Sometimes, an infected tooth may not cause pain, especially in the early stages. \n\n**The Procedure Explained:** \nYour "Root Canal Adventure" begins with thorough numbing of the area. We then create a small opening to access the infected pulp, clean the canals meticulously using specialized tools, and seal them with a biocompatible material. Finally, a crown is usually placed to restore the tooth\'s strength. \n\n**Post-Treatment Care:** \nAfter your treatment, avoid chewing on the treated tooth until it\'s fully restored with a crown. You might experience some mild sensitivity for a few days, which can be managed with over-the-counter pain relief. Stick to soft foods like yogurt, mashed potatoes, or soup for the first 24 hours to ensure a smooth recovery.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'childs-first-visit',
    title: 'Your Child\'s First Dental Visit: A Stress-Free Guide for Parents',
    author: 'Seva Dental Team',
    date: 'November 5, 2023',
    category: 'Pediatric Care',
    excerpt: 'A child\'s first dental visit is an important milestone. Discover how to make pediatric dentistry a positive experience for your little one.',
    metaDescription: 'Prepare for your child\'s first dental visit with our ultimate parent\'s guide. Make pediatric dentistry a fun, stress-free, and positive experience!',
    keywords: ['pediatric dentistry', 'first dental visit', 'kids dentist Kolkata', 'parenting dental tips', 'childrens oral health', 'stress-free dentist'],
    content: 'When to go: The American Academy of Pediatric Dentistry recommends the first visit by age 1 or within six months of the first tooth erupting. \n\nWhat to expect: The first visit is often short and informal. It’s mainly for your child to meet the dentist and get comfortable in the dental environment. The dentist might check your child’s existing teeth for decay, look at their bite, and check for any potential problems with the gums, jaw, and oral tissues. \n\n**Tips for a Fun "Smile Adventure":** \n1. **Role-Play at Home:** Use a stuffed animal to "play dentist." Let your child be the dentist and "count" the animal\'s teeth. \n2. **The "Tooth Fairy" Connection:** Frame the visit as a way to keep their teeth strong for the Tooth Fairy\'s collection! \n3. **Counting Teeth:** During the visit, we\'ll "count" their teeth together. It\'s a simple way to engage them without any pressure. \n4. **Small Rewards:** A sticker or a "bravery badge" after the visit can go a long way in creating a positive association. \n5. **Keep it Positive:** Avoid using words like "pain," "needle," or "drill." Instead, talk about "sparkly teeth" and "friendly tooth-helpers."',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'choosing-toothbrush',
    title: 'Choosing the Best Toothbrush: Manual vs. Electric – Which is Better?',
    author: 'Seva Dental Team',
    date: 'November 15, 2023',
    category: 'Hygiene',
    excerpt: 'With so many options, how do you pick the best toothbrush for your oral hygiene? We compare manual and electric toothbrushes to help you decide.',
    metaDescription: 'Manual vs. electric toothbrushes: which one should you buy? Read our comprehensive review to choose the best toothbrush for your daily oral hygiene routine.',
    keywords: ['manual vs electric toothbrush', 'best toothbrush 2024', 'oral hygiene tools', 'dental care tips', 'electric toothbrush benefits', 'proper brushing technique'],
    content: 'Choosing the right tool for your "Smile Adventure" is essential. Here\'s a breakdown of the two main contenders: \n\n**Manual Toothbrushes:** \n*   **Pros:** Inexpensive, highly portable, and widely available. You have complete control over the pressure. \n*   **Cons:** Requires more manual dexterity and effort to clean effectively. It\'s easy to brush too hard or not long enough. \n\n**Electric Toothbrushes:** \n*   **Pros:** Often feature built-in timers to ensure you brush for the full two minutes. Many have pressure sensors that alert you if you\'re pressing too hard. The oscillating or sonic vibrations do much of the work for you, often leading to better plaque removal. \n*   **Cons:** More expensive upfront, requires charging or batteries, and can be bulkier for travel. \n\n**Our Recommendation:** \nBoth can be effective if used correctly. However, if you struggle with brushing for the full two minutes or tend to brush too aggressively, an electric toothbrush might be your best ally. Look for the ADA Seal of Acceptance on whichever you choose!',
    image: 'https://images.unsplash.com/photo-1559591937-05555815615f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'importance-of-scaling',
    title: 'Why Professional Dental Scaling is Essential for Healthy Gums',
    author: 'Seva Dental Team',
    date: 'December 1, 2023',
    category: 'Prevention',
    excerpt: 'Professional scaling and cleaning remove stubborn tartar that regular brushing can\'t reach. Learn why it\'s vital for preventing gum disease.',
    metaDescription: 'Discover why professional dental scaling is critical to preventing gum disease. Learn the long-term benefits of deep teeth cleaning for your overall health.',
    keywords: ['dental scaling', 'gum disease prevention', 'oral hygiene', 'deep teeth cleaning', 'periodontitis prevention', 'Kolkata dental clinic'],
    content: 'Scaling is like a "deep clean" for your teeth\'s foundation. Even with perfect brushing, plaque can harden into tartar (calculus), which only a dental professional can remove. \n\n**The Long-Term Consequences of Neglect:** \nIgnoring the need for scaling can lead to gingivitis (inflamed gums) and eventually periodontitis. This isn\'t just about your mouth; untreated gum disease has serious long-term consequences: \n1. **Bone Loss:** Chronic infection can destroy the bone that supports your teeth, leading to tooth loss. \n2. **Systemic Health Links:** Research has linked gum disease to more serious conditions like heart disease, diabetes, and even respiratory issues. \n3. **Gum Recession:** As the infection progresses, your gums may pull away from your teeth, exposing sensitive roots. \n\n**The Solution:** \nRegular scaling every six months prevents these issues by removing the bacteria-laden tartar before it can cause lasting damage. It\'s a simple investment in your overall health!',
    image: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'dental-implants-benefits',
    title: 'Benefits of Dental Implants: The Permanent Solution for Missing Teeth',
    author: 'Seva Dental Team',
    date: 'December 10, 2023',
    category: 'Restorative Care',
    excerpt: 'Missing a tooth? Dental implants offer a natural-looking, durable, and permanent replacement. Discover the advantages of oral implants.',
    metaDescription: 'Explore the life-changing benefits of dental implants. A permanent, natural-looking, and durable solution for replacing missing teeth and restoring your smile.',
    keywords: ['dental implants benefits', 'missing teeth solution', 'implant dentistry', 'permanent tooth replacement', 'smile restoration', 'Kolkata dentist'],
    content: 'Dental implants are the "gold standard" for tooth replacement. They are small titanium posts that act as artificial tooth roots, providing a stable foundation for a custom-made crown. \n\n**Why Choose Implants?** \n1. **Natural Look and Feel:** They are designed to match your natural teeth perfectly, so you can smile with confidence. \n2. **Improved Quality of Life:** Unlike dentures, implants don\'t slip or click. You can eat your favorite foods—like crunchy apples or corn on the cob—without worry. \n3. **Preserves Facial Structure:** Implants stimulate the jawbone, preventing the "sunken" look that can occur after tooth loss. \n4. **Durability:** With proper care, implants can last a lifetime, making them a cost-effective long-term solution. \n\n**The Process:** \nIt\'s a multi-step journey that involves placing the implant, allowing it to fuse with the bone (osseointegration), and finally attaching the custom crown. While it takes time, the results are truly life-changing!',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'teeth-whitening-tips',
    title: '10 Simple Tips for a Brighter, Whiter Smile at Home',
    author: 'Seva Dental Team',
    date: 'December 20, 2023',
    category: 'Cosmetic Dentistry',
    excerpt: 'Want a sparkling smile? Follow these easy oral hygiene tips and lifestyle changes to maintain white teeth and prevent staining.',
    metaDescription: 'Achieve a sparkling smile with our top 10 simple and effective teeth whitening tips. Learn how to naturally maintain your teeth\'s bright whiteness at home.',
    keywords: ['teeth whitening tips', 'brighter smile', 'home dental care', 'remove teeth stains', 'natural teeth whitening', 'Seva Dental'],
    content: 'Maintaining a bright smile is a daily adventure! Here are 10 practical tips: \n\n1. **Brush Twice Daily:** Use fluoride toothpaste and brush for at least two minutes. Set a timer! \n2. **Floss Daily:** Plaque between teeth can make your smile look dull. \n3. **Limit Staining Foods:** Be mindful of coffee, tea, red wine, and dark berries. \n4. **Drink Through a Straw:** This helps bypass your front teeth when drinking staining liquids. \n5. **Quit Smoking:** Tobacco is a major cause of deep yellow staining. \n6. **Rinse After Eating:** A quick water rinse after meals helps wash away pigments. \n7. **Eat Crunchy Fruits and Veggies:** Apples, carrots, and celery act as natural "scrubbers." \n8. **Use Whitening Toothpaste:** These can help remove surface-level stains. \n9. **Stay Hydrated:** Water stimulates saliva, which naturally cleanses your mouth. \n10. **Regular Check-ups:** Professional cleanings at Seva Dental are the ultimate way to keep your smile truly sparkling! We can remove deep-set stains that home care can\'t reach.',
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