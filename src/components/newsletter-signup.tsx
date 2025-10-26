"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Loader2, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setIsSubmitted(true)
      setEmail("")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
        <h3 className="font-semibold text-green-800 mb-1">Successfully Subscribed!</h3>
        <p className="text-sm text-green-600">
          Thank you for subscribing to our newsletter. You&apos;ll receive updates soon.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <div className="flex items-center mb-4">
        <Mail className="h-6 w-6 mr-2" />
        <h3 className="text-lg font-semibold">Stay Updated</h3>
      </div>
      <p className="text-blue-100 mb-4">
        Subscribe to our newsletter for the latest updates, tips, and exclusive content.
      </p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-white text-gray-900 placeholder:text-gray-500"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          variant="secondary"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
      
      {error && (
        <p className="text-red-200 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}
