import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Modal} from "@mui/material";

// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function Report() {

    const getUserEmail = () => {
        let url = "https://outages-db.herokuapp.com/API/user/" + user
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                setEmail(response.data.toString());

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
    const [successfulReport, setSuccessfulReport] = useState(false)
    const [failedReport, setFailedReport] = useState(false)
    const handleCloseS = () => setSuccessfulReport(false);
    const handleCloseF = () => setFailedReport(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            setUser(loggedInUser);
        } else {
            setUser("0")
        }


    }, [])






    const handleSubmit = async e => {
        e.preventDefault();

        if(type === "" || address === "" || company === ""){
            setFailedReport(true)
            return
        }

        axios
            .post(
                'https://outages-db.herokuapp.com/API/userreport',
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
                //console.log(response.data)
                setSuccessfulReport(true)
            })
            .catch(function (error) {
                console.error(error);

            });
    };

        return(
            <div>
                {(user === 0 &&
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
                                type="address"
                                value={address}
                                placeholder="Enter your address"
                                onChange={({ target }) => setAddress(target.value)}
                                />
                                <p />
                                <label htmlFor="type">Type: </label>
                                <select type="type" id="type" name="type" size="3"
                                        placeholder="Enter the type of the outage"
                                        onChange={({ target }) => setType(target.value)}>
                                    <option value="water">Water</option>
                                    <option value="power">Power</option>
                                    <option value="internet">Internet</option>
                                </select>
                                <p />
                                <label htmlFor="company">Company: </label>
                                <input
                                    type="company"
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
                <Modal
                    open={successfulReport}
                    onClose={handleCloseS}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={
                        {padding: '10px',
                            backgroundColor: 'whitesmoke',
                            maxWidth: '30vw'}}>
                        <h3 style={{ color: 'green' }}>Report successfully created.</h3>
                        <button onClick={handleCloseS}>Close</button>
                    </Box>
                </Modal>
                <Modal
                    open={failedReport}
                    onClose={handleCloseF}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={
                        {padding: '10px',
                            backgroundColor: 'whitesmoke',
                            maxWidth: '30vw'}}>
                        <h3 style={{ color: 'green' }}>Please ensure all fields are filled.</h3>
                        <button onClick={handleCloseF}>Close</button>
                    </Box>
                </Modal>
            </div>

        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default Report;