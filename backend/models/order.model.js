import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
email: String,
userId:String,
courseId: String,
amount: Number,
paymentId: String,
status: String,
});
 
export const Order = mongoose.model("Order", orderSchema);