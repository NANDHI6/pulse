import React from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import "./lpage.css";
import Header from "./header/header";
import Main from "./Container/main";

export default function LandingPage() {
  return (
    <div className="main">
      <div className="grid-container">
        <div className="header">
          <Header />
        </div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Main />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
