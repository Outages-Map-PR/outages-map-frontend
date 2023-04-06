import React, {Component, useEffect, useState} from "react";


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
        setUser(0);
        localStorage.clear();
    };


        return(
            <div>
                <p>{user}</p>
                <iframe width='1370rem' height='500rem' src="https://outages-db.herokuapp.com/map/home/none" />
            </div>
        )
    }

//CHANGE TO AUTH FUNCTION LATER
export default Home;