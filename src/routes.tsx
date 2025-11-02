// src/routes.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./feature/pages/home/homePage";
import AboutPage from "./feature/pages/about/aboutPage";
import ShopPage from "./feature/pages/shop/shopPage";
import PageErrorRedirect from "./feature/pages/pageNotFound/PageErrorRedirect";

const Routespath = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="*" element={<PageErrorRedirect />} />
      </Routes>
    </Router>
  );
};

export default Routespath;
