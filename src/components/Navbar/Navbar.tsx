import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  var token = localStorage.getItem("access_token");
  var logged = false;

  if (token == null) {
    logged = false;
  } else {
    logged = true;
  }

  return !logged ? (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog
            </Typography>
            <Button onClick={() => navigate("/")} color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  ) : (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog
            </Typography>
            <Button onClick={() => navigate("/home")} color="inherit">
              Home
            </Button>
            <Button onClick={() => navigate("/myPosts")} color="inherit">
              My Posts
            </Button>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
