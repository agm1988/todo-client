import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, // Higher than most MUI components
      }}
    >
      <CircularProgress size={60} style={{ color: "#ffffff" }} />
    </Box>
  );
};

export default LoadingOverlay;
