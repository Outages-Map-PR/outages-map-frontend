import React, {Component, useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import axios from "axios";

//AUTH FUNCTION WITH DATABASE DATA FOR USER

const POWER = 'power'
const WATER = 'water'
const INTERNET = 'internet'

function Analytics() {

    const [user, setUser] = useState(-1)
    const [powerList, setPowerList] = useState([])
    const [waterList, setWaterList] = useState([])
    const [internetList, setInternetList] = useState([])
    const [date, setDate] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')

    const localUrl = 'http://127.0.0.1:5000/'
    const servicesUrl = localUrl + 'API/analytics/all'
    const powerUrl = localUrl + 'API/analytics/power'
    const waterUrl = localUrl + 'API/analytics/water'
    const internetUrl = localUrl + 'API/analytics/internet'

    const monthOptions = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    const sortedMonthOptions = Object.entries(monthOptions)
    .sort(([a], [b]) => a.localeCompare(b))

    const yearOptions = {
        "2022": "2022",
        "2023": "2023"
    }
    const sortedYearOptions = Object.entries(yearOptions)
    .sort(([a], [b]) => a.localeCompare(b))

    const handleYearChange = (event) => {
        let y = event.target.value
        setYear(y);
        setDate(`${y}-${month}`)
    }
    
    const handleMonthChange = (event) => {
        let m = event.target.value
        setMonth(m);
        setDate(`${year}-${m}`)
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);

        } else {
            setUser(0)
        }

        // Set current date as default date
        const currentDate = new Date()
        const y = currentDate.getFullYear()
        const m = ('0' + (currentDate.getMonth() + 1)).slice(-2)
        const formattedDate = `${y}-${m}`
        setYear(y.toString())
        setMonth(m.toString())
        setDate(formattedDate) 
        console.log(formattedDate)

        // Set params for axios calls
        let params = {
            date: formattedDate
        }

        // Load power, water, and internet dashboards
        axios({
            method: 'GET',
            params: params,
            url: servicesUrl
        })
        .then((res) => {
            console.log(res)
        })
        
    }, [])

    return (      
        <Container style={{ height: 800 }}>
            <br/>
            <h1>Selected Year-Month &nbsp;&nbsp;
                <select id="year" value={year} onChange={handleYearChange}>
                    {sortedYearOptions.map(([k, v]) => (
                        <option key={k} value = {k}>
                            {v}
                        </option>
                    ))}
                </select>
                &nbsp;
                <select id="month" value={month} onChange={handleMonthChange}>
                    {sortedMonthOptions.map(([k, v]) => (
                        <option key={k} value = {k}>
                            {v}
                        </option>
                    ))}
                </select></h1>
            <br/>

            <h2 style={{textAlign: 'center'}}>Power Outages</h2>
            <BarChart width={730} height={250} data={powerList}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="interval"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
            <br/><br/>

            <h2 style={{textAlign: 'center'}}>Water Outages</h2>
            <br/><br/>

            <h2 style={{textAlign: 'center'}}>Internet Outages</h2>
        </Container>
    )
}


//CHANGE TO AUTH FUNCTION LATER
export default Analytics;