import React from "react";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Adm from "./admin";

const Ad = () => {
  return (
    <div className="main">
      <div className="grid-container">
        <div className="header">
          <Header />
        </div>
        <div className="navbar">
          {/* <Navbar /> */}
          <Adm />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Ad;
