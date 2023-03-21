import React, { useState } from "react";
import axios from "axios";

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { "user_email": username,
            "user_password": password };
        // send the username and password to the server
        const response = await axios.post(
            "http://outagesdb-env.eba-vbt56isk.us-east-1.elasticbeanstalk.com/API/user/login",
            user
        );
        // set the state of the user
        setUser(response.data)
        // store the user in localStorage
        localStorage.setItem('user', response.data)
        console.log(response.data)
    };

// if there's a user show the message below
    if (user) {
        return <div>{username} is loggged in</div>;
    }

    // if there's no user, show the login form
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                value={username}
                placeholder="enter a username"
                onChange={({ target }) => setUsername(target.value)}
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