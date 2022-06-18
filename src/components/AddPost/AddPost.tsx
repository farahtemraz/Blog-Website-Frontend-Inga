import React, { useContext, useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
// import { History } from "history";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function AddPost() {
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

  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
  };

  const handleAddPost = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    var token: string = localStorage.getItem("access_token")!;
    var decoded: any = jwt_decode(token);
    const user = decoded.user;

    try {
      await axios
        .post("http://localhost:3000/api/feed/", postDetails, {
          headers: {
            Authorization: "Bearer " + token,
            user: user,
          },
        })
        .then((res) => {
          navigate("/home");
        });
    } catch (err) {
      alert(err);
    }
  };

  console.log(postDetails);

  return (
    <div>
      <Container style={styles.container}>
        <Typography variant="h5" style={{ fontWeight: 600, color: "#666" }}>
          Add a new post
        </Typography>
        <form
          style={{
            justifyContent: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <br />
          <TextField
            label="Title"
            name="title"
            onChange={handleChange}
            style={{ width: "60%" }}
            variant="outlined"
            required
          />
          <br />
          <br />
          <TextField
            label="Body"
            name="body"
            onChange={handleChange}
            style={{ width: "60%" }}
            variant="outlined"
            required
          />

          <br />
          <br />
          <Button
            style={{ width: "60%" }}
            variant="contained"
            color="primary"
            onClick={handleAddPost}
          >
            Add Post
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AddPost;
