import React, { useState } from "react";
import {json, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import SignUpForm from "./SignUp";
import { Box, Modal } from "@mui/material";
import './/Css/LogIn.css';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {BsPeople, BsLock, Bs0Circle} from "react-icons/bs";




const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("0")
    const [showSignUp, setShowSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async e => {
        //alert("Missing Username/Password")
        //e.preventDefault();

        axios
            .post(
                'https://outages-db.herokuapp.com/API/user/login',
                    {
                        user_email: email,
                        user_password: password
                    },

                {
                    params: { 'api-version': '3.0' },
                    headers: {
                        'content-type': 'application/json'
                    },
                }
            )
            .then(function (response) {
                //console.log(response.data[0]);
                setUser(response.data)  //user id gets generated
                //console.log(user)
                localStorage.setItem('user', response.data) //cookie
                alert("Log-in successful.")
                window.location.reload(false)
            })
            .catch(function (error) {
                console.error(error);
                setUser("0");
                alert("Please try again.")
                navigate('/login')
            });
        navigate('/')

//setUser(data)
        // store the user in localStorage
        //localStorage.setItem('user', data)
    };

    const signupOpenClose = () => {
        setShowSignUp((prevState) => {
            return !prevState
        })
    }

    const handleShowPassword = () => {
        setShowPassword((prevState) => {return !prevState})
    }

// if there's a user show the message below
//     if (user) {
//         return <div>
//
//             {email} is loggged in
//         </div>;
//     }

    // if there's no user, show the login form
    return (
        <>
        <div className="form-container" onSubmit={() =>handleSubmit()}>
            <form className="form">
                <div className="email">
                    <label className="user-div1" htmlFor="username">Email: </label>
                    <div className="user-div2">
                        <BsPeople className="user-icon"/>
                        <input
                            id = "email"
                            className="email-input"
                            type="username"
                            value={email}
                            placeholder="enter your email"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>

                </div>
                <div className="password">
                    <label className="pass-div1" htmlFor="password">Password: </label>
                    <div className="pass-div2">
                        <BsLock className="lock-icon"/>
                        <input
                            id = "password"
                            className="password-input"
                            type= {showPassword ? "text" : "password"}
                            value={password}
                            placeholder="enter a password"
                            onChange={({target}) => setPassword(target.value)}
                        />
                        {showPassword ? (
                            <AiOutlineEye onClick={handleShowPassword}/>
                        ) : (
                            <AiOutlineEyeInvisible onClick={handleShowPassword} />
                        )}
                        
                    </div>

                </div>

                <div>
                     <button className="submit-btn" type="submit">Login</button>
                </div>

                <div className="footer-signin">
                    <div>
                        <button className="signup-btn"  type="button" onClick={signupOpenClose}>Sign Up</button>
                    </div>

                    <div className="sign-up-form">
                        {/* <Modal open={showSignUp} onClose={signupOpenClose}
                               sx={{
                                   top: window.innerWidth > 730 ? '30%' : '10%',
                                   left: window.innerWidth > 730 ? '30%' : '10%',
                                //    transform: 'translate(-50%, -50%)'
                               }} >
                            <SignUpForm close={signupOpenClose}/>
                        </Modal> */}

                    </div>

                    {/*<div>*/}
                    {/*    <button className="forgot-btn" type="button">Forgot Password?</button>*/}
                    {/*</div>*/}
                </div>

            </form>
        </div>
        <Modal open={showSignUp} onClose={signupOpenClose}
                sx={{
                    top: '10%',
                    display: 'flex',
                    justifyContent: 'center'
                }} >
            <SignUpForm close={signupOpenClose}/>
        </Modal>
        </>
    );
};

export default LogIn;