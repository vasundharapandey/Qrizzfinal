import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Header from "../../components/Header";

import AreaChart from "../../components/chart1";
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import StackedAreaChart from "../../components/chart2.jsx";

import axios from "axios";
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
  <div style={{ display: 'flex' }}>
      <div style={{flex :'1'}}>
        <div style={{flex:'1'}}>
        {  topsalesdata[0]}
        <div>{topsalesdata[1]}</div>
        </div>




        <div>Content for column 1</div>
       
      </div>
      <div className="column">
        <div>Content for column 2</div>
        <div>Content for column 2</div>
        
      </div>
    </div>


</Box>
        
       {/*<LineChart isDashboard={true} />*/}
        {/* ROW 2, COLUMN 2 */}
        <Box gridColumn="span 1" backgroundColor="#2a354a" padding="10px" borderRadius="10px">
        <span> New Customers and this month Orders </span>
        <div style={{ display: 'flex' }}>
      <div style={{flex :'1'}}>
        <div>Content for column 1</div>
        <div>Content for column 1</div>
       
      </div>
      <div className="column">
        <div>Content for column 2</div>
        <div>Content for column 2</div>
        
      </div>
    </div>
      
  </Box>
          </Box>
          </Box>
  );
};

export default Favouritecharts;
