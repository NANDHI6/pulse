import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SetLocalStorageToken, loginUser } from "../../HTTPHandler/api";
import { toast } from "react-toastify";
import "./login.css";

export const Loginpage = () => {
  // ! USING USEFORM HOOK
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    loginUser(data)
      .then((res) => {
        console.log(res);
        if (res.Status === "Success") {
          toast.success("Get ready");
          //alert(res.Status);
          navigate("/main");
        } else {
          toast.error(res.ErrMessage);

          // alert(res.ErrMessage);
        }
      })
      .catch((error) => {
        console.log("Error logging in:", error);
      });
  };

  return (
    <div className="main">
      <div className="container">
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
            boxShadow={"8px 8px 15px #ccc"}
            sx={{
              ":hover": {
                boxShadow: "15px 15px 30px #ccc",
              },
            }}
          >
            <Typography variant="h3" padding={3} textAlign={"center"}>
              Login
            </Typography>
            <TextField
              type="email"
              variant="outlined"
              label="Email"
              name="Email"
              {...register("Email")}
              sx={{ width: "300px", height: "100px", marginBottom: "10px" }}
            />

            <TextField
              marginTop={8}
              type="password"
              variant="outlined"
              label="Password"
              name="Password"
              {...register("Password")}
              sx={{ width: "300px", height: "100px" }}
            />
            <Button
              sx={{ marginTop: 3, borderRadius: 5 }}
              size="large"
              variant="contained"
              color="success"
              type="submit"
            >
              Login
            </Button>
            <Link to="/forgotpass">
              <Button marginTop={"10px"} sx={{ marginTop: 3, borderRadius: 3 }}>
                Forgot password
              </Button>
            </Link>
          </Box>
        </form>
      </div>
    </div>
  );
};
