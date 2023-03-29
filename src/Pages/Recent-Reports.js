import React, {Component, useEffect, useState} from "react";
import {Button, Container, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


function RecentReports() {

    const [user, setUser] = useState(-1)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);

        } else {
            setUser(0)
        }
    }, [])
        return(
            <div><Header textAlign="center" size="huge" color="black">Recent Reports Page</Header>
            </div>
        )
    }


//CHANGE TO AUTH FUNCTION LATER
export default RecentReports;