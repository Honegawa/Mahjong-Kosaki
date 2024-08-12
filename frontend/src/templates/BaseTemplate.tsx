import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/BaseTemplate.css";
import { Box } from "@mui/material";

function BaseTemplate() {
  return (
    <div className="template">
      <Header />
      <Box component="section" sx={{paddingX: {xs : 1, md: 15}, paddingY: {xs: 1, md: 5}}}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}

export default BaseTemplate;
