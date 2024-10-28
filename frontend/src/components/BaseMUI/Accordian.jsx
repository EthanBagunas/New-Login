import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
export default function AccordionExpandIcon({mainlist}) {
  return (
    <div>
      { mainlist && mainlist.map((entry, index) =>
        <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
          >
          <Typography>{entry.id} {entry.firstname} {entry.lastname}</Typography>
        </AccordionSummary>
        <AccordionDetails>
         {entry.members && entry.members.map((item, index) => (
              <div key={index}>
                <Typography>
                  {item.id} {item.firstname} {item.lastname}
                </Typography>
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
      )}
    </div>
  );
}
