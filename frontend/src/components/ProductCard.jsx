import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-xl">

      {/* Image */}
      <figure>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">

        <h2 className="card-title">
          {product.name}
        </h2>

        <p className="text-sm opacity-70">
          {product.description?.slice(0, 80)}...
        </p>

        <p className="font-semibold">
          ₹{product.price}
        </p>

        {/* Buttons */}
        <div className="card-actions justify-end gap-2">

          {/* View */}
          <button
            className="btn btn-info btn-sm"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            View
          </button>

          {/* Edit */}
          <button
            className="btn btn-warning btn-sm"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>

          {/* Delete */}
          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(product._id)}
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;