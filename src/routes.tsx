import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./feature/pages/home/homePage";
import PageErrorRedirect from "./feature/pages/pageNotFound/PageErrorRedirect";

const Routespath = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<PageErrorRedirect />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routespath;
