import React from 'react';
import { Grid } from '@mui/material';
import PaperSt from './cards'; // Import the PaperSt component
import { Box } from '@mui/material';
const GridWithRows = ({ database }) => {
  return (
    <Grid container spacing={2} >
      {database.map((item, index) => (
        <Grid container spacing={5} key={index}>
          <Grid item xs={4} >
            <PaperSt>
              <div>
                Summarized Title
              </div>
              <div style={{ display: "flex", justifyContent: "align-left" }}>
                <div style={{ fontFamily: "Inter", fontSize: "78px" }}>
                  {item.title}
                </div>
                <div style={{ marginTop: "65px" }}>Last 7 days</div>
              </div>
              <div>
                Show me the list of Connected database and newly added documents
              </div>
            </PaperSt>
          </Grid>
          <Grid item xs={4} >
            <PaperSt>
              <div>
                Sales in last quarter
              </div>
              <div style={{ display: "flex", justifyContent: "align-left" }}>
                <div style={{ fontFamily: "Inter", fontSize: "78px" }}>
                  {item.sales}
                </div>
                <div style={{ marginTop: "65px" }}>Million</div>
              </div>
              <div>
              Show the sales reports in last quarter including all products and services</div>
            </PaperSt>
          </Grid>
          <Grid item xs={4} >
            <PaperSt>
              <div>
                List of albums in database
              </div>
              <div style={{ display: "flex", justifyContent: "align-left" }}>
                <div style={{ fontFamily: "Inter", fontSize: "78px" }}>
                  {item.albums}
                </div>
                <div style={{ marginTop: "65px" }}>Albums</div>
              </div>
              <div>
              How many albums are there in database show me the number of albums count  </div>
            </PaperSt>
            <Box height={25}></Box>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridWithRows;
