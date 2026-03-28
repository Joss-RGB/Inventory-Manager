import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

 useEffect(() => {
  const fetchCategories = async () => {
    const res = await getCategories();
    const sorted = [...res].sort((a, b) => a.name.localeCompare(b.name));
    setCategories(sorted);
  };
  fetchCategories();
}, []);


  const refreshCategories = async () => {
    const res = await getCategories();
    const sorted = [...res].sort((a, b) => a.name.localeCompare(b.name));
    setCategories(sorted);
  };

  const handleAdd = async () => {
    if (!newCat) return;
    await createCategory(newCat);
    setHistory([...history, { type: "add", name: newCat }]);
    setNewCat("");
    refreshCategories();
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${name}"?`)) return;
    await deleteCategory(id);
    setHistory([...history, { type: "delete", id, name }]);
    refreshCategories();
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const handleUpdate = async (id) => {
    if (!editingName) return;
    await updateCategory(id, editingName);
    setHistory([...history, { type: "edit", id, oldName: categories.find(c => c.id === id).name, newName: editingName }]);
    setEditingId(null);
    setEditingName("");
    refreshCategories();
  };

  const undo = async () => {
    const last = history.pop();
    if (!last) return;
    setRedoStack([...redoStack, last]);

    if (last.type === "delete") {
      await createCategory(last.name);
    } else if (last.type === "add") {
      const cat = categories.find(c => c.name === last.name);
      if (cat) await deleteCategory(cat.id);
    } else if (last.type === "edit") {
      await updateCategory(last.id, last.oldName);
    }
    refreshCategories();
  };

  const redo = async () => {
    const last = redoStack.pop();
    if (!last) return;
    setHistory([...history, last]);

    if (last.type === "delete") {
      const cat = categories.find(c => c.name === last.name);
      if (cat) await deleteCategory(cat.id);
    
    } else if (last.type === "add") {
      await createCategory(last.name);
    } else if (last.type === "edit") {
      await updateCategory(last.id, last.newName);
    }
    refreshCategories();
  };

  return (
    <div className="ml-64 p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>

      {/* Botones pequeños arriba a la derecha */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={undo} className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600">↩ Deshacer</button>
        <button onClick={redo} className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600">↪ Rehacer</button>
      </div>

      {/* Formulario para agregar */}
      <div className="flex gap-2 mb-4">
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder="Nueva categoría"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>

      {/* Tabla de categorías */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="hover:bg-gray-100">
              <td className="p-2 border">{c.id}</td>
              <td className="p-2 border">
                {editingId === c.id ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  c.name
                )}
              </td>
              <td className="p-2 border text-right">
                {editingId === c.id ? (
                  <button
                    onClick={() => handleUpdate(c.id)}
                    className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600 mr-2"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
