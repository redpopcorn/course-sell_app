

import React from 'react'
import Slider from "react-slick";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
const Home = () => {
  const[courses,setCourses]=useState([])
  useEffect(()=>{const fetchCourses= async()=>{
    try{
     const response = await axios.get("http://localhost:4002/apiv1/course/courses",{
      withCredentials:true,
     });
     console.log(response.data);
     setCourses(response.data);
    }catch(error){
      console.log("error in fetchCourses",error);

    }
  };
fetchCourses();},[]);


  return (<div className ="bg-gradient-to-right from-black to-blue-950 h-screen text-white" >
    <div>
{/* Header */}
      <header className ="flex items-center justify-between">
        <div className ="flex items-center space-x-4">
          <img src ={logo} alt ="" className="w-10 h-10 rounded-full"/>  
          <h1 className ="text-2xl text-orange-500 font-bold">CourseHaven</h1>
        </div>
        <div>
          <Link to="/login" className ="bg-transparent text-white py-2 px-4 border border-white rounded">
            Login 
          </Link>
          <Link to={"/signup"}  className ="bg-transparent text-white py-2 px-4 border border-white rounded">
            Signup
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className ="text-center py-20">
        <h1 className = "text-4xl font-semibold text-orange-500">
          Coursera
          </h1>
        
        <br/>
        <p className ="text-gray-500"> Crafted by experts</p>
        <div className ="space-x-4 margin top-8">
        <button className="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white duration-300">Explore courses</button>
        <button className ="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white duration-300">Courses videos</button>
        </div>
      </section>
      <section>section2</section>
<hr/>
      {/*Footer*/}
     <footer>
      <div className="grid grid-cols1 md:grid-cols-3">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2">
            <img src={logo} alt ="" className ="w-10 h-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold">
              CourseHaven
              </h1>
          </div>
        </div>
      </div>
     </footer>
     
    </div> 
    </div>)
}
export default Home