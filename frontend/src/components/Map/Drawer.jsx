import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import CardList from './Card'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid2 } from '@mui/material';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const myTable = () => {
  return (<TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
const TemporaryDrawer = ({ open, level }) => {
  const [level_list, setLevel_list] = useState('');
  
  const handleList= (levels) => {
    setLevel_list(levels);
  }

  useEffect(() => { 
    console.log("drawer open is:", open);
    if (open) {
      axios.get(`http://localhost:7000/list/${level}`)
        .then(response => {
          handleList(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [open]);
    
  return (
    <div>

      <Drawer open={open} hideBackdrop ={true} PaperProps={{      
        sx: {      
        borderRadius: 4,
        position: 'absolute', // Set position to absolute    
        top: '50%', // Set top to 50% to center the drawer vertically
        left: '50%', // Set left to 50% to center the drawer horizontally13          
        transform: 'translate(-50%, -50%)', // Translate the drawer to center it14          
        width: 1000, // Set the width of the drawer15        
        height: 700, // Set the height of the drawer      
        }}} >
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <CardList levels={level_list} theme={level}/> 
            </Grid2>
            <Grid2 size={8}>
             <myTable />
            </Grid2>
          </Grid2>
        
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
