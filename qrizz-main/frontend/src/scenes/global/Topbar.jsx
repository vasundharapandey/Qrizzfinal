import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import Button from '@mui/material/Button';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (

    <Box display="flex" justifyContent="space-between" p={2}>
      <div display="flex " justifycontent="space-evenly">
        <Button variant="contained" style={{ backgroundColor: '#2a354a', color: '#fff',borderRadius:'25px' }}> <img
          alt="profile-user"
          width="24.16px"
          height="21.96px"
          src={`../../assets/upload.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />Upload documents <img src="vector.png" alt="" /></Button>
        <Button variant="contained" style={{ backgroundColor: '#2a354a', color: '#fff' ,borderRadius:'25px',marginLeft:'20px'}}> <img
          alt="profile-user"
          width="18.63px"
          height="22.51px"
          src={`../../assets/db.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />Connect Database</Button>
      </div> {/* ICONS */}
      <Box display="flex" backgroundColor="#040e22" width="200px">
        <img
          alt="profile-user"
          width="38px"
          height="38px"
          src={`../../assets/user.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
        <button >
          Surya Devireddy
          
          <img
          alt="profile-user"
          width="15px"
          height="38px"
          src={`../../assets/ddown.png`}
          style={{ cursor: "pointer", borderRadius: "50%",  }}
        />
        </button>

      </Box>
    </Box>
  );
};

export default Topbar;
