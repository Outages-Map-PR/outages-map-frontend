import React, { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignUp = () => {
    // Perform form validation and submit data
    // Here you can implement your own logic to validate form fields,
    // handle form submission, and perform any necessary API requests
    // to sign up the user.
    // You can access the form field values from the state variables
    // (e.g., username, email, phone, password, confirmPassword).
    // You can also implement additional logic for formatting phone number,
    // verifying email format, and checking password match, etc.
    // This example just shows the basic structure of the form and its state.

    // For example, you can implement password match validation as follows:
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // Perform form submission
    // ...
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
        </label>
        <br />
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
        <br />
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
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;