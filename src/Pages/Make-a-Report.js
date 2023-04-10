import React, {Component, useEffect, useState} from "react";
import axios from "axios";

// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function Report() {

    const [user, setUser] = useState("0")


    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            setUser(loggedInUser);
        } else {
            setUser("0")
        }
    }, [])
        return(
            <div>
                {(user == 0 &&
                        <header textAlign="center" size="huge" color="black">
                            Please log in to make a report
                        </header>)
                || (user !== 0 &&
                        <header>
                            Make a Report
                        </header>)
                }
            </div>
        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default Report;