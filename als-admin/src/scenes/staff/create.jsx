import { Alert, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ImageField } from "react-admin";
import { createStaffAsync } from "../../services/staffsServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const userSchema = yup.object().shape({
  fullName: yup.string().required("Fullname is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password Confirmation is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const CreateStaffForm = () => {

  let navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const alertCloseHandle = () => {
    setIsSuccess(false);
    navigate("/staffs");
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    const requestBody = {
      //exerciseId: exerciseId,
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    console.log(requestBody);
    const response = await createStaffAsync(requestBody);
    setIsSuccess(response.data.success);
  };

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
      <Header title="REGISTER STAFF" subtitle="Register a New Staff Account" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              // display="grid"
              // gap="30px"
              // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 20 } }}
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
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
              />
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 20 } }}
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
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateStaffForm;
