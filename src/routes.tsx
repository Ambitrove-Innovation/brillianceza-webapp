import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import CartDrawer from "./components/cart/CartDrawer";
import ScrollToTop from "./components/layout/ScrollToTop";
import ScrollToHashElement from "./components/layout/ScrollToHashElement";
import PageLoader from "./components/ui/PageLoader";

// Route-level code splitting (OPT-01) - only fetch pages when requested
const Homepage = lazy(() => import("./feature/pages/home/homePage"));
const AboutPage = lazy(() => import("./feature/pages/about/aboutPage"));
const ShopPage = lazy(() => import("./feature/pages/shop/shopPage"));
const ProductDetailPage = lazy(() => import("./feature/pages/products/productsPage"));
const GalleryPage = lazy(() => import("./feature/pages/gallery/galleryPage"));
const ContactPage = lazy(() => import("./feature/pages/contact/contactPage"));
const DeliveryPage = lazy(() => import("./feature/pages/delivery/deliveryPage"));
const SecurePaymentPage = lazy(() => import("./feature/pages/payment/securePaymentPage"));
const PageErrorRedirect = lazy(() => import("./feature/pages/pageNotFound/PageErrorRedirect"));

const Routespath = () => {
  return (
    <Router>
      <Navigation />
      <CartDrawer />
      <ScrollToTop />
      <ScrollToHashElement />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/secure-payment" element={<SecurePaymentPage />} />
            <Route path="*" element={<PageErrorRedirect />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default Routespath;
