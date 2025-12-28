import { useEffect, useRef, useState } from "react";
import OptimizedImage from "../../../components/ui/OptimizedImage";

const SocialBar = () => (
  <div className="text-center my-8">
    <a
      href="https://www.instagram.com/brilliance_za"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mx-4 text-black hover:text-pink-500 transition"
      aria-label="Instagram">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </a>
    <a
      href="https://www.tiktok.com/@brilliance_za"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mx-4 text-black hover:text-gray-600 transition"
      aria-label="TikTok">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    </a>
  </div>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8 w-full">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about#our_story"
                  className="hover:text-white transition">
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/delivery" className="hover:text-white transition">
                  Delivery Info
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/secure-payment"
                  className="hover:text-white transition">
                  Secured Payment
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-white uppercase mb-4 tracking-wide">
              Follow Us
            </h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/brilliance_za"
                aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white hover:text-pink-500 transition">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {year} <b>Brilliance Clothing</b> All rights reserved.
          </p>
          <p className="mt-3 md:mt-0">
            Designed & Developed by{" "}
            <a
              href="https://www.ambitrove.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium">
              Ambitrove Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const GalleryPage = () => {
  const galleryImages = [
    "B1.webp",
    "B2.webp",
    "B3.webp",
    "B4.webp",
    "B5.webp",
    "B6.webp",
    "B7.webp",
    "B8.webp",
    "B9.webp",
    "B10.webp",
    "B11.webp",
    "B12.webp",
    "B13.webp",
    "B15.webp",
    "B16.webp",
    "B17.webp",
    "B18.webp",
    "B19.webp",
    "B20.webp",
    "B22.webp",
    "B23.webp",
    "B24.webp",
    "B25.webp",
    "B26.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [modalShown, setModalShown] = useState(false);
  const galleryRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const modalImgRef = useRef<HTMLImageElement | null>(null);

  const openViewer = (index: number) => {
    const startVT = (
      document as unknown as {
        startViewTransition?: (cb: () => void) => Promise<unknown>;
      }
    ).startViewTransition;

    if (startVT) {
      try {
        startVT(() => {
          setCurrentIndex(index);
        });
      } catch {
        setCurrentIndex(index);
      }
    } else {
      setCurrentIndex(index);
    }
  };

  const closeViewer = () => {
    setModalShown(false);
    setTimeout(() => setCurrentIndex(null), 300);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") {
        closeViewer();
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((i) =>
          i === null ? null : (i + 1) % galleryImages.length
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((i) =>
          i === null
            ? null
            : (i - 1 + galleryImages.length) % galleryImages.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, galleryImages.length]);

  useEffect(() => {
    if (currentIndex === null) {
      setModalShown(false);
      const t = setTimeout(() => {
        document.body.style.overflow = "";
      }, 300);
      return () => clearTimeout(t);
    }

    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setModalShown(true));
    return () => cancelAnimationFrame(raf);
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Gallery Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 py-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 uppercase">
            The Brilliance Gallery
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Discover our creative world — and curated selection of shoots,
            moments, and visuals that define our brand.
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          className={`masonry ${
            currentIndex !== null ? "filter blur-sm" : ""
          }`}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="masonry-item relative"
              ref={(el) => {
                galleryRefs.current[index] = el;
              }}>
              <div
                style={{
                  viewTransitionName: `gallery-${index}`,
                }}
                className="w-full">
                <OptimizedImage
                  src={`/images/gallery/${image}`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                  width={400}
                  height={600}
                  objectFit="cover"
                  onLoad={() => {}}
                />
              </div>
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => openViewer(index)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Bar */}
      <SocialBar />

      <Footer />

      {/* Modal viewer */}
      {currentIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300 ${
            modalShown ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeViewer}
          role="dialog"
          aria-modal="true">
          <div className="max-w-4xl w-full px-4">
            <div
              style={{
                viewTransitionName:
                  currentIndex !== null ? `gallery-${currentIndex}` : undefined,
              }}>
              <img
                ref={modalImgRef}
                src={`/images/gallery/${galleryImages[currentIndex]}`}
                alt={`Viewing ${currentIndex + 1}`}
                className={`w-full h-auto rounded-lg shadow-2xl mx-auto transition-transform duration-300 ${
                  modalShown ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Controls */}
            <button
              className="absolute top-6 right-6 text-white bg-black/40 hover:bg-black/60 p-2 rounded"
              onClick={closeViewer}
              aria-label="Close viewer">
              ✕
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((i) =>
                  i === null
                    ? null
                    : (i - 1 + galleryImages.length) % galleryImages.length
                );
              }}
              aria-label="Previous image">
              ‹
            </button>
            <button
              className="absolute right-20 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((i) =>
                  i === null ? null : (i + 1) % galleryImages.length
                );
              }}
              aria-label="Next image">
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
