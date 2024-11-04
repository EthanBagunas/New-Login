
import React, {Component, useEffect, useState} from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Modal, Box } from "@mui/material";
import ModalView from "./DevInfoModal";
import { CardItem } from "../Map/Card";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosPrivate } from "../../api/axios";

const DevPopup = () => {
    return (
      <div>
        <Button id='devbutton'>Show Camerafeed</Button>
      </div>
    );
};

class DevicePopup extends Component{
    
  constructor(props) {
    super(props);
    this.state= {
      selectedmarker: this.props.selected,
      selectedinfo: '',
      }
  }
      
  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({selectedmarker: this.props.selected ,
      });
    }
    if (prevState.selectedmarker !== this.state.selectedmarker) {
      console.log('Hello')
    }
  }
  FetchInfo(){
    console.log('hello')
    /*this.axiosPrivate.get(`/devmarker/${this.state.selectedmarker}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      }); */
  }
          
  render() {
    return(
      <div>
      <p>{this.state.selectedmarker}</p>
      <DevPopup/>
      </div>
    )
  }
}
export default DevicePopup