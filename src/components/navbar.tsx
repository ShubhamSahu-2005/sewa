import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google"; // Import Google Fonts in Next.js
const inter = Inter({ subsets: ["latin"], weight: "700" });
export function Navbar() {
  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 rounded-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className={`text-black text-4xl font-bold hover:text-gray-700 transition-all ${inter.className}`}
        >
          SacchiSewa
        </Link>
        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/how-it-works"
            className="text-gray-800 hover:text-green-500 transition-all"
          >
            How It Works
          </Link>
          <Link href="/start-fundraiser">
            <Button className="bg-green-500 text-white hover:bg-green-400 transition-all shadow-md hover:shadow-lg rounded-lg px-4 py-2">
              Start a Fundraiser
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-blue-500 text-white hover:bg-blue-400 transition-all shadow-md hover:shadow-lg rounded-lg px-4 py-2">
              Sign Up
            </Button>
          </Link>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 hover:text-gray-500 transition-all focus:outline-none"
            aria-label="Menu"
          >
            {/* Icon (could use a hamburger icon or similar) */}
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
