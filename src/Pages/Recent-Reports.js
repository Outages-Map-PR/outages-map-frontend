import React, {Component, useEffect} from "react";
import {Button, Container, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


class RecentReports extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }
    render(){
        useEffect(() => {
            const loggedInUser = localStorage.getItem("user");
            if(loggedInUser) {
                const foundUser = JSON.parse(loggedInUser);
                this.state.user.setState(foundUser);

            }
        }, [])
        return(
            <div><Header textAlign="center" size="huge" color="black">Recent Reports Page</Header>
            </div>
        )
    }
}

//CHANGE TO AUTH FUNCTION LATER
export default RecentReports;