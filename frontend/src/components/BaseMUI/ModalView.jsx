import React, {useEffect, useState} from "react";
import { Button, Modal, Box } from "@mui/material";



class ModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            open:props.open,
            onClose:props.onClose,
        }
    }
    
    BaseModal(content){
        return(
            <div>
                <Modal
                open={this.state.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={this.state.onClose}
                PaperProps={{borderRadius: 4}}>
                    <Box sx={style}>
                        {content}
                    </Box>
                </Modal>
            </div>
        );
    }
}

class DevModal extends ModalView{
    constructor(props) {
        super(props);
        this.state= {
            devicename: props.devicename,
        }
    }

    DevInfoModal() {
        return(
            <div>
                <p>{this.state.devicename}</p>
            </div>
        );_
    }
    render () {
        return this.BaseModal(this.DevInfoModal)
    }
}

export default DevModal;

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




