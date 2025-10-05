'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { 
  Stethoscope, 
  Menu, 
  X,
  Home,
  FileText,
  HelpCircle,
  MessageSquare,
  User,
  LogIn
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

interface HeaderProps {
  showBackButton?: boolean
  backButtonText?: string
  onBackClick?: () => void
  className?: string
}

export function Header({ 
  showBackButton = false, 
  backButtonText = "Back to Home",
  onBackClick,
  className 
}: HeaderProps) {
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isInPatientPortal = pathname?.startsWith('/patient-portal')

  const navigationItems = [
    { name: t.navigation.home, href: '/', icon: Home },
    { name: t.navigation.questionnaires, href: '/questionnaires', icon: FileText },
    { name: t.navigation.symptoms, href: '/symptoms', icon: Stethoscope },
    { name: t.navigation.help, href: '/help', icon: HelpCircle },
    { name: t.navigation.contact, href: '/contact', icon: MessageSquare },
  ]

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      window.history.back()
    }
  }

  return (
    <header className={cn(
      "bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm sticky top-0 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent hover:from-cyan-700 hover:to-teal-700 transition-all duration-300"
            >
              <div className="p-2 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl shadow-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="hidden sm:block">VitalCheck</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon className="icon-sm" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            {/* Patient Portal Button - only show when not in patient portal */}
            {!isInPatientPortal && (
              <SignedIn>
                <Link href="/patient-portal">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="icon-sm" />
                    <span>Patient Portal</span>
                  </Button>
                </Link>
              </SignedIn>
            )}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <LogIn className="icon-sm" />
                  <span>{t.auth.login.loginButton}</span>
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="flex items-center space-x-2">
                  <User className="icon-sm" />
                  <span>{t.auth.login.signUpLink}</span>
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border-2 border-gray-300 hover:border-gray-400"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <div className="lg:hidden pb-4">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <X className="icon-sm rotate-45" />
              <span>{backButtonText}</span>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon className="icon-sm" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
            
            {/* Mobile Auth Actions */}
            <div className="pt-4 border-t border-gray-200/60 space-y-2">
              {/* Patient Portal Button - only show when not in patient portal */}
              {!isInPatientPortal && (
                <SignedIn>
                  <Link href="/patient-portal" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="icon-sm mr-3" />
                      Patient Portal
                    </Button>
                  </Link>
                </SignedIn>
              )}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogIn className="icon-sm mr-3" />
                    {t.auth.login.loginButton}
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="icon-sm mr-3" />
                    {t.auth.login.signUpLink}
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

