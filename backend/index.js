import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import fileUpload from "express-fileupload";

const app = express();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });


//middleawre
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;
// cloudinary config code
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});



try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MONGODB");
} catch (error) {
  console.log(error);
}


app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user",userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
