import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, useTheme, Button, TextField} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import SwipeableTemporaryDrawer from "./ViewItemDrawer";
import { getAllCategoriesAsync, getAllExercisesAsync, toggleExerciseAsync } from "../../services/exercisesServices";
import UpdateExerciseForm from "./update";
import Popup from 'reactjs-popup';
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createSessionAsync, deleteSessionAsync, getSessionDetailAsync } from "../../services/sessionsService";
import { useAlert } from 'react-alert';
import useAuth from "../../hooks/useAuth";


const userSchema = yup.object().shape({
  sessionName: yup.string().required("Session Name is required"),
});

const SessionDetail = () => {
  let location = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewItemData, setViewItemData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [visibleItemDrawer, setVisibleItemDrawer] = useState(false);
  const [activeRows, setActiveRows] = useState({});

  let sessionId = location.state.sessionId;
  let sessionName = location.state.sessionName;

  let navigate = useNavigate();

  const { auth } = useAuth();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const alert = useAlert();

  const getExercises = async () => {
    const details = await getSessionDetailAsync(sessionId);
    const categories = await getAllCategoriesAsync();

    const rows = details.data.map((item, i) => {
      const temp = item.exercise;
      const cate = categories.data.find((cate) => {return cate.categoryId === temp.categoryId});
      console.log(cate);
      return {
        ...temp,
        categoryName: cate.catgegoryName,
        rowIndex: i + 1,
      };
    });
    console.log(rows);
    setActiveRows(rows);
  };
  
  const handleDeleteSession = async () => {
    const result = await deleteSessionAsync(sessionId);
    if (result.data.success) {
      alert.success("Session Deleted Successfully!");
      navigate("/sessions");
    } else {
      alert.error("Session Delete Failed!");
    }
  };

  useEffect(() => {}, [activeRows]);

  useEffect(() => {
    getExercises();
  }, []);

  const columns = [
    {
      field: "rowIndex",
      headerName: "No.",
      flex: 0.3,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "exerciseName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "categoryName",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "exerciseLevel",
      headerName: "Difficulty",
      flex: 1,
    },
    // {
    //   field: "status",
    //   headerName: "Active",
    //   flex: 0.5,
    // },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const handleView = (e) => {
          const currentRow = params.row;
          setViewItemData(currentRow);
          setVisibleItemDrawer(true);
        };
        // const handleRemove = (e) => {
        //   const currentRow = params.row;
        //   console.log(currentRow);
        //   removeExercise(currentRow);
        // };
        return (
          <Box display="flex" alignItems="center" gap="15px">
            <Box
              width="60%"
              m="0 auto"
              p="0px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[700]}
              borderRadius="4px"
              alignContent="center"
            >
              {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        View
                      </Typography> */}
              <Button
                onClick={handleView}
                color="secondary"
                variant="contained"
                size="small"
              >
                View
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SESSION DETAIL"
          subtitle={sessionName}
        />

        <Button
          onClick={() => {
            handleDeleteSession();
            navigate("/createSession");
          }}
          style={{
            backgroundColor: "#C60000",
          }}
          variant="contained"
          size="large"
        >
          Delele Session
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.greenAls[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rows={activeRows}
          columns={columns.concat(actionColumn)}
          getRowId={(row) => row.rowIndex}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {visibleItemDrawer && (
        <SwipeableTemporaryDrawer
          visible={visibleItemDrawer}
          initData={viewItemData}
          onClose={() => setVisibleItemDrawer(false)}
        />
      )}
    </Box>
  );
};

export default SessionDetail;
