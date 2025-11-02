
import express from "express";
import {createCourse, updateCourse,deleteCourse,getCourses,courseDetail,buyCourses} from "../controllers/course.controller.js"
import usermiddleware from "../middlewares/user.mid.js";
import { Course } from "../models/course.model.js";
import adminMiddleware from "../middlewares/admin.mid.js";
const router = express.Router();

router.post("/create",adminMiddleware,createCourse);  
router.put("/update/:courseId",adminMiddleware,updateCourse);
router.delete("/delete/:courseId",adminMiddleware,deleteCourse);
router.get("/courses",getCourses);
router.get("/courseid",courseDetail);

router.post("/buy/:courseId",usermiddleware,buyCourses);
export default router;
