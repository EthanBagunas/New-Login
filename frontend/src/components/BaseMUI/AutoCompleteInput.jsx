import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
export default function AutoCompleteComboBox({label, type, updateform}) {

  const sampleoccupantid= [11,12,13,14]
  return (
    <Autocomplete
      onChange={(event, value) => updateform(type, value)}
      disablePortal
      options={sampleoccupantid}
      getOptionLabel={(sampleoccupantid)=> sampleoccupantid.toString()}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}