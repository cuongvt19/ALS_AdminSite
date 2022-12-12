import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import SwipeableTemporaryDrawer from "./ViewItemDrawer";
import { getAllExercisesAsync, toggleExerciseAsync } from "../../services/exercisesServices";
import UpdateExerciseForm from "./update";
import { useAlert } from 'react-alert'


const CreateSession = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewItemData, setViewItemData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [listExercises, setListExercises] = useState({});
  const [visibleItemDrawer, setVisibleItemDrawer] = useState(false);
  const [updateItemData, setUpdateViewItemData] = useState({});
  const [visibleUpdateDrawer, setVisibleUpdateDrawer] = useState(false);
  const [activeRows, setActiveRows] = useState({});

  let navigate = useNavigate();

  const alert = useAlert();

  const getExercises = async () => {

    const exercises = await getAllExercisesAsync();

    if (exercises.data) {
      setListExercises(exercises.data);
      const rows = exercises.data
        .map((item, i) => {
          return {
            ...item,
            rowIndex: i + 1, //use rowIndex as column
          };
        });
      setActiveRows(rows);
    }
  };

  useEffect(() => {

  }, [activeRows]);

  useEffect(() => {
    getExercises();
  }, []);

  const columns = [
    { field: "rowIndex", headerName: "No.", flex: 0.3,  align: "center", headerAlign: "center"},
    {
      field: "exerciseName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "dateOfBirth",
    //   headerName: "Date of birth",
    //   type: "dateTime",
    //   headerAlign: "left",
    //   align: "left",
    //   flex: 1,
    // },
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
    // {
    //   field: "address",
    //   headerName: "Address",
    //   flex: 1,
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
        const handleAddToSession = (e) => {
          const currentRow = params.row;
          var exercises = JSON.parse(sessionStorage.getItem("creatingSession"));
          if(exercises == null) {
            exercises = [];
            exercises.push(currentRow);
          } else {
            exercises.push(currentRow);
          }
          sessionStorage.setItem("creatingSession", JSON.stringify(exercises));
        };
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
            <Box
              width="60%"
              m="0 auto"
              p="0px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.redAccent[600]}
              borderRadius="4px"
              alignContent="center"
            >
              <Button
                onClick={() => {
                  handleAddToSession();
                  alert.success("Added To Session");
                }}
                style={{
                  backgroundColor: "#055CED",
                }}
                variant="contained"
                size="small"
              >
                Add To Session
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    //<Header title="PATIENTS" subtitle="Managing the ALS patients" />
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SESSION CREATE" subtitle="Select exercises to create a session" />
        <Button
          onClick={() => {
            navigate("/creatingSession");
            // sessionStorage.clear();
          }}
          style={{
            backgroundColor: "#055CED",
          }}
          variant="contained"
          size="large"
        >
          Current Session
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
          getRowId={(row) => row.exerciseId}
          components={{ Toolbar: GridToolbar }}
          // pagination
          // pageSize={10}
        />
      </Box>

      {visibleItemDrawer && (
        <SwipeableTemporaryDrawer
          visible={visibleItemDrawer}
          initData={viewItemData}
          onClose={() => setVisibleItemDrawer(false)}
        />
      )}

      {/* {visibleUpdateDrawer && (
        <UpdateExerciseForm
          // visible={visibleUpdateDrawer}
          initData={updateItemData}
          onClose={() => setVisibleItemDrawer(false)}
        />
      )} */}
    </Box>
  );
};

export default CreateSession;
