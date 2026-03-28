import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct, getCategories, createProduct } from "../services/api"; 
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // --- NUEVO: historial de acciones ---
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);

      const cats = await getCategories();
      setCategories(cats.map(c => c.name));
    };
    fetchData();
  }, []);

  const refreshProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    const product = products.find(p => p.id === id);
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
    // Guardamos acción en historial
    setHistory([...history, { type: "delete", product }]);
    setRedoStack([]); // limpiar pila de rehacer
  };

  const handleEdit = (product) => {
    navigate(`/edit/${product.id}`);
  };

  const handleSell = async (product) => {
    if (product.quantity <= 0) return alert("No hay stock disponible");
    const updated = {
      ...product,
      quantity: product.quantity - 1,
      sold: (product.sold || 0) + 1,
    };
    await updateProduct(product.id, updated);
    setProducts(products.map((p) => (p.id === product.id ? updated : p)));
    // Guardamos acción en historial con estado antes y después
    setHistory([...history, { type: "sell", before: product, after: updated }]);
    setRedoStack([]);
  };

  // --- Deshacer ---
  const undo = async () => {
    const last = history.pop();
    if (!last) return;
    setRedoStack([...redoStack, last]);

    if (last.type === "delete") {
      await createProduct(last.product); // restaurar eliminado
    } else if (last.type === "sell") {
      await updateProduct(last.before.id, last.before); // volver al estado anterior
    }
    refreshProducts();
  };

  // Filtrar productos según filtros
  const filteredProducts = products.filter((p) => {
    const nameMatch = filters.name ? p.name?.toLowerCase() === filters.name.toLowerCase() : true;
    const categoryMatch = filters.category ? p.category?.toLowerCase() === filters.category.toLowerCase() : true;
    const minMatch = filters.minPrice ? p.price >= Number(filters.minPrice) : true;
    const maxMatch = filters.maxPrice ? p.price <= Number(filters.maxPrice) : true;
    return nameMatch && categoryMatch && minMatch && maxMatch;
  });

  const names = [...new Set(products.map((p) => p.name).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const totalSold = products.reduce((acc, p) => acc + (p.sold || 0) * p.price, 0);

   return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ml-64">Inventario</h1>
      
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={undo} className="bg-gray-600  text-white px-2 py-1 text-sm rounded hover:bg-black">↩ Deshacer Accion</button>
      </div>

      <h2 className="font-bold mb-4 ml-64">Filtrar</h2>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories} // <-- ahora vienen del backend
        names={names}
        products={products} // <-- para que FilterBar pueda cruzar nombres/categorías
      />
      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSell={handleSell}
      />

      <div className="mt-6 bg-blue-50 p-4 rounded shadow text-center ml-64">
        <p className="text-lg font-semibold">
          Valor total del inventario: <span className="text-blue-700">${totalValue}</span>
        </p>
        <p className="text-lg font-semibold mt-1">
          Dinero generado por ventas: <span className="text-green-700">${totalSold}</span>
        </p>
      </div>
    </div>
  );
}