import React, {Component, useEffect, useState} from "react";
import {Button, Container, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function Home() {

    const [user, setUser] = useState(localStorage.getItem('user'))

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(!loggedInUser) {
            setUser(0)
        }
    }, [])

    const handleLogout = () => {
        setUser();
        localStorage.clear();
    };


        return(
            <div>
                <Header textAlign="center" size="huge" color="black">TEST, THIS IS A TEST</Header>
                <p>{user}</p>
                <iframe width={800} height={600} src="http://127.0.0.1:5000/components" />
                <button onClick={handleLogout}>logout</button>
            </div>
        )
    }

//CHANGE TO AUTH FUNCTION LATER
export default Home;