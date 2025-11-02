"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
  ]

  return (
    <nav
      className={
        isHome
          ? "fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/10"
          : "bg-white shadow-sm border-b"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span
                className={
                  isHome
                    ? "text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent"
                    : "text-2xl font-bold text-primary"
                }
              >
                EnviroAgent
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  isHome
                    ? "px-3 py-2 text-sm font-medium text-slate-100/90 hover:text-white transition-colors"
                    : "text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className={isHome ? "w-5 h-5 text-slate-200" : "w-5 h-5 text-gray-600"} />
                  <span className={isHome ? "text-sm text-slate-100" : "text-sm text-gray-700"}>{session.user?.name}</span>
                </div>
                <Button
                  variant={isHome ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant={isHome ? "secondary" : "ghost"} asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button className={isHome ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400" : undefined} asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={isHome ? "px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/90 backdrop-blur border-t border-white/10" : "px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t"}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    isHome
                      ? "text-slate-100 hover:text-white block px-3 py-2 text-base font-medium"
                      : "text-gray-700 hover:text-primary block px-3 py-2 text-base font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                {session ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <User className={isHome ? "w-5 h-5 text-slate-200" : "w-5 h-5 text-gray-600"} />
                      <span className={isHome ? "text-sm text-slate-100" : "text-sm text-gray-700"}>{session.user?.name}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mx-3"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 px-3">
                    <Button variant={isHome ? "secondary" : "ghost"} className="w-full" asChild>
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button className={isHome ? "w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400" : "w-full"} asChild>
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
