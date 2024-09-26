import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';

import { LogsDataContext } from './Map';

export default function DataTable({draweropen}){

    const [entries, setEntries] = useState([]);
    const handleEntries = (logdata) => {
      setEntries(logdata);
    }

    useEffect(() => {
        if (!draweropen) {
          debugger
        }
    },[draweropen]);

    const [logsdata, setLogsData] = useContext(LogsDataContext);

    useEffect(()=> {
      if (logsdata != ''){
        axios.get(`http://localhost:7000/history/${logsdata}`)
            .then(response => {
              handleEntries(response.data);
            })
            .catch(error => {logsdata
              console.error(error);
            });
      }
    }, [logsdata])

    return (
      <div>
      <TableContainer component={Paper} >
      <Table sx={{ width:400  }} aria-label="simple table">
      <TableHead>
            <TableRow>
            <TableCell>Device Name</TableCell>
            <TableCell align="right">Date & Time</TableCell>
            <TableCell align="right">Distance in M</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
          </Table>
      </TableContainer> 
      </div>
    );
  };