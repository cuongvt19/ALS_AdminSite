import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createArticleAsync } from "../../services/articlesServices";
import { createRecordAsync, textToSpeechAsync } from "../../services/recordsServices";
import Delayed from "../../components/accountBox/delay";
import AudioConverter from "../../AudioConverter";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import useAuth from "../../hooks/useAuth";
// import AudioConverter from "convert-audio";

const userSchema = yup.object().shape({
  textValue: yup.string().required("Content is required"),
  recordName: yup.string().required("Record Name is required"),
});

const CreateRecordForm = () => {
  let navigate = useNavigate();
  const { auth } = useAuth();

  // let newsId = location.state.newsId;
  // let title = location.state.title;
  // let image = location.state.image;
  // let description = location.state.description;
  // let status = location.state.status;
  // let lastModifyBy = auth?.userId;

  const [isSuccess, setIsSuccess] = useState();
  const [linkAudioState, setLinkAudioState] = useState("");
  const [textValueState, setTextValueState] = useState("");
  const [uploadAudio, setUploadAudio] = useState();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const handleTextToSpeechFormSubmit = async (values) => {
  //   // console.log(values);
  //   // const requestBody = { values };
  //   // console.log(requestBody);
  //   // const response = await createArticleAsync(requestBody);
  //   // setIsSuccess(response.data.success);
  //   console.log(values);
  //   setLinkAudioState(values);
  // };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleCreateRecordFormSubmit = async (values) => {
    console.log(values);
    let convertedAudioDataObj = await AudioConverter.convert(uploadAudio, 'aac');
    console.log(convertedAudioDataObj);
    console.log(convertedAudioDataObj.data);
    // let a = document.createElement("a");
    // a.href = convertedAudioDataObj.data;
    // console.log("here");
    // a.download = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
    // a.click();
    const fileName = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
    const audioRef = ref(storage, `upload-voice-firebase/${fileName}`);
    uploadBytes(audioRef, convertedAudioDataObj.blob).then(() => {
      console.log("uploaded");
    });
    const requestBody = {
      userId: auth.userId,
      recordName: values.recordName,
      linkAudio: convertedAudioDataObj.name,
    };
    const response = await createRecordAsync(requestBody);
    console.log(response);
    setIsSuccess(response.data.success);
  };

  const alertCloseHandle = () => {
    setIsSuccess(false);
    navigate("/records");
  };

  const textToSpeech = async () => {
    console.log(textValueState);
    const result = await textToSpeechAsync(textValueState);
    console.log(result.data);
    await delay(12000);
    console.log(result.data.async);
    // const audioRef = ref(storage, `upload-voice-firebase/`);
    // uploadBytes(audioRef, result.data.async).then(() => {
    //   console.log("uploaded");
    // });
    // let a = document.createElement("a");
    // a.href = result.data.async;
    // a.download = "";
    // a.click(console.log("clicked"));
    // let convertedAudioDataObj = await AudioConverter.convert(result.data.async, 'aac');
    // console.log(convertedAudioDataObj);
    // console.log(convertedAudioDataObj.data);
    
    setLinkAudioState(result.data.async);
  };

  const backButtonHandle = () => {
    console.log("here");
    setLinkAudioState("");
  };

  const onChangeTextValueHandle = (textValue) => {
    console.log(textValue);
    setTextValueState(textValue);
    setLinkAudioState("");
  };

  const downloadAudioFileHandle = () => {
    const link = document.createElement("a");
    link.href = linkAudioState;
    // link.setAttribute("download", `FileName.pdf`);

    // Append to html link element page
    document.body.appendChild(link);

    link.download = "";

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    // fetch(linkAudioState)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     // Create blob link to download
    //     const url = window.URL.createObjectURL(new Blob([blob]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     // link.setAttribute("download", `FileName.pdf`);

    //     // Append to html link element page
    //     document.body.appendChild(link);

    //     link.download="";

    //     // Start download
    //     link.click();

    //     // Clean up and remove the link
    //     link.parentNode.removeChild(link);
    //   });
  };

  // const handleImageChange = (changeImage) => {
  //   console.log(changeImage);
  //   if (imageState === null || imageState !== changeImage) {
  //     setImageState(changeImage);
  //   }
  //   console.log(imageState);
  // }

  useEffect(() => {
    console.log(linkAudioState);
  }, [linkAudioState]);

  useEffect(() => {
    console.log(linkAudioState);
  }, []);

  return (
    <Box m="20px">
      {isSuccess && (
        <Alert
          onClose={() => {
            alertCloseHandle();
          }}
          variant="outlined"
          severity="success"
        >
          Create Successfully!
        </Alert>
      )}
      <Header title="CREATE RECORD" subtitle="Create a Record" />

      {linkAudioState !== "" && (
        // <Delayed waitBeforeShow={5000}>
        <audio src={linkAudioState} controls="controls"></audio>
        // </Delayed>
      )}

      <Formik
        onSubmit={handleCreateRecordFormSubmit}
        enableReinitialize
        initialValues={{
          textValue: "",
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
              }}
              // maxWidth="1000px"
              // alignSelf="center"
              justifyContent="center"
              // alignItems="center"
              width="700px"
            >
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 20 } }}
                variant="filled"
                type="text"
                label="Content"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  onChangeTextValueHandle(e.currentTarget.value);
                }}
                value={values.textValue}
                name="textValue"
                error={!!touched.textValue && !!errors.textValue}
                helperText={touched.textValue && errors.textValue}
                sx={{ gridColumn: "span 4" }}
              />

              {linkAudioState !== "" && (
                <TextField
                  multiline
                  fullWidth
                  inputProps={{
                    style: {
                      fontSize: 20,
                    },
                  }}
                  variant="filled"
                  type="text"
                  label="Record Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.recordName}
                  name="recordName"
                  error={!!touched.recordName && !!errors.recordName}
                  helperText={touched.recordName && errors.recordName}
                  sx={{ gridColumn: "span 4" }}
                />
              )}
              {linkAudioState !== "" && (
                <input
                  name="audioFile"
                  type="file"
                  onChange={(e) => {
                    handleChange(e);
                    setUploadAudio(e.currentTarget.files[0]);
                  }}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              {linkAudioState === "" && (
                <Button
                  type="action"
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={() => textToSpeech()}
                  sx={{ margin: "10px" }}
                >
                  Text To Speech
                </Button>
              )}
              {linkAudioState !== "" && (
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  sx={{ margin: "10px" }}
                >
                  Create Record
                </Button>
              )}
              {linkAudioState !== "" && (
                <Button
                  type="action"
                  color="secondary"
                  variant="contained"
                  size="large"
                  sx={{ margin: "10px" }}
                  onClick={() => downloadAudioFileHandle()}
                >
                  Download Audio
                </Button>
              )}
              {/* {linkAudioState !== "" && (
                <Button
                  type="action"
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={backButtonHandle()}
                  sx={{ margin: "10px" }}
                >
                  Back
                </Button>
              )} */}
            </Box>
          </form>
        )}
      </Formik>
      {/* {linkAudioState !== "" && (
        <Formik
          onSubmit={handleFormSubmit}
          enableReinitialize
          initialValues={{
            textValue: "",
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
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0.5fr, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  inputProps={{ style: { fontSize: 20 } }}
                  variant="filled"
                  type="text"
                  label="Article Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.textValue}
                  name="textValue"
                  error={!!touched.textValue && !!errors.textValue}
                  helperText={touched.textValue && errors.textValue}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  inputProps={{ style: { fontSize: 20 } }}
                  variant="filled"
                  type="text"
                  label="Image Link"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleImageChange(e.currentTarget.value);
                  }}
                  value={values.image}
                  name="image"
                  error={!!touched.image && !!errors.image}
                  helperText={touched.image && errors.image}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  multiline
                  fullWidth
                  inputProps={{
                    style: {
                      fontSize: 20,
                      minHeight: "80px",
                      maxHeight: "400px",
                      maxWidth: "100%",
                    },
                  }}
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Create Record
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={backButtonHandle()}
                >
                  Create Record
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )} */}
    </Box>
  );
};

export default CreateRecordForm;
