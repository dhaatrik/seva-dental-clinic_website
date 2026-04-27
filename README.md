# 🦷 Seva Dental Clinic Website — Your Smile Adventure

Welcome to the **Seva Dental Clinic Website**, a modern, interactive, and patient-centric web application designed to transform routine dental care into an engaging "Smile Adventure." 

This project aims to solve the common problem of dental anxiety and lack of patient engagement by providing an intuitive digital storefront for a dental clinic. It leverages interactive features, personalized AI-driven guidance, and a premium aesthetic to build trust, educate patients, and simplify the appointment booking process. 

**Why these technologies?** React 19 and Vite were chosen for their unparalleled performance and developer experience. Tailwind CSS allows for rapid, custom UI development that feels premium without the bloat of traditional CSS frameworks. Framer Motion and Lenis provide the cinematic, smooth scrolling and animations that elevate the user experience. Finally, the integration of Google's Gemini AI transforms a static brochure site into an intelligent platform that dynamically interacts with the user.

[![MIT License](https://img.shields.io/badge/License-MIT-forestgreen.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-skyblue.svg)](https://tailwindcss.com/)

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Installation & Requirements](#-installation--requirements)
- [💡 Usage Instructions & Customization](#-usage-instructions--customization)
- [🧪 Testing Instructions](#-testing-instructions)
- [🤝 Contribution Guidelines](#-contribution-guidelines)
- [📄 License Information](#-license-information)
- [👨‍💻 Author](#-author)

---

## ✨ Key Features

- **🤖 AI-Powered Smile Quiz**: An interactive "Smile Score Challenge" using the Gemini AI model to analyze habits and provide personalized oral health tips.
- **💬 Smile Guide Chatbot**: A friendly AI assistant integrated with clinic data to answer patient inquiries in real-time.
- **🌍 Multi-Language Support**: Seamlessly switch between English, Hindi, and Bengali (i18next).
- **🎨 Premium UX/UI**: Smooth scrolling (Lenis), fluid animations (Framer Motion), and custom cursors for a tactile interface.
- **📱 Fully Responsive**: Optimized across all devices.

---

## 🛠️ Technologies Used

### Core Stack
- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### Styling & Animation
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Heroicons](https://heroicons.com/)

### AI & Utilities
- **AI Integration**: [Google Gemini AI](https://ai.google.dev/) via `@google/genai`
- **Internationalization**: [i18next](https://www.i18next.com/)
- **Testing Engine**: [Vitest](https://vitest.dev/)

---

## 🚀 Installation & Requirements

To get the project running locally on your machine, follow these simple steps.

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **API Key**: A Gemini API key is required for the AI Quiz and Chatbot features.

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhaatrik/seva-dental-clinic_website.git
   cd seva-dental-clinic_website
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and add your required API keys:
   ```env
   # Required for Quiz & Chatbot
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Optional: Google Maps API Key for the Contact page
   GOOGLE_MAPS_API_KEY=your_google_maps_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` in your browser.

---

## 💡 Usage Instructions & Customization

The application is designed to be highly customizable for different clinics or personal branding. 

### Customizing Clinic Data
You can modify the core textual data, services, and quiz questions by editing the `constants.ts` file. 

```typescript
// Example from constants.ts
export const CLINIC_NAME = "Seva Dental Clinic";
export const PHONE_NUMBER = "+91 98765 43210";
```

### Modifying the Branding Theme
Visual identity colors are defined directly inside `index.html` within the Tailwind configuration script. To swap out the primary palette, edit the `theme.extend.colors` object:

```html
<!-- Example from index.html -->
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'gentle-green': '#1A362D', /* Primary */
          'warm-coral': '#D4AF37',   /* Accent */
          'calm-blue': '#F0EBE1',    /* Background */
        }
      }
    }
  }
</script>
```

---

## 🧪 Testing Instructions

This project includes an automated test suite powered by **Vitest** and **React Testing Library** to ensure component reliability and code quality. 

To run the complete test suite locally:
```bash
npm run test
```

This will spin up Vitest in the terminal, execute the 26+ component and page integration tests, and output a detailed pass/fail report. Keeping tests passing is essential when submitting pull requests!

---

## 🤝 Contribution Guidelines

We warmly welcome contributions from the community—whether it's fixing a bug, suggesting a feature, or improving documentation.

Please read our [**Contributing Guide**](CONTRIBUTING.md) for detailed instructions on how to submit issues, propose changes, and open Pull Requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License Information

This project is open-source and distributed under the **MIT License**. 

You are free to use, modify, and distribute this software, provided that the original copyright notice and permission notice are included in all copies or substantial portions of the software. See the `LICENSE` file for more details.

---

## 👨‍💻 Author

**Dhaatrik Chowdhury**

---

*Built with ❤️ to bring more smiles to the world.*