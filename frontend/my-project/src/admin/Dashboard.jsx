import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-orange-500 mb-4 text-center">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Welcome back, {admin?.admin?.firstName || "Admin"}! Manage your courses and content here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/create-course"
            className="flex flex-col items-center justify-center bg-gray-700 hover:bg-orange-600 transition-colors p-6 rounded-lg shadow-md group cursor-pointer"
          >
            <div className="text-4xl mb-3 text-orange-500 group-hover:text-white">➕</div>
            <span className="text-xl font-bold">Create Course</span>
            <span className="text-gray-400 text-sm mt-1 text-center">
              Add a new course to your catalog
            </span>
          </Link>

          <Link
            to="/admin/our-courses"
            className="flex flex-col items-center justify-center bg-gray-700 hover:bg-orange-600 transition-colors p-6 rounded-lg shadow-md group cursor-pointer"
          >
            <div className="text-4xl mb-3 text-orange-500 group-hover:text-white">📚</div>
            <span className="text-xl font-bold">Our Courses</span>
            <span className="text-gray-400 text-sm mt-1 text-center">
              View, edit, or delete existing courses
            </span>
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
