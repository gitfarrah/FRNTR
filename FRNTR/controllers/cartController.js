
import Furniture from "../models/furniture.js";
import Cart from "../models/cart.js";
import eControlcartControllerler from "../controllers/editfurnitureController.js";
const cartController = {};

cartController.cart = async (req, res) =>{
    const { productId, productName, productPrice, productQuantity } = req.body;

    // Check if the user is authenticated
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  // Find the cart for the current user
  const cart = await Cart.findOne({ userId: req.session.userId });
  
    if (cart) {
      // If the cart already exists, find the item with the specified productId
      const item = cart.items.find(item => item.productId === productId);
  
      if (item) {
        // If the item already exists, update its quantity
        item.quantity += parseInt(productQuantity);
      } else {
        // If the item does not exist, add a new item to the cart
        cart.items.push({ productId, productName, productPrice, quantity: parseInt(productQuantity) });
      }
  
      await cart.save();
    } else {
      // If the cart does not exist, create a new cart with the item
      const newCart = new Cart({ userId: req.user._id, items: [{ productId, productName, productPrice, quantity: parseInt(productQuantity) }] });
      await newCart.save();
    }
  
      res.redirect('/cart');
      };


export default CartController;


