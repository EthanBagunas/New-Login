
import React from "react";
import ModalView from "../BaseMUI/ModalView";
import dayjs from 'dayjs';
import { Box, Button, Modal, FormControl, FormLabel,FormControlLabel, Checkbox, TextField} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import BasicSelect from "../BaseMUI/DropDownInput";
import QuantityInput from "../BaseMUI/NumberInput";
import DateTimePickerValue from "../BaseMUI/DateTimePicker";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


class InsertFamModal extends ModalView {
    constructor(props) {
        super(props);
        this.state= {
            FormData: {
                occupantid:'',
                name:'',
                age:'',
                gender:'',
                birthdate:dayjs('2022-04-17T15:30'),
                type:'',
                status:'',
            },
        }
  
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open !== this.props.open) {
            this.setState({ 
                open: this.props.open,
            });
        }
        
    }
    handleSubmit= ()=> {
        const axiosPrivate= useAxiosPrivate();
        axiosPrivate.post('faminfo/insert', this.state.FormData)
        .then(response => {
            console.log(response.data)
        })
        .catch(error=> {
            console.error(error)
        })
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
        <FormLabel>Add New Head</FormLabel>
            <Grid container spacing={2} >
            <Grid item xs={12}>
                <TextField
                id="name"
                label="Name"
                variant="outlined"
                margin= "normal"
                onChange={(event)=> this.updateForm("name", event.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <div>
                    <label>Age:</label>
                    <QuantityInput inputid={"age"} updateform={this.updateForm}/>
                </div>
            </Grid>
            <Grid item xs={6}>
                <BasicSelect type={"gender"} label={"Gender"} inputval= {this.state.FormData.gender} handleChange={this.updateForm}/>
            </Grid>
            <Grid item xs={12}>
                <DateTimePickerValue inputkey={"birthdate"} inputval={this.state.FormData.birthdate} updateform= {this.updateForm}/>
            </Grid>
            </Grid>
            <Button onClick={this.handleSubmit}>Submit</Button>
    </FormControl>
    )}
  
    render(){
        return this.BaseModal({content: <this.InsertForm/>, openModal: this.state.open})
    }
  
  } 

const Table = ()=> {

    return (
        <div>
            <Paper sx={{borderRadius:4}} variant="elevation" elevation={4}>
    
        <TableContainer component={Paper} >
        <Table sx={{ width:500  }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Capture ID</TableCell>
                  <TableCell align="right">Date & Time</TableCell>
                  <TableCell align="right">Distance in M</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {entries.map((entry) => (
                <TableRow
                key={entry.CaptureID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {entry.CaptureID}
                  </TableCell>
                  <TableCell align="right">{entry.CAP_DATETIME}</TableCell>
                  <TableCell align="right">{entry.DIST_M}</TableCell>
                  <TableCell align="right">{entry.status}</TableCell>
    
                </TableRow>
              ))}
            </TableBody>
            </Table>
        </TableContainer> 
              </Paper>
        </div>
      );

}

  export default InsertFamModal;

    const labels=[  
    "Family Name",
    "Permanent Location", 
    "Current Location:",
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