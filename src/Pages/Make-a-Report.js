import React, {Component, useEffect} from "react";
import {Button, Container, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import axios from "axios";

// import * as UserData from "Database"; Look up how to get Data


//AUTH FUNCTION WITH DATABASE DATA FOR USER


class Report extends Component{
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
            <div><Header textAlign="center" size="huge" color="black">Report Page</Header>
                <p>{this.state.user}</p>
            </div>
        )
    }
}

//CHANGE TO AUTH FUNCTION LATER
export default Report;