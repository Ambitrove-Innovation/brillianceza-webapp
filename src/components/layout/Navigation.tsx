"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, cartCount } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/gallery", label: "Gallery" },
    { path: "/delivery", label: "Delivery" },
    { path: "/secure-payment", label: "Secure Payment" },
  ];

  return (
    <>
      {/* Skip to Content for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-white text-xs uppercase tracking-widest font-semibold shadow-xl"
      >
        Skip to main content
      </a>

      <nav
        className="fixed top-0 w-full backdrop-blur-md bg-cream/85 z-40 border-b border-black/5"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="Brilliance ZA Homepage"
            className="focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none rounded"
          >
            <img
              src="/images/pics/Brilliancelogo.webp"
              alt="Brilliance Logo"
              srcSet="/images/pics/Brilliancelogo.webp 400w, /images/pics/Brilliancelogo.webp 800w"
              sizes="(max-width: 600px) 80vw, (max-width: 1200px) 40vw, 20vw"
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 font-medium uppercase tracking-[0.18em] text-gray-800 text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative pb-1 transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-ink focus-visible:outline-none ${
                  isActive(link.path)
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-ink"
                    : "hover:text-black text-gray-600"
                }`}>
                {link.label}
              </Link>
            ))}

            {/* Shopping Bag Button with Badge */}
            <button
              onClick={toggleCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
              className="relative p-1 text-ink hover:text-brand transition cursor-pointer focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none rounded"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-ink text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Bag + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
              className="relative p-2 text-ink hover:text-brand transition cursor-pointer focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none rounded"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-ink text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none text-gray-900 focus-visible:ring-2 focus-visible:ring-ink rounded"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-nav-menu"
            role="region"
            aria-label="Mobile Navigation Menu"
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-6 py-3 text-sm uppercase tracking-wide font-medium transition focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none ${
                  isActive(link.path)
                    ? "bg-ink text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20"></div>

      {/* Announcement Bar */}
      <div className="bg-ink text-white/90 text-center py-2 uppercase tracking-[0.2em] text-xs font-medium">
        Free Delivery On Orders Over R500
      </div>
    </>
  );
};

export default Navigation;
