import{User} from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from"jsonwebtoken";
import { z } from "zod";

export const signup = async(req,res)=>{
    const {firstName, lastName,email,password} = req.body;


const userSchema = z.object({
  firstName: z.string().min(3, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(3, { message: "Last name must be at least 2 characters long" }),
  email: z.email(),//this needs to be resolved later
  password: z.string().min(6, { message: "Password must be at least 8 characters long" }),
});

const validatedData = userSchema.safeParse(req.body);
if (!validatedData.success) {
  return res.status(400).json({ errors: validatedData.error.errors });
}
    const hashedPassword =await bcrypt.hash(password,10)
try{
    const existingUser= await User.findOne({email: email});
    if(existingUser){
        return res.status(400).json({errors: "Email already exists"});
    }
const newUser = new User({firstName, lastName, email, password:hashedPassword});
await newUser.save();
res.status(201).json({message:"Signup succeedded",newUser});
} catch(error){
    res.status(500).json({ errors: "Error in signup"});
    console.log("Error in signup",error);
}
};

export const login = async(req,res)=>{
const {email,password} = req.body;
try{
    const user = await User.findOne({email: email});
const isPasswordCorrect = await bcrypt.compare(password,user.password);
if(!user ||!isPasswordCorrect){
    return res.status(403).json({errors:"Invalid credentials"});
}
//jwt code   
// generating token
const token = jwt.sign({
    id: user_id,
    


},config.JWT_USER_PASSWORD,{expiresIn: "1d" });
//cookies
const cookieOptions={
    expires: new Date(Date.now()+ 24*60*60*1000),   
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", 
}
res.cookie("jwt",token);

res.status(201).json({message: "Login Succesfully",user,token});
}catch (error){
    res.status(500).json({errors: "Error in login"});
console.log("Error in login",error);
}
};

export const logout =(req,res)=>{
   try{
    res.clearCookie("jwt");
    res.status(200).json({message: "Logged out succesfully"});
} catch(error){
    res.status(500).json({ errors: "Error in logout"});
    console.log("Error in logout",error);
}
}