import React, {Component, useEffect, useState} from "react";
import axios from "axios";


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function RecentReports() {

    const [user, setUser] = useState("0")
    const [outages, setOutages] = useState([])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            setUser(loggedInUser);
        } else {
            setUser("0")
        }
        axios.get('https://outages-db.herokuapp.com/API/outagesmap')
            .then(function (response) {
                setOutages(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [])
        return(
            <div>
                <header textAlign="center" size="huge" color="black">Recent Reports Page</header>
                {/*{outages.map((outage)=> {*/}
                {/*    return (*/}
                {/*        <p>{outage.outage_type}, {outage.outage_source}, {outage.outage_company}</p>*/}
                {/*    )})}*/}
            </div>
        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default RecentReports;