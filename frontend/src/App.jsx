import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Inventory from "./pages/Inventory";
import AddEditProduct from "./pages/AddEditProduct";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories"; // <-- importar

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/add" element={<AddEditProduct />} />
            <Route path="/edit/:id" element={<AddEditProduct />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/categories" element={<Categories />} /> {/* <-- nueva ruta */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
