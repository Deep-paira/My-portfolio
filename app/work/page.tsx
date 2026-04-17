import { WorkGrid } from "@/components/sections/WorkGrid";

export const metadata = {
  title: "Work | Deep",
  description: "Selected case studies and projects.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col pt-8">
      <WorkGrid />
    </div>
  );
}
