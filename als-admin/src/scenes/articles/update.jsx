import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { fontSize } from "@mui/system";
import { updateArticleAsync } from "../../services/articlesServices";
import useAuth from "../../hooks/useAuth";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useFormikContext } from "formik";
import { v4 } from "uuid";

const userSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const UpdateArticleForm = () => {

  const { auth } = useAuth();

    let navigate = useNavigate();
   
    const location = useLocation();

    let newsId = location.state.newsId;
    let title = location.state.title;
    let image = location.state.image;
    let description = location.state.description;
    let status = location.state.status;
    let lastModifyBy = auth?.userId;

    const [isSuccess, setIsSuccess] = useState();
    const [imageState, setImageState] = useState();
    const [uploadImage, setUploadImage] = useState();

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values) => {
      if (uploadImage != null) {
        const fileName = uploadImage.name.substring(
          0,
          uploadImage.name.lastIndexOf(".")
        );
        let imageUrl = "";
        const imageRef = ref(
          storage,
          `upload-image-firebase/${fileName + v4()}`
        );
        console.log(imageRef);
        console.log(uploadImage);
        uploadBytes(imageRef, uploadImage).then(async () => {
          console.log("uploaded");
          getDownloadURL(imageRef).then(async (url) => {
            console.log(url);
            imageUrl = url;
            console.log(values);
            const requestBody = {
              newsId: newsId,
              status: status,
              lastModifyBy: lastModifyBy,
              image: imageUrl,
              ...values,
            };
            console.log(requestBody);
            const response = await updateArticleAsync(requestBody);
            setIsSuccess(response.data.success);
          });
        });
      } else {
        console.log(values);
        const requestBody = {
          newsId: newsId,
          status: status,
          lastModifyBy: lastModifyBy,
          image: imageState,
          ...values,
        };
        console.log(requestBody);
        const response = await updateArticleAsync(requestBody);
        setIsSuccess(response.data.success);
      }
    };

    const alertCloseHandle = () => {
      setIsSuccess(false);
      navigate("/articles");
    };

    const handleImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          // this.setState({image: e.target.result});
          setImageState(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    useEffect(() => {
      // console.log(imageState);
    }, [imageState])

    useEffect(() =>  {
      setImageState(image);
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
            Update Successfully!
          </Alert>
        )}
        <Header title="UPDATE ARTICLE" subtitle="Update an Article" />

        <Box>
          <img alt="Article Image" src={imageState} height="400px" maxWidth="1000px" />
        </Box>

        <Formik
          onSubmit={handleFormSubmit}
          enableReinitialize
          initialValues={{
            title: title || "",
            // image: image || "",
            description: description || "",
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
                  label="Article Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
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
              <input name="imageFile" type="file" onChange={(e) => {
                  handleChange(e);
                  setUploadImage(e.currentTarget.files[0]);
                  handleImageChange(e);
                }}/>
              <Box display="flex" justifyContent="start" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Update Article
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
}

export default UpdateArticleForm;