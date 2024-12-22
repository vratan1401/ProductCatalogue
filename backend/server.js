import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";


dotenv.config();
const app = express();
app.post("/api/products", async(req, res) => {
    const product = req.body; //user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({succes: false, message : "Please provide all fields"});
    }

    const newProduct = newProduct(product);

    try {
        await newProduct.save();
        res.status(200).json({succes : true, message: "New product added", data: newProduct});
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
} );

console.log(process.env.MONGO_URI);
app.listen(5001, () => {
    connectDB();
    console.log("Server started at http://localhost:5001 ")
})
