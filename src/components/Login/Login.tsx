import React, { useContext, useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const user = {
      user: userDetails,
    };

    type LoginResponse = {
      access_token: string;
      email: string;
      password: string;
    };

    try {
      await axios
        .post<LoginResponse>("http://localhost:3000/api/user/login", user.user)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          console.log(localStorage.getItem("access_token"));
          navigate("/home");
        })
        .catch(() => setError(() => true));
    } catch (err) {
      alert(err);
    }
  };

  const styles = {
    container: {
      width: "100%",
      padding: "3rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  } as const;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <Container style={styles.container}>
        <Typography variant="h4" style={{ fontWeight: 600, color: "#666" }}>
          Welcome Back!
        </Typography>
        <form
          style={{
            justifyContent: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <br />
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
            style={{ width: "60%" }}
            variant="outlined"
            required
          />
          <br />
          <br />
          <TextField
            label="Password"
            name="password"
            onChange={handleChange}
            helperText={error ? "Incorrect username or password" : ""}
            type="password"
            style={{ width: "60%" }}
            variant="outlined"
            required
          />

          <br />
          <br />
          <Button
            type="submit"
            style={{ width: "60%" }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <br />
          <br />
          <Button
            type="submit"
            onClick={() => navigate("/register")}
            style={{ width: "60%" }}
            variant="contained"
            color="primary"
          >
            Create Account
          </Button>
        </form>
      </Container>
    </div>
  );
}
