import Home from "./components/Home.jsx";
import login from "./components/login.jsx";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
  <div>
    <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path ="/login" element ={<Login/>}/>
      <Route path ="/Signup" element ={<Signup/>}/>

    </Routes>
  </div>
  );
}

export default App

