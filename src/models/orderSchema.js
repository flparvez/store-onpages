import { Schema, model, models } from "mongoose";


const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  
 user: { type:String,required:true },
//  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

 products: [],  // Array of product details

    total: { type: Number},

    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentType: { type: String, enum: ['full', 'partial', ]},
    transaction: { type: String, required: true },
    ordertrack: { type: String, default: '/test/order' },
    // add
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from name

const Order = models.Order || model("Order", orderSchema);

export default Order;
