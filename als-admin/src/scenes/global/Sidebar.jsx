import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import AccessibleOutlinedIcon from "@mui/icons-material/AccessibleOutlined";
import WheelchairPickupOutlinedIcon from "@mui/icons-material/WheelchairPickupOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FitbitOutlinedIcon from '@mui/icons-material/FitbitOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
//import "react-pro-sidebar/dist/scss/styles.css"
//import "react-pro-sidebar/dist/styles/globalStyles";
import "react-pro-sidebar/dist/css/styles.css";
import { style } from "@mui/system";


const Item = ({ title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography variant="h4">{title}</Typography>
        <Link to={to}/>
      </MenuItem>
    );
}

const AppSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.greenAls[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          background: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#02e537 !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        // //backgroundColor={`${colors.greenAls[400]}`}
        width={`300px`}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.greenAls[400],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                sx={{
                  hover: {
                    color: "#66ff66 !important",
                  },
                }}
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ALS VIETNAM
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`${process.env.PUBLIC_URL}/assets/blank-profile-picture.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  ALS Vietnam Admin
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Patients"
              to="/patients"
              icon={<AccessibleOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Supporters"
              to="/supporters"
              icon={<WheelchairPickupOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Exercises"
              to="/exercises"
              icon={<FitnessCenterOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Newsfeed"
              to="/posts"
              icon={<FeedOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Voice Records"
              to="/records"
              icon={<GraphicEqOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Articles"
              to="/articles"
              icon={<ArticleOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Staffs"
              to="/staffs"
              icon={<GroupOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Create Staff"
              to="/createStaff"
              icon={<PersonOutlineOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Exercise"
              to="/createExercise"
              icon={<FitbitOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Article"
              to="/createArticle"
              icon={<NoteAltOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Record"
              to="/createRecord"
              icon={<KeyboardVoiceOutlinedIcon fontSize="large"/>}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AppSidebar;
