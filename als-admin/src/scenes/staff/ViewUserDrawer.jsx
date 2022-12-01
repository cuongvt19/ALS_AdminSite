import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Button, Divider, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const inputStyle = {
  width: '75%',
  height: '50px',
  border: '1px solid #1876D1',
  padding: '10px',
  borderRadius: '5px',
  marginLeft: '20px',

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
            PERSONAL INFORMATION
          </Box>
          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Full Name:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.fullName || ""}</Box>
          </Stack>

          {/* <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Date Of Birth:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.dateOfBirth || ""}</Box>
          </Stack> */}

          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Email:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.email || ""}</Box>
          </Stack>

          <Stack
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
          </Stack>

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

          {/* <Stack flexWrap='nowrap' flexDirection={'row'} alignItems='center' justifyContent='flex-start' style={{ marginBottom: '20px', width: '100%' }}>
            <Box sx={{ width: '25%' }}>
              <b>Mô tả:</b>
            </Box>
            <Box sx={inputStyle}>
              {viewData?.description}
            </Box>
          </Stack> */}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
