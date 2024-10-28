import * as React from 'react';
import AutoCompleteComboBox from '../BaseMUI/AutoCompleteInput';
import ModalView from '../BaseMUI/ModalView';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AccordionExpandIcon from '../BaseMUI/Accordian';
import { AccordionActions } from '@mui/material';
class FamSearch extends ModalView {

    constructor(props) {
        super(props);
        this.state= {
            location: '',
            viewheads:[],
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open !== this.props.open) {
            this.setState({ 
                open: this.props.open,
            });
        }
        if(prevState.location !== this.state.location) {
            axios.get(`http://localhost:7000/famdata/${this.state.location}`)
            .then(response => {
                this.setState({viewheads: response.data})
            })
            .catch(error=> { 
                console.error(error);
            })
        }
    }
    updatelocation= (id, value) => {
        this.setState({[id]: value})
    }

    render(){
        return this.BaseModal({content: 
            (<div>
                <AutoCompleteComboBox label={"Search Location"} type={'location'} dropdownapi={'/allevac'} updateform={this.updatelocation}/>   
                <AccordionExpandIcon mainlist={this.state.viewheads} nestedlistapi={'/fammemberdata'}/>
            </div>)
            , openModal: this.state.open})
    }
}
export default FamSearch; 
