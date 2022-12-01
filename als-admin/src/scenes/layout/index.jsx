import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme";
import AppSidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";


const Layout = () => {
    const [theme, colorMode] = useMode();

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <AppSidebar />
            <main className="content">
              <Topbar />
              <Outlet/>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default Layout;