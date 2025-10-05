'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { 
  Stethoscope, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: t.navigation.questionnaires, href: '/questionnaires' },
      { name: t.navigation.symptoms, href: '/symptoms' },
      { name: t.navigation.vitalCheck, href: '/vital-check' },
      { name: t.navigation.help, href: '/help' }
    ],
    company: [
      { name: t.navigation.home, href: '/' },
      { name: 'About', href: '/about' },
      { name: t.navigation.contact, href: '/contact' },
      { name: 'Privacy', href: '/privacy' }
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: t.navigation.help, href: '/help' },
      { name: t.navigation.contact, href: '/contact' },
      { name: 'Support Center', href: '/support' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">VitalCheck</span>
            </Link>
            <p className="text-gray-300 text-sm mb-6 max-w-xs">
              AI-powered health assessment tool providing personalized medical insights and symptom analysis.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="icon-sm" />
                <span>support@vitalcheck.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone className="icon-sm" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin className="icon-sm" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} VitalCheck. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="icon-sm" />
                  </Link>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
