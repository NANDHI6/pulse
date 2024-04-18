import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";

function Forgot() {
  const [email, setEmail] = useState(""); // State to hold the email input
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update local state
    setValue("Email", event.target.value); // Update React Hook Form state
  };

  const onSubmit = async (data) => {
    try {
      // Assuming data.Email has the latest email value
      await new Promise((resolve) => setTimeout(resolve, 1000));
      swal.fire({
        icon: "success",
        title: "Password reset link sent!",
        text: `An email has been sent to ${email} with instructions to reset your password.`,
      });
    } catch (error) {
      swal.fire({
        icon: "failed",
        title: "Password reset link sent!",
        text: `An email has been sent to ${email} with instructions to reset your password.`,
      });
    }
  };

  return (
    <Box>
      <Box marginTop={20}>
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
            <Typography
              variant="h4"
              padding={3}
              textAlign={"center"}
              marginBottom={6}
            >
              Reset password
            </Typography>
            <TextField
              type="email"
              variant="outlined"
              label="Email"
              name="Email"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              value={email}
              onChange={handleEmailChange}
              sx={{ width: "300px", marginBottom: "10px" }}
              error={Boolean(errors.Email)}
              helperText={errors.Email && errors.Email.message}
            />
            <Button
              sx={{ marginTop: 3, borderRadius: 5 }}
              size="large"
              variant="contained"
              type="submit"
            >
              Send Password Reset Link
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Forgot;
