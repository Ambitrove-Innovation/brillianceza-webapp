import { Link } from "react-router-dom";
import SEO from "../../../components/ui/SEO";

const PageErrorRedirect = () => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-ink text-white"
      role="main"
      aria-labelledby="page-title">
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist on Brilliance ZA."
      />
      {/* Main Error Heading */}
      <h1
        id="page-title"
        className="text-7xl md:text-9xl font-bold text-white drop-shadow-lg"
        aria-label="Error 404">
        404
      </h1>

      {/* Secondary Heading */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-200">
        Page Not Found ❌
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-400 max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 border border-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-ink transition focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
        Return Home →
      </Link>
    </main>
  );
};

export default PageErrorRedirect;
