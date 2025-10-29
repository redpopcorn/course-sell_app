
import express from "express";
import {createCourse, updateCourse,deleteCourse,getCourses,courseDetail} from "../controllers/course.controller.js"
import { Course } from "../models/course.model.js";
const router = express.Router();

router.post("/create",createCourse);  
router.put("/update/:courseId",updateCourse);
router.delete("/delete/:courseId",deleteCourse);
router.get("/courses",getCourses);
router.get("/courseid",courseDetail);
export default router;
