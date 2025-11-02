import { Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-gray-400 border-t border-neutral-800">
      {/* Outer container (full width background) */}
      <div className="w-full">
        {/* Inner content container */}
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            {/* About */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-white transition">
                    Our Story
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#delivery" className="hover:text-white transition">
                    Delivery Info
                  </a>
                </li>
              </ul>
            </div>

            {/* Shop */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
                Shop
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#payment" className="hover:text-white transition">
                    Secured Payment
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
                Follow Us
              </h3>
              <div className="flex items-center space-x-4">
                <a href="#" aria-label="Instagram">
                  <Instagram
                    size={20}
                    className="text-white hover:text-gray-300 transition"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-neutral-800 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              © {year} <b>Brilliance Clothing</b> (Pty) Ltd. All rights
              reserved.
            </p>
            <p className="mt-3 md:mt-0">
              Designed & Developed by{" "}
              <span className="text-white font-medium">Ambitrove Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
