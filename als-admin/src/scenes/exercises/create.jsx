import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  getAllCategoriesAsync,
  createExerciseAsync
} from "../../services/exercisesServices";
import { fontSize } from "@mui/system";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";


const userSchema = yup.object().shape({
  exerciseName: yup.string().required("Exercise Name is required"),
  videoLink: yup.string().required("Video Link is required"),
  description: yup.string().required("Description is required"),
  categoryId: yup.string().required("Category is required"),
  exerciseLevel: yup.string().required("Difficulty is required"),
});

const CreateExerciseForm = () => {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isSuccess, setIsSuccess] = useState();
  const [imageState, setImageState] = useState();
  const [uploadImage, setUploadImage] = useState();
  const [iniCategoryId, setInitCategoryId] = useState();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log(values);
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
          exerciseImage: imageUrl,
          exerciseName: values.exerciseName,
          videoLink: values.videoLink,
          description: values.description,
          categoryId: values.categoryId,
          exerciseLevel: values.exerciseLevel,
        };
        console.log(requestBody);
        const response = await createExerciseAsync(requestBody);
        console.log(response);
        setIsSuccess(response.data.success);
      });
    });

    // console.log(values);
    // const requestBody = {
    //   exerciseName: values.exerciseName,
    //   videoLink: values.videoLink,
    //   description: values.description,
    //   categoryId: values.categoryId,
    // };
    // console.log(requestBody);
    // const response = await createExerciseAsync(requestBody);
    // setIsSuccess(response.data.success);
  };

  const getCategories = async () => {
    const response = await getAllCategoriesAsync();
    setCategories(response.data);
  };

  const alertCloseHandle = () => {
    setIsSuccess(false);
    navigate("/exercises");
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageState(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  useEffect(() => {
  }, [imageState]);

  useEffect(() => {
    if(categories.length > 0) {
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
      <Header title="CREATE EXERCISE" subtitle="Create a new Exercise" />

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
          exerciseName: "",
          videoLink: "",
          description: "",
          categoryId: iniCategoryId ?? "",
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
                label="Exercise Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.exerciseName}
                name="exerciseName"
                error={!!touched.exerciseName && !!errors.exerciseName}
                helperText={touched.exerciseName && errors.exerciseName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 20 } }}
                variant="filled"
                type="text"
                label="Video Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.videoLink}
                name="videoLink"
                error={!!touched.videoLink && !!errors.videoLink}
                helperText={touched.videoLink && errors.videoLink}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 20 } }}
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 20 } }}
                variant="filled"
                type="text"
                label="Difficulty"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.exerciseLevel}
                name="exerciseLevel"
                error={!!touched.exerciseLevel && !!errors.exerciseLevel}
                helperText={touched.exerciseLevel && errors.exerciseLevel}
                sx={{ gridColumn: "span 1" }}
              />
              <Field as="select" name="categoryId" fullWidth>
                {categories.map((cat) => (
                  <option value={cat.categoryId}>{cat.catgegoryName}</option>
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
            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Create Exercise
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateExerciseForm;
