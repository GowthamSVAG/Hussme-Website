import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Business } from "./Components/Pages/Business";
import { Talent } from "./Components/Pages/Talent";
import { Blog } from "./Components/Pages/Blog";
import { ContactUs } from "./Components/Pages/Contactus";
import { Digital } from "./Components/Pages/Blogs/Digital-Detail";
import { Login } from "./Components/Login";
import { Reset } from "./Components/Pages/Password Reset/Reset-Password";
import { Otp } from "./Components/Pages/Password Reset/Otp";
import ScrollToTop from "./ScrollToTop";
import { UserProvider } from "./Components/Context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="container">
        <BrowserRouter>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/business" element={<Business />} />
            <Route path="/talent" element={<Talent />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/digital" element={<Digital />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<Reset/>} />
            <Route path="/otp" element={<Otp/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
