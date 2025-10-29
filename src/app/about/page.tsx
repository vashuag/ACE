import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Brain, Globe, Shield, Zap, Users, Target, Lightbulb, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About EnviroAgent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re pioneering the future where AI doesn&apos;t just respond to commands—it actively shapes your environment to help you achieve your goals. Our mission is to bridge the gap between human intent and environmental adaptation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To build intelligent AI agents that not only understand human goals but actively interact with and adapt the user&apos;s environment to help them achieve those goals faster, smarter, and more efficiently. We believe technology should adapt to humans, not the other way around.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To become the leading platform for AI environment orchestration, creating a unified ecosystem where agents and devices collaborate dynamically to optimize human success. We envision a world where your environment actively supports your goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide our development of AI agents that truly understand and adapt to human needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Consent-Based Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in 100% user control and transparency. Every environment modification requires explicit consent, and users always understand what actions are being taken.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Adaptive Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI agents learn from your behavior patterns and continuously optimize environment adaptations for better goal achievement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi-Environment Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Seamlessly control smart devices, apps, calendars, and IoT systems to create the perfect environment for your goals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-Time Adaptation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dynamic environment modifications that respond instantly to your progress and changing needs throughout the day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind EnviroAgent&apos;s revolutionary AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Vashu Agarwal</h3>
                <p className="text-primary font-medium mb-2">Founder & CEO</p>
                <p className="text-gray-600">
                  AI Engineer & Product Builder passionate about adaptive AI and real-world impact. Experienced in LLMs, NLP, and full-stack systems.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">AI Research Team</h3>
                <p className="text-primary font-medium mb-2">Machine Learning Engineers</p>
                <p className="text-gray-600">
                  Specialists in reinforcement learning, behavioral modeling, and environment interaction algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Integration Specialists</h3>
                <p className="text-primary font-medium mb-2">Environment API Team</p>
                <p className="text-gray-600">
                  Experts in connecting AI agents with smart devices, IoT systems, and environment control APIs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to revolutionizing AI environment interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1K+</div>
              <div className="text-blue-100">Goals Achieved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Environment Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">User Control</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
