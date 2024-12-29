import React from "react";
import { Box, Typography } from "@mui/material";
import ApiEndpointCard from "../components/ApiEndpointCard";
import LoginForm from "../components/LoginForm";

const NtcAdminPage: React.FC = () => {
  return (
    <Box sx={{ mt: 5, pl: 10, pr: 10 }}>
      <Typography variant="h4" gutterBottom>
        NTC Admin Endpoints
      </Typography>

      <LoginForm />

      {/* City Endpoints */}
      <ApiEndpointCard
        endpointUrl="http://localhost:5000/cities"
        httpMethod="POST"
        fields={[{ label: "City Name", key: "name", value: "Kalutara" }]}
      />

      <ApiEndpointCard endpointUrl="http://localhost:5000/cities" httpMethod="GET" fields={[]} />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/cities/:cityId"
        httpMethod="GET"
        fields={[{ label: "City ID", key: "cityId", value: "1" }]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/cities/:cityId"
        httpMethod="PUT"
        fields={[
          { label: "City ID", key: "cityId", value: "1" },
          { label: "City Name", key: "name", value: "Puttalam" },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/cities/:cityId"
        httpMethod="DELETE"
        fields={[{ label: "City ID", key: "cityId", value: "1" }]}
      />

      {/* Route Endpoints */}
      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes"
        httpMethod="POST"
        fields={[
          { label: "Route Name", key: "routeName", value: "Colombo-Jaffna" },
          { label: "Estimated Time", key: "estimatedTime", value: "8 hours" },
          { label: "Distance", key: "distance", value: "404.00" },
        ]}
      />

      <ApiEndpointCard endpointUrl="http://localhost:5000/routes" httpMethod="GET" fields={[]} />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId"
        httpMethod="GET"
        fields={[{ label: "Route ID", key: "routeId", value: "1" }]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId"
        httpMethod="PUT"
        fields={[
          { label: "Route ID", key: "routeId", value: "1" },
          { label: "Route Name", key: "routeName", value: "Colombo-Horana" },
          { label: "Estimated Time", key: "estimatedTime", value: "2.5 hours" },
          { label: "Distance", key: "distance", value: "120.00" },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId"
        httpMethod="DELETE"
        fields={[{ label: "Route ID", key: "routeId", value: "1" }]}
      />

      {/*Route City Endpoints */}
      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId/cities"
        httpMethod="POST"
        fields={[
          { label: "Route ID", key: "routeId", value: "1" },
          { label: "City ID", key: "cityId", value: "2" },
          { label: "Sequence Order", key: "sequenceOrder", value: "1" },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId/cities"
        httpMethod="GET"
        fields={[{ label: "Route ID", key: "routeId", value: "1" }]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId/cities/:routeCityId"
        httpMethod="PUT"
        fields={[
          { label: "Route City ID", key: "routeCityId", value: "1" },
          { label: "Sequence Order", key: "sequenceOrder", value: "2" },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId/cities/:routeCityId"
        httpMethod="DELETE"
        fields={[{ label: "Route City ID", key: "routeCityId", value: "1" }]}
      />

      {/*Buses in Route Endpoint */}
      <ApiEndpointCard
        endpointUrl="http://localhost:5000/routes/:routeId/buses"
        httpMethod="GET"
        fields={[{ label: "Route ID", key: "routeId", value: "1" }]}
      />

      {/*Schedule Template Endpoints */}

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule-template"
        httpMethod="POST"
        fields={[
          {
            label: "Schedule Template",
            key: "scheduleTemplateData",
            value: JSON.stringify({
              routeId: 1,
              direction: "inbound",
              startTime: "05:00:00",
              endTime: "22:00:00",
              recurrencePattern: "daily",
            }),
          },
          {
            label: "Schedule Template Details",
            key: "scheduleTemplateDetailsData",
            value: JSON.stringify([
              { busId: 1, startTime: "05:00:00", endTime: "06:30:00" },
              { busId: 2, startTime: "06:30:00", endTime: "08:00:00" },
              { busId: 3, startTime: "08:00:00", endTime: "09:30:00" },
              { busId: 4, startTime: "09:30:00", endTime: "11:00:00" },
              { busId: 5, startTime: "11:00:00", endTime: "12:30:00" },
              { busId: 6, startTime: "12:30:00", endTime: "14:00:00" },
              { busId: 7, startTime: "14:00:00", endTime: "15:30:00" },
              { busId: 8, startTime: "15:30:00", endTime: "17:00:00" },
              { busId: 9, startTime: "17:00:00", endTime: "18:30:00" },
              { busId: 10, startTime: "18:30:00", endTime: "20:00:00" },
              { busId: 11, startTime: "20:00:00", endTime: "21:30:00" },
              { busId: 12, startTime: "21:30:00", endTime: "22:00:00" },
            ]),
          },
        ]}
      />

      <ApiEndpointCard endpointUrl="http://localhost:5000/schedule-template" httpMethod="GET" fields={[]} />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule-template/:templateId"
        httpMethod="GET"
        fields={[{ label: "Template ID", key: "templateId", value: "1" }]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule-template/:templateId"
        httpMethod="PUT"
        fields={[
          { label: "Template ID", key: "templateId", value: "1" },
          { label: "Route ID", key: "routeId", value: "1" },
          { label: "Direction", key: "direction", value: "outbound" },
          { label: "Start Time", key: "startTime", value: "05:00:00" },
          { label: "End Time", key: "endTime", value: "22:00:00" },
          { label: "Recurrence Pattern", key: "recurrencePattern", value: "daily" },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule-template/:templateId"
        httpMethod="DELETE"
        fields={[{ label: "Template ID", key: "templateId", value: "1" }]}
      />

      {/* Schedule Endpoints */}
      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule"
        httpMethod="POST"
        fields={[
          { label: "Route ID", key: "routeId", value: "1" },
          { label: "Template ID", key: "templateId", value: "1" },
          { label: "Start Time", key: "startTime", value: "2025-01-01" },
          { label: "End Time", key: "endTime", value: "2025-01-10" },
        ]}
      />

      <ApiEndpointCard endpointUrl="http://localhost:5000/schedule" httpMethod="GET" fields={[]} />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule/:scheduleId"
        httpMethod="GET"
        fields={[{ label: "Schedule ID", key: "scheduleId", value: "1" }]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule/:scheduleId"
        httpMethod="PUT"
        fields={[
          { label: "Schedule ID", key: "scheduleId", value: "2" },
          { label: "Route ID", key: "routeId", value: "1" },
          {
            label: "Replacement Details",
            key: "replacementDetails",
            value: JSON.stringify({
              newBusId: 5,
              reasonForChange: "Regular maintenance",
              startTime: "2024-12-19T05:00:00",
              endTime: "2024-12-19T06:30:00",
              remarks: "Replaced/On Schedule",
              status: "replaced",
            }),
          },
        ]}
      />

      <ApiEndpointCard
        endpointUrl="http://localhost:5000/schedule/:scheduleId"
        httpMethod="DELETE"
        fields={[{ label: "Schedule ID", key: "scheduleId", value: "1" }]}
      />
    </Box>
  );
};

export default NtcAdminPage;
