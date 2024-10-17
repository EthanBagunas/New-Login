
import React, {useState} from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Modal, Box } from "@mui/material";
class MarkerPopups extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
        showmodal: false,
        }
    }
    handleShowModal(value){
        this.setState({showmodal: value})
    }
    render() {
        return(
            <div>
            <Modal
            open={this.state.showmodal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => this.handleShowModal(false)}
            PaperProps={{borderRadius: 4}}
            >
            <Box>

            </Box>
          </Modal>
            </div>
        )
    }
}
class DevPopup extends MarkerPopups {
    constructor(props) {
        super(props);
        this.handleShowModal= props.handleShowModal
    }


    testButton (event) {
        event.preventDefault();

        event.stopPropagation(); // Prevents the event from bubbling up
        alert("Button clicked!");
    }
    render() {
        return(

            <div>
                
            </div>

        )
    }
}


class EvacPopup extends MarkerPopups{
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