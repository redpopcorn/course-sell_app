import Home from "./components/Home";
import Login from "./components/login";  // Changed to uppercase 'Login'
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App;

