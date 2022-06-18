import React, { useContext, useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";

function UpdateForm(props: any) {
  const styles = {
    container: {
      width: "100%",
      padding: "3rem",
      // margin: "10px auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  } as const;

  const navigate = useNavigate();
  const location: any = useLocation();
  const [updatedPostDetails, setUpdatedPostDetails] = useState({});
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(location.state.title);
  const [body, setBody] = useState(location.state.body);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (key === "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
    setUpdatedPostDetails({
      ...updatedPostDetails,
      [e.target.name]: e.target.value,
    });
  };

  var token: string = localStorage.getItem("access_token")!;
  var decoded: any = jwt_decode(token);
  console.log(token);

  const handleUpdate = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const postId = location.state.postId;
    try {
      await axios
        .put("http://localhost:3000/api/feed/" + postId, updatedPostDetails, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => navigate("/myPosts"))
        .catch(() => setError(() => true));
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <br />
      <Container style={styles.container}>
        <Typography variant="h4" style={{ fontWeight: 600, color: "#666" }}>
          Update Post
        </Typography>
        <form
          style={{
            justifyContent: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleUpdate}
        >
          <br />
          <TextField
            label="Title"
            name="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "title")
            }
            style={{ width: "60%" }}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            label="Body"
            value={body}
            name="body"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "body")
            }
            style={{ width: "60%" }}
            variant="outlined"
          />

          <br />
          <br />
          <Button
            type="submit"
            style={{ width: "60%" }}
            variant="contained"
            color="primary"
          >
            Update Post
          </Button>
          <br />
          <br />
        </form>
      </Container>
    </div>
  );
}

export default UpdateForm;
