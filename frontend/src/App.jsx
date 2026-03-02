import { useState } from "react";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import { Toaster } from "react-hot-toast";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <BrowserRouter>

      <div data-theme={theme} className="min-h-screen">
        <Toaster position="top-right" />

        {/* Theme Toggle */}
        <div className="flex justify-end p-4">
          <button
            className="btn btn-outline"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            🌓
          </button>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;