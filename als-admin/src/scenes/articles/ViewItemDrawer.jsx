import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Button, Divider, Stack, TextareaAutosize, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const inputStyle = {
  width: '75%',
  height: '50px',
  border: '1px solid #1876D1',
  padding: '10px',
  borderRadius: '5px',
  marginLeft: '20px',
  maxWidth: '75%'
}

export default function ViewDataDrawer({ visible, onClose, initData }) {
  return (
    <React.Fragment key="right">
      <Drawer anchor="right" open={visible} onClose={() => onClose()}>
        <Box sx={{ width: "50vw", minWidth: "300px", paddingTop: "80px" }}>
          <Stack justifyContent={"end"}>
            <Box>
              <Button onClick={() => onClose()}>
                <CloseIcon />
              </Button>
            </Box>
          </Stack>
          <Divider />
          <div style={{ height: "20px" }} />
          {/* <div style={{ textAlign: "center" }}>
            <img
              src={viewData?.productImage || ""}
              style={{ width: "50%", height: "250px", margin: "0 auto" }}
            />
          </div> */}
        </Box>
        <Box sx={{ width: "100%", padding: "20px" }}>
          <Box
            sx={{ textAlign: "center", marginBottom: "20px", fontWeight: 700 }}
          >
            ARTICLE INFORMATION
          </Box>
          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box>
              <img src={initData?.image} height="300px" maxWidth="750px"/>
            </Box>
          </Stack>

          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Article Title:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.title || ""}</Box>
          </Stack>

          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Create Date:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.createDate || ""}</Box>
          </Stack>

          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Last Modified Date:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.modifyDate || ""}</Box>
          </Stack>

          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Last Modified By:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.lastModifyBy || ""}</Box>
          </Stack>

          {/* <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Video Link:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.videoLink || ""}</Box>
          </Stack> */}

          {/* <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Phone Number:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.phoneNumber || ""}</Box>
          </Stack> */}

          {/* <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Address:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.address || ""}</Box>
          </Stack> */}

          {/* <Stack flexWrap='nowrap' flexDirection={'row'} alignItems='center' justifyContent='flex-start' style={{ marginBottom: '20px', width: '100%' }}>
            <Box sx={{ width: '25%' }}>
              <b>Giá:</b>
            </Box>
            <Box sx={inputStyle}>
              {FORMAT_NUMBER.format(viewData?.price)} VNĐ
            </Box>
          </Stack> */}

          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Description:</b>
            </Box>
            <Box
              sx={{
                width: "75%",
                minHeight: "50px",
                border: "1px solid #1876D1",
                padding: "10px",
                borderRadius: "5px",
                marginLeft: "20px",
                maxWidth: "750px",
                maxHeight: "400px",
              }}
            >
              {initData?.description}
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
