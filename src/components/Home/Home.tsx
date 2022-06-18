import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleAddComment = async (
    e: React.SyntheticEvent<EventTarget>,
    postId: number
  ) => {
    e.preventDefault();
    var token: string = localStorage.getItem("access_token")!;
    var decoded: any = jwt_decode(token);
    const user = decoded.user;
    try {
      await axios.post("http://localhost:3000/api/comment/" + postId, comment, {
        headers: {
          Authorization: "Bearer " + token,
          user: user,
        },
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token != null) {
      (async () => {
        await axios
          .get("http://localhost:3000/api/feed/", {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            setPostsList(res.data);
          });
      })();
      (async () => {
        await axios
          .get("http://localhost:3000/api/comment/", {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            setCommentsList(res.data);
          });
      })();
    } else {
      navigate("/");
    }
  }, [postsList]);

  return postsList.length > 0 ? (
    <Container component="main" style={{ marginTop: "7%" }}>
      <Typography variant="h4" style={{ fontWeight: 600, color: "#666" }}>
        Feed
      </Typography>
      <br />
      <Button
        variant="outlined"
        size="large"
        color="primary"
        onClick={() => navigate("/addPost")}
      >
        Add Post
      </Button>
      <br /> <br /> <br />
      <Divider></Divider>
      <Paper elevation={5} style={{ margin: "-3% 0% 7% 0%" }}></Paper>
      {postsList.map((post: any, i) => (
        <div key={post.id}>
          <Paper elevation={5} style={{ margin: "3% 0% 5%", padding: "30px" }}>
            <br />
            <Grid
              alignItems="center"
              spacing={3}
              style={{ margin: "0% 4%" }}
              container
            >
              <Grid
                item
                md={1}
                alignItems="center"
                spacing={3}
                style={{ margin: "0% 0%", paddingLeft: "0%" }}
              >
                {" "}
                <AccountCircleIcon
                  style={{ fontSize: 100 }}
                ></AccountCircleIcon>
              </Grid>
              <Grid
                style={{
                  marginLeft: "2%",
                  fontSize: "28px",
                }}
                item
                md={7}
              >
                <b>
                  {post.author.firstName} {post.author.lastName}
                </b>
                <Typography>
                  {moment(post.createdAt).format("DD/MM/YYYY hh:mm")}
                </Typography>
              </Grid>
            </Grid>
            <br />
            <br />
            <Divider></Divider>
            <br />
            <b style={{ fontSize: "24px" }}>{post.title}</b>
            <br /> <br />
            <br />
            {post.body} <br /> <br />
            <Divider></Divider>
            <br />
            <b style={{ fontSize: "20px" }}>Comments:</b> <br /> <br />
            {commentsList.map((comment: any) =>
              comment.post.id == post.id ? (
                <>
                  <div key={comment.id}>
                    <br />
                    <b>
                      {comment.user.firstName} {comment.user.lastName}{" "}
                    </b>
                    <br /> <br />
                    {comment.body} <br /> <br />
                    <Divider></Divider>
                  </div>
                </>
              ) : (
                <> </>
              )
            )}
            <br />
            <br />
            <TextField
              label="Comment"
              name="body"
              onChange={handleChange}
              style={{ width: "50%" }}
              variant="outlined"
            ></TextField>
            <br />
            <br />
            <Button
              variant="contained"
              style={{ width: "50%" }}
              color="primary"
              size="large"
              onClick={(e) => {
                handleAddComment(e, post.id);
              }}
            >
              Add Comment
            </Button>
          </Paper>
          <br />
          <br />
        </div>
      ))}
    </Container>
  ) : (
    <div>""</div>
  );
}
