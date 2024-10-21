
import React, {Component, useEffect, useState} from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Modal, Box } from "@mui/material";
import ModalView from "./DevInfoModal";
import { CardItem } from "../Map/Card";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosPrivate } from "../../api/axios";


const DevPopup = ({selected}) => {

    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        const axiosPrivate= useAxiosPrivate();
        axiosPrivate.get(`/devmarker/${selected}`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error);
        });
  
    }, [selected]);
  
    return (
      <div>
        <Button id='devbutton'>Show Camerafeed</Button>
      </div>
    );
  };



export {DevPopup}