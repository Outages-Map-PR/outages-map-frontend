import React, { useState } from "react";
import {json, Link, useNavigate} from "react-router-dom";
import axios from "axios";


const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("0")
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
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
            })
            .catch(function (error) {
                console.error(error);
                setUser("0");
            });
        navigate('/')
//setUser(data)
        // store the user in localStorage
        //localStorage.setItem('user', data)
    };

// if there's a user show the message below
//     if (user) {
//         return <div>
//
//             {email} is loggged in
//         </div>;
//     }

    // if there's no user, show the login form
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">User email: </label>
            <input
                type="text"
                value={email}
                placeholder="enter a username"
                onChange={({ target }) => setEmail(target.value)}
            />
            <div>
                <label htmlFor="password">password: </label>
                <input
                    type="password"
                    value={password}
                    placeholder="enter a password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LogIn;