import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Homepage from "./feature/pages/home/homePage";
import AboutPage from "./feature/pages/about/aboutPage";
import ShopPage from "./feature/pages/shop/shopPage";
import ProductDetailPage from "./feature/pages/products/productsPage";
import GalleryPage from "./feature/pages/gallery/galleryPage";
import ContactPage from "./feature/pages/contact/contactPage";
import DeliveryPage from "./feature/pages/delivery/deliveryPage";
import PageErrorRedirect from "./feature/pages/pageNotFound/PageErrorRedirect";
import SecurePaymentPage from "./feature/pages/payment/securePaymentPage";
import ScrollToTop from "./components/layout/ScrollToTop";
import ScrollToHashElement from "./components/layout/ScrollToHashElement";

const Routespath = () => {
  return (
    <Router>
      <Navigation />
      <ScrollToTop />
      <ScrollToHashElement />
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
    </Router>
  );
};

export default Routespath;
