import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addBlogAsync, resetFlags } from '../../Services/Actions/blogAction';
import { auth } from '../../firebase';

import './AddBlog.css';

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: '',
    description: '',
    date: '',
    image: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(resetFlags());
  }, [dispatch]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!blog.title.trim()) newErrors.title = 'Title is required';
    if (!blog.description.trim()) newErrors.description = 'Description is required';
    if (!blog.date) newErrors.date = 'Date is required';
    if (!blog.image.trim()) newErrors.image = 'Image URL is required';
    if (!blog.category) newErrors.category = 'Please select a category';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to post a blog.");
      return;
    }

    const newBlog = {
      ...blog,
      userId: user.uid,
      author: user.displayName || "Anonymous"
    };

    dispatch(addBlogAsync(newBlog));
    toast.success('Blog added successfully!', { autoClose: 2000 });
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <>
      <ToastContainer />
      <div className="blog-form-container">
        <div className="form-card">
          <h2 className="form-title"><span className="title-icon"></span> Add New Blog</h2>
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label htmlFor="title">Blog Title</label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                className="form-input"
              />
              {errors.title && <small className="error-text">{errors.title}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Blog Description</label>
              <textarea
                name="description"
                value={blog.description}
                onChange={handleChange}
                className="form-input"
              />
              {errors.description && <small className="error-text">{errors.description}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={blog.date}
                onChange={handleChange}
                className="form-input"
              />
              {errors.date && <small className="error-text">{errors.date}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="image">Blog Image URL</label>
              <input
                type="url"
                name="image"
                value={blog.image}
                onChange={handleChange}
                className="form-input"
              />
              {errors.image && <small className="error-text">{errors.image}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Blog Category</label>
              <select
                name="category"
                value={blog.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Business">Business</option>
              </select>
              {errors.category && <small className="error-text">{errors.category}</small>}
            </div>

            <button type="submit" className="submit-btn">
              <span className="btn-text">Add Blog</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
