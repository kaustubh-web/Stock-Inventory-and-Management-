const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const Movement= require("./models/Movement");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/movements", async (req, res) => {
  try {
    const { productId, type, quantity, note } = req.body;

    const qty = Number(quantity);
    if (!productId || !type || !qty) {
      return res.status(400).json({ message: "productId, type, quantity are required" });
    }

    const product = await Product.findById(productId); 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (type === "OUT" && product.quantity < qty) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.quantity = type === "IN"
      ? product.quantity + qty
      : product.quantity - qty;

    await product.save();

    const movement = await Movement.create({
      product: productId,
      type,
      quantity: qty,
      note
    });

    return res.status(201).json(movement);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});



app.get("/api/movements",async(req,res)=>{
  try {
    const movements=await Movement.find()
    .populate("product","name sku")
    .sort({createdAt: -1});
  res.json(movements);
    
  } catch (error) {
    res.status(500).json({message : error.message});
  }
});

app.get("/api/dashboard/summary", async (req, res) => {
  try {
    const [totalProducts, lowStockItems, recentMovements] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ $expr: { $lte: ["$quantity", "$reorderLevel"] } }),
      Movement.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      })
    ]);

    const lowStockProducts = await Product.find({
      $expr: { $lte: ["$quantity", "$reorderLevel"] }
    })
      .select("name sku quantity reorderLevel")
      .sort({ quantity: 1 })
      .limit(5);

    return res.json({
      totalProducts,
      lowStockItems,
      recentMovements24h: recentMovements,
      lowStockProducts
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});








const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
