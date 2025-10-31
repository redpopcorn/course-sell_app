
import express from "express";
import {createCourse, updateCourse,deleteCourse,getCourses,courseDetail,buyCourses,usermiddleware} from "../controllers/course.controller.js"
import { Course } from "../models/course.model.js";
const router = express.Router();

router.post("/create",createCourse);  
router.put("/update/:courseId",updateCourse);
router.delete("/delete/:courseId",deleteCourse);
router.get("/courses",getCourses);
router.get("/courseid",courseDetail);

router.post("/buy/:courseId",usermiddleware,buyCourses);
export default router;
