import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import img from "./Am.png";
import imgbg from "./bg.png";

const Content = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState("");
  const [isBreakIn, setIsBreakIn] = useState(true);
  const [isLunchIn, setIsLunchIn] = useState(true); // New state for lunch
  const [message, setMessage] = useState("");

  const handleLoginToggle = () => {
    setIsLoggedIn((prevState) => !prevState);
    const activityType = isLoggedIn ? "logout" : "login";
    const messageText = isLoggedIn
      ? "You are successfully logged out!"
      : "You are successfully logged in!";
    const commentText = comment.trim(); // Trim the comment text
    storeActivity(activityType, messageText, commentText);
  };

  const handleActivityToggle = () => {
    setIsBreakIn((prevState) => !prevState);
    const activityType = isBreakIn ? "breakin" : "breakout";
    const messageText = isBreakIn
      ? "You have successfully broken in!"
      : "You have successfully broken out!";
    const commentText = comment.trim(); // Trim the comment text
    storeActivity(activityType, messageText, commentText);
  };

  const handleLunchToggle = () => {
    // Function to toggle lunch in/out
    setIsLunchIn((prevState) => !prevState);
    const activityType = isLunchIn ? "lunchin" : "lunchout";
    const messageText = isLunchIn
      ? "You have successfully taken lunch in!"
      : "You have successfully taken lunch out!";
    const commentText = comment.trim(); // Trim the comment text
    storeActivity(activityType, messageText, commentText);
  };

  const storeActivity = (activityType, messageText, commentText) => {
    const todaydate = new Date();
    const month = todaydate.getMonth() + 1;
    const year = todaydate.getFullYear();
    const date = todaydate.getDate();
    const currentdate = `${month}/${date}/${year}`;
    const currentTime = todaydate.toISOString().slice(11, 19);
    const email = "nandhini@gmail.com";

    const data = {
      Date: currentdate,
      Time: currentTime,
      Userid: email,
      Activity_type: activityType,
      Comments: commentText,
    };

    axios
      .post("http://localhost:8000/attendance_app", data)
      .then((response) => {
        console.log(`${activityType} time stored successfully:`, response.data);
        setMessage(messageText);
        if (activityType === "login") {
          setIsLoggedIn(true);
        } else if (activityType === "logout") {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error(`Error storing ${activityType} time:`, error);
      });
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <div className="full-con">
        <div className="cont">
          <div className="msg">
            {/* <img src={imgbg} alt="" className="logo-bg" /> */}
            <div className="c1">
              <img src={img} alt="" className="logo-wel" />
            </div>
          </div>
          <div className="login">
            <div className="activity">
              <div className="comment-box">
                <textarea
                  value={comment}
                  onChange={handleInputChange}
                  placeholder="Enter your comment"
                  className="comment-input"
                />
              </div>
              <div className="btn-div">
                <button className="login-button" onClick={handleLoginToggle}>
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
                <button className="break-button" onClick={handleActivityToggle}>
                  {isBreakIn ? "Break In" : "Break Out"}
                </button>
                <button className="lunch-button" onClick={handleLunchToggle}>
                  {isLunchIn ? "Lunch In" : "Lunch Out"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>{message && <div className="login-message">{message}</div>}</div>
      </div>
    </>
  );
};

export default Content;
