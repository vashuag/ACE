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
  title: "EnviroAgent - The Agent That Shapes Your World for Success",
  description: "An AI agent that interacts with your environment to increase the chances of goal completion. Transform your goals into reality with intelligent AI that adapts your world for success.",
  keywords: "AI agents, artificial intelligence, automation, environment, goals, collaboration, EnviroAgent, productivity, smart environment",
  authors: [{ name: "EnviroAgent Team" }],
  openGraph: {
    title: "EnviroAgent - The Agent That Shapes Your World for Success",
    description: "An AI agent that interacts with your environment to increase the chances of goal completion.",
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
