import React from "react";
import { Typography, Box } from "@mui/material";
import ApiEndpointCard from "../components/ApiEndpointCard";

const Commuter: React.FC = () => {
  return (
    <Box sx={{ mt: 5, pl: 10, pr: 10 }}>
      <Typography variant="h4" gutterBottom>
        Commuter Endpoints
      </Typography>

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule/:scheduleId"
        httpMethod="GET"
        fields={[{ label: "Schedule ID", key: "scheduleId", value: "1" }]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5001/booking"
        httpMethod="POST"
        fields={[
          { label: "Name", key: "name", value: "Tharini" },
          { label: "Contact", key: "contact", value: "0771234567" },
          { label: "NIC", key: "NIC", value: "992233445V" },
          { label: "Schedule ID", key: "scheduleId", value: 1 },
          { label: "Seats Booked", key: "seatsBooked", value: 2 },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5001/booking/:NIC"
        httpMethod="GET"
        fields={[{ label: "NIC", key: "NIC", value: "992233445V" }]}
      />
    </Box>
  );
};

export default Commuter;
