import Furniture from "../models/furniture.js";
import user from "../models/user.js";
console.log("Retrieved products from the database:");
const productsController = {

    viewAllProducts: async (req, res) => {
      try {
        console.log("Inside viewAllProducts");

        // Retrieve all products from the database
        const products = await Furniture.find();

        console.log("Retrieved products from the database:", products);

        products.forEach((product) => {
          if (product.photo && product.photo.length > 0) {
            product.imagePath = product.photo.map((photo)=>photo.replace(/\\/g, '/').replace('public/',''));
          }
        });
  
        // Render the "products" view and pass the products data
        res.render("products", {  products, imagePath: products[0].imagePath  });
      } 
      catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products:", error);
        res.render("404", { message: "Failed to retrieve products" });
      }
    },
    LowInStock: async (req, res) => {
      try {
        console.log("Inside LowInStock");
    
        // Retrieve products with quantities less than 10 from the database
        const lowStock = await Furniture.find({ quantity: { $lt: 10 } });
    
        console.log("Retrieved low stock products from the database:", lowStock);
    
        lowStock.forEach((product) => {
          if (product.photo && product.photo.length > 0) {
            product.imagePath = product.photo.map((photo) =>
              photo.replace(/\\/g, "/").replace("public/", "")
              
            );
            console.log(product.photo)
          }
        });
      
          // For other routes under /admin, render the same view but pass the lowStock and imagePath
          res.render("dashboard", {lowStock, imagePath: lowStock[0].imagePath,});  
     
        } 
        catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving low stock products:", error);
        res.render("404", { message: "Failed to retrieve low stock products" });
      }
    },
    Offers: async (req, res) => {
      try {
        console.log("Inside offers");
    
        // Retrieve products with quantities less than 10 from the database
        const offers = await Furniture.find({ offer: { $exists: true, $ne: null } });
    
        console.log("Retrieved products with offers from the database:", offers);
    
        offers.forEach((product) => {
          if (product.photo && product.photo.length > 0) {
            product.imagePath = product.photo.map((photo) =>
              photo.replace(/\\/g, "/").replace("public/", "../")
            );
            console.log( "offer", product.photo);
          }
        });
    
        res.render("offers", {  offers , imagePath: offers[0].imagePath,});
      } catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products with offers:", error);
        res.status(500).render("404", { message: "Failed to retrieve products with offers" });
 
      }
    },
    viewAllUsers: async(req,res)=>{
      try{
        console.log(" inside viewAllUsers");
        const Users = await user.find();
        console.log("Retrived User from database: ", Users);
    
        res.render('customers',{Users});

      }
      catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products:", error);
        res.render("404", { message: "Failed to retrieve products" });
      }
    },
    beAdmin: async(req,res)=>{
      try {
        const userId = req.params.id;
        const targetUser = await user.findById(userId);
        if (!targetUser) {
          return res.render("404", { message: "User not found" });
        }
        if (targetUser.userType === 'admin') {
          return res.render("404", { message: "User is already an admin" });
        }
        console.log(req.params.id);
        await user.findByIdAndUpdate(req.params.id, { userType: 'admin' });
        res.redirect('/admin/customers');
      } catch (error) {
        console.error("Error changing the user:", error);
        res.render("404", { message: "Failed to change the user" });
      }
      
    },
    beClient: async(req,res)=>{
      try {
        //add verifcation that the one changing from clien to admina nd vice versa is an admin
        const userId = req.params.id;
        const targetUser = await user.findById(userId);
    
    if (!targetUser) {
      return res.render("404", { message: "User not found" });
    }
    
    if (targetUser.userType === 'client') {
      return res.render("404", { message: "User is already a client" });
    }
        console.log(req.params.id);
        await user.findByIdAndUpdate(req.params.id, { userType: 'client' });
        res.redirect('/admin/customers');
      } catch (error) {
        console.error("Error changing the user:", error);
        res.render("404", { message: "Failed to change the user" });
      }
    
  },
  };
  
  export default productsController;