import { useEffect, useState } from "react";
import { createProduct, getProducts, updateProduct } from "../services/api";
import ProductForm from "../components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditProduct() {
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Traer producto si hay id
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const all = await getProducts();
      const prod = all.find((p) => String(p.id) === id); // convertir ambos a string
setProductToEdit(prod || null);
    };
    fetchProduct();
  }, [id]);

  const handleSave = async (formData) => {
    const quantity = Number(formData.quantity);
    const price = Number(formData.price);

    if (productToEdit) {
      // Actualización del producto existente
      const updatedProduct = {
        ...productToEdit,
        name: formData.name,
        price,
        quantity,
        category: formData.category,
        description: formData.description,
        status: formData.status || "activo",
        image: formData.image || "",
        sold: productToEdit.sold || 0, // Mantener vendidos
      };
      await updateProduct(productToEdit.id, updatedProduct);
    } else {
      // Crear nuevo producto
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
    />
  );
}