import * as React from 'react';
import { useTheme } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab, tabClasses } from '@mui/base/Tab';

export default function CustomizedTab({label1, label2, label3, tab1, tab2, tab3}) {
  return (
    <React.Fragment>
      <Tabs defaultValue={1}>
        <TabsList className="CustomTabsList">
          <Tab className="CustomTab" value={1}>
            {label1}
          </Tab>
          <Tab className="CustomTab" value={2}>
            {label2}
          </Tab>
          
        </TabsList>
        <TabPanel className="CustomTabPanel" value={1}>
          {tab1}
        </TabPanel>
        <TabPanel className="CustomTabPanel" value={2}>
          {tab2}
        </TabPanel>
        
      </Tabs>
      <Styles />
    </React.Fragment>
  );
}

const yellowPalette = {

  50: '#FFF9E6', // Very light yellow

  100: '#FFE7B3', // Light yellow

  200: '#FFDB7F', // Lighter yellow

  300: '#FFCF4C', // Medium-light yellow

  400: '#e64833', // Standard yellow (500)

  500: '#e64833', // Same as 400 for consistency

  600: '#E0A300', // Darker yellow

  700: '#C09C00', // Dark yellow

  800: '#A08C00', // Very dark yellow  

  900: '#7C6A00', // Deepest yellow

};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();
  return (
    <style>
      {`
      .CustomTabsList {
        min-width: 400px;
        background-color: ${yellowPalette[500]};
        border-radius: 12px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: space-between;
        box-shadow: 0px 4px 6px ${
          isDarkMode ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
        };
      }

      .CustomTab {
        font-family: 'IBM Plex Sans', sans-serif;
        color: white;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: bold;
        background-color: transparent;
        width: 100%;
        line-height: 1.5;
        padding: 8px 12px;
        margin: 6px;
        border: none;
        border-radius: 8px;
        display: flex;
        justify-content: center;
      }

      .CustomTab:hover {
        background-color: ${yellowPalette[400]};
      }

      .CustomTab:focus {
        color: #fff;
        outline: 3px solid ${yellowPalette[200]};
      }

      .CustomTab.${tabClasses.selected} {
        background-color: #fff;
        color: ${yellowPalette[600]};
      }

      .CustomTab.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .CustomTabPanel {
        width: 100%;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
      }
      `}
    </style>
  );
}