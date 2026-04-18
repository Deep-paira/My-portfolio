import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "finance-dashboard",
    title: "Finance Dashboard Redesign",
    description: "Redesigned a complex fintech dashboard reducing user drop-off by 40%",
    tags: ["Product Design", "Figma", "UX Research"],
    year: "2025",
    size: "large",
    cardBg: "surface",
    imageUrl: "/projects/finance_dashboard.png"
  },
  {
    id: "mobile-onboarding",
    title: "Mobile Onboarding Flow",
    description: "Crafted a frictionless onboarding experience for a B2C mobile app",
    tags: ["Interaction Design", "Protopie"],
    year: "2024",
    size: "small",
    cardBg: "accent",
    imageUrl: "/projects/mobile_onboarding.png"
  },
  {
    id: "design-system",
    title: "Component Library & Design System",
    description: "Built a scalable design system with 120+ reusable components",
    tags: ["Design Systems", "Tokens", "Figma"],
    year: "2025",
    size: "small",
    cardBg: "card",
    imageUrl: "/projects/design_system.png"
  },
  {
    id: "ecommerce-app",
    title: "E-Commerce App Redesign",
    description: "Full UX overhaul of a fashion e-commerce app, 3x conversion lift",
    tags: ["Mobile", "UX", "Branding"],
    year: "2026",
    size: "large",
    cardBg: "dark-split",
    imageUrl: "/projects/ecommerce_app.png"
  }
];
