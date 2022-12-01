import { Box } from "@mui/material"
import Header from "../../components/Header.jsx";

const Dashboard = () => {
    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="DASHBOARD"
            subtitle="Welcome to ALS Vietnam Admin Dashboard"
          />
        </Box>
      </Box>
    );
}

export default Dashboard;