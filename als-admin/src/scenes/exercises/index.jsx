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


const Exercises = () => {
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

  const getExercises = async () => {

    const exercises = await getAllExercisesAsync();
    // console.log(exercises);
    // console.log(exercises.data);
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
      //console.log(activeRows);
    }
  };

  // const getActiveRows = () => {
  //   const patients = listPatients;
  //   const rows = patients.filter(function (row) {
  //     return row.status === true;
  //   });
  //   setActiveRows(rows);
  // };

  const toggleStatus = async (row) => {
    //console.log(row.userId);
    const status = !row.status;
    //console.log(status);
    await toggleExerciseAsync(row.exerciseId, status);
    getExercises();
  }

  useEffect(() => {

  }, [activeRows]);

  useEffect(() => {
    getExercises();
    // getActiveRows();
  }, []);

  const columns = [
    { field: "rowIndex", headerName: "No.", flex: 0.3,  align: "center", headerAlign: "center"},
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
        const handleToggle = (e) => {
          const currentRow = params.row;
          console.log(currentRow);
          toggleStatus(currentRow);
        };
        const handleUpdate = (e) => {
          const currentRow = params.row;

          navigate("/editExercise", {
            state: {
              exerciseId: currentRow.exerciseId,
              exerciseName: currentRow.exerciseName,
              videoLink: currentRow.videoLink,
              description: currentRow.description,
              categoryName: currentRow.categoryName,
              image: currentRow.exerciseImage,
            },
          });

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
                onClick={handleToggle}
                style={{
                  backgroundColor: "#C60000",
                }}
                variant="contained"
                size="small"
              >
                Delete
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
                onClick={handleUpdate}
                style={{
                  backgroundColor: "#055CED",
                }}
                variant="contained"
                size="small"
              >
                Update
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
        <Header title="EXERCISEES" subtitle="Managing exercises" />
        <Button
          onClick={() => {
            navigate("/createExercise");
          }}
          style={{
            backgroundColor: "#055CED",
          }}
          variant="contained"
          size="large"
        >
          Create New Exercise
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

export default Exercises;
