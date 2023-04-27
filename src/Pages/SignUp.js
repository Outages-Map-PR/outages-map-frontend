import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';

const SignUpForm = ({close}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [successSignUp, setSuccessSignUp] = useState(false)

  const dbUrl = 'https://outages-db.herokuapp.com/'
  const userApi = dbUrl + 'API/user'

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false)
      return
    }
    else {
      setPasswordsMatch(true)
    }

    let userData = JSON.stringify({
      "user_email": email,
      "user_password": password,
      "user_name": username,
      "user_type": "user",
      "user_phone": phone
    })

    fetch(userApi, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: userData
    })
    .then(() => {
      setSuccessSignUp(true)
    })
    .catch((e) => {
      console.log(e)
    })
  };

  const closeForm = () => {
    close()
  }

  return (
    <Box sx={
        {padding: '10px',
        backgroundColor: 'whitesmoke',
        maxWidth: '30vw'}}>
      {successSignUp ? 
        <>
          <h3 style={{ color: 'green' }}>User successfully created.</h3>
          <button onClick={closeForm}>Close</button>
        </>
       :
        <Stack direction={'column'}>
        <h2>Sign Up</h2>
            <label>
              Full Name:
              <input
                type="text"
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
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
              />
            </label>
            <label>
              Password:
              <input
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
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            {!passwordsMatch && (
              <p style={{ color: 'red' }}>Passwords do not match</p>
            )}
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={closeForm}>Cancel</button>
      </Stack>}
      
    </Box>
  );
};

export default SignUpForm;