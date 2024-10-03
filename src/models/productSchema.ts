import { Schema, model, models } from "mongoose";


const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
    
      unique: true,   // Slug should be unique
    },
    description: {
      type: String,  // Rich text description (HTML)
      required: true,
    },
    price: { type: Number, required: true },
    category: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: { type: String },
    video: { type: String },
    stock: { type: Number, required: true, default: 0 },
    sold: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from name

const Product = models.Product || model("Product", ProductSchema);

export default Product;
