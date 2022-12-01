import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createArticleAsync } from "../../services/articlesServices";

const userSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  image: yup.string().required("Image is required"),
  description: yup.string().required("Description is required"),
});

const CreateArticleForm = () => {

    let navigate = useNavigate();
   
    // let newsId = location.state.newsId;
    // let title = location.state.title;
    // let image = location.state.image;
    // let description = location.state.description;
    // let status = location.state.status;
    // let lastModifyBy = auth?.userId;

    const [isSuccess, setIsSuccess] = useState();
    const [imageState, setImageState] = useState();

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values) => {
        console.log(values);
        const requestBody = {values}
        console.log(requestBody);
        const response = await createArticleAsync(requestBody);
        setIsSuccess(response.data.success);
    }

    const alertCloseHandle = () => {
        setIsSuccess(false);
        navigate("/articles");
    }

    const handleImageChange = (changeImage) => {
      console.log(changeImage);
      if (imageState === null || imageState !== changeImage) {
        setImageState(changeImage);
      }
      console.log(imageState);
    }

    useEffect(() => {
      console.log(imageState);
    }, [imageState])

    useEffect(() =>  {
      // setImageState(image);
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
        <Header title="CREATE ARTICLE" subtitle="Create an Article" />

        <Box>
          <img alt="Article Image" src={imageState} height="400px" maxWidth="1000px" />
        </Box>

        <Formik
          onSubmit={handleFormSubmit}
          enableReinitialize
          initialValues={{
            title: "",
            image: "",
            description: "",
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
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
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
                  Create Article
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
}

export default CreateArticleForm;