import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required:true },
    quantity: { type: Number ,required:true  },
    minimumQuantity: { type: Number , required:true },
    imageUrl :{type: String ,required:false},
    deletedAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true },
);

productSchema.statics.updateStock = async function (
  productId,
  processType,
  amount,
) {
  const product = await this.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  if (processType === "in") {
    product.quantity += amount;
  } else if (processType === "out") {
    if (product.quantity < amount) {
      throw new Error("Insufficient stock");
    }

    product.quantity -= amount;
  } else {
    throw new Error("Invalid process type");
  }

  await product.save();

  return product;
};

const Product = mongoose.model("Product", productSchema);

export default Product;

// Function Calling
// const updatedProduct = await Product.updateStock(
//     productId,
//     processType,
//     amount
// );
