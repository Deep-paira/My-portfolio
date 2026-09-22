export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description: string;
  features?: string[];
  tags: string[];
  year?: string;
  size?: "small" | "large";
  cardBg?: "surface" | "accent" | "card" | "dark-split";
  bgImage?: string;
  imageUrl?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  category: string;
}
 
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
