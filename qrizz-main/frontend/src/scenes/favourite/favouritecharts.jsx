import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Header from "../../components/Header";
import { Line, Circle } from 'rc-progress';
import AreaChart from "../../components/chart1";
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import StackedAreaChart from "../../components/chart2.jsx";
import { Grid } from '@mui/material';
import BarChart from "../../components/barchart.jsx";
import axios from "axios";
import DonutChart from "../../components/donutchart.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { green } from "@mui/material/colors";


ChartJS.register(ArcElement, Tooltip, Legend);
const Favouritecharts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const styles = {
    header: {
      background: 'linear-gradient(86.82deg, #E9380C 7.47%, #FFAD32 111.5%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'Gilroy, sans-serif',
      fontWeight:'500'
    },
  };const [database, setDatabase] = useState([]);
  const [data2, setData2] = useState([]);
  const [topsalesdata, setTopsalesdata] = useState([]);
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/graph1'); // Adjust URL if needed
      setDatabase(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try{
      const response = await axios.get('http://localhost:3001/api/graph2');
      setData2(response.data);
      console.log('gotdata2');
    }catch(err){console.log(err)} 
    try{
      const response = await axios.get('http://localhost:3001/api/sales');
      setTopsalesdata(response.data);
      console.log('got sales data');
    }catch(err){console.log(err)} 
    }
  

    
  
  return (
    <Box mx="50px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header
      title={<span style={styles.header}>Favourite Charts</span>}
   
/>
</Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 500px)"  // 2 columns
        gridAutoRows="300px"  // 2 rows
        gap="20px"
      >
        {/* ROW 1, COLUMN 1 */}
        <Box gridColumn="span 1" backgroundColor="#2a354a" padding="10px" borderRadius="10px">
        <div className="font-inter text-xl font-semibold leading-6" style={{fontSize:'30px'}}>
 Overall Revenue Generation 
</div>

 <AreaChart data={database} width={480} height={180} />
 <div class="opacity-80 font-inter text-base font-normal tracking-normal text-left">
 Show me the list of Connected database and newly added documents...
</div>

        </Box>
        
        {/* ROW 1, COLUMN 2 */}
        <Box gridColumn="span 1" backgroundColor="#2a354a" padding="10px" borderRadius="10px" >
        <div className="font-inter text-base font-semibold leading-6" style={{fontSize:'30px'}}>
 Daily Sales And Profits
</div>
                   <StackedAreaChart data={data2} width={480} height={180} />
                   <div class="opacity-80 font-inter text-base font-normal tracking-normal text-left">
 Show me the list of Connected database and newly added documents...
</div>
         </Box>
        
        {/* ROW 2, COLUMN 1 */}
        <Box gridColumn="span 1" backgroundColor="#2a354a" padding="10px" borderRadius="10px">
  <span> Top Selling Products And Average Daily Sales </span>
 
<Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Box border={0} p={2}>
                <Typography display={"inline-flex"} fontSize={'35px'} >{'$'+topsalesdata[0]}</Typography>
                <Typography display={"inline-flex"} color={colors.greenAccent[500]}  >{'↑'+topsalesdata[1]}</Typography>
              <Typography>Expected earnings</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box border={0} p={2}>
              <DonutChart 
  data={[
    { name: "shoes", value: 7660 },
    { name: "gaming", value: 2820},
    { name: "others", value: 45257}
  ]}
  width={250} 
  height={80} 
/>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Box border={0} p={2}>
              <Typography display="inline-flex" fontSize={'35px'}>{topsalesdata[5]}</Typography>
                <Typography display="inline-flex" color={colors.greenAccent[500]} >{'↑'+topsalesdata[6]}</Typography>
                <Typography>Average daily sales</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box border={0} p={2}>
               <BarChart />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    <div>Show me the list of Top selling products and Average Daily sales among all the items...</div>

</Box>
        
       {/*<LineChart isDashboard={true} />*/}
        {/* ROW 2, COLUMN 2 */}
        <Box gridColumn="span 1" backgroundColor="#2a354a" padding="10px" borderRadius="10px">
        <span> New Customers and this month Orders </span>
        <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Box border={0} p={2}>
              <Typography display={"inline-flex"}fontSize={'35px'}>{topsalesdata[7]}</Typography>
                <Typography display={"inline-flex"}color={colors.redAccent[500]}>{'↓'+topsalesdata[8]}</Typography>
                <Typography>Orders this month</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box border={0} p={2}>
                <Typography fontSize={'25px'}>{topsalesdata[9] +' to Goal'}</Typography>
                <ProgressBar  bgcolor={"#4cceac"} completed={62} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Box border={0} p={2}>
                <Typography fontSize={'35px'}>{topsalesdata[11]}</Typography>
                <Typography>New Customers this month</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box border={0} p={2}>
                <Typography>Today's Heroes</Typography>
              <AvatarGroup total={48}>
  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
</AvatarGroup>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

<div>Show me the new Customers and this month Orders</div>      
  </Box>
          </Box>
          </Box>
  );
};

export default Favouritecharts;
