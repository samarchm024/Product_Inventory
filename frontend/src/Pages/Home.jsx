import { useEffect, useState } from "react";
import API from "../api/api.js";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import toast from "react-hot-toast";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

 
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      console.log("Backend Response:", res.data);

      if (res.data?.data && Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      } else if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  

  const handleSubmit = async (product) => {
    try {

      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, product);
        toast.success("Product updated");
      } else {
        await API.post("/products", product);
        toast.success("Product created");
      }

      setEditingProduct(null);
      fetchProducts();

    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    }
  };



  const handleDelete = async (id) => {
    try {

      await API.delete(`/products/${id}`);

      toast.success("Product deleted");

      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  

  const handleView = async (id) => {
    try {

      const res = await API.get(`/products/${id}`);

      toast.success(
        `Viewing: ${res.data?.data?.name || "Product"}`
      );

    } catch (error) {
      console.error(error);
      toast.error("View failed");
    }
  };

  

  const filteredProducts = products.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        Product Dashboard
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          className="input input-bordered w-full max-w-md"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product Form */}
      <div className="max-w-md mx-auto mb-10">
        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          cancelEdit={() => setEditingProduct(null)}
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center">Loading products...</p>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onEdit={setEditingProduct}
            onView={handleView}
          />
        ))}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No products found
        </p>
      )}

    </div>
  );
};

export default Home;