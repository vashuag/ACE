"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, Users, Bot, Brain, Globe, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

// Floating Shapes Component
function FloatingShapes() {
  const shapes = [
    { id: 1, left: 10, top: 20, duration: 4, delay: 0 },
    { id: 2, left: 20, top: 40, duration: 5, delay: 0.5 },
    { id: 3, left: 30, top: 60, duration: 6, delay: 1 },
    { id: 4, left: 40, top: 30, duration: 4.5, delay: 1.5 },
    { id: 5, left: 50, top: 50, duration: 5.5, delay: 2 },
    { id: 6, left: 60, top: 25, duration: 4.2, delay: 0.8 },
    { id: 7, left: 70, top: 45, duration: 5.8, delay: 1.2 },
    { id: 8, left: 80, top: 35, duration: 4.8, delay: 1.8 },
    { id: 9, left: 90, top: 55, duration: 5.2, delay: 2.2 },
    { id: 10, left: 15, top: 70, duration: 4.3, delay: 0.3 },
    { id: 11, left: 25, top: 15, duration: 5.3, delay: 1.3 },
    { id: 12, left: 35, top: 75, duration: 4.7, delay: 1.7 },
    { id: 13, left: 45, top: 10, duration: 5.7, delay: 2.3 },
    { id: 14, left: 55, top: 65, duration: 4.1, delay: 0.7 },
    { id: 15, left: 65, top: 5, duration: 5.1, delay: 1.1 },
    { id: 16, left: 75, top: 80, duration: 4.9, delay: 1.9 },
    { id: 17, left: 85, top: 12, duration: 5.4, delay: 2.4 },
    { id: 18, left: 5, top: 35, duration: 4.6, delay: 0.6 },
    { id: 19, left: 95, top: 25, duration: 5.6, delay: 1.6 },
    { id: 20, left: 12, top: 85, duration: 4.4, delay: 2.1 },
  ]

  return (
    <>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
          }}
        />
      ))}
    </>
  )
}

// Hero Section with Animations
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-teal-400/10"></div>
        <FloatingShapes />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-200 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Introducing EnviroAgent
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            The Agent That Shapes
            <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              Your World for Success
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            An AI agent that interacts with your environment to increase the chances of goal completion. 
            Transform your goals into reality with intelligent AI that adapts your world for success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 text-lg" asChild>
              <Link href="/auth/signup">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-teal-400 text-teal-200 hover:bg-teal-500/15 px-8 py-4 text-lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-teal-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-teal-300 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "Environment Interaction",
      description: "AI agents that actively modify your digital and physical environment to create optimal conditions for goal achievement."
    },
    {
      icon: Brain,
      title: "Goal Understanding",
      description: "Advanced LLM-based reasoning that converts natural language goals into structured action plans and environment adaptations."
    },
    {
      icon: Globe,
      title: "Multi-Environment Control",
      description: "Seamlessly control smart devices, apps, calendars, and IoT systems to create the perfect environment for your goals."
    },
    {
      icon: Users,
      title: "Adaptive Learning",
      description: "AI that learns from your behavior patterns and continuously optimizes environment adaptations for better results."
    },
    {
      icon: Shield,
      title: "Consent-Based Actions",
      description: "100% permission-based system with full transparency. You control what the agent can access and modify."
    },
    {
      icon: Zap,
      title: "Real-Time Adaptation",
      description: "Dynamic environment modifications that respond instantly to your progress and changing needs."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Future of Goal Achievement
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience next-generation AI agents that actively shape your environment 
            to optimize conditions for goal completion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  const stats = [
    { number: "1K+", label: "Goals Achieved" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Environment Monitoring" },
    { number: "100%", label: "User Control" }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-teal-50 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Shape Your World for Success?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the future where AI doesn&apos;t just respond to commands—it actively creates 
            the conditions that help you achieve your goals.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 text-lg" asChild>
            <Link href="/auth/signup">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        <div className="mt-4">
          <Button variant="secondary" size="lg" className="px-8 py-4 text-lg" asChild>
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  )
}