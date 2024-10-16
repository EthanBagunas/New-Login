

import React, {useState, useEffect} from "react"
import axios from 'axios'
import { Box, Button, Modal, FormControl, FormLabel,FormControlLabel, Checkbox} from '@mui/material';
import QuantityInput from "../BaseMUI/NumberInput";
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export const FormContext= React.createContext()


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


const FamInsert =({open, onClose, occlocation}) => {
    return(
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={onClose}
        PaperProps={{borderRadius: 4}}
        >
        <Box sx={style}>
          <InsertOccupant location = {occlocation}/>
        </Box>
      </Modal>
        )
}

export default FamInsert;

const InsertOccupant= ({location}) => {
  const [formData, setFormData] = useState({
    Infants:0,
    Toddlers:0,
    Preschoolers:0,
    SchoolAge:  0,
    Teenage: 0,
    Adult:0,
    Senior_Citizen:0,
    Pregnant_women: 0,
    Lactating_mothers: 0,
    Solo_Parent:0,
    occupant_location: useState(location),
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      occupant_location: location,
    }));
  }, [location]);

  const handleSubmit = () => {
    axios.post('http://localhost:7000/insertoccupant', formData)
      .then(response => {
        console.log(response.data);
        return { message: 'Successfully added device' };
      })
      .catch(error => {
        console.error(error);
      });
  };

  const keys= Object.keys(formData);
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
    
    

  

  return(
    <FormControl>
      <FormContext.Provider value= {{formData, setFormData}}>
      <FormLabel>Add New Occupants</FormLabel>
        <Grid container spacing={6} >
          <Grid item xs={6}>
            {labels.slice(0,4).map((data, index)=> {
              return(
                <label>
                {data}
                  <QuantityInput inputid ={keys[index]}/>
                </label>
              );
            })
            }
            
          
          </Grid>
          <Grid item xs={6}>
          {labels.slice(5).map((data, index)=> {
              return(
                <label>
                {data}
                <QuantityInput inputid= {keys[index+5]}/>
                </label>
              );
            })}
          </Grid>
        </Grid>
        <Button onClick={handleSubmit}>Submit</Button>
        </FormContext.Provider> 
  </FormControl>
  )
}


