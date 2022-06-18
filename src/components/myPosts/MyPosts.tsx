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
import moment from "moment";

function MyPosts(props: any) {
  const navigate = useNavigate();
  const [postsList, setPostsList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

  const [error, setError] = useState(false);

  var token: string = localStorage.getItem("access_token")!;
  var decoded: any = jwt_decode(token);
  const userId = decoded.user.id;

  const handleDelete = async (
    e: React.SyntheticEvent<EventTarget>,
    postId: number
  ) => {
    e.preventDefault();

    try {
      await axios
        .delete("http://localhost:3000/api/feed/" + postId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => navigate("/myPosts"))
        .catch(() => setError(() => true));
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    (async () => {
      await axios
        .get("http://localhost:3000/api/feed/userPosts/" + userId, {
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
  }, [postsList]);

  return postsList.length > 0 ? (
    <Container component="main" style={{ marginTop: "7%" }}>
      <Typography variant="h4" style={{ fontWeight: 600, color: "#666" }}>
        My Posts
      </Typography>
      <br />
      <Paper elevation={5} style={{ margin: "3% 0% 7%" }}></Paper>
      {postsList.map((post: any, i) => (
        <div key={post.id}>
          <Grid
            container
            alignItems="center"
            spacing={3}
            style={{ margin: "0% 4%" }}
          ></Grid>
          <Paper elevation={5} style={{ margin: "3% 0% 5%", padding: "30px" }}>
            <b style={{ fontSize: "24px" }}>{post.title}</b> <br />
            <Typography>
              {moment(post.createdAt).format("DD/MM/YYYY hh:mm")}
            </Typography>
            <br />
            <br /> {post.body} <br /> <br />
            <Divider></Divider>
            <br />
            <b>Comments:</b> <br /> <br />
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
            <Button
              variant="contained"
              style={{ marginTop: "0.5%" }}
              color="primary"
              size="large"
              onClick={(e) => {
                handleDelete(e, post.id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "2%", marginTop: "0.5%" }}
              color="primary"
              size="large"
              onClick={() =>
                navigate("/updateForm", {
                  state: {
                    postId: post.id,
                    title: post.title,
                    body: post.body,
                  },
                })
              }
            >
              Update
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

export default MyPosts;
