export default function ProductList({ products, onDelete, onEdit, onSell }) {
  if (!products.length) return <p className="text-gray-500">No hay productos registrados</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ml-64">
      {products.map((p) => (
        <div
          key={p.id}
          className="p-4 border rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between bg-white"
        >
          <div>
            <h2 className="font-bold text-xl mb-1">{p.name}</h2>
            <p><span className="font-semibold">Precio:</span> ${p.price}</p>
            <p>
              <span className="font-semibold">Stock:</span>{" "}
              <span className={p.quantity <= 5 ? "text-red-600 font-bold" : ""}>{p.quantity}</span>
            </p>
            <p><span className="font-semibold">Vendidos:</span> {p.sold || 0}</p>
            {p.category && <p><span className="font-semibold">Categoría:</span> {p.category}</p>}
          </div>
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1 rounded"
              onClick={() => onEdit(p)}
            >
              Editar
            </button>
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 rounded"
              onClick={() => onSell(p)}
            >
              Vender
            </button>
            <button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-1 rounded"
              onClick={() => {
                if (window.confirm("¿Estás seguro que deseas eliminar este producto? Esto borrará todo lo relacionado con él.")) {
                  onDelete(p.id);
                }
              }}
            >
              Eliminar
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}