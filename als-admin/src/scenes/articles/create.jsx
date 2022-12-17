import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  createArticleAsync,
  getAllArticlesCategoriesAsync,
} from "../../services/articlesServices";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { tokens } from "../../theme";

const userSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  // imageFile: yup.files().required("Image is required"),
  description: yup.string().required("Description is required"),
  newsDetails: yup.array(yup.object({
    headerName: yup.string().required("Header is required"),
    descriptionHeader: yup.string().required("Content is required"),
  })).min(1, 'Article needs at least 1 header and content'),
});

const CreateArticleForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState();
  const [imageState, setImageState] = useState();
  const [uploadImage, setUploadImage] = useState();
  const [categories, setCategories] = useState([]);
  const [headerImages, setHeaderImages] = useState([]);
  const [iniCategoryId, setInitCategoryId] = useState();
  const [details, setDetails] = useState([]);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const emptyDetail = { headerName: "", descriptionHeader: "" };

  const handleFormSubmit = async (values) => {
    console.log(values);
    console.log(headerImages);
    
    getDetails(values).then(() => {
      console.log(details);
      const fileName = uploadImage.name.substring(
          0,
          uploadImage.name.lastIndexOf(".")
        );
        let imageUrl = "";
        const imageRef = ref(storage, `upload-image-firebase/${fileName + v4()}`);
        console.log(imageRef);
        console.log(uploadImage);
        uploadBytes(imageRef, uploadImage).then(async () => {
          console.log("uploaded");
          getDownloadURL(imageRef).then(async (url) => {
            console.log(url);
            imageUrl = url;
            console.log(values);
            console.log(imageUrl);
            const requestBody = {
              image: imageUrl,
              accessId: 3,
              title: values.title,
              description: values.description,
              categoryNewId: values.categoryNewId,
              newsDetails: details,
            };
            console.log(requestBody);
            const response = await createArticleAsync(requestBody);
            console.log(response);
            setIsSuccess(response.data.success);
          });
        });
    });
    
    // console.log(details);

    // const fileName = uploadImage.name.substring(
    //   0,
    //   uploadImage.name.lastIndexOf(".")
    // );
    // let imageUrl = "";
    // const imageRef = ref(storage, `upload-image-firebase/${fileName + v4()}`);
    // console.log(imageRef);
    // console.log(uploadImage);
    // uploadBytes(imageRef, uploadImage).then(async () => {
    //   console.log("uploaded");
    //   getDownloadURL(imageRef).then(async (url) => {
    //     console.log(url);
    //     imageUrl = url;
    //     console.log(values);
    //     console.log(imageUrl);
    //     const requestBody = {
    //       image: imageUrl,
    //       accessId: 3,
    //       title: values.title,
    //       description: values.description,
    //       categoryNewId: values.categoryNewId,
    //       newsDetails: [],
    //     };
    //     console.log(requestBody);
    //     const response = await createArticleAsync(requestBody);
    //     console.log(response);
    //     setIsSuccess(response.data.success);
    //   });
    // });
  };

  const getDetails = async (values) => {
    const temp = details;
    values.newsDetails.map((item, i) => {
      if(headerImages[i] !== undefined){
        const fileName = headerImages[i].name.substring(
            0,
            headerImages[i].name.lastIndexOf(".")
          );
          let imageUrl = "";
          const imageRef = ref(storage, `upload-image-firebase/${fileName + v4()}`);
          uploadBytes(imageRef, headerImages[i]).then(async () => {
            getDownloadURL(imageRef).then(async (url) => {
              imageUrl = url;
              temp[i] = {
                ...item,
                imageHeader: imageUrl, //use rowIndex as column
              };

              setDetails(temp);
            });
          });
      } else {
        temp[i] = {
          ...item,
          imageHeader: '', //use rowIndex as column
        };

        setDetails(temp);
      }
    });
  }

  const alertCloseHandle = () => {
    setIsSuccess(false);
    navigate("/articles");
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageState(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleHeaderImageChange = (event, index) => {
    // console.log(headerImages);
    const temp = headerImages;
    // console.log(temp);
    temp[index] = event.target.files[0];
    // console.log(temp);
    setHeaderImages(temp);
  };

  const getCategories = async () => {
    const response = await getAllArticlesCategoriesAsync();
    setCategories(response.data);
  };

  useEffect(() => {}, [imageState]);

  useEffect(() => {
    if (categories.length > 0) {
      setInitCategoryId(categories[0].categoryNewId);
    }
  }, [categories]);

  useEffect(() => {
    getCategories();
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
        <img
          alt="Article Image"
          src={imageState}
          height="400px"
          maxWidth="1000px"
        />
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        enableReinitialize
        initialValues={{
          title: "",
          description: "",
          categoryNewId: iniCategoryId ?? "",
          newsDetails: [emptyDetail],
        }}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
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

              <Field as="select" name="categoryNewId" fullWidth>
                {categories.map((cat) => (
                  <option value={cat.categoryNewId}>{cat.categoryName}</option>
                ))}
              </Field>

              <input
                name="imageFile"
                type="file"
                onChange={(e) => {
                  handleChange(e);
                  setUploadImage(e.currentTarget.files[0]);
                  handleImageChange(e);
                }}
              />
            </Box>

            <FieldArray name="newsDetails">
              {({ push, remove }) => (
                <React.Fragment>
                  <Box>
                    <Typography
                      variant="h4"
                      color={colors.grey[300]}
                      sx={{ m: "15px 0 5px 20px" }}
                    >
                      Article Details:
                    </Typography>
                  </Box>

                  {values.newsDetails.map((_, index) => (
                    <Grid
                      container
                      item
                      // className={classes.noWrap}
                      key={index}
                      spacing={2}
                      direction="column"
                      width="700px"
                    >
                      {/* <Grid item container spacing={2} xs={12} sm="auto"> */}

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          inputProps={{ style: { fontSize: 20 } }}
                          variant="filled"
                          type="text"
                          label="Header"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.newsDetails[index].headerName}
                          name={`newsDetails[${index}].headerName`}
                          // error={!!touched.newsDetails[index].headerName && !!errors.newsDetails[index].headerName}
                          // helperText={touched.newsDetails[index].headerName && errors.newsDetails[index].headerName}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          multiline
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
                          label="Content"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.newsDetails[index].descriptionHeader}
                          name={`newsDetails[${index}].descriptionHeader`}
                          // error={!!touched.newsDetails[index].descriptionHeader && !!errors.newsDetails[index].descriptionHeader}
                          // helperText={touched.newsDetails[index].descriptionHeader && errors.newsDetails[index].descriptionHeader}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <input
                          name={`newsDetails[${index}].headerImageFile`}
                          type="file"
                          onChange={(e) => {
                            handleChange(e);
                            // setUploadImage(e.currentTarget.files[0]);
                            // handleImageChange(e);
                            handleHeaderImageChange(e, index);
                          }}
                        />
                      </Grid>
                      {/* </Grid> */}
                      <Grid item xs={12} sm="auto">
                        <Button
                          disabled={isSubmitting}
                          style={{
                            backgroundColor: "#C60000",
                          }}
                          variant="contained"
                          size="medium"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                  {/* 
                      <Grid item>
                        {typeof errors.donations === 'string' ? (
                          <Typography color="error">
                            {errors.donations}
                          </Typography>
                        ) : null}
                      </Grid> */}

                  <Grid item>
                    <Button
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: "#055CED",
                        marginTop: "5px",
                      }}
                      variant="contained"
                      size="medium"
                      onClick={() => push(emptyDetail)}
                    >
                      Add Detail
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
            </FieldArray>

            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                Create Article
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateArticleForm;
