import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  canonicalUrl?: string;
}

const DEFAULT_DESCRIPTION =
  "Brilliance - South African Streetwear & High Fashion brand inspired by Hip-Hop culture. Premium tees, hoodies, cargo pants, and signature drip.";
const DEFAULT_KEYWORDS =
  "streetwear, south african fashion, hip hop culture, euphoria, brilliance za, clothing brand south africa, urban wear";
const DEFAULT_IMAGE = "/images/pics/Brilliancelogo.webp";
const BASE_TITLE = "Brilliance ZA";

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  canonicalUrl,
}: SEOProps) => {
  useEffect(() => {
    // 1. Set Document Title
    const fullTitle = title.includes(BASE_TITLE) ? title : `${title} | ${BASE_TITLE}`;
    document.title = fullTitle;

    // Helper to update or inject meta tag
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Standard Meta
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // OpenGraph
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const absoluteImage = ogImage.startsWith("http") ? ogImage : `${origin}${ogImage}`;

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", absoluteImage);

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", absoluteImage);

    // Canonical link
    if (canonicalUrl) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
};

export default SEO;
