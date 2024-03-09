import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
      variant="h2"
      background-color="linear-gradient(86.82deg, #E9380C 7.47%, #FFAD32 111.5%)"
      fontWeight="500"
      fontFamily="Gilroy, sans-serif"
      sx={{ m: "0 0 5px 0" }}
    >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
