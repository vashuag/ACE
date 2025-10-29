import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Bot, Brain, Globe, Shield, Zap, Users, Target, Lightbulb, Settings } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Bot,
      title: "AI Goal Understanding",
      description: "Advanced LLM-based reasoning that converts natural language goals into structured action plans.",
      features: ["Natural Language Processing", "Goal Structuring", "Intent Recognition", "Priority Analysis"]
    },
    {
      icon: Globe,
      title: "Environment Mapping",
      description: "Comprehensive mapping and control of your digital and physical environment.",
      features: ["Smart Device Integration", "IoT Control", "App Management", "Calendar Sync"]
    },
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "AI that learns from your behavior patterns and continuously optimizes environment adaptations.",
      features: ["Behavioral Analysis", "Pattern Recognition", "Predictive Modeling", "Personalization"]
    },
    {
      icon: Shield,
      title: "Consent-Based Control",
      description: "100% user-controlled system with full transparency and permission-based actions.",
      features: ["User Consent", "Action Transparency", "Privacy Protection", "Control Override"]
    },
    {
      icon: Zap,
      title: "Real-Time Adaptation",
      description: "Dynamic environment modifications that respond instantly to your progress and needs.",
      features: ["Instant Response", "Dynamic Adjustments", "Progress Tracking", "Context Awareness"]
    },
    {
      icon: Settings,
      title: "Multi-Platform Integration",
      description: "Seamless integration with Google Home, SmartThings, Zapier, and custom APIs.",
      features: ["Google Home API", "SmartThings Integration", "Zapier Webhooks", "Custom APIs"]
    }
  ]

  const process = [
    {
      step: "01",
      title: "Goal Understanding",
      description: "Our AI analyzes your natural language goals and converts them into structured action plans."
    },
    {
      step: "02",
      title: "Environment Mapping",
      description: "We map your digital and physical environment to identify control points and opportunities."
    },
    {
      step: "03",
      title: "Adaptive Actions",
      description: "AI agents execute environment modifications with your consent to optimize goal achievement."
    },
    {
      step: "04",
      title: "Learning Loop",
      description: "Continuous learning and optimization based on your behavior patterns and results."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              EnviroAgent Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your goals into reality with our AI-powered environment control services. 
              Experience the future where your environment actively supports your success.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Environment Control
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI services that actively shape your environment for goal achievement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How EnviroAgent Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our proven AI-driven process that transforms your goals into environmental adaptations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pricing Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your goal achievement needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Personal</CardTitle>
                <div className="text-3xl font-bold text-primary">$29</div>
                <CardDescription>Perfect for individual goal achievement</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Up to 5 active goals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic environment control</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Smart device integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader className="text-center">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  Most Popular
                </div>
                <CardTitle>Professional</CardTitle>
                <div className="text-3xl font-bold text-primary">$99</div>
                <CardDescription>Ideal for serious goal achievers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited goals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Advanced AI learning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Multi-platform integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom environment APIs</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold text-primary">Custom</div>
                <CardDescription>For organizations and teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Team goal management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom AI training</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>White-label solution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>SLA guarantee</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Goals?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how EnviroAgent can help you achieve your goals through intelligent environment control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
