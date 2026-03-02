import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import dns from "node:dns";


dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err.message));

app.use("/api/products", productRoutes);


app.get("/sam", (req, res) => {
    res.send("Backend is running");
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});