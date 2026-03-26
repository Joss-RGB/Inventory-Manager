import { useState, useEffect } from "react";

export default function ProductForm({ onSave, productToEdit, onCancel }) {
  const [form, setForm] = useState({ name: "", price: "", quantity: "", category: "" });

  useEffect(() => {
    // Usamos un microtask para ejecutar setForm después del render actual
    Promise.resolve().then(() => {
      if (productToEdit) {
        setForm({
          name: productToEdit.name,
          price: productToEdit.price,
          quantity: productToEdit.quantity,
          category: productToEdit.category || "",
        });
      } else {
        setForm({ name: "", price: "", quantity: "", category: "" });
      }
    });
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.quantity) return;
    onSave(form);
    setForm({ name: "", price: "", quantity: "", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded-lg flex flex-col gap-3 ml-64"
    >
      <h2 className="text-xl font-bold mb-2 text-center">
        {productToEdit ? "Editar Producto" : "Agregar Producto"}
      </h2>
      <b>Nombre</b>
      <input
        placeholder="Ej: Coca-cola"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded"
      />
      <b>Precio</b>
      <input
        placeholder="Ej: 250"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border p-2 rounded"
      />
      <b>Cantidad</b>
      <input
        placeholder="Ej: 100"
        type="number"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        className="border p-2 rounded"
      />
      <b>Categoría</b>
      <input
        placeholder="Ej: Refrescos"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
        >
          {productToEdit ? "Actualizar" : "Guardar"}
        </button>
        {productToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 flex-1"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}