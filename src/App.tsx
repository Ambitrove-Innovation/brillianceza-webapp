import "./css/index.css";
import Routespath from "./routes";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routespath />
    </CartProvider>
  );
}

export default App;
