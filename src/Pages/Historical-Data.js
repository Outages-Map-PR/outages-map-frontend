import React, {Component, useEffect, useState} from "react";
import axios from "axios";



//AUTH FUNCTION WITH DATABASE DATA FOR USER


function HistoricalData() {

    const [user, setUser] = useState(-1)
    const [outages, setOutages] = useState([])


    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);

        } else {
            setUser(0)
        }

        axios.patch('https://outages-db.herokuapp.com/API/outagesmap')
            .then(function (response) {
                setOutages(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [])

        return(
            <div>
                <h1>Historical Data Placeholder</h1>
                {outages.map((outage)=> {
                    return (
                        <p>{outage.outage_type}, {outage.outage_source}, {outage.outage_company}</p>
                    )})}
            </div>
        )
}


//CHANGE TO AUTH FUNCTION LATER
export default HistoricalData;