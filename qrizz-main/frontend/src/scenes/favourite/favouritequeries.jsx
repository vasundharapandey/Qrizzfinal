import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridWithRows from "../../components/Grid";
const Favouritequeries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const styles = {
    header: {
      background: 'linear-gradient(86.82deg, #E9380C 7.47%, #FFAD32 111.5%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'Gilroy, sans-serif',
      fontWeight: '500'
    },
  }; const [database, setDatabase] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/values'); // Adjust URL if needed
      setDatabase(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <Box mx="100px" mt="80px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={<span style={styles.header}>Favourite Queries</span>}

        />

      </Box>


      {/* GRID & CHARTS */}
      <GridWithRows database={database} />
    </Box>
  );
};

export default Favouritequeries;
