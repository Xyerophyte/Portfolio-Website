# 🚀 Harsh Chavan - Portfolio Website

A modern, interactive portfolio website built with **Next.js 14**, featuring advanced animations, custom cursor effects, and a beautiful bento grid layout.

**🌐 Live Demo**: [harshchavan.vercel.app](https://harshchavan.vercel.app)

---

## ✨ Features

### 🎯 **Interactive Elements**
- **Custom TargetCursor** - Unique cursor with corner brackets and animations
- **Interactive Bento Grid** - Hover effects, magnetism, and particle animations
- **Smooth Animations** - GSAP-powered transitions and effects
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### 🎨 **Modern UI/UX**
- **Bento Grid Layout** - Modern card-based design
- **Dark Theme** - Elegant dark mode with accent colors
- **Typography Animations** - Decrypted text effects and typing animations
- **Scroll Reveal** - Elements animate as you scroll
- **Dock Navigation** - macOS-style dock with hover effects

### 📱 **Technical Features**
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GSAP Animations** - Professional-grade animations
- **Framer Motion** - Smooth component transitions
- **Contact Form** - Functional email system with Resend API

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components

### **Animations & Effects**
- **GSAP** - Professional animation library
- **Framer Motion** - React animation library
- **Custom TargetCursor** - Interactive cursor with corner brackets
- **Particle Effects** - Dynamic background animations

### **Deployment & Hosting**
- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and collaboration

---

## 🎮 Interactive Features

### **TargetCursor**
- Custom cursor with animated corner brackets
- Hover effects on interactive elements
- Smooth transitions and parallax effects
- Completely hides default browser cursor

### **Magic Bento Grid**
- Interactive card layout with hover effects
- Particle animations and magnetism
- Border glow and spotlight effects
- Responsive grid system

### **Contact Form**
- Functional email system
- Form validation with React Hook Form
- Zod schema validation
- Resend API integration

---

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── target-cursor.tsx # Custom cursor
│   ├── magic-bento.tsx   # Interactive grid
│   ├── dock.tsx          # Navigation dock
│   └── ...               # Other components
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- pnpm (recommended) or npm

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Xyerophyte/Portfolio-Website.git
   cd Portfolio-Website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### **Build for Production**
```bash
pnpm build
pnpm start
```

---

## 🎯 Key Components

### **TargetCursor**
Custom interactive cursor with corner brackets and smooth animations.

```tsx
import TargetCursor from "@/components/target-cursor";

<TargetCursor 
  spinDuration={2} 
  hideDefaultCursor={true} 
  targetSelector=".cursor-target" 
/>
```

### **Magic Bento Grid**
Interactive card layout with hover effects and animations.

```tsx
import MagicBento from "@/components/magic-bento";

<MagicBento 
  items={portfolioItems}
  enableBorderGlow={true}
  enableMagnetism={true}
/>
```

### **Contact Form**
Functional contact form with validation and email integration.

```tsx
import ContactForm from "@/components/contact-form";

<ContactForm />
```

---

## 🌟 Features in Detail

### **🎨 Design System**
- **Color Palette**: Dark theme with accent colors
- **Typography**: Modern fonts with animations
- **Spacing**: Consistent design tokens
- **Components**: Reusable UI components

### **⚡ Performance**
- **Static Generation** - Fast page loads
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic bundle optimization
- **Lazy Loading** - Components load on demand

### **📱 Responsive Design**
- **Mobile First** - Optimized for all screen sizes
- **Touch Friendly** - Interactive elements work on touch devices
- **Progressive Enhancement** - Works without JavaScript

### **🔧 Developer Experience**
- **TypeScript** - Type safety and IntelliSense
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Hot Reload** - Fast development feedback

---

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain configuration available

### **Other Platforms**
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting for static sites
- **AWS Amplify** - Full-stack deployment

---

## 📧 Contact Setup

The contact form uses Resend API for email functionality. To set up:

1. **Get Resend API Key** - Sign up at [resend.com](https://resend.com)
2. **Add Environment Variables**:
   ```env
   RESEND_API_KEY=your_api_key_here
   ```
3. **Configure Email Templates** - Edit `lib/email-templates.ts`

See `CONTACT_SETUP.md` for detailed instructions.

---

## 🎯 Future Enhancements

### **Planned Features**
- [ ] **Theme Toggle** - Light/Dark mode switch
- [ ] **Blog Section** - Markdown blog posts
- [ ] **Project Filtering** - Filter by technology
- [ ] **Analytics** - Visitor tracking and insights
- [ ] **PWA Features** - Mobile app-like experience
- [ ] **Internationalization** - Multi-language support

### **Performance Optimizations**
- [ ] **Image Optimization** - WebP and AVIF formats
- [ ] **Bundle Analysis** - Optimize bundle size
- [ ] **Caching Strategy** - Service worker implementation
- [ ] **CDN Integration** - Global content delivery

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About the Developer

**Harsh Chavan** - Full Stack Developer from Dubai, UAE

- **LinkedIn**: [Harsh Chavan](https://www.linkedin.com/in/harsh-chavan-369522316/)
- **GitHub**: [@Xyerophyte](https://github.com/Xyerophyte)
- **Email**: harshabasaheb1@gmail.com
- **Portfolio**: [harshchavan.vercel.app](https://harshchavan.vercel.app)

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment
- **GSAP** - For professional animations
- **shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For utility-first styling

---

**⭐ Star this repository if you found it helpful!**

---

*Built with ❤️ using Next.js, TypeScript, and modern web technologies.*
