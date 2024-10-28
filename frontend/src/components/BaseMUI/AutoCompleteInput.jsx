import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
export default function AutoCompleteComboBox({label, type, updateform, dropdownapi}) {

  const axiosPrivate= useAxiosPrivate();
  const [dropdown, setDropDown] =React.useState();

  React.useEffect(() => {
    axiosPrivate.get(dropdownapi)
    .then(response => {
      setDropDown(response.data)
    })
    .catch(error=> { 
      console.error(error);
    })
  },[dropdownapi])

  return (
    <Autocomplete
      onChange={(event, value) => updateform(type, value)}
      disablePortal
      options={dropdown}
      getOptionLabel={(dropdown)=> dropdown.toString()}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}