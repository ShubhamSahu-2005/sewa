import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Navbar } from "../components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SacchiSewa - Fundraising Platform",
  description: "Help others by creating or contributing to fundraisers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

