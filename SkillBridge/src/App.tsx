import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import HeaderComponent from "./components/Header/HeaderComponent";
import Footer from "./components/Footer/Footer";
import PricingPage from "./pages/Pricing/PricingPage";
import HomePage from "./pages/Home/Home";
import CoursePage from "./pages/Course/CoursePage";
import Contact from "./components/Contact/Contact";
import AboutPage from "./pages/About/About";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <HeaderComponent/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          
          <Route path="/home" element={<HomePage/>} />
          <Route path="/course" element={<CoursePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/pricing" element={<PricingPage/>}/>
          <Route path="/contact" element={<Contact/>}/> 
        </Routes>
        <Footer/>
      </AuthProvider>
    </div>
  );
}

export default App;
