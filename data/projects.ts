import { Project } from "@/types";

// ==============================================================================
// PLACEHOLDER PROJECTS REPOSITORY
// ==============================================================================
// NOTE FOR DEEP PAIRA:
// Replace these placeholder case studies with your actual projects (e.g. Django
// backend applications, React/Next.js frontend apps, or open-source repositories).
// Include your live Vercel/Netlify URLs and GitHub repo links when ready!
export const projects: Project[] = [
  {
    id: "finance-dashboard",
    title: "Finance Dashboard Application",
    description: "Full-stack dashboard with real-time analytics, responsive UI, and robust data visualizations.",
    tags: ["React", "Next.js", "Tailwind CSS", "REST APIs"],
    year: "2025",
    size: "large",
    cardBg: "surface",
    imageUrl: "/projects/finance_dashboard.png",
  },
  {
    id: "mobile-onboarding",
    title: "Interactive User Onboarding Flow",
    description: "Frictionless multi-step registration with client-side validation and Framer Motion micro-interactions.",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    year: "2024",
    size: "small",
    cardBg: "accent",
    imageUrl: "/projects/mobile_onboarding.png",
  },
  {
    id: "design-system",
    title: "Accessible Component System",
    description: "Reusable, token-based UI component library built for rapid product development.",
    tags: ["React", "Tailwind CSS", "Figma", "Design Systems"],
    year: "2025",
    size: "small",
    cardBg: "card",
    imageUrl: "/projects/design_system.png",
  },
  {
    id: "ecommerce-app",
    title: "Full-Stack Web Platform",
    description: "End-to-end web application with Django REST backend, JWT authentication, and modern React interface.",
    tags: ["Next.js", "Django", "REST APIs", "Python"],
    year: "2026",
    size: "large",
    cardBg: "dark-split",
    imageUrl: "/projects/ecommerce_app.png",
  },
];
