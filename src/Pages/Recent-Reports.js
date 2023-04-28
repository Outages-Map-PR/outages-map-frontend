import React, { Component, useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from "axios"

// DEFINITIONS
const ALL = "all"
const POWER = "power"
const WATER = "water"
const INTERNET = "internet"

function RecentReports() {

    const [user, setUser] = useState("0")
    const [outages, setOutages] = useState([])
    const [selectedItem, setSelectedItem] = useState(ALL)



    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if(loggedInUser) {
            setUser(loggedInUser)
        } else {
            setUser("0")
        }
        axios.options('https://outages-db.herokuapp.com/API/outagesmap')
            .then(function (response) {
                setOutages(response.data)
            })
            .catch(function (error) {
                console.error(error)
            })
    }, [])

    const handleSelect = (event, newItem) => {
        if (newItem) {
            setSelectedItem(newItem)
        }
    }

    return(
        <div>
            <h1 textAlign="center" size="huge" color="black">Recent Reports</h1>
            <ToggleButtonGroup value={selectedItem} onChange={handleSelect} exclusive>
                <ToggleButton value={ALL}>All</ToggleButton>
                <ToggleButton value={POWER}>Power</ToggleButton>
                <ToggleButton value={WATER}>Water</ToggleButton>
                <ToggleButton value={INTERNET}>Internet</ToggleButton>
            </ToggleButtonGroup>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Company</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {outages.map((outage, index) => {
                        if (outage.outage_type !== selectedItem && selectedItem !== ALL)
                            return
                        let source = outage.outage_source.includes("User") ? "User" : outage.outage_source
                        return (
                            <TableRow key={index}>
                                <TableCell sx={{ borderTop: index === 0 ? 0 : '1px solid rgba(224, 224, 224, 1)', borderBottom: 'none', padding: '16px' }}>{outage.outage_type.toUpperCase()}</TableCell>
                                <TableCell sx={{ borderTop: index === 0 ? 0 : '1px solid rgba(224, 224, 224, 1)', borderBottom: 'none', padding: '16px' }}>{source}</TableCell>
                                <TableCell sx={{ borderTop: index === 0 ? 0 : '1px solid rgba(224, 224, 224, 1)', borderBottom: 'none', padding: '16px' }}>{outage.outage_company}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default RecentReports;