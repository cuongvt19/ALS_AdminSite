import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Link, Navigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.greenAls[400]}
        borderRadius="3px"
      >
        {/* <InputBase
          sx={{
            ml: 2,
            flex: 1,
            height: "50px",
            width: "200px",
            fontSize: "16px",
          }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS*/}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode} size="large">
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon fontSize="large" />
          ) : (
            <LightModeOutlinedIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton component={Link} to="/login" size="large">
            <LogoutOutlinedIcon fontSize="large" />
        </IconButton>
        {/* <IconButton size="large">
          <PersonOutlinedIcon fontSize="large" />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;
