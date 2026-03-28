# 🦷 Seva Dental Clinic - Your Smile Adventure

Welcome to the **Seva Dental Clinic** web application! 

This project is a modern, welcoming, and responsive website designed to demystify dental care. We call it a "Smile Adventure" because we believe looking after your teeth should be a positive journey, not a scary chore.

One of the coolest features is the **AI-Powered Smile Quiz**, which uses Google's Gemini API to give patients personalized advice based on their habits.

---

## ✨ Features

- **📱 Fully Responsive**: Looks amazing on mobile phones, tablets, and desktop computers.
- **📝 Interactive Smile Quiz**: A fun way for users to assess their oral health.
- **🤖 AI Integration**: Uses **Google Gemini** to analyze quiz results and generate personalized, encouraging tips.
- **💬 Smile Guide Chatbot**: A friendly AI assistant to answer questions about the clinic and services.
- **🏥 Detailed Service Pages**: Clear explanations of dental procedures.
- **🎨 Modern Design**: Built with a calming color palette (Calm Blue, Gentle Green, Warm Coral) to reduce anxiety.

---

## 🛠️ Technology Stack

This project is built using modern web technologies that are powerful yet easy to learn:

- **Frontend Library**: [React](https://react.dev/) (v19) - For building the user interface components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - For rapid and beautiful styling directly in your markup.
- **Routing**: [React Router](https://reactrouter.com/) - For navigation between pages.
- **Artificial Intelligence**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) - To talk to the Gemini models.
- **Icons**: [Heroicons](https://heroicons.com/) - For clean, professional SVG icons.

---

## 🚀 Getting Started

### 1. Prerequisites
To run this project fully, you need an **API Key** for the AI features.

### 2. Setting up the API Key (Important!)
The "Smile Quiz" and "Chatbot" rely on the Google Gemini API. Without a key, these features won't work, although the rest of the site will function fine.

1.  Visit [Google AI Studio](https://aistudio.google.com/).
2.  Create a free API Key.
3.  Set this key in your environment variables as `API_KEY`.
    *   *If you are using a cloud IDE or container:* Look for the "Environment Variables" or "Secrets" settings.
    *   *If running locally:* You would typically use a `.env` file, but in this specific setup, ensure `process.env.API_KEY` is accessible.

### 3. Google Maps (Optional)
To see the map on the Contact page:
1.  Get a Google Maps JavaScript API Key.
2.  Set it as `GOOGLE_MAPS_API_KEY` in your environment.

---

## 📁 Project Structure

Here is a quick map of the files so you know where to find things:

```text
.
├── components/          # 🧩 Building blocks (Buttons, Cards, Modals)
├── pages/               # 📄 Full pages (Home, About, Services)
├── services/            # 🔌 Connection to external services (Gemini API)
├── App.tsx              # 🚦 Main App component & Routing setup
├── constants.ts         # 📝 TEXT & DATA (Change clinic info here!)
├── types.ts             # 🏷️ TypeScript definitions (Data structures)
└── index.html           # 🌐 The main HTML file & Tailwind Config
```

---

## 🎨 How to Customize

Want to make this site your own? Here are the easiest ways to tweak it:

### Change Text & Data
Go to `constants.ts`. Here you can easily update:
- Clinic Name & Address
- Phone Numbers & Emails
- Service Descriptions
- Testimonials
- Quiz Questions

### Change Colors
Go to `index.html`. Inside the `<script>` tag for Tailwind config, you'll find the color palette:
```js
colors: {
  'calm-blue': '#E0F7FA',
  'gentle-green': '#A5D6A7',
  'trustworthy-white': '#FFFFFF',
  'warm-coral': '#FFAB91',
  ...
}
```
Change these hex codes to match your brand!

---

## 🤝 Contributing

We welcome contributions! If you have ideas on how to make the "Smile Adventure" even better, feel free to fork the project and submit a pull request.

---

*Built with ❤️ and a bright smile.*
