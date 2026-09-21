import { Skill } from "@/types";

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Component architecture, fluid animations & modern build tooling",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "React Router",
      "React Hook Form",
      "Vite",
    ],
  },
  {
    category: "Backend",
    description: "RESTful APIs, authentication systems & database management",
    skills: ["Django", "Node.js", "REST APIs", "Python"],
  },
  {
    category: "3D & Animation",
    description: "Tactile motion design, canvas interaction & kinetic storytelling",
    skills: ["Three.js", "Framer Motion", "Adobe After Effects"],
  },
  {
    category: "Design & Tools",
    description: "Prototyping, version control & collaborative design systems",
    skills: ["Figma", "Canva", "Git", "GitHub"],
  },
  {
    category: "Deployment",
    description: "Continuous integration, edge delivery & cloud hosting",
    skills: ["Vercel", "Netlify"],
  },
  {
    category: "Also Familiar With",
    description: "Object-oriented programming & scientific computing fundamentals",
    skills: ["Java", "NumPy"],
  },
];

// Flat array for backwards compatibility across existing components
export const skills: Skill[] = skillCategories.flatMap((group) =>
  group.skills.map((skill) => ({
    name: skill,
    category: group.category,
  }))
);