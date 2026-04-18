"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

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

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                {/* Name */}
                <div className="relative flex flex-col">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-background font-sans focus:border-primary focus:outline-none transition-colors"
                    placeholder=""
                  />
                  <label 
                    htmlFor="name" 
                    className={cn(
                      "absolute left-0 transition-all pointer-events-none font-sans",
                      formData.name.length > 0 
                        ? "-top-4 text-[10px] uppercase tracking-widest text-on-surface-variant" 
                        : "top-3 text-on-surface-variant",
                      "peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary"
                    )}
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
                    placeholder=""
                  />
                  <label 
                    htmlFor="email" 
                    className={cn(
                      "absolute left-0 transition-all pointer-events-none font-sans",
                      formData.email.length > 0 
                        ? "-top-4 text-[10px] uppercase tracking-widest text-on-surface-variant" 
                        : "top-3 text-on-surface-variant",
                      "peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary"
                    )}
                  >
                    Email Address
                  </label>
                  {errors.email && <span className="text-red-400 text-xs mt-2">{errors.email}</span>}
                </div>
             </div>

             {/* Project Type */}
             <div className="relative flex flex-col border-b border-outline-variant/40 py-2 mt-2">
                  <select 
                    id="projectType" 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none text-on-background font-sans appearance-none focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled className="bg-background text-on-surface-variant font-sans">Select Project Type</option>
                    <option value="product-design" className="bg-background text-on-background font-sans">Product Design</option>
                    <option value="ux-audit" className="bg-background text-on-background font-sans">UX Audit</option>
                    <option value="design-system" className="bg-background text-on-background font-sans">Design System</option>
                    <option value="other" className="bg-background text-on-background font-sans">Other</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-[20%] pointer-events-none text-on-surface-variant">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {errors.projectType && <span className="text-red-400 text-xs mt-2">{errors.projectType}</span>}
             </div>

             {/* Message */}
             <div className="relative flex flex-col mt-6">
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="peer w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-background font-sans focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder=""
                  />
                  <label 
                    htmlFor="message" 
                    className={cn(
                      "absolute left-0 transition-all pointer-events-none font-sans",
                      formData.message.length > 0 
                        ? "-top-6 text-[10px] uppercase tracking-widest text-on-surface-variant" 
                        : "top-3 text-on-surface-variant",
                      "peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary"
                    )}
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
