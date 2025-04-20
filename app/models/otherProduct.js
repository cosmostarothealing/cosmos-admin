import { Schema, model, models } from "mongoose";

const otherProductSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Product type is required"],
      enum: ["Tumble stone", "Raw stone", "Reiki stone", "Worry bracelets", "Spell candles"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    img1: {
      type: String,
      required: [true, "Image 1 is required"],
    },
    img2: {
      type: String,
      required: [true, "Image 2 is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.OtherProduct || model("OtherProduct", otherProductSchema);
