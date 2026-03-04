import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading UI
  if (loading)
    return (
      <p className="text-center mt-10 text-lg">
        Loading product details...
      </p>
    );

  
  if (!product)
    return (
      <p className="text-center mt-10 text-red-500">
        Product not found
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10">

      <div className="card bg-base-200 shadow-xl p-6">

        {/* Image */}
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-xl mb-4 w-full h-64 object-cover"
          />
        )}

        {/* Product Name */}
        <h2 className="text-2xl font-bold mb-2">
          {product.name}
        </h2>

        <p className="opacity-80 mb-2">
          Category: {product.category || "N/A"}
        </p>

        <p className="mb-2">
          Price: ₹{product.price}
        </p>

        <p className="mb-2">
          Stock: {product.stock}
        </p>

        
        <p className="mb-2">
          Status: {product.status}
        </p>

        <p className="mb-4">
          {product.description}
        </p>

        <button
          className="btn btn-primary w-full"
          onClick={() => navigate("/")}
        >
          ⬅ Back to Home
        </button>

      </div>
    </div>
  );
};

export default ProductDetail;