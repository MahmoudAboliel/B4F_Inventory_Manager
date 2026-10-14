import mongoose from "mongoose";
import Product from "./ProductModel.js";
const movementSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: {
        values: ["in", "out"],
        message: "The Type Of Process must is out or in",
      },
    },
    note: { type: String, required: false },
    amount: { type: Number, required: true },
    date: { type: Date, default: new Date(), required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // },
);
// movementSchema.pre("findOneAndUpdate", function (next) {
//   this.set({ updateAt: Date.now() });
//   next();
// });
const Movement = mongoose.model("Movement", movementSchema);

class MovementModel {
  findWithPagination = async (skip, limit, sortBy, order) => {
    const movements = await Movement.find({})
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const total = await Movement.countDocuments();
    return { movements, total };
  };

  findAll = async (movementQuery, sortField, sortOrder) => {
    return await Movement.find(movementQuery)
      .populate("productId", "name")
      .sort({ [sortField]: sortOrder });
  };

  findById = async (id) => {
    return await Movement.findById(id);
  };

  create = async (obj) => {
    const { productId, amount, type } = obj;
    console.log("welcome");
    const product = await Product.updateStock(productId, type, amount);
    console.log("product model");
    console.log(product);
    if (product) {
      const movement = new Movement(obj);
      const savedMovement = await movement.save();
      console.log(savedMovement);
      return savedMovement;
    } else {
      throw new Error("Product not found or stock update failed");
    }
  };

  update = async (id, obj) => {
    return await Movement.findByIdAndUpdate(id, obj, {
      new: true,
      runValidators: true,
    });
  };
  delete = async (id) => {
    return await Movement.findByIdAndDelete(id);
  };
}

export default new MovementModel();
