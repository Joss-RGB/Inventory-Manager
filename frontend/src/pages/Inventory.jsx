import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../services/api";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    // Aquí hacemos que realmente navegue a la página de edición
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
  };

   // Filtrar productos
  const filteredProducts = products.filter((p) => {
    const nameMatch = p.name?.toLowerCase().includes(filters.name.toLowerCase() || "");
    const categoryMatch = filters.category
      ? p.category?.toLowerCase() === filters.category.toLowerCase()
      : true;
    const statusMatch = filters.status
      ? p.status?.toLowerCase() === filters.status.toLowerCase()
      : true;
    const minMatch = filters.minPrice ? p.price >= Number(filters.minPrice) : true;
    const maxMatch = filters.maxPrice ? p.price <= Number(filters.maxPrice) : true;

    return nameMatch && categoryMatch && statusMatch && minMatch && maxMatch;
  });

 // Opciones dinámicas para FilterBar
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const names = [...new Set(products.map((p) => p.name).filter(Boolean))];

  const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const totalSold = products.reduce((acc, p) => acc + (p.sold || 0) * p.price, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ml-64">Inventario</h1>
      <h2 className="font-bold mb-4 ml-64">Filtrar</h2>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        names={names}
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