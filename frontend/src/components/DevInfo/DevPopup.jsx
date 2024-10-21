
import React, {Component, useEffect, useState} from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Modal, Box } from "@mui/material";
import ModalView from "./DevInfoModal";

class DevPopup extends Component {
    constructor(props) {
        super(props);
        this.state= {
            openmodal: false,
        };
    }

    handleCam= (value)=> {
        this.setState({openmodal: value})
    }
    
    render() {
        useEffect()
        return(
            <div>
                <ModalView open={this.state.openmodal} onClose={() => handleCam(false)} />
                <Button id='devbutton' >Show Camerafeed</Button>
            </div>
        )
    }
}


class EvacPopup extends Component{
    constructor(props) {
        super(props);
        this.state= {

        }
    }
    render() {
        <div>
            
        </div>
    
    }
}



export {EvacPopup, DevPopup}