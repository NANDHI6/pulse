import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import api from "../../HTTPHandler/axiosConfig";
import { toast } from "react-toastify";

import "../LoginPage/login.css";

export default function Register() {
  // const defaultValues = {
  //   RoleId: "-1",
  //   Password: "",
  //   Email: "",
  // };
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    createUser(data); //(like making network requests).
  };

  const createUser = async (data) => {
    try {
      const response = await api.post("/user/create", data); //data will passes in the request body this lines send the req to url endpoint
      // window.alert(response);
      console.log(response);
      toast.success("Successfully Registerd! ");
      reset();
    } catch (e) {
      // console.log(e);
      toast.error(e);
    }
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
            {/* adding text on the browser */}
            <Typography variant="h3" padding={3} textAlign={"center"}>
              Register
            </Typography>

            <TextField
              type="text"
              variant="outlined"
              label="Email"
              name="Email"
              error={!!errors.Email}
              helperText={errors.Email?.message}
              {...register("Email", { required: true })}
              sx={{ width: "300px", height: "100px", marginBottom: "10px" }}
            />

            <TextField
              type="password"
              variant="outlined"
              label="Password"
              name="Password"
              error={!!errors.Email}
              helperText={errors.Email?.message}
              {...register("Password", { required: true })}
              fullWidth
              sx={{ width: "300px", height: "100px", marginBottom: "10px" }}
            />

            <Select
              variant="standard"
              label="RoleId"
              name="RoleId"
              {...register("RoleId", { required: true })}
              sx={{ width: "300px", height: "100px", marginBottom: "10px" }}
            >
              {/* <MenuItem value="-1">Select</MenuItem> */}
              <MenuItem value="1">Admin</MenuItem>
              <MenuItem value="2">Employee</MenuItem>
            </Select>
            {/* Link is used in react router dom in app.js  */}
            <Button
              sx={{ marginTop: 3, borderRadius: 5 }}
              size="large"
              variant="contained"
              color="success"
              type="submit"
            >
              Register
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}
