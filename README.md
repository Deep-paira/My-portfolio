This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash<div align="center">

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

This is my personal developer portfolio — built to showcase my work, skills, and design sensibility as a full-stack developer. Beyond the usual "about me and my projects" format, this site is also a playground for interactive 3D, scroll-driven storytelling, and motion design, built entirely with a custom animation system rather than a template.

## Features

- **Custom 3D hero scene** — built with Three.js and React Three Fiber, with scroll-linked rotation, position, and idle motion
- **Scroll-driven storytelling** — sections reveal, stagger, and animate in as you scroll, powered by Framer Motion
- **Animated Core Capabilities section** — alternating slide-in cards with a spring-based entrance
- **Kinetic "Manifesto" section** — line-by-line scroll-triggered text reveal
- **Working contact form** — a real backend using a Next.js API route and Resend, with server-side validation and spam protection
- **Fully responsive** — animations gracefully simplify on mobile, and every motion sequence respects `prefers-reduced-motion`
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

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Landing page
│   ├── about/             # About page
│   ├── process/           # Process page
│   ├── contact/           # Contact page
│   └── api/contact/       # Contact form backend (Resend)
├── components/           # Reusable UI and animation components
├── public/               # Static assets
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
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
