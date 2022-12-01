import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { Howl } from "howler";

const inputStyle = {
  width: "75%",
  height: "50px",
  border: "1px solid #1876D1",
  padding: "10px",
  borderRadius: "5px",
  marginLeft: "20px",
  maxWidth: "75%",
};

export default function ViewDataDrawer({ visible, onClose, initData }) {
  const [voiceRef, setVoiceRef] = useState();

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    })
    sound.play();
  }

  useEffect(() => {
    getDownloadURL(
      ref(storage, `upload-voice-firebase/${initData.linkAudio}`)
    ).then((url) => {
      console.log(url);
      setVoiceRef(url);
    });
  }, []);

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
            RECORD INFORMATION
          </Box>

          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>Record Name:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.recordName || ""}</Box>
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
              <b>File Name:</b>
            </Box>
            <Box sx={inputStyle}>{initData?.linkAudio || ""}</Box>
          </Stack>

          {/* <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <Box sx={{ width: "25%" }}>
              <b>File Name:</b>
            </Box>
            <Box sx={inputStyle}>{voiceRef || ""}</Box>
          </Stack> */}

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              onClick={() => soundPlay(voiceRef)}
            >
              Play Audio
            </Button>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
