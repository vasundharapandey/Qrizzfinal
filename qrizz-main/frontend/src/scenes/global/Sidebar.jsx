import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {ColorModeContext, tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Switch } from '@mui/material';
import { useContext } from "react";
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Axios from "axios";
const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const [values, setValues] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const colorMode = useContext(ColorModeContext);
  /*const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/values"); 
      setValues(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(values);
  },[]); */
  
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                <img
                  alt="profile-user"
                  width="38px"
                  height="38px"
                  src={`../../assets/logo.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />  qRIZZ
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* Render items based on values fetched from backend */}
          



          {!isCollapsed && (
            <Box mb="25px">
              
              <Box textAlign="center">
               
                <Button variant="contained" style={{ backgroundColor: '#E6350738', color: '#fff' ,borderRadius:'25px',marginLeft:'15px',width:'191.3px',height:'56px'}}> <img
          alt="profile-user"
          width="18.63px"
          height="20.51px"
          marginLeft="10px"
          src={`../../assets/add.png`}
          style={{ cursor: "pointer", borderRadius: "50%", marginRight:'10px' }}
        />New Chat </Button>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
            <Item
              title="Favourite Charts"
              to="/favouritecharts"
            
              selected={selected}
              setSelected={setSelected}
            />
            <img src="../../assets/sidearrow.png" alt="" / >
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
            <Item
              title="Favourite Queries"
              to="/favouritequeries"
            
              selected={selected}
              setSelected={setSelected}
            />
            <img src="../../assets/sidearrow.png" alt="" />
            </div>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
           Recent
            </Typography>
            

           
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
             <Item
              title="Clear History"
              to="/"
              icon={<AccessTimeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Help"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
   <Box display="flex"> 
      <Item
        title="Dark Theme"
        to="/faq"
        icon={<DarkModeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Switch onChange={colorMode.toggleColorMode} color="warning" defaultChecked />
     
    </Box>
    </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
