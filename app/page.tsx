import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { WorkGrid } from "@/components/sections/WorkGrid";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ClientStrip />
      <WorkGrid />
    </div>
  );
}
