import { AboutContent } from "@/components/sections/AboutContent";

export const metadata = {
  title: "About | Deep",
  description: "Learn more about my background, skills, and experience.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-8">
      <AboutContent />
    </div>
  );
}
