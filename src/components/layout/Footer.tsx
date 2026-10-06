import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const linkClass =
  "text-neutral-300 hover:text-white transition-colors underline-offset-4 hover:underline";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-20">
        {/* Statement + CTA */}
        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-white/15">
          <div className="md:col-span-7">
            <span className="eyebrow !text-neutral-400 mb-5">Brilliance ZA</span>
            <h3 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight">
              Welcome
              <br />
              To Euphoria
            </h3>
          </div>
          <div className="md:col-span-5 md:pl-10 flex flex-col justify-end gap-6">
            <p className="text-neutral-400 max-w-sm">
              Intense brightness of light to your drip.
            </p>
            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-3 border border-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-ink transition">
              Shop the collection <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <div>
            <h4 className="eyebrow !text-neutral-500 mb-5">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop" className={linkClass}>
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/gallery" className={linkClass}>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow !text-neutral-500 mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <HashLink smooth to="/about#our_story" className={linkClass}>
                  Our Story
                </HashLink>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow !text-neutral-500 mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/delivery" className={linkClass}>
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link to="/secure-payment" className={linkClass}>
                  Secured Payment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow !text-neutral-500 mb-5">Follow</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/brilliance_za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@brilliance_za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}>
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="font-display font-black uppercase leading-[0.8] tracking-tighter text-[15vw] md:text-[14.2vw] text-white/[0.07] select-none text-center whitespace-nowrap">
          Brilliance
        </p>

        {/* Legal bar */}
        <div className="border-t border-white/15 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-neutral-500">
          <p>
            © {year} <span className="text-neutral-300">Brilliance Clothing</span>
            . All rights reserved.
          </p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://www.ambitrove.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition-colors">
              Ambitrove Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
