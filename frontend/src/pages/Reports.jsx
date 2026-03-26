import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export default function Reports() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Dinero por producto
  const productsWithRevenue = products.map((p) => ({
    ...p,
    revenue: (p.sold || 0) * p.price,
  }));

  // Dinero por categoría
  const revenueByCategory = products.reduce((acc, p) => {
    if (!p.category) return acc;
    if (!acc[p.category]) acc[p.category] = 0;
    acc[p.category] += (p.sold || 0) * p.price;
    return acc;
  }, {});

  // Ranking de productos más vendidos
  const topProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0));

  // Para gráfico: calcular porcentaje relativo al más vendido
  const maxSold = topProducts[0]?.sold || 1;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ml-64">Reportes</h1>

      {/* Dinero por producto */}
      <div className="mb-6 ml-64">
        <h2 className="text-xl font-semibold mb-2">Dinero generado por producto</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Producto</th>
              <th className="p-2 border">Vendidos</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Total generado</th>
            </tr>
          </thead>
          <tbody>
            {productsWithRevenue.map((p) => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.sold || 0}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">${p.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dinero por categoría */}
      <div className="mb-6 ml-64">
        <h2 className="text-xl font-semibold mb-2">Dinero generado por categoría</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Total generado</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(revenueByCategory).map(([cat, total]) => (
              <tr key={cat} className="hover:bg-gray-100">
                <td className="p-2 border">{cat}</td>
                <td className="p-2 border">${total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top productos */}
      <div className="mb-6 ml-64">
        <h2 className="text-xl font-semibold mb-2">Productos más vendidos</h2>
        {/* Gráfico de barras simple */}
        <div className="space-y-2">
          {topProducts.map((p) => {
            const widthPercent = ((p.sold || 0) / maxSold) * 100;
            return (
              <div key={p.id} className="flex items-center gap-2">
                <span className="w-32 text-sm">{p.name}</span>
                <div className="bg-blue-300 h-6 rounded" style={{ width: `${widthPercent}%` }}></div>
                <span className="ml-2 text-sm">{p.sold || 0}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}