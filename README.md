# 🦷 Seva Dental Clinic — Your Smile Adventure

Welcome to **Seva Dental Clinic**, a modern, patient-centric web application designed to transform dental care into a positive, empowering "Smile Adventure." Built with cutting-edge web technologies and integrated with Google's Gemini AI, this platform demystifies oral health through interactive experiences and personalized guidance.

[![MIT License](https://img.shields.io/badge/License-MIT-forestgreen.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-skyblue.svg)](https://tailwindcss.com/)

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [📁 Project Structure](#-project-structure)
- [🎨 Customization & Branding](#-customization--branding)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

- **🤖 AI-Powered Smile Quiz**: An interactive "Smile Score Challenge" that uses **Google Gemini AI** to analyze oral health habits and provide personalized, encouraging tips.
- **💬 Smile Guide Chatbot**: A friendly AI assistant integrated with the clinic's service data to answer patient inquiries in real-time.
- **🌍 Multi-Language Support**: Seamlessly switch between **English, Hindi, and Bengali** to cater to a diverse patient base.
- **🎨 Premium UX/UI**: 
  - **Smooth Scrolling**: Powered by `Lenis` for a cinematic feel.
  - **Fluid Animations**: High-performance transitions using `Framer Motion`.
  - **Custom Cursor & Noise Overlay**: Subtle design touches for a modern, tactile interface.
- **📱 Fully Responsive**: Optimized for every device, from mobile to ultra-wide desktops.
- **🏥 Comprehensive Service Pages**: Detailed information on treatments from routine check-ups to advanced implants.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **State & Logic**: Functional components with Hooks

### Styling & Animation
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom palette: Forest Green, Champagne Gold, Soft Beige)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Heroicons](https://heroicons.com/)

### Artificial Intelligence
- **LLM**: [Google Gemini 1.5 Flash](https://ai.google.dev/) via `@google/genai` SDK

### Utilities
- **Internationalization**: [i18next](https://www.i18next.com/)
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Google AI Studio API Key**: Required for AI features (Quiz & Chatbot)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DhaatuTheGamer/seva-dental-clinic_website.git
   cd seva-dental-clinic_website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

### Environment Configuration

Create a `.env` file in the root directory and add your API keys:

```env
# Google Gemini API Key
API_KEY=your_gemini_api_key_here

# Google Maps API Key (Optional, for Contact page)
GOOGLE_MAPS_API_KEY=your_google_maps_key_here
```

---

## 📁 Project Structure

```text
.
├── components/          # 🧩 Reusable UI components (Buttons, Cards, AI Chat)
├── locales/             # 🌐 Translation files (en.json, hi.json, bn.json)
├── pages/               # 📄 Application views (Home, Quiz, Services, etc.)
├── services/            # 🔌 External API integrations (Gemini SDK)
├── constants.ts         # 📝 Centralized data (Clinic info, Quiz questions)
├── types.ts             # 🏷️ TypeScript interfaces and enums
├── App.tsx              # 🚦 Root component & Navigation setup
├── index.html           # 🌐 HTML entry point & Tailwind configuration
└── index.tsx            # 🚀 React entry point
```

---

## 🎨 Customization & Branding

### Update Clinic Information
Modify `constants.ts` to update clinic name, contact details, opening hours, and service descriptions.

### Branding & Colors
The visual identity is defined in the `tailwind.config` section of `index.html`. You can easily swap the primary palette:
- `gentle-green`: `#1A362D` (Primary brand color)
- `warm-coral`: `#D4AF37` (Accent gold)
- `calm-blue`: `#F0EBE1` (Soft background)

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. **Fork** the repository.
2. **Create** a new branch (`git checkout -b feature/AmazingFeature`).
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the branch (`git push origin feature/AmazingFeature`).
5. **Open** a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

*Built with ❤️ to bring more smiles to the world.*
