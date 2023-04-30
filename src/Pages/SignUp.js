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


const SignUpForm = ({close}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [successSignUp, setSuccessSignUp] = useState(false)
  const [user, setUser] = useState(0)


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
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: userData
    })
    .then((response) => {
      setSuccessSignUp(true)
      localStorage.setItem('user', response.data) //cookie
    })
    .catch((e) => {
      console.log(e)
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
          <h3 style={{ color: 'green' }}>User successfully created.</h3>
          <button id="close" onClick={closeForm}>Close</button>
        </>
       :
        <Stack direction={'column'}>
        <h2>Sign Up</h2>
            <label>
              Full Name:
              <input
                type="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
              />
            </label>
            <label>
              Password:
              <input
                  id="password1"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input

                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show
            </label>
            <label>
              Confirm Password:
              <input
                  id="password2"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            {!passwordsMatch && (
              <p style={{ color: 'red' }}>Passwords do not match</p>
            )}
          <button id="sign-up" onClick={handleSignUp}>Sign Up</button>
          <button onClick={closeForm}>Cancel</button>
      </Stack>}
    </Box>
  );
};

export default SignUpForm;
