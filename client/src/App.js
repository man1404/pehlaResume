import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import {
  Routes,
  Route,
} from "react-router-dom";
import Aboutus from "./components/AboutUS/Aboutus";
function App() {
  return (
    <div className="App">
      
      
      <Routes>
            <Route path="/" element={<Header/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/Form" element = {<Form />} />
            <Route path="/About" element = {<Aboutus />} />       
        </Routes>
      <Footer />
    </div>

  );
}

export default App;
