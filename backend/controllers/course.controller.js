import { Course } from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js"; 
import{v2 as cloudinary} from "cloudinary";
export const createCourse = async (req, res) => {
  const { title, description, price, image } = req.body;

  try {
    if (!title || !description || !price ) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const {image} =req.files
if(!req.files|| Object.keys(req.files).length === 0){
    return res.status(400).json({ errors: "All fields are required"});
}

const allowedFormat =["image/png", "image/jpeg"]
if(!allowedFormat.includes(image.mimetype)){
    return res.status(400).json({
        errrors:"Invalid file format only png and jpeg"
    })//1️⃣ const allowedFormat = ["image/png", "image/jpeg"];This creates an array of allowed file types (called MIME types).Each file you upload (like an image) has a property called .mimetype that tells what type of file it is.
}
//cloudinary code

const cloud_response = await cloudinary.uploader.upload(image.tempFilePath)
if(!cloud_response||cloud_response.error){
    return res.status(400).json({
        errors:"Error uploading file to cloudinary"
    });
}
    const courseData = {
      title,
      description,
      price,
      image:{
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      }
    };
    const course = await Course.create(courseData);

    res.json({
      message: "Course created succesfully",
      course,
    });
  }  catch (error) {
  console.error("Error creating course:", error);
  res.status(500).json({ error: error.message || "Error creating course" });
}

};


export const updateCourse = async(req,res) =>{
  const{courseId} = req.params;
  const{title, description, price, image } = req.body;

  try{
    const course = await Course.updateOne({
      _id:courseId
    },{
      title,
      description,
      price,
      image:{
        public_id: image?.public_id ,
        url: image?.url,
      },
    },
  );
    res.status(201).json({message:"Course update successfully"});

  } catch(error){
    res.status(500).json({ error: "error in updating course"});
  
    console.log("Error in course updating",error)
  }
};

export const deleteCourse = async(req,res)=>{
  const {courseId} = req.params;
  try{
    const course = await Course.findOneAndDelete({
      _id:courseId,
    })
    if(!course){
      return res.status(404).json({error:"Course not found"})
    }
    res.status(200).json({message:"Course deleted Succesfully"})

  }catch(error){
    res.status(500).json({
      errors:"Error in course deleting"
    })
    console.log("error in course deleting",error);

  }
}
export const getCourses = async(req,res)=>{
  try{
    const courses = await Course.find({})
    res.status(201).json({courses}); 

  }catch(error){
    res.status(500).json({errors: "Error in getting courses"});
    console.log("eroor to get courses");
}
 
};

export const courseDetail = async(req,res) =>{
  const{courseId} = req.params;

  try{
    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({errors: "Course not found"});
    }
    res.status(200).json({ course });

  }catch(error){
    return res.status(500).json({errors:"Error in getting coursed details"});
    console.log("Error in couse details",error);
  }
}



export const buyCourses = async(req,res)=>{
  const{userId} = req;
  const {courseId} = req.params;

  try{
const course = await Course.findById(courseId)
if(!course){
  return res.status(404).json({error:"Course not found"});
}
const existingPurchase = await Purchase.findOne({
  userId,
  courseId
})
 if(existingPurchase){
  return res.status(400).json({error:"User has already purchased this course"}); 
}
const newPurchase = new Purchase({userId,courseId})
await newPurchase.save()
res.status(201).json({message:"Course purchased successfully",newPurchase});  
  }catch(error){
res.status(500).json({error:"Error in course buying"});
    console.log("error in course buying",error);  
  }
};