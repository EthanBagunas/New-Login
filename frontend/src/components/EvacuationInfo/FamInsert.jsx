import React from "react";
import ModalView from "../BaseMUI/ModalView";
import dayjs from 'dayjs';
import { Box, Button, Modal, FormControl, FormLabel,FormControlLabel, Checkbox, TextField, Paper,} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import BasicSelect from "../BaseMUI/DropDownInput";
import QuantityInput from "../BaseMUI/NumberInput";
import DatePickerValue from "../BaseMUI/DateTimePicker";
import AutoCompleteComboBox from "../BaseMUI/AutoCompleteInput";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

class FamInsert extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            HeadFormData: {
                occupant_id: 0,
                firstname:'',
                lastname:'',
                gender:'',
                birthdate:dayjs(),
            },
            MemberFormData: {
                firstname:'',
                lastname:'',
                gender:'',
                birthdate:dayjs(),
                relationship_head:'',
            },
            TableData: []
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open !== this.props.open) {
            this.setState({ 
                open: this.props.open,
            });
        }if (prevState.TableData !== this.state.TableData) {
           
        }
        
            
    }
    
  
    render(){
        return (

            <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <this.InsertHeadForm/>
                    </Grid>
                    <Grid item xs={6}>
                    <this.InsertMemForm/>
                    </Grid>
                    <Grid item xs={12}>
                        <this.MemberTable/>
                    </Grid>
                    <Grid item xs={6}>
                    <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
        )
    }

    handleSubmit= ()=> {
        //!useaaxiosprivate
        axios.post('http://localhost:7000/faminfo', {
            head:this.state.HeadFormData,
            members: this.state.TableData,
        })
        .then(response => {
            
        })
        .catch(error=> { 
            console.error(error);
        })
        
    }
    
    updateHeadForm = (id, value) => {
        this.setState(prevState => ({
            HeadFormData: {
                ...prevState.HeadFormData,
                [id]: value,
            },
            
        }));
    }

    InsertHeadForm = () => {
            return(
            <FormControl>
                <FormLabel>Add New Head</FormLabel>
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <TextField
                        id="firstname" label="First Name" variant="outlined" margin= "normal"
                        onChange={(event)=> this.updateHeadForm('firstname', event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        id="lastname" label="Last Name" variant="outlined" margin= "normal"
                        onChange={(event)=> this.updateHeadForm('lastname', event.target.value)}
                        />

                    </Grid>
                    <Grid item xs={4}>
                        <BasicSelect type={"gender"} label={"Gender"} inputval= {this.state.HeadFormData.gender} handleChange={this.updateHeadForm}/>
                    </Grid>
                    <Grid item xs= {8}>
                        <AutoCompleteComboBox label={"Occupant ID:"} type= {"occupant_id"} updateform={this.updateHeadForm} dropdownapi={'/occupantid'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DatePickerValue inputkey={"birthdate"} inputval={this.state.HeadFormData.birthdate} updateform= {this.updateHeadForm}/>
                    </Grid>

                    </Grid>
            </FormControl>
            )}

    updateMemForm = (id, value) => {
        this.setState(prevState => ({
            MemberFormData: {
                ...prevState.MemberFormData,
                [id]: value,
            },
        }));
    }
    
    InsertMemForm = ()=> {
        return (
            <FormControl>
            <FormLabel>Add New Member</FormLabel>
                <Grid container spacing={2} >
                <Grid item xs={6}>
                    <TextField
                    id="firstname" label="First Name" variant="outlined" margin= "normal"
                    onChange={(event)=> this.updateMemForm('firstname', event.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="lastname" label="Last Name" variant="outlined" margin= "normal"
                    onChange={(event)=> this.updateMemForm('lastname', event.target.value)}
                    />

                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="relationship_head" label="Relation to the Head" variant="outlined" margin= "normal"
                    onChange={(event)=> this.updateMemForm('relationship_head', event.target.value)}
                    />

                </Grid>
                <Grid item xs={4}>
                    <BasicSelect type={"gender"} label={"Gender"} inputval= {this.state.MemberFormData.gender} handleChange={this.updateMemForm}/>
                </Grid>
                
                <Grid item xs={12}>
                    <DatePickerValue inputkey={"birthdate"} inputval={this.state.MemberFormData.birthdate} updateform= {this.updateMemForm}/>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={this.handleAddMember}>Add Member</Button>
                </Grid>
                </Grid>
            </FormControl>
        )
    }
    
    
   
    

    handleAddMember= () => {
        const newMember = { ...this.state.MemberFormData }; // Create a copy of MemberFormData
        this.setState(prevState => ({
        TableData: [...prevState.TableData, newMember],
        MemberFormData: { // Resetting MemberFormData after adding
            firstname: '',
            lastname: '',
            gender: '',
            relationship_head: '',
            birthdate: dayjs(),
        }
        }));
    }
    handleRemoveMember = (firstname) => {
        this.setState(prevState => ({
            TableData: prevState.TableData.filter(entry => entry.firstname !== firstname),
        }));
    }

    MemberTable = ()=> {
    return (
        <div>
            <Paper sx={{borderRadius:4}} variant="elevation" elevation={4}>
                <TableContainer component={Paper} >
                <Table sx={{ width:500  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">BirthDate</TableCell>
                            <TableCell align="right">Relationship to Head</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.TableData && (
                        this.state.TableData.map((entry) => (
                            <TableRow
                            key={entry.firstname}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                {entry.firstname}
                                </TableCell>
                                <TableCell align="right">{entry.lastname}</TableCell>
                                <TableCell align="right">{entry.gender}</TableCell>
                                <TableCell align="right">{entry.birthdate[5]}</TableCell>
                                <TableCell align="right">{entry.relationship_head}</TableCell>
                                <Button onClick={()=> this.handleRemoveMember(entry.firstname)}>Remove</Button>
                            </TableRow>
                        ))
                        )}
                    </TableBody>
                </Table>
                </TableContainer> 
            </Paper>
        </div>
    );}
} 

  export default FamInsert;