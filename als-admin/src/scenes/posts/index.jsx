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
import { getAllPostAsync, togglePostStatusAsync } from "../../services/postsServices";
import useAuth from "../../hooks/useAuth";
// import UpdateExerciseForm from "./update";


const Posts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewItemData, setViewItemData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [listPosts, setListPosts] = useState({});
  const [visibleItemDrawer, setVisibleItemDrawer] = useState(false);
  const [updateItemData, setUpdateViewItemData] = useState({});
  const [visibleUpdateDrawer, setVisibleUpdateDrawer] = useState(false);
  const [activeRows, setActiveRows] = useState({});

  const { auth } = useAuth();

  let navigate = useNavigate();

  let userId = auth?.userId;

  const getPosts = async () => {

    const posts = await getAllPostAsync(userId);
    if (posts.data) {
      setListPosts(posts.data);
      const rows = posts.data
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
    const post = {
      status: !row.isPublic,
      postId: row.postId,
    }
    console.log(post);
    await togglePostStatusAsync(post);
    getPosts();
  }

//   useEffect(() => {
//     if (Object.keys(viewItemData).length > 0) {
//       setVisibleItemDrawer(true);
//       // console.log(viewItemData);
//     }
//   }, [viewItemData]);

  useEffect(() => {

  }, [activeRows]);

  useEffect(() => {
    getPosts();
    // getActiveRows();
  }, []);

  const columns = [
    { field: "rowIndex", headerName: "No.", flex: 0.3,  align: "center", headerAlign: "center"},
    {
      field: "postId",
      headerName: "PostId",
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
      field: "createDate",
      type: "dateTime",
      headerName: "Created Date",
      flex: 1,
    },
    {
      field: "fullNameUser",
      headerName: "Post By",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "isPublic",
      headerName: "Is Public?",
      flex: 0.5,
    },
    {
      field: "countReact",
      headerName: "Reacts Count",
      flex: 0.3,
    },
    
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
                onClick={handleToggle}
                style={{
                  backgroundColor: "#F3C628",
                }}
                variant="contained"
                size="small"
              >
                Toggle
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
        <Header title="POSTS" subtitle="Managing the posts by all users" />
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
          getRowId={(row) => row.postId}
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

export default Posts;
