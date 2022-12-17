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
import {
  getAllArticlesAsync,
  deleteArticleAsync,
} from "../../services/articlesServices";
import { deleteSessionAsync, getAllSessionAsync } from "../../services/sessionsService";
import useAuth from "../../hooks/useAuth";
import { useAlert } from 'react-alert';


const Sessions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewItemData, setViewItemData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [listSessions, setListSessions] = useState({});
  const [visibleItemDrawer, setVisibleItemDrawer] = useState(false);
  const [updateItemData, setUpdateViewItemData] = useState({});
  const [visibleUpdateDrawer, setVisibleUpdateDrawer] = useState(false);
  const [activeRows, setActiveRows] = useState({});

  const {auth} = useAuth();
  const alert = useAlert();

  let navigate = useNavigate();

  const getSessions = async () => {

    const sessions = await getAllSessionAsync(auth.userId);
    // console.log(sessions);
    // console.log(sessions.data);
    if (sessions.data) {
      setListSessions(sessions.data);
      const rows = sessions.data
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

  const deleteSession = async (row) => {
    const result = await deleteSessionAsync(row.sessionId);
    if (result.data.success) {
      alert.success("Session Deleted Successfully!");
      getSessions();
    } else {
      alert.error("Session Delete Failed!");
    }
  }

  useEffect(() => {

  }, [activeRows]);

  useEffect(() => {
    getSessions();
  }, []);

  const columns = [
    { field: "rowIndex", headerName: "No.", flex: 0.3,  align: "center", headerAlign: "center"},
    {
      field: "sesionName",
      headerName: "Name",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "createAt",
      type: "dateTime",
      headerName: "Created Date",
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
          console.log(currentRow);
          navigate("/sessionDetail", {
            state: {
              sessionId: currentRow.sessionId,
              sessionName: currentRow.sesionName,
            },
          });
        };
        const handleDeleteSession = (e) => {
          const currentRow = params.row;
          deleteSession(currentRow);
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
                onClick={handleDeleteSession}
                style={{
                  backgroundColor: "#C60000",
                }}
                variant="contained"
                size="small"
              >
                Delete
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
        <Header title="SESSIONS" subtitle="Managing sessions" />
        <Button
          onClick={() => {
            navigate("/createSession");
          }}
          style={{
            backgroundColor: "#055CED",
          }}
          variant="contained"
          size="large"
        >
          Create New Session
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
          getRowId={(row) => row.sessionId}
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
    </Box>
  );
};

export default Sessions;
