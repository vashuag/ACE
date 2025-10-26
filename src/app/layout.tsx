import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Agent to Environment - AI Agents Meet Real World",
  description: "Transform your goals into reality with intelligent AI agents that understand, adapt, and execute in any environment. Experience the future of human-AI collaboration.",
  keywords: "AI agents, artificial intelligence, automation, environment, goals, collaboration",
  authors: [{ name: "Agent to Environment Team" }],
  openGraph: {
    title: "Agent to Environment - AI Agents Meet Real World",
    description: "Transform your goals into reality with intelligent AI agents that understand, adapt, and execute in any environment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
