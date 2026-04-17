import { ProcessSteps } from "@/components/sections/ProcessSteps";

export const metadata = {
  title: "Process | Deep",
  description: "My method for creating impactful digital experiences.",
};

export default function ProcessPage() {
  return (
    <div className="flex flex-col pt-8">
      <ProcessSteps />
    </div>
  );
}
