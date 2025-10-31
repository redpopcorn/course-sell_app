 import jwt from "jsonwebtoken"
//will complete this code later
 function usermiddleware(req,res,next){
    const authHeader = req.headers.authorization;
      if(!authHeader || !authHeader.startsWith("Bearer ")){
         return res.status(401).json({errors:"Unauthorized access"})
 }
 const token = authHeader.split(" ")[1];
 try{
    const decoded = jwt.verify(token,config.JWT_USER_PASSWORD);
    req.userId = decoded.id;
    next();
 } catch(error){
    return res.status(401).json({errors:"Invalid token"});
console.log("Invalid token or expired token:"+error)

 }}
