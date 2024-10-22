
import React from "react";
import ModalView from "../BaseMUI/ModalView";
import { Box, Button, Modal, FormControl, FormLabel,FormControlLabel, Checkbox, TextField} from '@mui/material';
import QuantityInput from "../BaseMUI/NumberInput";
import Grid from '@mui/material/Unstable_Grid2/Grid2';

class InsertFamModal extends ModalView {
    constructor(props) {
        super(props);
        this.state= {
            FormData: {
                fam_name: '',
                permanent_location: '',
                currentlocation: this.props.location,
                infants: 0, 
                toddlers: 0,
                schoolage: 0 ,
                teenager: 0,
                adult: 0,
                senior_citizen: 0,
            }
        }
  
    }
    componentDidUpdate(prevProps) {
        if (prevProps.open !== this.props.open) {
            this.setState({ 
                open: this.props.open ,
                currentlocation: this.props.location,
            });
        }
    }
    handleSubmit= ()=> {
        debugger
        
    }
  
    updateForm = (id, value) => {
      this.setState(prevState => ({
          FormData: {
              ...prevState.FormData,
              [id]: value,
          },
      }));
  }
  
    InsertForm = () => {
    return(
    <FormControl>
        <FormLabel>Add New Occupants</FormLabel>
            <Grid container spacing={6} >
            <Grid item xs={12}>
                    <TextField
                    id="fam_name"
                    label="Family Name"
                    variant="outlined"
                    margin= "normal"
                    onChange={(event)=> this.updateForm("fam_name", event.target.value)}
                    />
            </Grid>
            <Grid item xs={6}>
                {Object.keys(this.state.FormData).slice(3,5).map((key)=>{
                    return (
                    <div>
                    <label>Hello</label>
                        <QuantityInput  inputid={key} updateform={this.updateForm}/>
                    </div>
                    )
                })}
            </Grid>
            <Grid item xs={6}>
                {Object.keys(this.state.FormData).slice(6,8).map((key)=>{
                    return(
                    <div>
                    <label>Hello</label>
                    <QuantityInput  inputid= {key} updateform={this.updateForm}/>
                    </div>
                    )   
                })}
            </Grid>
            </Grid>
            <Button onClick={this.handleSubmit}>Submit</Button>
    </FormControl>
    )}
  
    render(){
        return this.BaseModal({content: <this.InsertForm/>, openModal: this.state.open})
    }
  
  } 



  export default InsertFamModal;

    const labels=[  
      "Infants(0-11months)" ,
      "Toddlers(1-3yrs)" ,
      "Preschoolers (4-5yrs)",
      "School Age (6-12yrs)",
      "Teenage (13-19yrs)",
      "Adult (20-59yrs)",
      "Senior Citizen (60yrs above)",
      "Pregnant Women",
      "Lactating mothers",
      "Solo Parents",
    ]