// src/components/layout/SocialBar.tsx
import { Instagram } from "lucide-react";

const SocialBar = () => {
  return (
    <div className="text-center my-8">
      <a
        href="https://www.instagram.com/brilliance_za"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mx-4 text-black hover:text-pink-500 transition"
        aria-label="Instagram">
        <Instagram size={48} strokeWidth={1.5} />
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
};

export default SocialBar;
