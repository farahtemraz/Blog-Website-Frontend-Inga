import React, { useContext, useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const styles = {
    container: {
      padding: "3rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  } as const;

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const user = {
      user: userDetails,
    };
    console.log(user);

    interface CreateUserResponse {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
    try {
      await axios
        .post<CreateUserResponse>("http://localhost:3000/api/user/", user.user)
        .then((res) => navigate("/"))
        .catch(() => setError(() => true));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      {" "}
      <Container style={styles.container}>
        <Typography variant="h5" style={{ fontWeight: 600, color: "#666" }}>
          Register a new account
        </Typography>
        <form
          style={{
            justifyContent: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleCreate}
        >
          <br />
          <TextField
            label="First Name"
            name="firstName"
            onChange={handleChange}
            style={{ width: "60%" }}
            variant="outlined"
            required
          />
          <br />
          <br />
          <TextField
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            style={{ width: "60%" }}
            variant="outlined"
            required
          />

          <br />
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
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};
export default Register;
