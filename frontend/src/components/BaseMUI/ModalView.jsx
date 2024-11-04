import React from "react";
import { Button, Modal, Box } from "@mui/material";
import FeedPopup from '../Map/FeedPopup'; // Adjust the import path as necessary

class ModalView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: props.open || false,
        };
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.onClose();
    }

    updateTable = (data) => {
        this.setState({ TableData: data });
    }

    updateForm = (id, value) => {
        this.setState(prevState => ({
            FormData: {
                ...prevState.FormData,
                [id]: value,
            },
        }));
    }
    
    BaseModal = ({ content, openModal }) => {
        return (
            <div>
                <Modal
                    open={openModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={this.handleClose}
                    PaperProps={{ borderRadius: 4 }}>
                    <Box sx={style}>
                        {content}
                    </Box>
                </Modal>
            </div>
        );
    }
}

class DevModal extends ModalView {
    constructor(props) {
        super(props);
        this.state = {
            devicename: props.devicename,
            showFeedPopup: false, // Manage the feed popup visibility in state
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.open !== this.props.open) {
            this.setState({ 
                open: this.props.open,
                devicename: this.props.devicename,
            });
        }
    }

    toggleFeedPopup = () => {
        this.setState(prevState => ({ showFeedPopup: !prevState.showFeedPopup }));
    }

    CamView = () => {
        return (
            <div>
                <p>{this.state.devicename}</p>
                <Button onClick={this.toggleFeedPopup}>
                    {this.state.showFeedPopup ? "Close Video Feed" : "Open Video Feed"}
                </Button>
                {this.state.showFeedPopup && (
                     <FeedPopup 
                    devicename={this.state.devicename} // Pass devicename as a prop
                    onClose={this.toggleFeedPopup} 
                />
                )}
            </div>
        );
    }

    render() {
        return this.BaseModal({ content: <this.CamView />, openModal: this.state.open });
    }
}

export default ModalView;
export { DevModal };

const style = {
    borderRadius: 4,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
