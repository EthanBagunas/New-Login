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

const redPalette = {
  50: '#FFE7E6', // Very light red
  100: '#FFB3B1', // Light red
  200: '#FF7F7C', // Lighter red
  300: '#FF4C49', // Medium-light red
  400: '#FF3330', // Standard red (500)
  500: '#FF3330', // Same as 400 for consistency
  600: '#E02926', // Darker red
  700: '#C02422', // Dark red
  800: '#A0201E', // Very dark red  
  900: '#7C161A', // Deepest red
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
        background-color: ${redPalette[500]};
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
        background-color: ${redPalette[400]};
      }

      .CustomTab:focus {
        color: #fff;
        outline: 3px solid ${redPalette[200]};
      }

      .CustomTab.${tabClasses.selected} {
        background-color: #fff;
        color: ${redPalette[600]};
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