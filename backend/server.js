import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async(req, res) => {
    const product = req.body; //user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message : "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(200).json({success : true, message: "New product added", data: newProduct});
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
} );

// delete method
app.delete("/api/products/:id", async(req, res)=>{
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(300).json({succes: true ,message: "Product Deleted" })
    } catch (error) {
        console.log("Error in deleting this product, error message: ", error.message);
        res.status(404).json({success: false, message: "Product not found"})
    }
});
//get all products

app.get("/api/products", async(req, res)=>{

    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Error fetching all products", error.message);
    }
})

console.log(process.env.MONGO_URI);
app.listen(5001, () => {
    connectDB();
    console.log("Server started at http://localhost:5001 ")
})
