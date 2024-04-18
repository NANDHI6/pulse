import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "./pages/LoginPage/loginpage";
import Register from "./pages/RegisterPage/register";
import Main from "./pages/MainPage/main";
import Forgot from "./pages/ForgotPassPage/forgot.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./Component/landingPage.js";
import Project from "./project/project.js";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          {/* forgot pass */}

          <Route path="/forgotpass" element={<Forgot />} />
          <Route path="/page" element={<LandingPage />} />
          {/* <Route path="/adminpage" element={<adm/>} /> */}
          {/* <Route path="/page" element={<LandingPage />} /> */}

          {/* external app */}
          <Route path="/project" element={<Project />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
