import React from "react";
import ModalView from "../BaseMUI/ModalView";
import AutoCompleteComboBox from "../BaseMUI/AutoCompleteInput";
import axios from "axios";
import { Box, Button, Modal, FormControl, FormLabel,FormControlLabel, Checkbox, TextField, Paper,} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import * as XLSX from  'xlsx';
export default class ViewList extends ModalView {
    constructor(props) {
        super(props);
        this.state = {
            evaclist:'',
            TableData: [],
        }
    }
    downloadTableAsExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(this.state.TableData);
        XLSX.utils.book_append_sheet(wb, ws, 'Family Data');
        XLSX.writeFile(wb, 'FamilyData.xlsx');
      };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open !== this.props.open) {
            this.setState({ 

                open: this.props.open,

            });
        }
        if (prevState.evaclist !== this.state.evaclist) {
            this.getFamTable(this.state.evaclist)
        }
        if (prevState.TableData !== this.state.TableData) {
            console.log(this.state.TableData)
        }
        
    }

    SelectedEvacList= (id, value)=> {
        this.setState({[id]: value})
    }

    getFamTable= (location) => {
        axios.get(`http://localhost:7000/famdata/${location}`)
        .then(response=>{
            console.log(response.data)
            this.setState({TableData:response.data})
        })
        .catch(err=> {
            console.error(err) ;
        })
    }
    

    ViewListTable=()=> {
        return (
            <TableContainer component={Paper} >
                <Table sx={{ width:500  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">BirthDate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.TableData && (
                        this.state.TableData.map((entry) => (
                            <TableRow
                            key={entry.firstname}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{entry.firstname}</TableCell>
                                <TableCell align="right">{entry.lastname}</TableCell>
                                <TableCell align="right">{entry.gender}</TableCell>
                                <TableCell align="right">{entry.birthdate}</TableCell>
                            </TableRow>
                        ))
                    )}
                    </TableBody>
                </Table>
            </TableContainer> 
        )
    }
    render() {
    return this.BaseModal({
        content: (
        <div>
            <AutoCompleteComboBox label={"List of Evacuation Centers"} type={'evaclist'} 
            dropdownapi={'/allevac'} alterstyle={{width: 250}} updateform={this.SelectedEvacList}/> 
            <this.ViewListTable/>
            <Button onClick={this.downloadTableAsExcel}> Download Table</Button>
        </div>
        ),
        openModal: this.state.open, 
    });
    }
}