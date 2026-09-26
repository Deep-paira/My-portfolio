<div align="center">

# DELTA — Personal Portfolio

### Crafting digital experiences with code and motion.

**[View Live Site](https://my-portfolio-deep.vercel.app/)**

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EC5990?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## About

This is my personal developer portfolio — built to showcase my work, skills, and design sensibility as a full-stack developer. Beyond the usual "about me and my projects" format, this site is also a playground for interactive 3D, scroll-driven storytelling, and motion design, built with a custom animation system rather than a template.

## Features

- **Custom Three.js hero** — a glossy, metallic abstract object with cinematic entrance and scroll-linked rotation, position, and idle motion
- **Interactive paper-scrunch portrait** — a triangulated, face-mapped mesh that unfolds from a crumpled state into a portrait, controlled by webcam hand-tracking (with a mouse/scroll fallback for anyone who declines camera access)
- **Particle-based preloader** — a physics-driven loading sequence with an upward slide-out transition
- **Scroll-driven storytelling** — sections reveal, stagger, and animate in as you scroll, powered by Framer Motion
- **Animated Core Capabilities section** — alternating slide-in cards with a spring-based entrance
- **Kinetic "Manifesto" section** — scroll-triggered line-by-line text reveal paired with a custom ambient Three.js background element
- **Tech Stack spotlight** — an interactive hover-reveal showcase of my core skills with custom display typography
- **Animated Process timeline** — a scroll-driven, self-drawing connector line linking each stage of my workflow
- **Refined navigation** — scroll-aware shrink and blur, animated active-link indicator, and a staggered mobile menu
- **Working contact form** — a real backend using a Next.js API route and Resend, with server-side validation and spam protection
- **Fully responsive & accessible** — every animation gracefully simplifies on mobile and respects `prefers-reduced-motion`
- **Warm, editorial design system** — a custom light-mode palette (cream, terracotta, espresso) with a deliberate, non-templated layout

## Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React, Next.js, Tailwind CSS, Framer Motion, React Hook Form, React Router |
| **Backend** | Django, Node.js, REST APIs, Authentication, Database-driven apps |
| **3D & Animation** | Three.js, React Three Fiber, Framer Motion, Adobe After Effects |
| **Design & Tools** | Figma, Canva, Git, GitHub |
| **Deployment** | Vercel, Netlify |

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Deep-paira/<repo-name>.git
cd <repo-name>
npm install
```

Set up your environment variables — copy the example file and fill in your own keys:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) for the contact form |
| `CONTACT_RECEIVER_EMAIL` | The email address contact form submissions are sent to |

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

> **Note:** the paper-scrunch portrait effect and hand-tracking require camera permission, requested explicitly via an on-screen opt-in — it is never requested automatically.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Landing page (hero, tech stack, capabilities, manifesto)
│   ├── about/             # About page (bio, tech stack groups, decorative shapes)
│   ├── process/           # Process page (animated timeline)
│   ├── contact/           # Contact page
│   └── api/contact/       # Contact form backend (Resend)
├── components/           # Reusable UI and animation components
├── public/               # Static assets, including portrait image for the hero effect
└── styles/               # Global styles and theme tokens
```

## Roadmap

- [ ] Add real project case studies with detailed write-ups
- [ ] Add a dark mode toggle
- [ ] Expand the Work section with live project links

## Connect

- **Portfolio:** [my-portfolio-deep.vercel.app](https://my-portfolio-deep.vercel.app/)
- **GitHub:** [@Deep-paira](https://github.com/Deep-paira)
- **LinkedIn:** [in/deep-paira](https://www.linkedin.com/in/deep-paira-989ab1344/)
- **Email:** [deeppaira45@gmail.com](mailto:deeppaira45@gmail.com)

---

<div align="center">
Built with care, one hover effect at a time.
</div>
