import Product from "../models/ProductModel.js";

import mongoose from "mongoose";

export const getAllProductsController = async (req, res) => {
  try {
    const { _sort = "id", _order = "ASC", _start = 0, _end = 10 } = req.query;
    const start = Number(_start);
    const end = Number(_end);
    const limit = end - start;
    const sortField = _sort === "id" ? "_id" : _sort;
    const sortOrder = _order.toUpperCase() === "DESC" ? -1 : 1;
    const products = await Product.find()
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(limit);
    const total = await Product.countDocuments();
    res.set(
      "Content-Range",
      `products ${start}-${start + products.length - 1}/${total}`,
    );
    res.set("Access-Control-Expose-Headers", "Content-Range");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProductController = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
