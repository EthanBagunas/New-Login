import React, {useEffect, useState} from "react";
import { Button, Modal, Box } from "@mui/material";

class ModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            open:props.open || false,
        }
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.onClose();
    }
    
    BaseModal= ({content, openModal})=> {
        return(
            <div>
                <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={this.handleClose}
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

    componentDidUpdate(prevProps) {
        if (prevProps.open !== this.props.open) {
            this.setState({ 
                open: this.props.open ,
                devicename: this.props.devicename,
            });
        }
    }

    CamView= ()=> {
        return(
            <div>
                <p>{this.state.devicename}</p>
            </div>
        );_
    }
    render () {
        return this.BaseModal({content: <this.CamView/>, openModal: this.state.open})
    }
}

export default ModalView;
export {DevModal}

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




