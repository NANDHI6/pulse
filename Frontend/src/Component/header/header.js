import React from "react";
import "./header.css";
import Pozent from "./Pozent.jpg";
import profile from "./pro.png";

export default function Header() {
  return (
    <div className="head">
      <div className="items">
        <div className="logo">
          <img src={Pozent} alt="" className="logo" />
        </div>
        <div className="title">ATTENDANCE MANAGEMENT SYSTEM</div>
        <div className="profile">
          {/* <div className="dropdown">
            <select>
              <option>user</option>
              <option>Admin</option>
            </select>
          </div> */}
          <img src={profile} alt="" className="logopro " />
        </div>
      </div>
    </div>
  );
}
