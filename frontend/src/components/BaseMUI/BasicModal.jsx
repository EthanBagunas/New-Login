import React, {useState} from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Modal, Box } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalView = ({open, onClose}) => {
    return(
        <div>
            <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={onClose}
            PaperProps={{borderRadius: 4}}
            >
            <Box sx={style}>

            </Box>
          </Modal>
     </div>
    )
}
export default ModalView;
