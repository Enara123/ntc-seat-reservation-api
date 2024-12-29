import React from "react";
import { Typography, Box } from "@mui/material";
import ApiEndpointCard from "../components/ApiEndpointCard";
import LoginForm from "../components/LoginForm";

const BusOperator: React.FC = () => {
  return (
    <Box sx={{ mt: 5, pl: 10, pr: 10 }}>
      <Typography variant="h4" gutterBottom>
        Bus Operator Endpoints
      </Typography>

      <LoginForm />

      <ApiEndpointCard
        endpointUrl="https://silunienara.me/auth/register"
        httpMethod="POST"
        fields={[
          { label: "First Name", key: "firstName", value: "Janith" },
          { label: "Last Name", key: "lastName", value: "Perera" },
          { label: "Email", key: "email", value: "janith.perera@example.com" },
          { label: "Telephone", key: "telephone", value: 774563210 },
          { label: "Password", key: "password", value: "securePass456" },
          { label: "Username", key: "username", value: "janithP" },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="https://silunienara.me/bus/"
        httpMethod="POST"
        fields={[
          { label: "Operator ID", key: "operatorId", value: 101 },
          { label: "Permit ID", key: "permitId", value: "123457" },
          { label: "Vehicle Registration Number", key: "vehicleRegNo", value: "AB-1434" },
          { label: "Status", key: "status", value: 1 },
          { label: "Type", key: "type", value: "luxury" },
          { label: "Seat Count", key: "seatCount", value: 40 },
          { label: "Route ID", key: "routeId", value: 2 },
        ]}
      />

      <ApiEndpointCard endpointUrl="https://silunienara.me/bus" httpMethod="GET" fields={[]} />

      <ApiEndpointCard
        endpointUrl="https://silunienara.me/bus/:busId"
        httpMethod="GET"
        fields={[{ label: "Bus ID", key: "busId", value: "1" }]}
      />

      <ApiEndpointCard
        endpointUrl="https://silunienara.me/bus/:busId"
        httpMethod="PUT"
        fields={[
          { label: "Bus ID", key: "busId", value: "21" },
          { label: "Permit ID", key: "permitId", value: "123457" },
          { label: "Vehicle Registration Number", key: "vehicleRegNo", value: "AB-1434" },
          { label: "Type", key: "type", value: "normal" },
          { label: "Seat Count", key: "seatCount", value: 40 },
          { label: "Route ID", key: "routeId", value: 2 },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="https://silunienara.me/bus/:busId"
        httpMethod="DELETE"
        fields={[{ label: "Bus ID", key: "busId", value: "21" }]}
      />
    </Box>
  );
};

export default BusOperator;
