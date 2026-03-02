import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String,
     required: true },

  category: { type: String,
     default: "General" },

  price: { type: Number,
     required: true },

  stock: { type: Number, default: 0 },

  imageUrl: { type: String },

  status: { type: String,
     default: "Available" },

  description: { type: String },
  imageUrl: String,

});

export default mongoose.model("Product", productSchema);