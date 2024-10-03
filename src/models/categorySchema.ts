// models/Category.ts
import  { Schema, model,models  } from 'mongoose';



const categorySchema = new Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: { type: String },
  image: { type: String },
 user : { type: Schema.Types.ObjectId, ref: 'User'}
  // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

},{timestamps:true});

const Category = models.Category || model("Category",categorySchema);
export default Category;
