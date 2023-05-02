import React, {useEffect, useLayoutEffect, useState} from "react"
import axios from "axios";

function Profile() {

    useLayoutEffect(() => {
        console.log("LayoutEffect")
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            setUser(loggedInUser);
        } else {
            setUser("0")
        }
    }, [])

    useEffect(() => {
        console.log("Effect")
        getUserInformation()
        getReports()
    }, [])

    const getUserInformation = () => {
        if (user === "0"){
            return;
        }
        let url = "https://outages-db.herokuapp.com/API/user/" + user
        axios.get(url)
            .then(function (response) {
                //console.log(response.data)
                setEmail(response.data[0].toString());
                setPhone(response.data[1].toString());

            })
            .catch(function (error){
                console.log(error)
            })
    }

    const getReports = () => {
        let url = "https://outages-db.herokuapp.com/API/report/" + email
        axios.get(url)
            .then(function (response) {
                //console.log(response.data)
                setReports(response.data)

            })
            .catch(function (error){
                console.log(error)
            })
    }





    const [user, setUser] = useState("0");
    const [email, setEmail] = useState(getUserInformation());
    const [reports, setReports] = useState([]);
    const [phone, setPhone] = useState("")


    getReports()


    return (
        <div>
            {(user === "0" && <div>
                    <h2>Please login in</h2>
            </div>) ||
                (user !== "0" &&
                    <div>
                         <h1>Your Profile</h1>
                        <h3>Reports Made</h3>
                        <p><b>Email:</b> {email}</p>
                        <p><b>Phone: </b>{phone}</p>
                        <p><b>Recent Reports: </b></p>
                        {reports.map((report)=> {
                            return (
                                <p>{report.report_address}, {report.report_date}, {report.report_type}, {report.report_company}</p>
                            )})}
                    </div>
            )}
        </div>
    )
}


export default Profile