import mongoose from "mongoose";
const movementSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      default: () => `TEMP_PROD_${Math.floor(Math.random() * 10000)}`, //just for testing untie module products is ready
    },
    processType: {
      type: String,
      required: true,
      enum: {
        values: ["in", "out"],
        message: "The Type Of Process must is out or in",
      },
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
movementSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updateAt: Date.now() });
  next();
});
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
  
  findAll = async () => {
    return await Movement.find({});
  };

  findById = async (id) => {
    return await Movement.findById(id);
  };

  create = async (obj) => {
    const movement = new Movement(obj);
    return await movement.save();
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
