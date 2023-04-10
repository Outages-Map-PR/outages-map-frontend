import React, {Component, useEffect, useState} from "react";
import axios from "axios";

// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function Report() {

    const getUserEmail = () => {
        let url = "https://outages-db.herokuapp.com/API/user/" + user
        axios.get(url)
            .then(function (response) {
                setEmail(response.data.toString())

            })
            .catch(function (error){
                console.log(error)
            })
    }

    const [user, setUser] = useState("0")
    const [address, setAddress] = useState("")
    const [type, setType] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState(getUserEmail())



    const handleSubmit = async e => {
        e.preventDefault();

        axios
            .post(
                'https://outages-db.herokuapp.com/API/report/user',
                {
                    user_name: email,
                    report_address: address,
                    report_type: type,
                    report_company: company
                },

                {
                    params: { 'api-version': '3.0' },
                    headers: {
                        'content-type': 'application/json'
                    },
                }
            )
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.error(error);

            });
    };


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
                        <h1 textAlign="center" size="huge" color="black">
                            Please log in to make a report
                        </h1>
                    )
                || (user !== "0" &&
                        <div>
                            <h1>
                                Make a Report
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="address">Address: </label>
                                <input
                                type="text"
                                value={address}
                                placeholder="Enter your address"
                                onChange={({ target }) => setAddress(target.value)}
                                />
                                <p />
                                <label htmlFor="type">Type: </label>
                                <select id="type" name="type" size="3"
                                        placeholder="Enter the type of the outage"
                                        onChange={({ target }) => setType(target.value)}>
                                    <option value="water">Water</option>
                                    <option value="power">Power</option>
                                    <option value="internet">Internet</option>
                                </select>
                                <p />
                                <label htmlFor="company">Company: </label>
                                <input
                                    type="text"
                                    value={company}
                                    placeholder="Enter the company of the outage"
                                    onChange={({ target }) => setCompany(target.value)}
                                />
                                <p />
                                <button type="submit">Make a Report</button>
                        </form>
                        </div>
                    )
                }
            </div>
        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default Report;