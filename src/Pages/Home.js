import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

//AUTH FUNCTION WITH DATABASE DATA FOR USER

function Home() {
  const [user, setUser] = useState("0");
  const [outages, setOutages] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkFilter, setCheckFilter] = useState([]);
  const [showInternet, setShowInternet] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      setUser("0");
    } else {
      setUser(loggedInUser);
    }
    axios
      .options("https://outages-db.herokuapp.com/API/outagesmap")
      .then(function (response) {
        setOutages(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const showFilterHandler = (event) => {
    setShowFilter((prevState) => {
      return !prevState;
    });
    setAnchorEl(event.currentTarget);
  };

  const clearFilter = () => {
    setCheckFilter([]);
  }

  const checkFilterHandler = (type) => {
    if (checkFilter.includes(type)) {
      if (type === "ALL") {
        setCheckFilter([]);
      } else {
        setCheckFilter((prevState) => {
          return prevState.filter((e) => e !== type);
        });
      }
    } else {
      setCheckFilter((prevState) => {
        return [...prevState, type];
      });
    }
  };

  const showInternetHandler = () => {
    setShowInternet((prevState) => {
      return !prevState;
    });
  };

  const applyFilterHandler = () => {};

  return (
    <div>
      <iframe
        style={{ position: "absolute" }}
        width="1370rem"
        height="500rem"
        src="https://outages-db.herokuapp.com/map/home/none"
      />
      <Button
        variant="contained"
        onClick={showFilterHandler}
        style={{ left: "60px", top: "15px", backgroundColor: "#773deb" }}
      >
        Filters
      </Button>
      <Popover
        open={showFilter}
        anchorEl={anchorEl}
        onClose={showFilterHandler}
      >
        <Box>
          <Stack direction={"column"}>
            <Stack direction="row">
              <h3
                onClick={showFilterHandler}
                style={{ padding: "15px", cursor: "pointer" }}
              >
                X
              </h3>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: "10px" }}
              >
                Filter
              </Typography>
              <h4
                onClick={clearFilter}
                style={{
                  marginTop: "20px",
                  marginLeft: "70px",
                  marginRight: "15px",
                  textDecorationLine: "underline",
                  color: "#773deb",
                  cursor: "pointer",
                }}
              >
                Clear all
              </h4>
            </Stack>
            <Typography
              variant="h7"
              sx={{ fontWeight: "bold", marginTop: "10px", marginLeft: "10px" }}
            >
              Filter by type
            </Typography>
            <FormGroup sx={{ marginLeft: "10px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkFilter.includes("ALL")}
                    onChange={checkFilterHandler.bind(null, "ALL")}
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      checkFilter.includes("ALL") ||
                      checkFilter.includes("POWER")
                    }
                    onChange={checkFilterHandler.bind(null, "POWER")}
                  />
                }
                label="Power"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      checkFilter.includes("ALL") ||
                      checkFilter.includes("WATER")
                    }
                    onChange={checkFilterHandler.bind(null, "WATER")}
                  />
                }
                label="Water"
              />
              <Stack direction="row">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        checkFilter.includes("ALL") ||
                        checkFilter.includes("INTERNET")
                      }
                      onChange={checkFilterHandler.bind(null, "INTERNET")}
                    />
                  }
                  label="Internet"
                />
                {showInternet ? (
                  <IconButton
                    onClick={showInternetHandler}
                    sx={{ marginLeft: "auto", marginRight: "20px" }}
                  >
                    <ExpandLessIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={showInternetHandler}
                    sx={{ marginLeft: "auto", marginRight: "20px" }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                )}
              </Stack>
              {showInternet && <FormGroup sx={{marginLeft:"30px"}}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkFilter.includes("ALL")}
                      onChange={checkFilterHandler.bind(null, "LIBERTY")}
                    />
                  }
                  label="Liberty"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        checkFilter.includes("ALL") ||
                        checkFilter.includes("POWER")
                      }
                      onChange={checkFilterHandler.bind(null, "CLARO")}
                    />
                  }
                  label="Claro"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        checkFilter.includes("ALL") ||
                        checkFilter.includes("WATER")
                      }
                      onChange={checkFilterHandler.bind(null, "AT&T")}
                    />
                  }
                  label="AT&T"
                />
              </FormGroup>}
            </FormGroup>
          </Stack>
          <Stack
            direction="row"
            sx={{ justifyContent: "center", gap: "10px", marginBottom: "10px", marginTop:"15px" }}
          >
            <Button
              variant="outlined"
              onClick={clearFilter}
              style={{
                backgroundColor: "white",
                fontSize: 11,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Clear all
            </Button>
            <Button
              variant="contained"
              onClick={applyFilterHandler}
              style={{ backgroundColor: "#773deb", fontSize: 11 }}
            >
              Apply filters
            </Button>
          </Stack>
        </Box>
      </Popover>
      {/*{outages.map((outage)=> {*/}
      {/*    return (*/}
      {/*        <p>{outage.outage_type}, {outage.outage_source}, {outage.outage_company}</p>*/}
      {/*    )})}*/}
    </div>
  );
}

//CHANGE TO AUTH FUNCTION LATER
export default Home;