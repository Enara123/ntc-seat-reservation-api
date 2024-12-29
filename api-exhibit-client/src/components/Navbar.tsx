import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the active tab based on the current URL
  const getTabValue = (path: string) => {
    switch (path) {
      case "/ntc-admin":
        return 0;
      case "/bus-operator":
        return 1;
      case "/commuter":
        return 2;
      default:
        return 0;
    }
  };

  const [value, setValue] = useState(getTabValue(location.pathname));

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate("/ntc-admin");
    else if (newValue === 1) navigate("/bus-operator");
    else if (newValue === 2) navigate("/commuter");
  };

  return (
    <Box sx={{ m: 1, borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="NTC Admin" />
        <Tab label="Bus Operator" />
        <Tab label="Commuter" />
      </Tabs>
    </Box>
  );
};

export default Navbar;
