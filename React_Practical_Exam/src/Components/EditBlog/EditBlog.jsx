// src/Components/EditBlog/EditBlog.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  updateBlogAsync,
  getBlogAsync,
  resetFlags
} from '../../Services/Actions/blogAction';

import '../AddBlog/AddBlog.css';
import 'react-toastify/dist/ReactToastify.css';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blog, isUpdated, isLoading, errorMsg } = useSelector((state) => state.blogReducer);
  const user = useSelector((state) => state.authReducer.user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    image: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user?.uid) {
      toast.error("Unauthorized. Please login.");
      return;
    }
    dispatch(getBlogAsync(id));
    dispatch(resetFlags());
  }, [dispatch, id, user?.uid]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        description: blog.description || '',
        date: blog.date || '',
        image: blog.image || '',
        category: blog.category || ''
      });
    }
  }, [blog]);

  useEffect(() => {
    if (isUpdated) {
      toast.success('Blog updated successfully!', { autoClose: 2000 });
      setTimeout(() => navigate('/'), 2000);
    }
    if (errorMsg) {
      toast.error(errorMsg);
    }
  }, [isUpdated, errorMsg, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!user?.uid || user.uid !== blog.userId) {
      toast.error("Unauthorized. You cannot edit this blog.");
      return;
    }

    const updatedBlog = {
      ...formData,
      id,
      userId: user.uid,
      author: user.displayName || 'Anonymous'
    };

    dispatch(updateBlogAsync(updatedBlog));
  };

  return (
    <>
      <ToastContainer />
      <div className="blog-form-container">
        <div className="form-card">
          <h2 className="form-title"> Edit Blog</h2>
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label>Title</label>
              <input name="title" value={formData.title} onChange={handleChange} className="form-input" />
              {errors.title && <small className="error-text">{errors.title}</small>}
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-input" />
              {errors.description && <small className="error-text">{errors.description}</small>}
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-input" />
              {errors.date && <small className="error-text">{errors.date}</small>}
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="url" name="image" value={formData.image} onChange={handleChange} className="form-input" />
              {errors.image && <small className="error-text">{errors.image}</small>}
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-select">
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

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Blog'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
