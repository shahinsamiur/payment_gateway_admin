"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  rememberMe: yup.boolean(),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const user = {
        email: data.email,
        password: data.password,
        device_name: window.navigator.userAgent,
      };

      const result = await signIn("credentials", {
        ...user,
        redirect: false,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.data?.message || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingY: 3,
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          Admin Login
        </Typography>
        <Typography align="center" mb={2}>
          Welcome back! Please sign in to continue.
        </Typography>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <div>
            <Typography variant="body1">Email Address</Typography>
            <OutlinedInput
              size="small"
              {...register("email")}
              placeholder="Enter your email"
              fullWidth
              error={!!errors.email}
            />
            <FormHelperText error>{errors.email?.message}</FormHelperText>
          </div>

          <div>
            <Typography variant="body1">Password</Typography>
            <div style={{ position: "relative" }}>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                size="small"
                {...register("password")}
                placeholder="Password"
                fullWidth
                error={!!errors.password}
              />
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{
                  position: "absolute",
                  right: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {!showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
            <FormHelperText error>{errors.password?.message}</FormHelperText>
          </div>

          <FormControlLabel
            control={<Checkbox {...register("rememberMe")} color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
          >
            Sign In
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default LoginPage;
