import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, PhoneIcon as WhatsApp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">SacchiSewa</h3>
            <p className="text-sm text-gray-600">
              Empowering people to help each other through transparent and secure fundraising.
            </p>
            <div className="flex space-x-6 mt-4">
              <Link href="https://facebook.com/sacchisewa" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
              </Link>
              <Link href="https://instagram.com/sacchisewa" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6 text-gray-600 hover:text-pink-600 transition-colors" />
              </Link>
              <Link href="https://twitter.com/sacchisewa" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6 text-gray-600 hover:text-blue-400 transition-colors" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-base">
              <li><Link href="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/start-fundraiser" className="text-gray-600 hover:text-primary transition-colors">Start a Fundraiser</Link></li>
              <li><Link href="/success-stories" className="text-gray-600 hover:text-primary transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-base">
              <li><Link href="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Join our newsletter for updates on campaigns and stories.</p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" type="email" className="bg-white flex-grow" />
                <Button size="lg">Subscribe</Button>
              </div>
              <Link href="https://chat.whatsapp.com/your-community-link" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full flex items-center justify-center space-x-3">
                  <WhatsApp className="h-5 w-5" />
                  <span>Join WhatsApp Community</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <p className="text-base text-gray-600">&copy; {new Date().getFullYear()} SacchiSewa. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <img src="/image/upi.jpg" alt="UPI" className="h-16" />
              <img src="/image/razor.jpg" alt="Razorpay" className="h-16" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-medium text-gray-600">"Empowering Compassion, One Contribution at a Time"</p>
        </div>
      </div>
    </footer>
  )
}
