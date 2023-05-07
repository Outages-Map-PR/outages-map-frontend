import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Modal} from "@mui/material";
import "../Pages/Css/Make-report.css";


function Report() {

    const getUserEmail = () => {
        if (user === "0"){
            return;
        }
        let url = "https://outages-db.herokuapp.com/API/user/" + user
        console.log(url)
        axios.get(url)
            .then(function (response) {
                //console.log(response.data[0])
                setEmail(response.data[0].toString());

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
            console.log(user)
        } else {
            setUser("0")
        }


    }, [])






    const handleSubmit = async e => {
        e.preventDefault();

        // if(type === "" || address === "" || company === ""){
        //     setFailedReport(true)
        //     return
        // }

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
                alert("Report sent sucessfully")
            })
            .catch(function (error) {
                alert("Please fill out all needed information to make a report.")
                console.error(error);

            });
    };

        return(
            <div>
                {(user === "0" &&
                        <h1 textAlign="center" size="huge" color="black" id="report">
                            Please log in to make a report
                        </h1>
                    )
                || (user !== "0" &&
                        <div className="report-container">
                            <div className="report-form">
                                <h1 id="report">Make a Report</h1>
                                <p>Report helps us keep everyone notified of possible outages once they been verified!</p>
                                <form className="report-div" onSubmit={handleSubmit}>
                                    <div className="address">
                                        <div className= "address-div1">
                                            <label onClick="address-label" htmlFor="address">Address </label>
                                        </div>
                                        <div className="address-div2">
                                            <input
                                                id = "address"
                                                type="address"
                                                value={address}
                                                placeholder="Enter address of outage"
                                                onChange={({ target }) => setAddress(target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="outage-type">
                                        <div className="outage-type-div1">
                                            <label htmlFor="type">Type </label>
                                            <p className="outage-descrip">Select the type of outage you wish to report.</p>
                                        </div>
                                        <div className="outage-type-div2">
                                            <select id="type" name="type" size="3"
                                                    placeholder="Enter the type of the outage"
                                                    onChange={({ target }) => setType(target.value)}>
                                                <option value="water">Water</option>
                                                <option value="power">Power</option>
                                                <option value="internet">Internet</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="company">
                                        <div className="Company-div1">
                                            <label htmlFor="company">Company: </label>
                                        </div>
                                        <div className="company-div2">
                                            <input
                                                id = "company"
                                                type="company"
                                                value={company}
                                                placeholder="Enter the company of the outage"
                                                onChange={({ target }) => setCompany(target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="footer">
                                        <div>
                                            <button id="button_sub" className="submit-btn" type="submit">Make a Report</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    )
                }
                <Modal
                    open={successfulReport}
                    onClose={handleCloseS}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="report-success" sx={
                        {padding: '10px',
                            backgroundColor: 'whitesmoke',
                            maxWidth: '30vw'}}>
                        <div className="report-warning-div">
                            <h3 id="h3-report" style={{ color: 'green' }}>Report successfully created.</h3>
                            <div className="btn-div">
                                <button id="close-btn" onClick={handleCloseS}>Close</button>
                            </div>

                        </div>

                    </Box>
                </Modal>

                <Modal
                    open={failedReport}
                    onClose={handleCloseF}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="report-warning" sx={
                        {padding: '10px',
                            backgroundColor: 'whitesmoke',
                            maxWidth: '20vw'}}>
                        <div className="report-warning-div">
                            <h3 id="h3-report" style={{ color: 'red' }}>Please ensure all fields are filled.</h3>
                           <div className="btn-div">
                               <button id="close-btn" onClick={handleCloseF}>Close</button>
                           </div>

                        </div>

                    </Box>
                </Modal>
            </div>

        )
    }

export default Report;