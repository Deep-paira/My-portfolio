import { Skill } from "@/types";

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillGroup[] = [
  {
    category: "Languages",
    description: "Systems programming, scripting, typed applications & semantic web markup",
    skills: [
      "C",
      "Python",
      "Java",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Frontend",
    description: "Modular component architecture, modern frameworks, state management & reactive UI",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Framer Motion",
      "React Router",
      "React Hook Form",
      "Vite",
    ],
  },
  {
    category: "Backend",
    description: "RESTful API engineering, backend services, secure authentication & database management",
    skills: [
      "Django",
      "Node.js",
      "FastAPI",
      "REST APIs",
      "Authentication & Authorization",
      "Database Management",
    ],
  },
  {
    category: "Machine Learning & Data Science",
    description: "Statistical modeling, supervised learning, data manipulation & numerical pipelines",
    skills: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "SciPy",
      "Scikit-Learn",
      "CSV/Data Processing",
    ],
  },
  {
    category: "DevOps & Tools",
    description: "Containerization, version control, interface design systems & developer tooling",
    skills: [
      "Docker",
      "Git",
      "GitHub",
      "Figma",
      "Canva",
    ],
  },
  {
    category: "3D & Creative Tech",
    description: "Tactile motion design, WebGL canvas interaction & kinetic 3D storytelling",
    skills: [
      "Three.js",
      "Framer Motion",
    ],
  },
  {
    category: "Deployment & Cloud",
    description: "Edge delivery networks, serverless infrastructure & cloud databases",
    skills: [
      "Vercel",
      "Netlify",
      "Firebase",
    ],
  },
];

// Flat array for backwards compatibility across existing components
export const skills: Skill[] = skillCategories.flatMap((group) =>
  group.skills.map((skill) => ({
    name: skill,
    category: group.category,
  }))
);