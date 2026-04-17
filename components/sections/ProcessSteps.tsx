import * as React from "react";

const processes = [
  {
    title: "01. Discovery",
    description: "Deep dive into business goals, user needs, and the technical landscape to define a clear, strategic north star for the product.",
  },
  {
    title: "02. Strategy",
    description: "Creating information architecture, user flows, and wireframes that ensure a frictionless, logical foundation before visual design.",
  },
  {
    title: "03. Design",
    description: "Translating wireframes into high-fidelity, interactive prototypes. Establishing robust design systems rooted in editorial principles.",
  },
  {
    title: "04. Delivery",
    description: "Working closely with engineering teams to ensure pixel-perfect implementation, comprehensive documentation, and smooth handoff.",
  }
];

export function ProcessSteps() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 border-t border-outline-variant/10">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] text-on-background leading-[1] tracking-tight mb-20 max-w-2xl">
          The Method.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {processes.map((step) => (
            <div key={step.title} className="flex flex-col gap-4 border-t border-outline-variant/30 pt-6">
              <h3 className="font-sans text-xl font-medium tracking-wide text-on-background">{step.title}</h3>
              <p className="font-sans text-on-surface-variant text-lg leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
