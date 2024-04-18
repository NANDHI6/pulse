import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CheckToken, ResetPassword, loginUser } from "../../HTTPHandler/api";
import { toast } from "react-toastify";
import LandingPage from "../../Component/landingPage";
import Ad from "../../Component/Admin/ad";
import Adm from "../../Component/Admin/admin";
import Header from "../../Component/header/header";
import Footer from "../../Component/footer/footer";

function Main() {
  const navigate = useNavigate();

  // ? for auth the user
  const [auth, setAuth] = useState(false);

  // ? for error message
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ? for getting the name
  const [user, setUser] = useState({});
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.Email = user.Email;
    ResetPassword(data)
      .then((res) => {
        console.log(res);
        if (res.Status === "Success") {
          handleClose();
          // alert(res.Response?.message);
          toast.success(res.Response?.message);
          loginUser({ Email: data.Email, Password: data.Password });
        } else if (res.Status === "Failure") {
          toast.success("Wow, the stage is set!");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error logging in:", error);
      });
  };
  const Logout = () => {
    localStorage.clear("Token");
    navigate("/");
  };
  useEffect(() => {
    CheckToken()
      .then((res) => {
        if (res.Status === "Success") {
          setAuth(true);
          setUser(res.Response);
          console.log(user);
        } else {
          setAuth(false);
          // setMessage(res.data.ErrMessage);
        }
      })
      .then((err) => {
        console.log(err);
        setMessage(err);
      });
  }, []);

  return auth ? (
    <Box>
      {/* FOR USER */}
      {user.RoleId === 2 ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          color={"red"}
          flexDirection={"column"}
        >
          <Box>
            <div>
              {/* <h3>Welcome user {user.Email}</h3> */}
              <LandingPage />
            </div>
            <Button
              sx={{ marginTop: 3, borderRadius: 5 }}
              variant="contained"
              color="info"
              onClick={Logout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      ) : (
        // <div>
        //   FOR ADMIN
        //   <Box
        //     display={"flex"}
        //     justifyContent={"center"}
        //     alignItems={"center"}
        //     color={"red"}
        //     flexDirection={"column"}
        //   >
        //     <Box>
        //       {/* <h3>Welcome Admin {user.Email}</h3> */}
        //       <Ad />
        //       {/* FOR SHOWIN THE MAIN PAGE OF NANDHINI */}
        //       {/* <LandingPage /> */}

        //       <Button
        //         sx={{ marginTop: 3, borderRadius: 5 }}
        //         variant="contained"
        //         color="info"
        //         onClick={Logout}
        //       >
        //         Logout
        //       </Button>
        //     </Box>
        //   </Box>
        // </div>
        <>
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <Adm />
          </div>
          <div className="footer">
            <Footer />
          </div>
        </>
      )}

      {user.IsFirstLogin === 1 ? (
        <Modal open={open}>
          <Box marginTop={20}>
            {console.log(user)}
            {console.log(user.IsFirstLogin === 1)}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                display={"flex"}
                height={350}
                flexDirection={"column"}
                maxWidth={400}
                justifyContent={"center"}
                alignItems={"center"}
                margin={"auto"}
                padding={5}
                borderRadius={9}
                bgcolor={"#bebebe"}
              >
                <Typography
                  variant="h4"
                  padding={3}
                  textAlign={"center"}
                  fontWeight={700}
                >
                  Reset Password
                </Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  label="Password"
                  name="Password"
                  {...register("Password")}
                  sx={{ width: "300px", marginBottom: "10px" }}
                />
                <TextField
                  type="password"
                  variant="outlined"
                  label="Confirm Password"
                  name="ConfirmPassword"
                  {...register("ConfirmPassword")}
                  sx={{ width: "300px", marginBottom: "10px" }}
                />

                <Button
                  sx={{ marginTop: 3, borderRadius: 5 }}
                  size="large"
                  variant="contained"
                  color="success"
                  type="submit"
                  //onClick={handleClose}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      ) : (
        <div></div>
      )}
    </Box>
  ) : (
    <Box>{message}</Box>
  );
}

export default Main;
