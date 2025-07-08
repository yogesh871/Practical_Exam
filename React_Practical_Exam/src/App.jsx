import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Components/Header/Header';
import Home from './Components/Home';
import AddBlog from './Components/AddBlog/AddBlog';
import EditBlog from './Components/EditBlog/EditBlog';
import BlogDetails from './Components/BlogDetails/BlogDetails';
import Sign_In from './Components/FormPage/Sign_In';
import Sign_Up from './Components/FormPage/Sign_Up';
import { checkAuthStateAsync } from './services/Actions/authAction'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import MyBlogs from './Components/profile';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStateAsync());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Add_Blog" element={<AddBlog />} />
        <Route path="/editBlog/:id" element={<EditBlog />} />
        <Route path="/Blog/:id" element={<BlogDetails />} />
        <Route path="/Sign_In" element={<Sign_In />} />
        <Route path="/Sign_Up" element={<Sign_Up />} />
        <Route path="/MyBlogs" element={<MyBlogs />} />
      </Routes>
    </>
  );
}

export default App;
