import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap", 
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], 
  variable: "--font-mono",
  display: "swap", 
});

export const metadata: Metadata = {
  title: "Deep | Portfolio",
  description: "Portfolio of Deep, a UI/UX & Motion Designer specializing in warm editorial digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fraunces.variable,
          manrope.variable,
          jetbrainsMono.variable,
          "font-sans antialiased bg-background text-on-background min-h-screen flex flex-col"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <div className="fixed inset-0 z-[-1] noise-bg"></div>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
