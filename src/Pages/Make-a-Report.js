import React, {Component, useEffect, useState} from "react";
import axios from "axios";

// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function Report() {

    const [user, setUser] = useState(-1)


    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);

        } else {
            setUser(0)
        }
    }, [])
        return(
            <div><header textAlign="center" size="huge" color="black">Report Page</header>
            </div>
        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default Report;