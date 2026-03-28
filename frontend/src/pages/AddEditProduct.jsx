import { useState, useEffect } from "react";
import { createProduct, getProducts, updateProduct, getCategories } from "../services/api";
import ProductForm from "../components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditProduct() {
  const [productToEdit, setProductToEdit] = useState(null);
  const [categories, setCategories] = useState([]); // <-- nuevo estado
  const navigate = useNavigate();
  const { id } = useParams();

  // Traer producto si hay id
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const all = await getProducts();
      const prod = all.find((p) => String(p.id) === id);
      setProductToEdit(prod || null);
    };
    fetchProduct();
  }, [id]);

  // Traer categorías
  useEffect(() => {
    const fetchCategories = async () => {
      const allCats = await getCategories();
      // si tu API devuelve objetos {id, name}, mapeamos solo nombres
      setCategories(allCats.map((c) => c.name));
    };
    fetchCategories();
  }, []);

  const handleSave = async (formData) => {
    const quantity = Number(formData.quantity);
    const price = Number(formData.price);

    if (productToEdit) {
      const updatedProduct = {
        ...productToEdit,
        name: formData.name,
        price,
        quantity,
        category: formData.category,
        description: formData.description,
        status: formData.status || "activo",
        image: formData.image || "",
        sold: productToEdit.sold || 0,
      };
      await updateProduct(productToEdit.id, updatedProduct);
    } else {
      await createProduct({
        name: formData.name,
        price,
        quantity,
        category: formData.category,
        description: formData.description,
        status: formData.status || "activo",
        image: formData.image || "",
        sold: 0,
      });
    }

    navigate("/inventory");
  };

  const handleCancel = () => navigate("/inventory");

  return (
    <ProductForm
      key={productToEdit?.id || "new"}
      onSave={handleSave}
      productToEdit={productToEdit}
      onCancel={handleCancel}
      categories={categories} // <-- pasamos categorías al formulario
    />
  );
}
