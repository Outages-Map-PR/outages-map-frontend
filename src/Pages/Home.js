import React, {Component, useEffect, useState} from "react";
import axios from "axios";


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function Home() {

    const [user, setUser] = useState("0")
    const [outages, setOutages] = useState([])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(!loggedInUser) {
            setUser("0")
        } else {
            setUser(loggedInUser)
        }
        axios.options('https://outages-db.herokuapp.com/API/outagesmap')
            .then(function (response) {
                setOutages(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [])




        return(
            <div>
                <iframe type="outage_map" width='1370rem' height='500rem' src="https://outages-db.herokuapp.com/map/home/none" />
                {/*{outages.map((outage)=> {*/}
                {/*    return (*/}
                {/*        <p>{outage.outage_type}, {outage.outage_source}, {outage.outage_company}</p>*/}
                {/*    )})}*/}
            </div>
        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default Home;