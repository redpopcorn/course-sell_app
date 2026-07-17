import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Admin } from "./models/admin.model.js";
import { Course } from "./models/course.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not found in environment");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to database");

  // Create admin if none exists
  let admin = await Admin.findOne({ email: "admin@coursehaven.com" });
  if (!admin) {
    const hashedPassword = await bcrypt.hash("adminpassword123", 10);
    admin = await Admin.create({
      firstName: "Default",
      lastName: "Admin",
      email: "admin@coursehaven.com",
      password: hashedPassword,
    });
    console.log("Created default admin:", admin.email);
  }

  // Define dummy courses
  const dummyCourses = [
    {
      title: "AI Development Masterclass",
      description: "Learn how to build, train, and deploy advanced artificial intelligence models using cutting-edge deep learning frameworks.",
      price: 2999,
      image: {
        public_id: "ai_course_img",
        url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60"
      },
      creatorId: admin._id
    },
    {
      title: "Python Programming: Zero to Hero",
      description: "Master Python programming from the basics of syntax to advanced OOP concepts, web frameworks, and automated scripts.",
      price: 999,
      image: {
        public_id: "python_course_img",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60"
      },
      creatorId: admin._id
    },
    {
      title: "C++ Masterclass",
      description: "Deep dive into C++ programming, memory management, pointers, and modern template programming for game dev and systems.",
      price: 1499,
      image: {
        public_id: "cpp_course_img",
        url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=60"
      },
      creatorId: admin._id
    },
    {
      title: "Data Structures & Algorithms (DSA)",
      description: "Ace your coding interviews by mastering Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, and Dynamic Programming.",
      price: 1999,
      image: {
        public_id: "dsa_course_img",
        url: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop&q=60"
      },
      creatorId: admin._id
    },
    {
      title: "LangChain & LLM Agents",
      description: "Build robust AI agents, chatbots, and document analysis applications using LangChain, OpenAI, and vector databases.",
      price: 2499,
      image: {
        public_id: "langchain_course_img",
        url: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60"
      },
      creatorId: admin._id
    }
  ];

  // Insert courses
  await Course.deleteMany({}); // Optional: clear existing first to start fresh
  const created = await Course.insertMany(dummyCourses);
  console.log(`Inserted ${created.length} courses successfully!`);

  await mongoose.disconnect();
  console.log("Disconnected from database");
}

run().catch(console.error);
