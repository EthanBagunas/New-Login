import React, { useState, useEffect, createContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CardList from './Card';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Icon } from '@iconify/react';
import DataTable from './HistoryTable';
import { Button } from '@mui/material';

export const DrawerExtendedContext = createContext();
export const LogsDataContext = createContext();

const TemporaryDrawer = ({ open, level, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const [level_list, setLevel_list] = useState('');
  const [logsdata, SetLogsData] = useState('');
  const [showhistory, setShowHistory] = useState(false);

  const handleHide = () => {
    setShowHistory(false);
  };

  const handleList = (levels) => {
    setLevel_list(levels);
  };

  useEffect(() => {
    if (open) {
      axiosPrivate.get(`/list/${level}`)
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
      <LogsDataContext.Provider value={{ logsdata, SetLogsData }}>
        <Drawer open={open} hideBackdrop={true}
          PaperProps={{
            sx: {
              borderRadius: 4,
              position: 'absolute',
              top: '50%',
              left: '20%',
              transform: showhistory ? 'translate(10%, -50%)' : 'translate(-50%, -50%)',
              width: showhistory ? 1000 : 450,
              height: 750,
            }
          }}>
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              <Typography variant="h2" style={{ position: 'relative', top: '20px', left: '5%', fontSize: 20 }} color='##000000'>
                Water Level Station
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {showhistory &&
                <Icon icon='solar:map-arrow-left-bold' style={{ fontSize: '2em', color: '#00ccff', position: 'relative', top: '10px', left: '54%' }} onClick={handleHide} />}
            </Grid>
            <Grid item xs={12} sx={{ position: 'relative', top: '30px', left: '5%' }}>
              <DrawerExtendedContext.Provider value={{ setShowHistory }}>
                <CardList levels={level_list} theme={level} drawershow={true} />
              </DrawerExtendedContext.Provider>
            </Grid>
            <Grid item xs={12} sx={{ position: 'relative', top: '30px', right: '50px' }}>
              {showhistory && <DataTable />}
            </Grid>
          </Grid>
          <Button onClick={onClose} style={{ margin: '20px', position: 'relative', top: '5%', backgroundColor: '#00ccff', borderRadius: 4 }}>
            Close Window
            <Icon icon='uil:down-arrow' />
          </Button>
        </Drawer>
      </LogsDataContext.Provider>
    </div>
  );
};

export default TemporaryDrawer;
