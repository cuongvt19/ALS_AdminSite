import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SwipeableTemporaryDrawer from "./ViewItemDrawer";
import {
  deleteRecordAsync,
  getAllAdminRecordsAsync,
} from "../../services/recordsServices";
import useAuth from "../../hooks/useAuth";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
// import UpdateExerciseForm from "./update";

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewItemData, setViewItemData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [listRecords, setListRecords] = useState({});
  const [visibleItemDrawer, setVisibleItemDrawer] = useState(false);
  const [activeRows, setActiveRows] = useState({});

  const { auth } = useAuth();

  let navigate = useNavigate();

  const getRecords = async () => {
    const records = await getAllAdminRecordsAsync(auth.userId);
    console.log(records.data);
    if (records.data) {
      setListRecords(records.data);
      const rows = records.data.map((item, i) => {
        // let tempVoiceRef = "";
        //getDownloadURL(ref(storage, `upload-voice-firebase/${item.linkAudio}`)).then((url) => {console.log(url)});
        return {
          ...item,
          rowIndex: i + 1, //use rowIndex as column
        };

        //  getDownloadURL(
        //    ref(storage, `upload-voice-firebase/${item.linkAudio}`)
        //  ).then((url) => {
        //   console.log(url);
        //    return {
        //      ...item,
        //      rowIndex: i + 1, //use rowIndex as column
        //    };
        //  });
      });
      // console.log(rows);
      setActiveRows(rows);
    }
  };

  const toggleStatus = async (row) => {
    //console.log(row.userId);
    await deleteRecordAsync(row.recordId);
    await getRecords();
  };

  useEffect(() => {}, [activeRows]);

  useEffect(() => {
    getRecords();
  }, []);

  const columns = [
    { field: "rowIndex", headerName: "No.", flex: 0.5 },
    {
      field: "recordName",
      headerName: "Record Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "linkAudio",
      headerName: "File Name",
      flex: 1,
    },
    {
      field: "createDate",
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
          console.log(currentRow.categoryName);

          navigate("/editArticle", {
            state: {
              newsId: currentRow.newsId,
              title: currentRow.title,
              image: currentRow.image,
              description: currentRow.description,
              status: currentRow.status,
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
                onClick={handleUpdate}
                style={{
                  backgroundColor: "#055CED",
                }}
                variant="contained"
                size="small"
              >
                Update
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
          title="RECORDS"
          subtitle="Managing the voice records created by Admin"
        />
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
          getRowId={(row) => row.recordId}
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

export default Records;
