import React, {useEffect, useLayoutEffect, useState} from "react"
import axios from "axios";
import { Box, Button, Modal, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

function Profile() {

    const [user, setUser] = useState("0")
    const [reports, setReports] = useState([])
    const [phone, setPhone] = useState("")
    const [showMyReports, setShowMyReports] = useState(false)
    const [numberReports, setNumberReports] = useState(0)

    useLayoutEffect(() => {
        console.log("LayoutEffect")
        const loggedInUser = localStorage.getItem("user")
        if(loggedInUser) {
            setUser(loggedInUser)
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
                setEmail(response.data[0].toString())
                setPhone(response.data[1].toString())

            })
            .catch(function (error){
                console.log(error)
            })
    }

    const [email, setEmail] = useState(getUserInformation())

    const getReports = () => {
        let url = "https://outages-db.herokuapp.com/API/report/" + email
        axios.get(url)
            .then(function (response) {
                //console.log(response.data)
                setReports(response.data)
                setNumberReports(reports.length)

            })
            .catch(function (error){
                console.log(error)
            })



    }

    const handleShowMyReports = () => {
        setShowMyReports((prevState) => {return !prevState})
    }

    getReports()

    return (
        <div>
            {(user === "0" && <div>
                    <h2>Please login in</h2>
            </div>) ||
                (user !== "0" &&
                    <div>
                         <h1>Your Profile</h1>
                        <h3><b>Reports Made</b>: {numberReports}</h3>
                        <p><b>Email:</b> {email}</p>
                        <p><b>Phone: </b>{phone}</p>
                        <Button variant="contained" onClick={handleShowMyReports} sx={{backgroundColor: "#773deb", marginBottom:"10px"}}>See my Reports</Button>
                        {showMyReports && ( 
                            <Modal open={showMyReports} onClose={handleShowMyReports} >
                                <Box sx={{backgroundColor: 'white',
                                        margin: '40px', 
                                        padding: '20px', 
                                        borderRadius: '3px'}} overflow={'auto'}>
                                    <Stack direction={'column'}>
                                        <Box boxShadow={7} sx={{maxHeight: '80vh'}} overflow={'auto'}> 
                                            <Table size="small">
                                                <TableHead sx={{backgroundColor: '#DEDEE7'}}>
                                                    <TableRow>
                                                        <TableCell>
                                                            Address
                                                        </TableCell>
                                                        <TableCell>
                                                            Date
                                                        </TableCell>
                                                        <TableCell>
                                                            Type
                                                        </TableCell>
                                                        <TableCell>
                                                            Company
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {reports.map((report, index) => {
                                                        return (
                                                            <TableRow key={index} sx={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                                                                <TableCell 
                                                                    sx={{
                                                                    borderTop:
                                                                        index === 0 ? 0 : "1px solid rgba(224, 224, 224, 1)",
                                                                    borderBottom: "none",
                                                                    padding: "16px",
                                                                    }}>
                                                                    {report.report_address}
                                                                </TableCell >
                                                                <TableCell 
                                                                    sx={{
                                                                    borderTop:
                                                                        index === 0 ? 0 : "1px solid rgba(224, 224, 224, 1)",
                                                                    borderBottom: "none",
                                                                    padding: "16px",
                                                                    }}>
                                                                    {report.report_date.slice(0, -13)}
                                                                </TableCell>
                                                                <TableCell 
                                                                    sx={{
                                                                    borderTop:
                                                                        index === 0 ? 0 : "1px solid rgba(224, 224, 224, 1)",
                                                                    borderBottom: "none",
                                                                    padding: "16px",
                                                                    }}>
                                                                    {report.report_type.toUpperCase()}
                                                                </TableCell>
                                                                <TableCell 
                                                                    sx={{
                                                                    borderTop:
                                                                        index === 0 ? 0 : "1px solid rgba(224, 224, 224, 1)",
                                                                    borderBottom: "none",
                                                                    padding: "16px",
                                                                    }}>
                                                                    {report.report_company}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Box>                                                  
                                        <Button variant="outlined" onClick={handleShowMyReports} sx={{marginTop: '40px', boxShadow: 7}}>Close</Button>                              
                                    </Stack>
                                </Box>
                            </Modal>                            
                            )}                        
                    </div>
            )}
        </div>
    )
}


export default Profile