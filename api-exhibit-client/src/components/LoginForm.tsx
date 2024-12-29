import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("siluni123"); // Predefined value
  const [password, setPassword] = useState("securepassword123"); // Predefined value
  const [response, setResponse] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://silunienara.me/auth/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setResponse(`Status Code: ${res.status}\nMessage: ${JSON.stringify(res.data.message, null, 2)}`);
    } catch (error: any) {
      if (error.response) {
        setResponse(
          `Error: ${error.response.status}\nMessage: ${JSON.stringify(error.response.data.message, null, 2)}`
        );
      } else {
        setResponse("Error connecting to the API");
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
        <Typography variant="h6" gutterBottom>
          POST https://silunienara.me/auth/login
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Allow editing
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Allow editing
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: 2 }}>
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

export default LoginForm;
