import "./css/index.css";
import Routespath from "./routes";
import { CartProvider } from "./context/CartContext";
import MaintenancePage from "./feature/pages/maintenance/MaintenancePage";
import { isMaintenanceMode } from "./utils/maintenance";

function App() {
  // Holding page while the site is being updated (off by default — see MAINTENANCE.md)
  if (isMaintenanceMode()) return <MaintenancePage />;

  return (
    <CartProvider>
      <Routespath />
    </CartProvider>
  );
}

export default App;
