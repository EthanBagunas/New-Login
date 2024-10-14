

import React, {useState} from "react"
import { Box, Button, Modal, FormControl, FormLabel,FormControlLabel, Checkbox} from '@mui/material';
import QuantityInput from "../BaseMUI/NumberInput";

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
        >
        <Box sx={style}>
          <label></label>
          <InsertOccupant location = {occlocation}/>
        </Box>
      </Modal>
        )
}

export default FamInsert;

const InsertOccupant= ({location}) => {
  const [formData, setFormData] = useState({
    occupant_location: useState(location),
    Under_4ps: false,
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
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const numberinputs=[


  ]

  return(
    
    <FormControl>
      <FormLabel>Add New Occupants</FormLabel>
        <FormControlLabel control={<Checkbox />} label="Under 4ps" />


      <label>
        
      </label>

       <QuantityInput/>

        <Button>Submit</Button>
  </FormControl>
  )
}


