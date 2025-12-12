"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/personas", label: "Personas" },
  { href: "/directory", label: "Tool Directory" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight">MaxMate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || 
              (link.href !== "/" && pathname.startsWith(link.href));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    layoutId="navbar-active"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Auth */}
          <button className="hidden sm:flex min-w-[72px] cursor-pointer items-center justify-center rounded-full h-9 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Log In
          </button>
          <Link href="/onboarding" className="hidden sm:block">
            <motion.button
              className="flex items-center justify-center rounded-full h-9 px-5 bg-primary text-white text-sm font-semibold"
              whileHover={{ scale: 1.02, opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              className="material-symbols-outlined text-slate-600 dark:text-slate-400"
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            >
              {mobileMenuOpen ? "close" : "menu"}
            </motion.span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || 
                  (link.href !== "/" && pathname.startsWith(link.href));
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white bg-primary"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Mobile Auth Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button className="flex-1 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Log In
                </button>
                <Link href="/onboarding" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-2.5 rounded-full bg-primary text-white text-sm font-semibold">
                    Get Started
                  </button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
