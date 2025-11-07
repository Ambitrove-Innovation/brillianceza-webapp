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
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/80 shadow-sm z-50 border-b border-gray-100">
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
          <div className="hidden md:flex items-center space-x-10 font-semibold uppercase tracking-wide text-gray-800 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative pb-1 hover:scale-110 transition-transform duration-300 ${
                  isActive(link.path)
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
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
                    ? "text-green-600 hover:animate-pulse hover:scale-125 transition-transform duration-300"
                    : "text-red-600  hover:animate-pulse"
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
                    ? "bg-black text-white"
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
      <div className="bg-black text-white text-center py-3 uppercase tracking-wider text-sm font-medium">
        Free Delivery On Orders Over R500
      </div>
    </>
  );
};

export default Navigation;
