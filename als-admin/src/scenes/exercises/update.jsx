import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { getAllCategoriesAsync, updateExerciseAsync } from "../../services/exercisesServices";
import { useLocation } from "react-router-dom";
import { fontSize } from "@mui/system";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";


const userSchema = yup.object().shape({
  exerciseName: yup.string().required("Exercise Name is required"),
  videoLink: yup.string().required("Video Link is required"),
  description: yup.string().required("Description is required"),
});

const UpdateExerciseForm = () => {
    let navigate = useNavigate();
   
    const location = useLocation();

    let exerciseId = location.state.exerciseId;
    let exerciseName = location.state.exerciseName;
    let videoLink = location.state.videoLink;
    let description = location.state.description;
    let categoryName = location.state.categoryName;
    let image = location.state.image;

    const [categories, setCategories] = useState([]);
    const [categoryIdState, setCategoryIdState] = useState("");
    const [isSuccess, setIsSuccess] = useState();
    const [imageState, setImageState] = useState();
    const [uploadImage, setUploadImage] = useState();

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values) => {
      console.log(values);
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
              exerciseId: exerciseId,
              exerciseImage: imageUrl,
              ...values,
            };
            console.log(requestBody);
            const response = await updateExerciseAsync(requestBody);
            setIsSuccess(response.data.success);
          });
        });
      } else {
        console.log(values);
        const requestBody = {
          exerciseId: exerciseId,
          exerciseImage: imageState,
          ...values,
        };
        console.log(requestBody);
        const response = await updateExerciseAsync(requestBody);
        setIsSuccess(response.data.success);
      }
    };

    const getCategories = async () => {
      const response = await getAllCategoriesAsync();
      setCategories(response.data);
      const categoryId = response.data.find(
        (cat) => cat.catgegoryName === categoryName
      ).categoryId;
      setCategoryIdState(categoryId);
    };

    const alertCloseHandle = () => {
        setIsSuccess(false);
        navigate("/exercises");
    }

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
      getCategories();
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
        <Header title="UPDATE EXERCISE" subtitle="Update an Exercise" />

        <Box>
          <img alt="Article Image" src={imageState} height="400px" maxWidth="1000px" />
        </Box>

        <Formik
          onSubmit={handleFormSubmit}
          enableReinitialize
          initialValues={{
            exerciseName: exerciseName || "",
            videoLink: videoLink || "",
            description: description || "",
            categoryId: categoryIdState,
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
                flexDirection="column"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
                }}
                justifyContent="center"
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
                  sx={{ gridColumn: "span 4" }}
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
                  sx={{ gridColumn: "span 4" }}
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
                  sx={{ gridColumn: "span 4" }}
                />
                <Field
                  as="select"
                  name="categoryId"
                  fullWidth
                  inputProps={{ style: { fontSize: 20 , innerHeight: 100} }}
                  sx={{ innerWidth: 100}}
                >
                  {categories
                    .map((cat) => (
                      <option value={cat.categoryId}>
                        {cat.catgegoryName}
                      </option>
                    ))}
                </Field>

                <input name="imageFile" type="file" onChange={(e) => {
                  handleChange(e);
                  setUploadImage(e.currentTarget.files[0]);
                  handleImageChange(e);
                }}/>
              </Box>
              <Box display="flex" justifyContent="start" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Update Exercise
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
}

export default UpdateExerciseForm;