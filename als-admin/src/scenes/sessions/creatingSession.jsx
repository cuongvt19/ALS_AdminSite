import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button, TextField} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import SwipeableTemporaryDrawer from "./ViewItemDrawer";
import { getAllExercisesAsync, toggleExerciseAsync } from "../../services/exercisesServices";
import UpdateExerciseForm from "./update";
import Popup from 'reactjs-popup';
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createSessionAsync } from "../../services/sessionsService";
import { useAlert } from 'react-alert';
import useAuth from "../../hooks/useAuth";


const userSchema = yup.object().shape({
  sessionName: yup.string().required("Session Name is required"),
});

const CreatingSession = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewItemData, setViewItemData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [visibleItemDrawer, setVisibleItemDrawer] = useState(false);
  const [activeRows, setActiveRows] = useState({});

  let navigate = useNavigate();

  const {auth} = useAuth();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const alert = useAlert();

  const getExercises = async () => {
    const temp = JSON.parse(sessionStorage.getItem("creatingSession"));
    const rows = temp.map((item, i) => {
      item.rowIndex = i + 1;
    });
    setActiveRows(temp);
  };

  const handleFormSubmit = async (values) => {

    const exercises = JSON.parse(sessionStorage.getItem("creatingSession"));
    if (exercises === null || exercises.length <= 0) {
      alert.error("There is not any exercise in current session!");
    } else {
      const exerciseIds = exercises.map((item, i) => {
        return {
          exerciseId: item.exerciseId, //use rowIndex as column
        };
      });
      console.log(exerciseIds);

      const requestBody = {
        userId: auth.userId,
        sessionName: values.sessionName,
        exercises: exerciseIds,
      };
      console.log(requestBody);

      const result = await createSessionAsync(requestBody);
      if (result.data.success) {
        alert.success("Session Created Successfully!");
        sessionStorage.removeItem("creatingSession");
        navigate("/sessions");
      } else {
        alert.error("Session Created Failed!");
      }
    }
    
  };

  const removeExercise = async (row) => {
    const temp = JSON.parse(sessionStorage.getItem("creatingSession"));
    const index = row.rowIndex - 1;
    temp.splice(index, 1);
    sessionStorage.setItem("creatingSession", JSON.stringify(temp));

    getExercises();
  }

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
    {
      field: "categoryName",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Active",
      flex: 0.5,
    },
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
        const handleRemove = (e) => {
          const currentRow = params.row;
          console.log(currentRow);
          removeExercise(currentRow);
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
            {/* <Box display="flex" justifyContent="center" mt="20px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        size="small"
                      >
                        View
                      </Button>
                    </Box> */}
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
                onClick={handleRemove}
                style={{
                  backgroundColor: "#C60000",
                }}
                variant="contained"
                size="small"
              >
                Remove
              </Button>
            </Box>
            {/* <Box
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
                onClick={handleAddToSession}
                style={{
                  backgroundColor: "#055CED",
                }}
                variant="contained"
                size="small"
              >
                Add To Session
              </Button>
            </Box> */}
          </Box>
        );
      },
    },
  ];

  return (
    //<Header title="PATIENTS" subtitle="Managing the ALS patients" />
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CURRENT SESSION"
          subtitle="Exercises in creating session"
        />

        <Popup
          trigger={
            <Button
              onClick={() => {
                // navigate("/creatingSession");
                sessionStorage.clear();
              }}
              style={{
                backgroundColor: "#055CED",
              }}
              variant="contained"
              size="large"
            >
              Create
            </Button>
          }
          modal
        >
          <Box backgroundColor={colors.grey[700]} p="10px" borderRadius="8px">
            <Formik
              onSubmit={handleFormSubmit}
              enableReinitialize
              initialValues={{
                sessionName: "",
              }}
              validationSchema={userSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    // display="grid"
                    // gap="30px"
                    // gridTemplateColumns="repeat(4, minmax(0.5fr, 1fr))"
                    // sx={{
                    //   "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    // }}
                    display="flex"
                    gap="30px"
                    // gridTemplateColumns="repeat(1, minmax(0.5fr, 0.5fr))"
                    flexDirection="column"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 1",
                      },
                    }}
                    // maxWidth="1000px"
                    // alignSelf="center"
                    justifyContent="center"
                    // alignItems="center"
                    width="400px"
                  >
                    <TextField
                      fullWidth
                      inputProps={{ style: { fontSize: 20 } }}
                      variant="filled"
                      type="text"
                      label="Session Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                      name="sessionName"
                      error={!!touched.title && !!errors.title}
                      helperText={touched.title && errors.title}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="start" mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      sx={{ margin: "10px" }}
                      size="large"
                    >
                      Create Session
                    </Button>
                    {/* <Button
                    type="action"
                    color="neutral"
                    variant="contained"
                    size="large"
                    sx={{ margin: "10px" }}
                    onClick={(e) => {
                      Popup.close();
                    }}
                  >
                    Close
                  </Button> */}
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Popup>
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

export default CreatingSession;
