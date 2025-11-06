// src/feature/pages/about/aboutPage.tsx
import { Link } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import { getFeaturedProducts } from "../../data/product";
import { formatPrice } from "../../../utils/helpers";

const AboutPage = () => {
  const newCollection = getFeaturedProducts([
    "rainbow-tshirt-black",
    "og-wte-tshirt-white",
    "reflector-tshirt",
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Image */}
      <section className="container mx-auto px-4 py-8">
        <img
          src="/images/pics/B90.webp"
          alt="Brilliance Brand Story"
          className="w-full max-w-6xl mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Brand Story */}
      <section id="our_story" className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Our Story
          </h1>
          <div className="text-lg md:text-xl leading-relaxed space-y-6">
            <p>
              <strong>BRILLIANCE</strong> is a South African Streetwear & High
              Fashion brand which creates unusual garments for everyday wear
              emphasizing light into one's outfit.
            </p>
            <p>
              BRILLIANCE has its roots & growth inspired by today's street and
              Hip-Hop culture. BRILLIANCE as a brainchild of{" "}
              <strong>Kganya Khuto</strong> who is the founder and head designer
              of the brand, having love for fashion and designing inspired the
              creation of unusual garments for everyday wear.
            </p>
            <p>
              The brand is made by youth for the youth, catering for both Male
              and Female customers who appreciate quality streetwear with a
              unique South African perspective.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <div className="text-center my-8">
        <a
          href="https://www.instagram.com/brilliance_za"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mx-4 text-5xl text-black hover:text-pink-500 transition">
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.tiktok.com/@brilliance_za"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mx-4 text-5xl text-black hover:text-gray-600 transition">
          <i className="fab fa-tiktok"></i>
        </a>
      </div>

      {/* Divider */}
      <hr className="container mx-auto border-t-4 border-gray-800 my-12" />

      {/* New Collection */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">New Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {newCollection.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block">
              <div className="bg-white border rounded-lg p-4 hover:shadow-lg transition">
                <img
                  src={`/images/pics/${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <p className="font-bold text-center mb-2">{product.name}</p>
                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                  {formatPrice(product.price)}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
