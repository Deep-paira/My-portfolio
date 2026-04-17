import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact | Deep",
  description: "Get in touch to discuss a project or collaboration.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-8">
      <ContactForm />
    </div>
  );
}
