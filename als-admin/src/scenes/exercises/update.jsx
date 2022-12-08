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

// const initialValues = {
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
// };

const userSchema = yup.object().shape({
  exerciseName: yup.string().required("Exercise Name is required"),
  //   email: yup
  //     .string()
  //     .email("Invalid email format")
  //     .required("Email is required"),
  videoLink: yup.string().required("Video Link is required"),
  description: yup.string().required("Description is required"),
//   confirmPassword: yup
//     .string()
//     .required("Password Confirmation is required")
//     .test("passwords-match", "Passwords must match", function (value) {
//       return this.parent.password === value;
//     }),
});

const UpdateExerciseForm = () => {
    let navigate = useNavigate();
   
    const location = useLocation();

    let exerciseId = location.state.exerciseId;
    let exerciseName = location.state.exerciseName;
    let videoLink = location.state.videoLink;
    let description = location.state.description;
    let categoryName = location.state.categoryName;

    const [categories, setCategories] = useState([]);
    const [categoryIdState, setCategoryIdState] = useState("");
    const [isSuccess, setIsSuccess] = useState();
    // const [exerciseId, setExerciseId] = useState();
    // const [exerciseName, setExerciseName] = useState();
    // const [videoLink, setVideoLink] = useState();
    // const [description, setDescription] = useState();
    // const [categoryName, setCategoryName] = useState();

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values) => {
        console.log(values);
        const requestBody = {
            exerciseId: exerciseId,
            ...values,
        }
        console.log(requestBody);
        const response = await updateExerciseAsync(requestBody);
        setIsSuccess(response.data.success);
        // console.log(exerciseName);
        // console.log(videoLink);
    }
    
    const getCategories = async () => {
        // console.log(exerciseName);
        // console.log(videoLink);
        // console.log(description);
        // console.log(categoryName);
        const response = await getAllCategoriesAsync();
        // console.log(response.data);
        setCategories(response.data);
        const categoryId = response.data.find((cat) => cat.catgegoryName === categoryName).categoryId;
        // console.log(categoryId);
        setCategoryIdState(categoryId);
        // console.log(categoryIdState);
    }

    const alertCloseHandle = () => {
        setIsSuccess(false);
        navigate("/exercises");
    }

    useEffect(() => {
      getCategories();
    //   setExerciseId(location.state?.exerciseId);
    //   setExerciseName(location.state?.exerciseName);
    //   setVideoLink(location.state?.videoLink);
    //   setDescription(location.state?.description);
    //   setCategoryName(location.state?.categoryName);
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
                {/* <TextField
                  fullWidth
                  inputProps={{ style: { fontSize: 20 } }}
                  variant="filled"
                  type="password"
                  label="Passowrd"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                /> */}
                {/* <TextField
                  fullWidth
                  inputProps={{style: {fontSize: 20}}}
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                /> */}
                <Field
                  as="select"
                  name="categoryId"
                  fullWidth
                  inputProps={{ style: { fontSize: 20 , innerHeight: 100} }}
                  sx={{ innerWidth: 100}}
                >
                  {/* <option disabled value={categoryIdState}>
                    {categoryName}
                  </option> */}
                  {/* {categories && */}
                  {categories
                    //   .filter((cate) => cate.id !== props.values.player2)
                    .map((cat) => (
                      <option value={cat.categoryId}>
                        {cat.catgegoryName}
                      </option>
                    ))}
                </Field>
                {/* <Field as="select" name="categoryId">
                  <option value={1}>Tap tay</option>
                  <option value={2}>Tap ta</option>
                  <option value={3}>Tap ay</option>
                </Field> */}
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