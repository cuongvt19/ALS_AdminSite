import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Patients from "./scenes/patients";
import Supporters from "./scenes/supporters";
import AppSidebar from "./scenes/global/Sidebar";
import Login from "./scenes/login";
import Layout from "./scenes/layout";
import RequireAuth from "./scenes/login/RequireAuth";
import { ADMIN_ROLE, STAFF_ROLE } from "./constants/roles";
import Unauthorized from "./scenes/unauthorized";
import Exercises from "./scenes/exercises";
import UpdateExerciseForm from "./scenes/exercises/update";
import CreateExerciseForm from "./scenes/exercises/create";
import Articles from "./scenes/articles";
import UpdateArticleForm from "./scenes/articles/update";
import CreateArticleForm from "./scenes/articles/create";
import Posts from "./scenes/posts";
import CreateStaffForm from "./scenes/staff/create";
import Staffs from "./scenes/staff";
import Records from "./scenes/records";
import CreateRecordForm from "./scenes/records/create";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={<RequireAuth allowedRoles={[ADMIN_ROLE, STAFF_ROLE]} />}
          >
            <Route path="/" element={<Layout />}>
              <Route path="/unauthorized" element={<Unauthorized />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}

              {/* EXERCISES ROUTES */}
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/editExercise" element={<UpdateExerciseForm />} />
              <Route path="/createExercise" element={<CreateExerciseForm />} />

              {/* ARTICLES ROUTES */}
              <Route path="/articles" element={<Articles />} />
              <Route path="/editArticle" element={<UpdateArticleForm />} />
              <Route path="/createArticle" element={<CreateArticleForm />} />

              {/* POSTS ROUTES */}
              <Route path="/posts" element={<Posts />} />
              <Route path="/editArticle" element={<UpdateArticleForm />} />
              <Route path="/createArticle" element={<CreateArticleForm />} />

              <Route element={<RequireAuth allowedRoles={[ADMIN_ROLE]} />}>
                {/* PATIENT ROUTES */}
                <Route path="/patients">
                  <Route index element={<Patients />} />
                </Route>

                {/* SUPPORTERS_ROUTES */}
                <Route path="/supporters" element={<Supporters />} />

                {/* STAFF ROUTES */}
                <Route path="/createStaff" element={<CreateStaffForm />} />
                <Route path="/staffs" element={<Staffs />} />

                {/* RECORDS ROUTES */}
                <Route path="/records" element={<Records />} />
                <Route path="/createRecord" element={<CreateRecordForm />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
