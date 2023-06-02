import mongoose from 'mongoose';
import Furniture from "../models/furniture.js";
import User from "../models/user.js";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Furniture' },
    productName: String,
    productPrice: Number,
    quantity: Number
  });
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;