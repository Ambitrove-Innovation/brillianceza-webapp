"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { showNotification } from "../../utils/helpers";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
      <nav className="fixed top-0 w-full backdrop-blur-md bg-cream/85 z-50 border-b border-black/5">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={closeMenu}>
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
                className={`relative pb-1 transition-colors duration-300 ${
                  isActive(link.path)
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-ink"
                    : "hover:text-black text-gray-600"
                }`}>
                {link.label}
              </Link>
            ))}

            {/* Shop icon */}
            <Link
              to="/shop"
              aria-label="Shopping Bag"
              className="hover:text-black transition"
              onClick={(e) => {
                if (isActive("/shop")) {
                  // prevent needless navigation and notify the user
                  e.preventDefault();
                  showNotification(
                    "You are already in the Shop — go ahead and buy! 🛍️",
                    "info"
                  );
                } else {
                  // close mobile menu if open
                  closeMenu();
                }
              }}>
              <ShoppingBag
                className={`w-5 h-5 ${
                  isActive("/shop")
                    ? "text-brand"
                    : "text-ink hover:text-brand transition-colors"
                }`}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-6 py-3  text-sm uppercase tracking-wide font-medium transition ${
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
