import React, {Component, useEffect, useState} from "react";


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function RecentReports() {

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
            <div><header textAlign="center" size="huge" color="black">Recent Reports Page</header>
            </div>
        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default RecentReports;