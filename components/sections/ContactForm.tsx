"use client";

import * as React from "react";
import { Button } from "../ui/Button";

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });
  
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.projectType) tempErrors.projectType = "Please select a project type";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", projectType: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24">
       <div className="mx-auto w-full max-w-3xl">
          <div className="mb-16">
            <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] text-on-background leading-[1] tracking-tight">Let&#39;s Talk.</h2>
            <p className="font-sans text-on-surface-variant text-xl mt-6">
              Have a project in mind? Fill out the form below and I&#39;ll get back to you within 48 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
             {isSuccess && (
                <div className="p-6 bg-success/10 text-success border border-success/20 rounded-[12px] font-sans text-sm tracking-wide">
                  Message sent successfully! Thanks for reaching out.
                </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Name */}
                <div className="relative flex flex-col">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-background font-sans focus:border-primary focus:outline-none transition-colors"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-3 text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest pointer-events-none font-sans"
                  >
                    Your Name
                  </label>
                  {errors.name && <span className="text-red-400 text-xs mt-2">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="relative flex flex-col">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-background font-sans focus:border-primary focus:outline-none transition-colors"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-3 text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest pointer-events-none font-sans"
                  >
                    Email Address
                  </label>
                  {errors.email && <span className="text-red-400 text-xs mt-2">{errors.email}</span>}
                </div>
             </div>

             {/* Project Type */}
             <div className="relative flex flex-col border-b border-outline-variant/40 py-2">
                  <select 
                    id="projectType" 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none text-on-background font-sans appearance-none focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled className="text-on-surface-variant">Select Project Type</option>
                    <option value="product-design">Product Design</option>
                    <option value="ux-audit">UX Audit</option>
                    <option value="design-system">Design System</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.projectType && <span className="text-red-400 text-xs mt-2">{errors.projectType}</span>}
             </div>

             {/* Message */}
             <div className="relative flex flex-col mt-4">
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="peer w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-background font-sans focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-3 text-on-surface-variant transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest pointer-events-none font-sans"
                  >
                    Project Details
                  </label>
                  {errors.message && <span className="text-red-400 text-xs mt-2">{errors.message}</span>}
             </div>

             <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="mt-8 w-full md:w-auto self-start"
              disabled={isSubmitting}
             >
               {isSubmitting ? "Sending..." : "Send Message"}
             </Button>

          </form>
       </div>
    </section>
  );
}
