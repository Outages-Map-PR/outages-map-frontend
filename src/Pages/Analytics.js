import React, { Component, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import { wait } from "@testing-library/user-event/dist/utils";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import './/Css/Analytics.css';


const POWER = "power";
const WATER = "water";
const INTERNET = "internet";
const MONTH_OPTIONS = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};
const YEAR_OPTIONS = {
  2022: "2022",
  2023: "2023",
};
const DAYS_IN_MONTHS = {
  "01": 31,
  "02": 28, // assuming non-leap year
  "03": 31,
  "04": 30,
  "05": 31,
  "06": 30,
  "07": 31,
  "08": 31,
  "09": 30,
  10: 31,
  11: 30,
  12: 31,
};

function Analytics() {
  const [user, setUser] = useState(-1);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState(
    ("0" + (new Date().getMonth() + 1)).slice(-2).toString()
  );
  const [stateLists, setStateLists] = useState({
    POWER: [],
    WATER: [],
    INTERNET: [],
  });

  let powerList = [];
  let waterList = [];
  let internetList = [];
  let maxNum = 5;

  const dbUrl = "https://outages-db.herokuapp.com/";
  const countUrl = dbUrl + "API/analytics/count";

  const sortedMonthOptions = Object.entries(MONTH_OPTIONS).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  const sortedYearOptions = Object.entries(YEAR_OPTIONS).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  const handleYearChange = (event) => {
    let y = event.target.value;
    setYear(y);
  };

  const handleMonthChange = (event) => {
    let m = event.target.value;
    setMonth(m);
  };

  const resetLists = () => {
    powerList = [];
    waterList = [];
    internetList = [];
    let days = DAYS_IN_MONTHS[month];
    for (let x = 1; x <= days; x++) {
      let obj = { day: x.toString(), count: 0 };
      powerList.push(obj);
      waterList.push(obj);
      internetList.push(obj);
    }
  };

  const populateLists = (paramDate) => {
    resetLists();
    let params = {
      date: paramDate,
    };
    // Load power, water, and internet dashboards
    axios({
      method: "GET",
      params: params,
      url: countUrl,
    }).then((res) => {
      // Populate powerList, waterList, and internetList
      let powerData;
      let waterData;
      let internetData;

      try {
        powerData = res.data[POWER];
        for (let x = 0; x < powerData.length; x++) {
          let day = powerData[x][0].split(" ")[1];
          powerList[parseInt(day) - 1] = { day: day, count: powerData[x][1] };
          if (powerData[x][1] > maxNum) maxNum = powerData[x][1];
        }
      } catch (e) {}

      try {
        waterData = res.data[WATER];
        for (let x = 0; x < waterData.length; x++) {
          let day = waterData[x][0].split(" ")[1];
          waterList[parseInt(day) - 1] = { day: day, count: waterData[x][1] };
          if (waterData[x][1] > maxNum) maxNum = waterData[x][1];
        }
      } catch (e) {}

      try {
        internetData = res.data[INTERNET];
        for (let x = 0; x < internetData.length; x++) {
          let day = internetData[x][0].split(" ")[1];
          internetList[parseInt(day) - 1] = {
            day: day,
            count: internetData[x][1],
          };
          if (internetData[x][1] > maxNum) maxNum = internetData[x][1];
        }
      } catch (e) {}

      setStateLists((prev) => {
        return { ...prev, POWER: powerList };
      });
      setStateLists((prev) => {
        return { ...prev, WATER: waterList };
      });
      setStateLists((prev) => {
        return { ...prev, INTERNET: internetList };
      });
    });
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      setUser(0);
    }
  }, []);

  useEffect(() => {
    populateLists(`${year}-${month}`);
  }, [month, year]);

  return (
    <Box sx={{ height: 800, margin: "50px" }}>
      <Stack direction="column" sx={{ marginTop: "40px" }}>
        <h1 style={{ marginRight: "20px", textAlign: "center" }}>
          Selected Month-Year
        </h1>
        <Stack direction="row" sx={{display: "flex", justifyContent: "center", marginBottom:"40px"}}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label-month-selection">Month</InputLabel>
            <Select
              labelId="month"
              id="month-selection"
              value={month}
              onChange={handleMonthChange}
            >
              {sortedMonthOptions.map(([k, v]) => (
                <MenuItem key={k} value={k}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label-year-selection">Year</InputLabel>
            <Select
              labelId="year"
              id="year-selection"
              value={year}
              onChange={handleYearChange}
            >
              {sortedYearOptions.map(([k, v]) => (
                <MenuItem key={k} value={k}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <h2 style={{ textAlign: "center" }}>Power Outages</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BarChart width={730} height={250} data={stateLists.POWER}>
            <XAxis dataKey="day" interval={0} />
            <YAxis domain={[0, maxNum]} />
            <Tooltip />
            <Bar
              animationDuration={2000}
              dataKey="count"
              fill="#8884d8"
              barSize={15}
              name={"Number of Outages"}
            />
          </BarChart>
        </div>
        <h3 style={{ textAlign: "center" }}>Day</h3>

        <Divider
          sx={{
            alignSelf: "center",
            width: "70vw",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />

        <h2 style={{ textAlign: "center" }}>Water Outages</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BarChart width={730} height={250} data={stateLists.WATER}>
            <XAxis dataKey="day" interval={0} />
            <YAxis domain={[0, maxNum]} />
            <Tooltip />
            <Bar
              animationDuration={2000}
              dataKey="count"
              fill="#8884d8"
              barSize={15}
              name={"Number of Outages"}
            />
          </BarChart>
        </div>
        <h3 style={{ textAlign: "center" }}>Day</h3>

        <Divider
          sx={{
            alignSelf: "center",
            width: "70vw",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />

        <h2 style={{ textAlign: "center" }}>Internet Outages</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BarChart width={730} height={250} data={stateLists.INTERNET}>
            <XAxis dataKey="day" interval={0} />
            <YAxis domain={[0, maxNum]} />
            <Tooltip />
            <Bar
              animationDuration={2000}
              dataKey="count"
              fill="#8884d8"
              barSize={15}
              name={"Number of Outages"}
            />
          </BarChart>
        </div>
        <h3 style={{ textAlign: "center", marginBottom: "40px" }}>Day</h3>
      </Stack>
    </Box>
  );
}


export default Analytics;
