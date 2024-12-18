import { MongoGCPError } from "mongodb";
import mongoose from "mongoose"

const prodSchema = new mongoose.Schema({
    name : {type: String, required : true},
    price : {type: Number, required : true},
    image : {type: String, required: true},
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;