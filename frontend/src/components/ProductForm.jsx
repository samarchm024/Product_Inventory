/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const initialFormState = {
  name: "",
  category: "",
  price: "",
  stock: "",
  imageUrl: "",
  status: "",
  description: ""
};

const ProductForm = ({ onSubmit, editingProduct, cancelEdit }) => {
  const [formData, setFormData] = useState(initialFormState);

 
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        imageUrl: editingProduct.imageUrl || "",
        status: editingProduct.status || "",
        description: editingProduct.description || ""
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingProduct]);

  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });

    setFormData(initialFormState);
  };

  return (
    <div className="card bg-base-200 p-6 shadow-xl max-w-xl mx-auto">
      

      <h2 className="text-xl font-bold mb-4 text-center">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="name"
          placeholder="Product Name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="input input-bordered w-full"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered w-full"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          name="stock"
          placeholder="Stock"
          type="number"
          className="input input-bordered w-full"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <input
          name="status"
          placeholder="Status"
          className="input input-bordered w-full"
          value={formData.status}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Product Description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="flex gap-2">

          <button className="btn btn-primary flex-1">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && cancelEdit && (
            <button
              type="button"
              className="btn btn-error flex-1"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
};

export default ProductForm;