import React, { Component, useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material'
import axios from "axios"

// DEFINITIONS
const ALL = "all"
const POWER = "power"
const WATER = "water"
const INTERNET = "internet"

function RecentReports() {

    const [user, setUser] = useState("0")
    const [outages, setOutages] = useState([])
    const [currentOutages, setCurrentOutages] = useState([])
    const [selectedItem, setSelectedItem] = useState(ALL)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    const indexOfLastItem = (page + 1) * rowsPerPage
    const indexOfFirstItem = indexOfLastItem - rowsPerPage
    const currentItems = currentOutages.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if(loggedInUser) {
            setUser(loggedInUser)
        } else {
            setUser("0")
        }
        axios.patch('https://outages-db.herokuapp.com/API/outagesmap')
            .then(function (response) {
                setOutages(response.data)
                setCurrentOutages(response.data)
            })
            .catch(function (error) {
                console.error(error)
            });
    }, [])

    const handleSelect = (event, newItem) => {
        if (newItem) {
            let currOut = []
            for (let x = 0; x < outages.length; x++) {
                if (outages[x].outage_type === newItem || newItem === ALL) {
                    currOut.push(outages[x])
                }
            }
            setSelectedItem(newItem)
            setCurrentOutages(currOut)
            setPage(0)
        }        
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return(
        <div>
            <h1 textAlign="center" size="huge" color="black">Historical Data</h1>
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
                    {currentItems.map((outage, index) => {
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
            <TablePagination
                rowsPerPageOptions={[15, 25, 50]}
                component="div"
                count={currentOutages.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default RecentReports;