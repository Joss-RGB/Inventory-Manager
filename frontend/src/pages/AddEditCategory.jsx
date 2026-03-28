import { useState, useEffect } from "react";
import { getCategories, updateCategory } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditCategory() {
  const [category, setCategory] = useState(null);
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const cats = await getCategories();
      const cat = cats.find(c => String(c.id) === id);
      if (cat) {
        setCategory(cat);
        setName(cat.name);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSave = async () => {
    if (!name) return;
    await updateCategory(category.id, name);
    navigate("/categories");
  };

  const handleCancel = () => navigate("/categories");

  return (
    <div className="ml-64 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Editar Categoría</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Guardar
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
