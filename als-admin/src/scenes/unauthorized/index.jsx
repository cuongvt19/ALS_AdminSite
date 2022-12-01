import { Box } from "@mui/material"
import Header from "../../components/Header.jsx";

const Unauthorized = () => {
    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="UNAUTHORIZED"
            subtitle="You are not allowed to access this page!"
          />
        </Box>
      </Box>
    );
}

export default Unauthorized;