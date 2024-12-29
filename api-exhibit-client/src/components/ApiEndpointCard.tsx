import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

interface ApiEndpointCardProps {
  endpointUrl: string;
  httpMethod: "GET" | "POST" | "PUT" | "DELETE";
  fields: { label: string; key: string; value: string | number }[];
}

const ApiEndpointCard: React.FC<ApiEndpointCardProps> = ({ endpointUrl, httpMethod, fields }) => {
  const [inputData, setInputData] = useState<{ [key: string]: string | number }>({});
  const [response, setResponse] = useState<string>("");

  const handleInputChange = (key: string, value: number | string) => {
    setInputData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const prefillData: { [key: string]: string | number } = {};
    fields.forEach((field) => {
      prefillData[field.key] = field.value;
      handleInputChange(field.key, field.value);
    });
    setInputData(prefillData);
  }, [fields]);

  const handleRequest = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      // Replace URL parameters with their values
      let finalUrl = endpointUrl;
      Object.keys(inputData).forEach((key) => {
        finalUrl = finalUrl.replace(`:${key}`, String(inputData[key]));
      });

      const config: any = {
        method: httpMethod,
        url: finalUrl,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      };

      // Add data or params based on HTTP method
      if (httpMethod === "POST" || httpMethod === "PUT") {
        config.data = inputData;
      } else {
        const queryParams = Object.entries(inputData).reduce((acc, [key, value]) => {
          if (!endpointUrl.includes(`:${key}`)) {
            acc[key] = value;
          }
          return acc;
        }, {} as any);
        config.params = Object.keys(queryParams).length > 0 ? queryParams : undefined;
      }
      console.log("Request", config);
      // Send the request
      const res = await axios(config);

      setResponse(`Status Code: ${res.status}\nData: ${JSON.stringify(res.data)}`);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // If the token is expired (status code 401), try refreshing it
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            // Attempt to refresh the token
            const refreshRes = await axios.post("http://localhost:5002/auth/refresh", {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = refreshRes.data;

            // Save the new access and refresh tokens
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            // Retry the original request with the new access token
            let config: any = {
              method: httpMethod,
              url: endpointUrl,
              headers: { Authorization: `Bearer ${accessToken}` },
            };
            const res = await axios(config);

            setResponse(`Status Code: ${res.status}\nMessage: ${JSON.stringify(res.data.message, null, 2)}`);
          } catch (refreshError) {
            // If refresh fails, handle accordingly (e.g., logout user)
            setResponse("Error refreshing token");
          }
        } else {
          setResponse("No refresh token available");
        }
      } else {
        // Handle other errors
        setResponse(
          `Error Status Code: ${error.response?.status}\nMessage: ${JSON.stringify(
            error.response?.data.message,
            null,
            2
          )}`
        );
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        padding: 2,
        marginBottom: 4,
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on medium screens
      }}
    >
      {/* Form Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">
          {httpMethod} {endpointUrl}
        </Typography>

        {fields.map((field) => (
          <TextField
            key={field.key}
            label={field.label}
            value={field.value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            fullWidth
            margin="normal"
          />
        ))}

        <Button variant="contained" color="primary" onClick={handleRequest} sx={{ marginTop: 2 }}>
          Send Request
        </Button>
      </Box>

      {/* Response Section */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 1,
          border: "1px solid #ddd",
          maxHeight: 400,
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Response:
        </Typography>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{response}</pre>
      </Box>
    </Box>
  );
};

export default ApiEndpointCard;
