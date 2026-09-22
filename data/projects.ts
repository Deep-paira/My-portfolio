import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "meditrack",
    title: "MediTrack",
    subtitle: "District Health Centre Management Platform",
    tagline: "District Health Centre Management Platform",
    description:
      "A role-based district health management system covering five staff roles with real-time Firestore tracking for medicine stock, bed occupancy, doctor attendance, and an interactive Leaflet health-score map.",
    features: [
      "Real-time district-wide medicine stock & bed occupancy monitoring",
      "Firestore-backed automated alerts & inter-centre resource request pipeline",
      "Dynamic analytics dashboards built with Recharts",
      "Interactive Leaflet geospatial mapping with health score visualization",
    ],
    tags: ["React", "TypeScript", "Firebase", "Firestore", "Leaflet", "Recharts", "Tailwind CSS"],
    bgImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    year: "2025",
    size: "large",
    cardBg: "surface",
    githubUrl: "https://github.com/Deep-paira",
    liveUrl: "https://github.com/Deep-paira",
  },
  {
    id: "pawplex",
    title: "PawPlex",
    subtitle: "Veterinary, Shelter & Pet Portal Dashboard",
    tagline: "Veterinary, Shelter & Pet Portal Dashboard",
    description:
      "A role-based operational dashboard for veterinary clinics, animal shelters, and pet stores with appointment booking, adoption pipelines, Recharts analytics, and Zustand state management.",
    features: [
      "Role-protected routing powered by JWT authentication",
      "Centralized scheduling for appointments, adoption lifecycles, and inventory",
      "Visualized trend forecasting for adoptions, visits, and revenue via Recharts",
      "Global state management using Zustand with full light/dark mode support",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Zustand", "Recharts", "JWT"],
    bgImage:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=80",
    imageUrl:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=80",
    year: "2025",
    size: "small",
    cardBg: "accent",
    githubUrl: "https://github.com/Deep-paira",
    liveUrl: "https://github.com/Deep-paira",
  },
  {
    id: "prooftrail",
    title: "ProofTrail",
    subtitle: "Verifiable Skill Passport & Matching Engine",
    tagline: "Verifiable Skill Passport & Matching Engine",
    description:
      "A verifiable credential platform for SIH 2026 featuring tri-portal access (Student, Employer, Institution) and an explainable AI matching engine powered by Sentence Transformers and cosine similarity.",
    features: [
      "AI matchmaking engine powered by Sentence Transformer embeddings & cosine similarity",
      "Tri-portal architecture (Student, Employer, and Institution workflows)",
      "Institutional credential verification pipelines for tamper-proof skill validation",
      "Secure authentication layer utilizing JWT and OAuth protocols",
    ],
    tags: ["React", "FastAPI", "PostgreSQL", "Python", "Sentence Transformers", "OAuth", "Tailwind CSS"],
    bgImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    year: "2026",
    size: "small",
    cardBg: "card",
    githubUrl: "https://github.com/Deep-paira",
    liveUrl: "https://github.com/Deep-paira",
  },
  {
    id: "echocard",
    title: "EchoCard",
    subtitle: "AI Flashcards & Study Summarizer",
    tagline: "AI Flashcards & Study Summarizer",
    description:
      "A full-stack AI learning assistant that transforms uploaded PDFs and text into structured notes and interactive 3D flip flashcards using the Groq LPU API and PyMuPDF text parsing.",
    features: [
      "High-speed AI question and summary generation via Groq API integration",
      "Automated PDF document parsing using pdfplumber and PyMuPDF",
      "Interactive 3D flip-card study interface with deck organization",
      "Kinetic UI animations and micro-interactions orchestrated via Framer Motion",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Django REST Framework", "Python", "Groq API", "Framer Motion"],
    bgImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    year: "2026",
    size: "large",
    cardBg: "dark-split",
    githubUrl: "https://github.com/Deep-paira",
    liveUrl: "https://github.com/Deep-paira",
  },
];
