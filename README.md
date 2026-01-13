# MONO | Premium Audio Experience

![MONO Banner](public/assets/images/Shop/Mono-one-shop.png)

## Overview

**MONO** is a high-performance, aesthetically driven e-commerce platform designed for premium audio equipment. Built with **Next.js 15** and **Tailwind CSS**, it features an immersive user experience, utilizing complex scroll-driven animations and a stateless "smart history" navigation system.

The project emphasizes a "premium" feel with smooth transitions, minimalist typography, and paying close attention to micro-interactions, particularly in the checkout and product discovery flows.

## ✨ Key Features

- **Immersive 3D Hero Section**: A scroll-controlled, frame-by-frame cinematic product reveal using optimized image sequences.
- **Dynamic Product Navigation**: sophisticated `?from=` routing logic that maintains navigation context (Home vs. Shop vs. Product-to-Product) without heavy state management.
- **Smart Checkout Experience**:
  - Two-mode payment system: **Online Payment** and **Cash on Delivery**.
  - **Real-time Card Detection**: Automatically identifies Visa/MasterCard as you type and displays the corresponding high-resolution logo.
  - **Silent Cart Actions**: Add recommendation items to your order instantly without disrupting the checkout flow.
- **Unified Design System**: A cohesive aesthetic treating the "Shop", "Cart", and "Checkout" as a seamless journey.
- **Responsive & Accessible**: Fully optimized for mobile, tablet, and desktop viewports.

## 🛠️ Tech Stack

- **Core**: [React.js 19](https://react.dev/)
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & CSS Transitions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: React Context API (`ShopContext`) + LocalStorage Persistence

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/esurenajames/mono.git
   cd mono
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```bash
/app
  /accessories   # Accessories landing & subscription
  /checkout      # Custom checkout flow & components
  /landing       # Main landing page with Hero animation
  /shop          # Product listing & dynamic [id] detail pages
/components      # Shared UI (Nav, Footer, CartSidebar)
/context         # Global ShopContext (Cart, Wishlist logic)
/data            # Static product data & types
/public          # Static assets (Images, Icons)
```

## 🎨 Design Philosophy

The application follows a **"Content-First"** minimalist approach. We prioritize:
- **Whitespace**: To let premium product imagery breathe.
- **Typography**: Clean sans-serif fonts for readability and modern appeal.
- **Feedback**: Immediate visual feedback for all user actions (hover states, cart updates, form validation).

---
*Built by James Esureña & Antigravity*