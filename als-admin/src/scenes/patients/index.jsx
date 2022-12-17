import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import SwipeableTemporaryDrawer from "./ViewUserDrawer";
import { getAllPatientsAsync, toggleStatusPatientAsync } from "../../services/patientsServices";

const Patients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewUserData, setViewUserData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [listPatients, setListPatients] = useState({});
  const [visibleUserDrawer, setVisibleUserDrawer] = useState(false);
  const [activeRows, setActiveRows] = useState({});

  const getPatients = async () => {
    const patients = await getAllPatientsAsync();
    // console.log(patients);
    // console.log(patients.data);
    if (patients.data) {
      setListPatients(patients.data);
      const rows = patients.data
        // .filter((row) => row.status !== false)
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
    await toggleStatusPatientAsync(row.userId, !row.status);
    getPatients();
  }

  useEffect(() => {

  }, [activeRows]);

  useEffect(() => {
    getPatients();
    // getActiveRows();
  }, []);

  const columns = [
    { field: "rowIndex", headerName: "No.", flex: 0.3,  align: "center", headerAlign: "center"},
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "dateOfBirth",
      headerName: "Date of birth",
      type: "dateTime",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "statusPatient",
      headerName: "Status",
      renderCell: ({ row: { status } }) => {
        if (status === true) {
          return (
            <Typography color={colors.greenAccent[500]} sx={{ ml: "5px" }}>
              Active
            </Typography>
          );
        } else {
          return(
            <Typography color={colors.redAccent[500]} sx={{ ml: "5px" }}>
              Banned
            </Typography>
          );
        }
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleView = (e) => {
          const currentRow = params.row;
          setViewUserData(currentRow);
          setVisibleUserDrawer(true);
        };
        const handleToggle = (e) => {
          const currentRow = params.row;
          toggleStatus(currentRow);
        }
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
            {params.row.status === true ? (
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
                  Ban
                </Button>
              </Box>
            ) : (
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
                    backgroundColor: "#dab600",
                  }}
                  variant="contained"
                  size="small"
                >
                  Unban
                </Button>
              </Box>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    //<Header title="PATIENTS" subtitle="Managing the ALS patients" />
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PATIENTS" subtitle="Managing ALS patients" />
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
          getRowId={(row) => row.userId}
          components={{ Toolbar: GridToolbar }}
          // pagination
          // pageSize={10}
        />
      </Box>

      {visibleUserDrawer && (
        <SwipeableTemporaryDrawer
          visible={visibleUserDrawer}
          initData={viewUserData}
          onClose={() => setVisibleUserDrawer(false)}
        />
      )}
    </Box>
  );
};

export default Patients;
