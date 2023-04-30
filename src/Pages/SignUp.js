import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { Check, CheckBox } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconBase } from "react-icons";

const SignUpForm = ({ close }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [successSignUp, setSuccessSignUp] = useState(false);

  const dbUrl = "https://outages-db.herokuapp.com/";
  const userApi = dbUrl + "API/user";

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
    }

    let userData = JSON.stringify({
      user_email: email,
      user_password: password,
      user_name: username,
      user_type: "user",
      user_phone: phone,
    });

    fetch(userApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: userData,
    })
      .then(() => {
        setSuccessSignUp(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const closeForm = () => {
    close();
  };

  return (
    <Box
      sx={{ padding: "10px", backgroundColor: "whitesmoke", width: "25vw" }}
    >
      {successSignUp ? (
        <>
          <h3 style={{ color: "green" }}>User successfully created.</h3>
          <button onClick={closeForm}>Close</button>
        </>
      ) : (
        <Stack direction={"column"} sx={{marginTop:"20px", marginLeft:"10px", marginRight:"10px", marginBottom:"20px"}}>
          <h2 style={{ marginBottom: "5px" }}>Let's sign you up!</h2>
          <h5 style={{ marginBottom: "20px", color: "grey" }}>
            Welcome to the app
          </h5>

          <TextField
            id="name"
            type="text"
            label="Full Name:"
            value={username}
            size="small"
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="email"
            type="email"
            label="Email:"
            value={email}
            size="small"
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          <TextField
            id="phone"
            type="text"
            label="Phone Number:"
            value={phone}
            size="small"
            onChange={(e) => setPhone(e.target.value)}
            sx={{ marginBottom: "20px" }}
            maxLength={10}
          />

          <FormControl variant="outlined" sx={{marginBottom:"20px"}}>
            <InputLabel htmlFor="password">Password:</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                !showPassword ? (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <VisibilityOffIcon />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
              label="Password:"
              value={password}
              size="small"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl variant="outlined" sx={{marginBottom:"20px"}}>
            <InputLabel htmlFor="confirmPassword">Confirm Password:</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                !showConfirmPassword ? (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      <VisibilityOffIcon />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
              label="Confirm Password:"
              value={confirmPassword}
              size="small"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          {!passwordsMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <Button variant="contained" onClick={handleSignUp} sx={{backgroundColor: "#773deb", marginBottom:"10px"}}>Sign Up</Button>
          <Button variant="outlined" onClick={closeForm}>Cancel</Button>
        </Stack>
      )}
    </Box>
  );
};

export default SignUpForm;
