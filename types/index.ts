export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  size: "small" | "large";
  cardBg: "surface" | "accent" | "card" | "dark-split";
  imageUrl?: string;
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
