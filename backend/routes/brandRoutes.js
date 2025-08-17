
import { Router } from "express";
import authenticate from "../middleware/auth.js";
import User from "../models/User.js";
import Products from "../models/Products.js";

const router = Router();

// Brand dashboard route
router.get("/", authenticate, async (req, res) => {
  try {
    if (req.user.type !== 'brand') {
      return res.status(403).json({ message: "Access denied. Brand only." });
    }

    const brand = await User.findById(req.user.id);
    res.json({
      message: `Welcome ${req.user.type}! Your user ID is ${req.user.id}`,
      user: brand
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching brand data" });
  }
});

// Brand dashboard data
router.get("/dashboard", authenticate, async (req, res) => {
  try {
    if (req.user.type !== 'brand') {
      return res.status(403).json({ message: "Access denied. Brand only." });
    }

    // Get brand's products
    const products = await Products.find({ brandId: req.user.id });
    
    // Mock stats for now - you can calculate these from actual data
    const stats = {
      totalProducts: products.length,
      totalRevenue: Math.floor(Math.random() * 50000) + 20000,
      totalCreators: Math.floor(Math.random() * 100) + 50,
      conversionRate: (Math.random() * 5 + 2).toFixed(1)
    };

    res.json({
      stats,
      products: products.map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock || 100,
        creatorsPromoting: Math.floor(Math.random() * 20) + 5,
        totalSales: Math.floor(Math.random() * 200) + 50,
        image: product.image || product.productImage
      }))
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

// Get creator requests
router.get("/requests", authenticate, async (req, res) => {
  try {
    if (req.user.type !== 'brand') {
      return res.status(403).json({ message: "Access denied. Brand only." });
    }

    // Mock creator requests - replace with actual database queries
    const creatorRequests = [
      {
        id: 1,
        creator: "Jane Smith",
        handle: "@janesmith",
        followers: "125K",
        product: "Premium Wireless Headphones",
        requestedAt: "2 hours ago",
        status: "pending"
      },
      {
        id: 2,
        creator: "Mike Johnson",
        handle: "@mikej",
        followers: "89K",
        product: "Smart Fitness Tracker",
        requestedAt: "1 day ago",
        status: "pending"
      },
      {
        id: 3,
        creator: "Sarah Wilson",
        handle: "@sarahw",
        followers: "67K",
        product: "Sustainable Water Bottle",
        requestedAt: "3 days ago",
        status: "approved"
      }
    ];

    res.json(creatorRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching creator requests" });
  }
});

// Add product
router.post("/products", authenticate, async (req, res) => {
  try {
    if (req.user.type !== 'brand') {
      return res.status(403).json({ message: "Access denied. Brand only." });
    }

    const { name, description, price, category, image, stock } = req.body;
    
    const product = new Products({
      name,
      description,
      price,
      category,
      image: image || productImage,
      stock: stock || 100,
      brandId: req.user.id,
      sellerId: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

// Update product
router.put("/products/:id", authenticate, async (req, res) => {
  try {
    if (req.user.type !== 'brand') {
      return res.status(403).json({ message: "Access denied. Brand only." });
    }

    const product = await Products.findOneAndUpdate(
      { _id: req.params.id, brandId: req.user.id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// Delete product
router.delete("/products/:id", authenticate, async (req, res) => {
  try {
    if (req.user.type !== 'brand') {
      return res.status(403).json({ message: "Access denied. Brand only." });
    }

    const product = await Products.findOneAndDelete({
      _id: req.params.id,
      brandId: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

// Approve/decline creator requests
router.put("/requests/:id", authenticate, async (req, res) => {
  try {
    if (req.user.type !== 'brand') {
      return res.status(403).json({ message: "Access denied. Brand only." });
    }

    const { status } = req.body;
    
    // Mock response - replace with actual database update
    res.json({ 
      message: `Request ${status} successfully`,
      requestId: req.params.id,
      status 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating request" });
  }
});

export default router;
