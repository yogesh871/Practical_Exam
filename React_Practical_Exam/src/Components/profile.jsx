import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBlogsAsync, deleteBlogAsync } from '../Services/Actions/BlogAction';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaRegSadTear } from 'react-icons/fa';
import './profile.css';

const MyBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const blogs = useSelector(state => state.blogReducer.blogs);
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    if (user?.uid) {
      dispatch(getMyBlogsAsync(user.uid));
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, [dispatch, user]);

  
  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlogAsync(blogId));
    }
  };

  return (
    <div className={`userblogs-root ${theme}`}>
    
      <h2 className="userblogs-title"> My Blogs</h2>

      {blogs.length === 0 ? (
        <div className="userblogs-empty">
          <FaRegSadTear size={48} />
          <p>You haven't added any blogs yet.</p>
          <button
            className="userblogs-create-btn"
            onClick={() => navigate('/createBlog')}
          >
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="userblogs-grid">
          {blogs.map(blog => (
            <div className="userblogs-card" key={blog.id}>
              <div className="userblogs-card-img">
                <img
                  src={blog.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={blog.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>
              <div className="userblogs-card-body">
                <div className="userblogs-card-meta">
                  <span className="userblogs-category">{blog.category}</span>
                  <span className="userblogs-date">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="userblogs-card-title">{blog.title}</h3>
                <p className="userblogs-card-desc">
                  {blog.description.length > 100
                    ? `${blog.description.slice(0, 100)}...`
                    : blog.description}
                </p>
              </div>
              <div className="userblogs-card-actions">
                <button
                  className="userblogs-edit"
                  onClick={() => navigate(`/editBlog/${blog.id}`)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="userblogs-delete"
                  onClick={() => handleDelete(blog.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
