import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
export default function AccordionExpandIcon({mainlist, nestedlistapi}) {

  const axiosPrivate= useAxiosPrivate();
  
  const [nestedlist, setNestedlist] =React.useState([])

  const handleNestedlist= (id) => {
    axiosPrivate.get(`${nestedlistapi}/${id}`)
    .then(response => {
      console.log(response.data)
      setNestedlist(response.data)
    })
    .catch(error=> { 
      console.error(error);
    })
    

  }
  
  return (
    <div>
      { mainlist && mainlist.map((entry, index) =>

        <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={()=> handleNestedlist(entry.id)}
          >
          <Typography>{entry.id} {entry.firstname} {entry.lastname}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {nestedlist && nestedlist.map((item, index)=> {
          <Typography>
            {item.id} {item.firstname} {item.lastname}
          </Typography>
          })}
        </AccordionDetails>
      </Accordion>
      )}
    </div>
  );
}
