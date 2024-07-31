import { Router } from "express";
import { products } from "../constants/index.mjs";

const router = Router();

// Route to get all products
router.get("/products", (req, res) => {
    res.send(products);
});

// Route to get a single product by ID
router.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((item) => item._id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.send(product);
});

export default router;
