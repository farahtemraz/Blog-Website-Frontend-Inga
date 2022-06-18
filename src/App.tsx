import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { BrowserRouter } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import MyPosts from "./components/myPosts/MyPosts";
import UpdateForm from "./components/UpdateForm/UpdateForm";
import AddPost from "./components/AddPost/AddPost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/updateForm" element={<UpdateForm />} />
        <Route path="/addPost" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
