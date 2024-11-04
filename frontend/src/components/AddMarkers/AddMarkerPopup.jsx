import React from 'react';
import Button from '@mui/material/Button';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import { Icon } from '@iconify/react';
import CustomizedTab from "../BaseMUI/BasicTab";
import { Box } from '@mui/material';
import AddMarkerPopupContent from "./AddMarkerPopupContent";



const AddMarkers = ({DashPop}) => {
  const [anchor, setAnchor] = React.useState(null);
  
    const handleAnchor = (event) => {
      setAnchor(anchor ? null : event.currentTarget);
      DashPop();
    };
  
    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;
  
    return (
      <div>
        <Button onClick={handleAnchor} >
          <Icon icon="mdi:map-marker-add-outline" style={{ color: '#ff3300', width: '40px', height: '40px' }} />
        </Button>
        <BasePopup id={id} open={open} anchor={anchor} placement="right-end">
          <PopupBody> 
          <div>
          <Box sx={{ minWidth: 400 }}>

            <CustomizedTab 
                label1={"Water Level Device "}
                label2={"Evacuation Zone "}
                tab1={<AddMarkerPopupContent markertype="dev" />}
                tab2={<AddMarkerPopupContent markertype="evac"/>}
            />
            </Box>
          </div>
          </PopupBody>
        </BasePopup>
      </div>
    );
}
const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);

export default AddMarkers;