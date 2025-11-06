// src/feature/pages/gallery/GalleryPage.tsx
import Footer from "../../../components/layout/Footer";
import SocialBar from "../../../components/layout/SocialBar";
import { useEffect, useRef, useState } from "react";

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
  const galleryRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const modalImgRef = useRef<HTMLImageElement | null>(null);

  const openViewer = (index: number) => {
    // If View Transition API is available, use it to animate between the
    // thumbnail and the modal image. We set the view-transition-name on
    // both elements using refs so the UA can match them.
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
        // Fallback if startViewTransition throws for any reason
        setCurrentIndex(index);
      }
    } else {
      setCurrentIndex(index);
    }
  };

  const closeViewer = () => {
    // trigger CSS hide animation, then unmount after duration
    setModalShown(false);
    setTimeout(() => setCurrentIndex(null), 300);
  };

  // Keyboard handler: Esc to close, arrows to navigate
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

  // When modal is open, set view-transition-name on the modal image to match
  // the thumbnail's name (if available). Also ensure body scrolling is disabled.
  useEffect(() => {
    if (currentIndex === null) {
      // start hiding animation
      setModalShown(false);
      // restore scrolling after animation
      const t = setTimeout(() => {
        document.body.style.overflow = "";
        if (modalImgRef.current) {
          try {
            modalImgRef.current.style.removeProperty("view-transition-name");
          } catch {
            /* ignore */
          }
        }
      }, 300);
      return () => clearTimeout(t);
    }

    // when opening, immediately disable body scroll and show modal after mount
    document.body.style.overflow = "hidden";
    const name = `gallery-${currentIndex}`;
    if (modalImgRef.current) {
      try {
        modalImgRef.current.style.setProperty("view-transition-name", name);
      } catch {
        /* ignore */
      }
    }
    // Also set the thumbnail's view-transition-name (it should already be set
    // on render, but ensure it's present)
    const thumb = galleryRefs.current[currentIndex];
    if (thumb) {
      try {
        thumb.style.setProperty("view-transition-name", name);
      } catch {
        /* ignore */
      }
    }
    // small delay to allow the modal DOM to mount before triggering the CSS
    // entrance animation
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
            <div key={index} className="masonry-item">
              <img
                ref={(el) => {
                  galleryRefs.current[index] = el;
                  if (el) {
                    try {
                      el.style.setProperty(
                        "view-transition-name",
                        `gallery-${index}`
                      );
                    } catch {
                      /* ignore if unsupported */
                    }
                  }
                }}
                src={`/images/gallery/${image}`}
                loading="lazy"
                decoding="async"
                alt={`Gallery image ${index + 1}`}
                className="w-full rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
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
            <img
              ref={(el) => {
                modalImgRef.current = el;
              }}
              src={`/images/gallery/${galleryImages[currentIndex]}`}
              alt={`Viewing ${currentIndex + 1}`}
              className={`w-full h-auto rounded-lg shadow-2xl mx-auto transition-transform duration-300 ${
                modalShown ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            />

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
